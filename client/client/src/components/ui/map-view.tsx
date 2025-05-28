import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Monument } from "../../types/monument";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface MapViewProps {
  monuments: Monument[];
  height?: string;
  zoom?: number;
  selectedMonumentId?: number | null;
}

export default function MapView({
  monuments,
  height = "600px",
  zoom = 7,
  selectedMonumentId = null,
}: MapViewProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Fix for Leaflet icon issue in production builds
    // This runs only on the client side after component is mounted
    return () => {
      setIsMounted(false);
    };
  }, []);

  // Custom marker icon
  const customIcon = new Icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const selectedIcon = new Icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [30, 46], // Slightly larger
    iconAnchor: [15, 46],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Find center of Tunisia as default map center
  const tunisiaCenter = { lat: 34.0, lng: 9.0 }; // Approximate center of Tunisia

  // If a monument is selected, center on it
  const mapCenter = selectedMonumentId
    ? monuments.find((m) => m.id === selectedMonumentId)?.coordinates ||
      tunisiaCenter
    : tunisiaCenter;

  if (!isMounted) {
    return (
      <div
        className="bg-gray-100 flex items-center justify-center"
        style={{ height }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terracotta"></div>
      </div>
    );
  }

  return (
    <div style={{ height }} className="rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {monuments.map((monument) => (
          <Marker
            key={monument.id}
            position={[monument.coordinates.lat, monument.coordinates.lng]}
            icon={
              monument.id === selectedMonumentId ? selectedIcon : customIcon
            }
          >
            <Popup>
              <div className="py-2">
                <h3 className="font-bold font-el-messiri text-terracotta text-lg mb-1">
                  {monument.name}
                </h3>
                <p className="text-sm text-dark-brown/70 mb-2">
                  {monument.description.substring(0, 100)}...
                </p>
                <div className="flex items-center text-xs text-dark-brown/60 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{monument.era}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
