import { connectToDatabase } from "@/lib/db";
import {Tenant} from '../models/tenant'
import { Driver } from "../models/driver";
import { Trip } from "../models/trip";
import { Vehicle } from "../models/vehicle";
import { Dispatch } from "react";
import DispatchForm from "@/components/dispatchForm";

export const revalidate=0;

export default async function DispatchPage(){
    await connectToDatabase()

    let tenant=await Tenant.findOne({slug:'logiexpress'}).lean();

    if (tenant) {
    tenant = await Tenant.findOne({}).lean();
  }
    if(!tenant){
        return(<div className="p-8 text-center text-red-500 font-semibold">
            No Tenant found please visit <code className="p-2 font-bold">/api/seeding</code>to populate test record </div>
        )
    }

    const availableDrivers = await Driver.find({tenantId:tenant._id,isAvailable:true})
    const availableVehicles=await Vehicle.find({tenantId:tenant._id ,status:'IDLE'})
    const activeTrips = await Trip.find({ tenantId: tenant._id }).sort({ createdAt: -1 }).limit(5);

    return(
        <main className="">
<div>
    <header>
        <div>
        <h1>Fleet-Pulse Dispatch Control</h1>
        <p>Tenant:{tenant.name}</p>
        </div>

        <a href="/api/seed">Reset Seed Data</a>
        <div>
        <section className="">
<h2>Dispatch New Cargo</h2>
<DispatchForm 
tenantId={tenant._id.toString()}
drivers={availableDrivers.map((d)=>({_id:d._id.toString(),full_name:d.full_name}))}
vehicles={availableVehicles.map((v)=>({_id:v._id.toString(),plateNumber:v.plateNumber,model:v.model}))}
/>
        </section>

        <section>
            <h2>Recent Dispatches</h2>
            {activeTrips.length===0 ?(<p>NO ACTIVE TRIP DISPATCHES</p>) :(<div>
                {activeTrips.map((trip)=>(
                    <div>
                        <div>
                            <span>{`Name : ${trip.model}`}</span>
                            <p>{trip.origin.address} &rarr; {trip.destination.address}</p>
                        </div>
                        <span>{trip.status}</span>
                    </div>
                ))}

            </div>)}
        </section>
        </div>
    </header>
</div>
        </main>
    )
}

