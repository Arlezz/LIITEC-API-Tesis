"use client";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import "leaflet/dist/leaflet.css";
import "@maptiler/leaflet-maptilersdk";

export default function Map() {
  return (
    <MapContainer className={"h-full w-full"} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/satellite/{z}/{x}/{y}@2x.jpg?key=LWALhtVolPMudnxVhvjp"
      />
    </MapContainer>
  );
}
