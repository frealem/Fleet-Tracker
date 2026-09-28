'use client'

import { useTransition } from "react"
import { completeTripAction } from "@/app/actions/completeTripAction"
import { error } from "console";

interface CompleteTripButtonProps{
    tripId:string,
    status:string
}

export default function CompleteTripButton({tripId,status}:CompleteTripButtonProps){
    
    const[isPending,startTransition]=useTransition();

    if(status==="DELIVERED"){
        <span className="inline-flex item-center gap-1.5 px-5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>DELIVERED</span>
    }

    const handleCompleteTrip=()=>{
        startTransition(async()=>{
           const result= await completeTripAction(tripId);

           if(!result.success){
            alert(result.error)
           }

        })
    }

    return(<button onClick={handleCompleteTrip} disabled={isPending} className={`relative inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-lgtext-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
        isPending
          ? 'bg-emerald-800/50 cursor-not-allowed text-emerald-200'
          : 'bg-emerald-600 hover:bg-emerald-500 active:scale-95 shadow-lg shadow-emerald-900/20'}`}>
    {isPending ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          Updating...
        </span>
      ) : (
        'Mark Delivered'
      )}
    </button>
  );

}