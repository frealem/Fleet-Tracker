import {z} from "zod";

const geoCoordinatesSchema=z.tuple([
    z.number().min(-180,'longitude must be >= -180').max(180,'longitude must be <=180 '),
    z.number().min(-90 , 'latitude must be >= -90').max(90,'latitude must be <=90')
])

export const createTripSchema=z.object({
    tenantId:z.string().min(1,'Tenant Id is required'),
    vehicleId:z.string().min(1,'Vehicle Id is required'),
    driverId:z.string().min(1,'driver Id is required'),
    originAddress:z.string().min(3,'driver Id is required'),
    originCoordinates:geoCoordinatesSchema,
    destinationAddress:z.string().min(3,'destinationAddress is required'),
    destinationCoordinates:geoCoordinatesSchema
})

export type CreateTripInput=z.infer<typeof createTripSchema>;