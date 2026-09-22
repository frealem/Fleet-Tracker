'use server'

import { revalidatePath } from "next/cache"
import { connectToDatabase } from "@/lib/db"
import { Trip } from "../models/trip"
import { Driver } from "../models/driver"
import { CreateTripInput,createTripSchema } from "@/lib/validations/trips"
import { success } from "zod"
import { error } from "console"



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
    const[newTrip]=await Trip.create([
        {
            tenantId:validatedData.tenantId,
            tripCode,
            driverId:validatedData.driverId,
            vehicleId:validatedData.vehicleId,
            origin:{
                address:validatedData.originAddress,
                location:{type:'Point',coordinates:validatedData.originCoordinates}
            },
            destination:{
                address:validatedData.destinationAddress,
                location:{type:'Point',coordinates:validatedData.destinationCoordinates}
            },
            status:'DISPATCHED',
            dispatchedAt:new Date(),
        },
        
    ],{session});

    // TO AUTOMATICALLY UPDATE DRIVER AND VEHICLE STATUS

    await Driver.findByIdAndUpdate(validatedData.driverId,{isAvailable:false},{session});
    await Vehi.findByIdAndUpdate(validatedData.vehicleId,{status:'IN_TRANSIT'},{session})

   } catch (error) {
    
   }
}