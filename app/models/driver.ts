import mongoose ,{Model,Schema,Document}from "mongoose";
import {Idriver} from "../type/index";

export interface IdriverDocument extends Omit<Idriver,"_id">, Document {};
const driverSchema=new Schema<IdriverDocument>(
    {
        tenantId:{type:String,required:true,trim:true},
        full_name:{type:String,required:true,trim:true},
        licenseNumber:{type:String,required:true,trim:true},
        phone:{type:String,required:true,trim:true},
        email:{type:String,required:true,trim:true},
        isAvailable:{type:Boolean,required:true,default:true},
        location:{
            type:{type:String,enum:["point"],default:"Point"},
            coordinates:{type:[Number],required:true}  
        },
        lastLocationUpdate:{type:Date,required:true,default:Date.now}
    },{timestamps:true}
)

export const Driver:Model<IdriverDocument> =mongoose.models.Driver || mongoose.model<IdriverDocument>("Driver",driverSchema)