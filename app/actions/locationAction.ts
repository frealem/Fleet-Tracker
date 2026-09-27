'use server'

import { connectToDatabase } from "@/lib/db"
import { Driver } from "@/app/models/driver"
import { revalidatePath } from "next/cache"
import { success } from "zod";


export async function simulateDriverMovement(driverId: string) {
  await connectToDatabase();

  const driver = await Driver.findById(driverId);
  if (!driver) {
    return { success: false, error: 'Driver not found' };
  }

  const currentLng = driver.location.coordinates[0];
  const currentLat = driver.location.coordinates[1];

  // Generate small random movement (~100-300 meters)
  const deltaLng = (Math.random() - 0.2) * 0.005; 
  const deltaLat = (Math.random() - 0.2) * 0.005;

  const newCoordinates = [currentLng + deltaLng, currentLat + deltaLat];

  await Driver.findByIdAndUpdate(driverId, {
    'location.coordinates': newCoordinates,
    lastLocationUpdate: new Date(),
  });

  revalidatePath('/tracking');

  return {
    success: true,
    newCoordinates,
  };
}

// Wrapper action to bind driverId safely for forms
export async function triggerPingAction(formData: FormData) {
  const driverId = formData.get('driverId') as string;
  if (driverId) {
    await simulateDriverMovement(driverId);
  }
}