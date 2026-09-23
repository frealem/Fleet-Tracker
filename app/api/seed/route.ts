import {NextResponse} from "next/server";
import {connectToDatabase} from "@/lib/db";
import{Trip} from "@/app/models/trip";
import { Driver } from "@/app/models/driver";
import { Vehicle } from "@/app/models/vehicle";
import { Tenant } from "@/app/models/tenant";

export async function GET(){

await connectToDatabase();

// clear existing mock data

await Trip.deleteMany({});
await Driver.deleteMany({});
await Vehicle.deleteMany({});
await Tenant.deleteMany({})

// create tenant for seeding
const tenant=await Tenant.create({
    name:"logi express Ethiopia",
    slug:"logiexpress"
});

// create sample Fleet of drivers
const vehicle=await Vehicle.create({
    tenantId: tenant._id,
    plateNumber: 'ET-3-88219',
    model: 'Isuzu FSR Cargo Truck',
    capacity: 8000,
    status: 'IDLE',
})
const driver=await Driver.create({
   tenantId: tenant._id,
    full_name: 'Abebe Kebede',
    email: 'abebe@logiexpress.et',
    phone: '+251911223344',
    assignedVehicleId: vehicle._id,
    isAvailable: true,
    location: {
      type: 'Point',
      coordinates: [38.7578, 8.9806],

}})

return NextResponse.json({message:"data seeded successfully",
    tenantId:tenant._id,
    driverId:driver._id,
    vehicleId:vehicle._id
})

}