'use server'

import { revalidatePath } from "next/cache"
import { Types } from "mongoose"
import { connectToDatabase } from "@/lib/db"
import { Trip } from "../models/trip"
import { Driver } from "../models/driver"
import { Vehicle } from "../models/vehicle"
import { CreateTripInput, createTripSchema } from "@/lib/validations/trips"

export async function createTripDispatch(input: CreateTripInput) {

  const validation = createTripSchema.safeParse(input)

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.flatten().fieldErrors,
    }
  }

  const validatedData = validation.data;
  const mongoose = await connectToDatabase();

  let session = null;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
  } catch (sessionErr) {
    console.warn("MongoDB Transactions not supported on this instance. Proceeding without session.");
    session = null;
  }

  try {
    const tripCode = `Trip-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTrip = new Trip({
      tenantId: new Types.ObjectId(validatedData.tenantId),
      tripCode,
      driverId: new Types.ObjectId(validatedData.driverId),
      vehicleId: new Types.ObjectId(validatedData.vehicleId),
      origin: {
        address: validatedData.originAddress,
        location: {
          type: 'Point',
          coordinates: validatedData.originCoordinates,
        },
      },
      destination: {
        address: validatedData.destinationAddress,
        location: {
          type: 'Point',
          coordinates: validatedData.destinationCoordinates,
        },
      },
      status: 'DISPATCHED',
      dispatchedAt: new Date(),
    });


    const opts = session ? { session } : {};

    await newTrip.save(opts);
    await Driver.findByIdAndUpdate(
      validatedData.driverId,
      { isAvailable: false },
      opts
    );

    await Vehicle.findByIdAndUpdate(
      validatedData.vehicleId,
      { status: 'IN_TRANSIT' },
      opts
    );

    if (session) {
      await session.commitTransaction();
      session.endSession();
    }

    revalidatePath('/dispatch');

    return {
      success: true,
      tripId: newTrip._id.toString(),
    };

  } catch (err: any) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }

    console.error('Error creating trip:', err);
    return {
      success: false,
      error: err.message || 'Failed to create trip',
    };
  }
}