import mongoose,{Model,Schema,Document} from "mongoose";
import {Itrip} from "../type/index";
import { types } from "util";

export interface ItripDocument extends Omit<Itrip,"_id">{
    _id:mongoose.Types.ObjectId
}

const tripSchema=new Schema<ItripDocument>(
    {
        
        tenantId:{type:Schema.Types.ObjectId,required:true,trim:true},
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