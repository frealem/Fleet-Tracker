import mongoose,{Model,Schema,Document} from "mongoose";
import {Itrip} from "../type/index";

export interface ItripDocument extends Omit<Itrip,"_id">,Document{}

const tripSchema=new Schema<ItripDocument>(
    {
        tenantId:{type:String,required:true,trim:true},
        driverId:{type:String,required:true,trim:true},
        vehicleId:{type:String,required:true,trim:true},
        origin:{
            address:{type:String,required:true,trim:true},
            destination:{type:String,required:true,trim:true},
        },
        status:{type:String,enum:["PENDING","DISPATCHED","EN_ROUTE","DELIVERED","CANCELLED"],default:"PENDING",index:true},

    },{timestamps:true}
)

export const Trip:Model<ItripDocument>=mongoose.models.Trip || mongoose.model<ItripDocument>("Trip",tripSchema)