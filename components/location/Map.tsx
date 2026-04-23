"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet marker icons in Next.js bundler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Hotel Garden coordinates — Santa Coloma, Andorra la Vella
const POSITION: [number, number] = [42.509, 1.5202];

export default function Map() {
  return (
    <MapContainer
      center={POSITION}
      zoom={15}
      style={{ height: "500px", width: "100%" }}
      className="z-0 border border-hg-border"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={POSITION}>
        <Popup>
          <div style={{ fontFamily: "sans-serif", fontSize: "13px", lineHeight: "1.6" }}>
            <strong>Hotel Garden ⭐⭐⭐</strong>
            <br />
            Avinguda d&apos;Enclar 91–93
            <br />
            Santa Coloma, Andorra la Vella
            <br />
            <a href="tel:+376615817" style={{ color: "#C9A84C" }}>
              +376 615 817
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
