'use server'

import { connectToDatabase } from "@/lib/db"
import {Trip} from '@/app/models/trip'
import { Driver } from "@/app/models/driver"
import { Vehicle } from "@/app/models/vehicle"
import { revalidatePath } from 'next/cache';
import { success } from "zod"
import { error } from "console"

export async function completeTripAction(tripId:string){
try {
    await connectToDatabase();

    // After the trip completed 3 things should be update the trip status to delivered , the driver to isAvailable=true, the vehicle to statu="Idle"
    const trip=await Trip.findById(tripId)

    if(!trip){
        return {success:false,error:'No Trip Found'}
    }

    if(trip.status==='DELIVERED'){
        return{success:false,error:'Trip is already marked as Delivered'}
    }

    trip.status="DELIVERED";
    trip.deliveredAt=new Date();   
    
    await trip.save();

    if(trip.driverId){
        await Driver.findByIdAndUpdate(trip.driverId,{isAvailable:true});
    }

    if(trip.vehicleId){
        await Vehicle.findByIdAndUpdate(trip.vehicleId,{status:"IDLE"})
    }
// I want to cache both the dispatch and tracking

    revalidatePath("/dispatch");
    revalidatePath("/tracking");

    return{success:true}


} catch (error:any) {
    console.error('Error to complete the trip',error)
}
return {
    success:false,
    error: "Failed to complete trip. Please try Again"
}
}