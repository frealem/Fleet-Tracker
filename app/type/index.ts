export type UserRoles = "MANAGER" | "DRIVER" |"DISPATCHER"

export type VehicleStatus = "IDLE" | "IN_TRANSIT" | "MAINTENANCE" | "DECOMMISSIONED"

export type TripStatus = "PENDING" | "DISPATCHED" | "EN_ROUTE" | "DELIVERED" |"CANCELLED"


interface geoJsonPoint{
    type:"Point";
    coordinates:[number,number]
}

export interface Itenant{
    _id?:string;
    name:string;
    slug:string;
    createdAt:Date;
    updatedAt:Date;
}

export interface Ivehicle{
    _id?:string;
    tenantId:string; //to isolte multi-tenancy
    plateNumber:string;
    model:string;
    status:VehicleStatus;
    capacity:number;
    createdAt:Date;
    updatedAt:Date;
}

export interface Idriver{
    _id?:string;
    tenantId:string; //to isolte multi-tenancy
    full_name:string;
    licenseNumber:string;
    phone:string;
    email:string;
    isAvailable:boolean;
    location:geoJsonPoint;
    lastLocationUpdate:Date;
   
}

export interface Itrip{
    _id?:string;
    tenantId:string; //to isolte multi-tenancy
    driverId:string;
    vehicleId:string;
    tripCode:string;
    origin:{address:string,location:geoJsonPoint};
    destination:{address:string,location:geoJsonPoint};
    status:TripStatus;
    dispatchedAt:Date;
    deliveredAt:Date;
}

