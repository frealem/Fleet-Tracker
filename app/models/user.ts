import mongoose ,{models,model, Schema} from "mongoose"
import { required } from "zod/mini"


export const userSchema=new Schema({
    full_name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:["MANAGER","DRIVER","CUSTOMER"],default:"CUSTOMER"},
    tenantId:{type:Schema.Types.ObjectId,ref:"Tenant",required:true}
},
{timestamps:true}

)

export const User=models.User || model('User',userSchema)