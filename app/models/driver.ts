import mongoose ,{Model,Schema,Document, Types}from "mongoose";
import {Idriver} from "../type/index";


export interface IDriverDocument extends Omit<Idriver,"_id" | "tenantId" | "assignedVehicleId">{
    _id: Types.ObjectId;
    tenantId:Types.ObjectId,
assignedVehicleId:Types.ObjectId};

const DriverSchema = new Schema<IDriverDocument>(
  {
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    full_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    assignedVehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    isAvailable: { type: Boolean, default: true, index: true },
    
    // GeoJSON Point for MongoDB $near / $geoWithin spatial queries
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    lastLocationUpdate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

DriverSchema.index({tenantId:1,isAvailablity:1})
DriverSchema.index({location:'2dsphere'})

export const Driver:Model<IDriverDocument>=mongoose.models.Driver || mongoose.model<IDriverDocument>('Driver',DriverSchema)