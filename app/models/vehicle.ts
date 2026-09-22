import mongoose,{Schema,Document,Model, Types} from "mongoose"
import { Ivehicle } from "../type/index"

export interface IVehicleDocument extends Omit<Ivehicle, '_id' | 'tenantId'>{
  _id: Types.ObjectId;
  tenantId: Types.ObjectId;
}

const VehicleSchema = new Schema<IVehicleDocument>(
  {
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    plateNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },
    model: { type: String, required: true, trim: true },
    capacity: { type: Number, required: true },
    status: {
      type: String,
      enum: ['IDLE', 'IN_TRANSIT', 'MAINTENANCE', 'DECOMMISSIONED'],
      default: 'IDLE',
      index: true,
    },
  },
  { timestamps: true }
);

VehicleSchema.index({tenantId:1,status:1})

export const Vehicle: Model<IVehicleDocument> =
  mongoose.models.Vehicle || mongoose.model<IVehicleDocument>('Vehicle', VehicleSchema);