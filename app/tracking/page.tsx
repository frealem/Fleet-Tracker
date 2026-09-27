import { connectToDatabase } from '@/lib/db';
import { Tenant } from '@/app/models/tenant';
import { Driver } from '@/app/models/driver';
import { Trip } from '@/app/models/trip';
import { triggerPingAction } from '../actions/locationAction';
import { DriverMapData } from '@/components/FleetMap';
import MapWrapper from '@/components/MapWrapper';

export const revalidate = 0;

export default async function TrackingPage() {
  await connectToDatabase();

  let tenant = await Tenant.findOne({ slug: 'logiexpress' }).lean();
  if (!tenant) {
    tenant = await Tenant.findOne({}).lean();
  }

  if (!tenant) {
    return (
      <div className="p-8 text-center text-rose-500 font-semibold">
        No Tenant found. Please visit <code className="p-2 font-bold">/api/seed</code> to populate test data.
      </div>
    );
  }

  const activeDrivers = await Driver.find({ tenantId: tenant._id }).lean();
  const activeTrips = await Trip.find({
    tenantId: tenant._id,
    status: 'DISPATCHED',
  }).lean();

  const mappedDrivers: DriverMapData[] = activeDrivers.map((driver: any) => {
    const driverIdStr = driver._id.toString();

    const matchingTrip = activeTrips.find((trip: any) => {
      if (!trip.driverId) return false;
      const tripDriverId =
        typeof trip.driverId === 'object' && trip.driverId._id
          ? trip.driverId._id.toString()
          : trip.driverId.toString();
      return tripDriverId === driverIdStr;
    });

    const coords: [number, number] = [
      Array.isArray(driver.location?.coordinates) ? driver.location.coordinates[0] : 38.7578,
      Array.isArray(driver.location?.coordinates) ? driver.location.coordinates[1] : 8.9806,
    ];

    return {
      _id: driverIdStr,
      full_name: driver.full_name || driver.full_name || 'Unknown Driver',
      phone: driver.phone || 'N/A',
      location: {
        coordinates: coords,
      },
      assignedTrip: matchingTrip
        ? {
            tripCode: matchingTrip.tripCode || `Trip-${matchingTrip._id.toString().slice(-4)}`,
            originAddress: matchingTrip.origin?.address || 'Origin',
            destinationAddress: matchingTrip.destination?.address || 'Destination',
          }
        : undefined,
    };
  });

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="border-b border-slate-800 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">FleetPulse Live Tracking</h1>
            <p className="text-sm text-slate-400">
              Tenant: {tenant.name} &bull; Active Vehicles on Map
            </p>
          </div>
          <a
            href="/dispatch"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2 rounded transition"
          >
            &larr; Go to Dispatch Dashboard
          </a>
        </header>

        {/* Render Map through Client Wrapper */}
        <MapWrapper drivers={mappedDrivers} />

        <section className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
          <h2 className="text-lg font-semibold text-emerald-400 mb-3">
            Simulate Driver GPS Pings (Location Updates)
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Clicking a driver button simulates an incoming GPS update from their mobile device.
          </p>

          <div className="flex flex-wrap gap-3">
            {mappedDrivers.map((driver) => (
              <form key={driver._id} action={triggerPingAction}>
                <input type="hidden" name="driverId" value={driver._id} />
                <button
                  type="submit"
                  className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs px-3 py-2 rounded border border-slate-600 flex items-center gap-2 transition"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Ping GPS: {driver.full_name}
                </button>
              </form>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}