'use server'

import { revalidatePath } from "next/cache"
import { connectToDatabase } from "@/lib/db"
import { Trip } from "../models/trip"
import { Driver } from "../models/driver"
import { CreateTripInput,createTripSchema } from "@/lib/validations/trips"
import { Vehicle } from "../models/vehicle"



export async function createTripDispatch(input:CreateTripInput) {
   const validation=createTripSchema.safeParse(input) 

   if (!validation.success){
    return {
    success:false,
    error:validation.error.flatten().fieldErrors,
    }
   }
   
   const validatedData=validation.data;
   const mongoose=await connectToDatabase();

   const session=await mongoose.startSession();
   session.startTransaction();

   try {
    
    const tripCode=`Trip-${Math.floor(1000 + Math.random()*9000)}`
    const newTrip = new Trip({
  tenantId: validatedData.tenantId,
  tripCode,
  driverId: validatedData.driverId,
  vehicleId: validatedData.vehicleId,
  origin: {
    address: validatedData.originAddress,
    location: { type: 'Point', coordinates: validatedData.originCoordinates },
  },
  destination: {
    address: validatedData.destinationAddress,
    location: { type: 'Point', coordinates: validatedData.destinationCoordinates },
  },
  status: 'DISPATCHED',
  dispatchedAt: new Date(),
});

await newTrip.save({ session });

await Driver.findByIdAndUpdate(validatedData.driverId, { isAvailable: false }, { session });
await Vehicle.findByIdAndUpdate(validatedData.vehicleId, { status: 'IN_TRANSIT' }, { session });

await session.commitTransaction();
session.endSession();

revalidatePath('/dispatch');

return {
  success: true,
  tripId: newTrip._id.toString(),
};

   }
   catch (err) {
   
    await session.abortTransaction();
    session.endSession();

    console.error('Error creating trip:', err);
    return {
      success: false,
      error: 'Failed to create trip',
    };
} 
}