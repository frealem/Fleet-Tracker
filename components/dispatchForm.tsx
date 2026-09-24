'use client'

import { useState } from "react";
import { createTripDispatch } from "@/app/actions/tripAction";

interface DispatchFormProps {
    tenantId: string;
    drivers: { _id: string; full_name: string }[];
    vehicles: { _id: string; plateNumber: string ; model:string}[];
}

export default function DispatchForm({tenantId,drivers,vehicles}:DispatchFormProps){
const[loading, setLoading]=useState(false)
const[message,setMessage]=useState("")

async function handleSubmit(formData:FormData){
    setLoading(true)
    setMessage("")

    const res=await createTripDispatch({
        tenantId,
        driverId: formData.get('driverId') as string,
        vehicleId:formData.get('vehicleId') as string,
        originAddress:formData.get('originAddress') as string,
        originCoordinates:[38.7578, 8.9806],
        destinationAddress:formData.get('destinationAddress') as string,
        destinationCoordinates:[38.7630, 9.0050]
    })

    setLoading(false);
    if(res.success){
        setMessage(`successful! with dispatch trip ID :${res.tripId}`);
    }
    else{
        setMessage(`Error dispatching Trip verify driver and vehicle availability`);
    }
}

return(
    <form action={handleSubmit} className="space-y-4">

        {/* to choose the driver */}

    <div>
        <label className="block text-xs text-slate-400 mb-1">Select Driver</label>
        <select name="driverId" className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100">
            <option>Select Available Drivers</option>
           { drivers.map((d)=>(
            <option key={d._id} value={d._id}>{d.full_name}</option>
            ))}
        </select>
    </div>

    {/* to choose from vehicle */}
    <div>
        <label className="block text-xs text-slate-400 mb-1">Select Vehicle</label>
        <select name="vehicleId" className="w-full bg-slate-900 border-slate-700 rounded p-2 text-sm text-slate-100">
            <option>Select available vehicle ...</option>
            {
                vehicles.map((v)=>(
                    <option key={v._id} value={v._id}>
                        {v.plateNumber}
                    </option>
                ))
            }
        </select>
    </div>

    <div className="">
        <label className="block text-xs text-slate-400 mb-1">Pick Up Origin Address</label>
        <input name="originAddress" defaultValue="Bole Cargo Terminal ,Addis Ababa" required className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100"/>
    </div>
    
    <div>
        <label className="block text-xs text-slate-400 mb-1">Destination Address</label>
        <input name="destinationAddress" defaultValue="kaliti" required className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100"/>
    </div>
    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded transition duration-200">{loading ? 'Processing Dispatch':'Dispatch Vehicle Now'}</button>
    {message && <p className="text-xs text-center font-medium mt-2 text-emerald-400">{message}</p>}
    </form>
)
}