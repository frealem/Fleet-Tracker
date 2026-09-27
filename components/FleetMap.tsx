'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const vehicleIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export interface DriverMapData {
  _id: string;
  full_name: string;
  phone: string;
  location: {
    coordinates: [number, number];
  };
  assignedTrip?: {
    tripCode: string;
    originAddress: string;
    destinationAddress: string;
  };
}

export interface FleetMapProps {
  drivers: DriverMapData[];
  initialCenter?: [number, number];
}

export default function FleetMap({
  drivers,
  initialCenter = [8.9806, 38.7578],
}: FleetMapProps) {
  return (
    <div className="h-[550] w-full rounded-xl overflow-hidden border border-slate-700 shadow-2xl relative z-0">
      <MapContainer
        center={initialCenter}
        zoom={12}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {drivers.map((driver) => {
          if (!driver.location?.coordinates || driver.location.coordinates.length < 2) {
            return null;
          }

          const lat = driver.location.coordinates[1];
          const lng = driver.location.coordinates[0];

          return (
            <Marker key={driver._id} position={[lat, lng]} icon={vehicleIcon}>
              <Popup>
                <div className="p-1 text-slate-900 space-y-1">
                  <h3 className="font-bold text-sm border-b pb-1">{driver.full_name}</h3>
                  <p className="text-xs text-slate-600">Phone: {driver.phone}</p>

                  {driver.assignedTrip ? (
                    <div className="mt-2 bg-slate-100 p-2 rounded text-xs">
                      <p className="font-semibold text-emerald-700">
                        {driver.assignedTrip.tripCode}
                      </p>
                      <p className="text-slate-700 mt-0.5">
                        {driver.assignedTrip.originAddress} &rarr; {driver.assignedTrip.destinationAddress}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-amber-600 font-semibold mt-1">
                      Idle / Unassigned
                    </p>
                  )}

                  <p className="text-[10px] text-slate-400 mt-1">
                    GPS: {lat.toFixed(4)}, {lng.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}