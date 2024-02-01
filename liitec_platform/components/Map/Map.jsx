"use client"

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import Markers from './Markers';

import "leaflet/dist/leaflet.css";

export default function Map({ channels }) {


  // Obtener las latitudes y longitudes
  const canalesConUbicacion = channels.filter(channel => 
    channel.ubication &&
    channel.ubication.latitude !== null &&
    channel.ubication.longitude !== null
  );
  
  
  // Obtener las latitudes y longitudes
  const latitudes = canalesConUbicacion.map(channel => channel.ubication.latitude);
  const longitudes = canalesConUbicacion.map(channel => channel.ubication.longitude);
  
  // Calcular el punto medio
  var medioLatitud = -29.914810;
  var medioLongitud = -71.241930;
  

  if (latitudes.length > 0 && longitudes.length > 0) {
    // Calcular el punto medio si hay canales con "ubication"
    medioLatitud = latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
    medioLongitud = longitudes.reduce((sum, lon) => sum + lon, 0) / longitudes.length;
  }

  return (
    <MapContainer className={"h-full w-full"} center={[medioLatitud, medioLongitud]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/satellite/{z}/{x}/{y}@2x.jpg?key=LWALhtVolPMudnxVhvjp"
      />
      <Markers channels={canalesConUbicacion}/>
    </MapContainer>
  );
}
