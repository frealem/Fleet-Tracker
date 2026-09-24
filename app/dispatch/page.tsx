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
        <main className="min-h-screen bg-slate-900 text-slate-100 p-8">
<div className="max-w-6xl mx-auto space-y-8">
    <header className="border-b border-slate-800 pb-4 flex justify-between items-center">
        <div>
        <h1 className="text-3xl font-bold tracking tracking-tight">Fleet-Pulse Dispatch Control</h1>
        <p className="text-sm text-slate-400">Tenant:{tenant.name}</p>
        </div>

        <a href="/api/seed" className="bg-slate-800 hover:bg-slate-600 text-xs px-3 py-2 rounded text-slate-300">Reset Seed Data</a>

        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">   


        <section className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
<h2 className="text-xl font-semibold text-emerald-400 ">Dispatch New Cargo</h2>
<DispatchForm 
tenantId={tenant._id.toString()}
drivers={availableDrivers.map((d)=>({_id:d._id.toString(),full_name:d.full_name}))}
vehicles={availableVehicles.map((v)=>({_id:v._id.toString(),plateNumber:v.plateNumber,model:v.model}))}
/>
        </section>

        <section className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
            <h2 className="text-xl font-semibold text-emerald-400">Recent Dispatches</h2>
            {activeTrips.length===0 ?(<p className="text-slate-500 text-sm">NO ACTIVE TRIP DISPATCHES</p>) :(<div className="space-y-3">
                {activeTrips.map((trip)=>(
                    <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-700/50 flex justify-between items-center">
                        <div>
                            <span className="text-sm font-mono bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">{`Name : ${trip.model}`}</span>
                            <p className="text-sm font-medium mt-1">{trip.origin.address} &rarr; {trip.destination.address}</p>
                        </div>
                        <span className="text-xs font-bold text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded-full border border-sky-800/50">{trip.status}</span>
                    </div>
                ))}

            </div>)}
        </section>
        </div>
  
</div>
        </main>
    )
}

