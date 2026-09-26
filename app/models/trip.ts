import mongoose, { Model, Schema } from "mongoose";
import { Itrip } from "../type/index";

export interface ItripDocument extends Omit<Itrip, "_id" | "tenantId" | "driverId" | "vehicleId"> {
  _id: mongoose.Types.ObjectId;
  tenantId: mongoose.Types.ObjectId;
  driverId:mongoose.Types.ObjectId;
  vehicleId:mongoose.Types.ObjectId;
}

const PointSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  { _id: false }
);

const tripSchema = new Schema<ItripDocument>(
  {
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true },
    tripCode: { type: String, required: true },
    driverId: { type: Schema.Types.ObjectId, ref: "Driver", required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
    origin: {
      address: { type: String, required: true, trim: true },
      location: { type: PointSchema, required: true },
    },
    destination: {
      address: { type: String, required: true, trim: true },
      location: { type: PointSchema, required: true },
    },
    status: {
      type: String,
      enum: ["PENDING", "DISPATCHED", "EN_ROUTE", "DELIVERED", "CANCELLED"],
      default: "PENDING",
      index: true,
    },
    dispatchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Trip: Model<ItripDocument> =
  mongoose.models.Trip || mongoose.model<ItripDocument>("Trip", tripSchema);