'use client'

import { useState } from "react";
import { createTripDispatch } from "@/app/actions/tripAction";

interface DispatchFormProps {
  tenantId: string;
  drivers: { _id: string; fullName: string }[];
  vehicles: { _id: string; plateNumber: string; model: string }[];
}

export default function DispatchForm({ tenantId, drivers, vehicles }: DispatchFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage("");

    const driverId = formData.get("driverId") as string;
    const vehicleId = formData.get("vehicleId") as string;

    // FIX: Guard against submitting default unselected state
    if (!driverId || !vehicleId) {
      setMessage("Please select a valid driver and vehicle.");
      setIsSuccess(false);
      setLoading(false);
      return;
    }

    const res = await createTripDispatch({
      tenantId,
      driverId,
      vehicleId,
      originAddress: formData.get("originAddress") as string,
      originCoordinates: [38.7578, 8.9806],
      destinationAddress: formData.get("destinationAddress") as string,
      destinationCoordinates: [38.7630, 9.0050],
    });

    setLoading(false);
    if (res.success) {
      setIsSuccess(true);
      setMessage(`Successfully dispatched! Trip ID: ${res.tripId}`);
    } else {
      setIsSuccess(false);
      setMessage(`Error dispatching trip. Verify driver and vehicle availability.`);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {/* Driver Selection */}
      <div>
        <label className="block text-xs text-slate-400 mb-1">Select Driver</label>
        <select
          name="driverId"
          required
          defaultValue=""
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100"
        >
          {/* FIX: Set value="" on placeholder options so invalid strings are not submitted */}
          <option value="" disabled>Select Available Driver...</option>
          {drivers.map((d) => (
            <option key={d._id} value={d._id}>
              {d.fullName}
            </option>
          ))}
        </select>
      </div>

      {/* Vehicle Selection */}
      <div>
        <label className="block text-xs text-slate-400 mb-1">Select Vehicle</label>
        <select
          name="vehicleId"
          required
          defaultValue=""
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100"
        >
          {/* FIX: Set value="" on placeholder options */}
          <option value="" disabled>Select Available Vehicle...</option>
          {vehicles.map((v) => (
            <option key={v._id} value={v._id}>
              {v.plateNumber} - {v.model}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">Pick Up Origin Address</label>
        <input
          name="originAddress"
          defaultValue="Bole Cargo Terminal, Addis Ababa"
          required
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100"
        />
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">Destination Address</label>
        <input
          name="destinationAddress"
          defaultValue="Kaliti Menaherya"
          required
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white text-sm font-semibold py-2.5 rounded transition duration-200"
      >
        {loading ? "Processing Dispatch..." : "Dispatch Vehicle Now"}
      </button>

      {message && (
        <p className={`text-xs text-center font-medium mt-2 ${isSuccess ? "text-emerald-400" : "text-rose-400"}`}>
          {message}
        </p>
      )}
    </form>
  );
}