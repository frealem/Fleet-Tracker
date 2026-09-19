import mongoose, {Document,Model,Schema} from "mongoose";
import {Itenant} from "../type/index";

export interface ItenantDocument extends Omit<Itenant,"_id">, Document {};
const tenantSchema=new Schema<ItenantDocument>(
{
    name:{type:String,required:true,trim:true},
    slug:{type:String,required:true,trim:true,unique:true},
},
{
    timestamps:true,
}
)

export const Tenant:Model<ItenantDocument>= mongoose.models.Tenant || mongoose.model<ItenantDocument>("Tenant",tenantSchema)