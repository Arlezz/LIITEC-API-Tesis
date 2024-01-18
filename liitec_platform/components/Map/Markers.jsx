import { Marker, Popup } from "react-leaflet";
import { IconLocation } from "./IconLocation";

export default function Markers({ channels }) {
  return (
    <>
      {channels.map((channel, index) => (
        <Marker
          key={index}
          position={[channel.ubication.latitude, channel.ubication.longitude]}
          icon={IconLocation}
        >
          <Popup>
            <div className="flex flex-col p-0">
              <span className="text-md md:text-xl text-gray-700 font-bold">
                {channel.name}
              </span>
              <span className="text-sm text-gray-700 font-medium">
                <span className="font-bold text-stone-900">Lat:</span>{" "}
                {channel.ubication.latitude}
              </span>
              <span className="text-sm text-gray-700 font-medium">
                <span className="font-bold text-stone-900">Lng:</span>{" "}
                {channel.ubication.longitude}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
