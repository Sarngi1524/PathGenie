import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./RouteMap.css";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import { useEffect, useMemo } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
function FitBounds({ polyline }) {
  const map = useMap();

  useEffect(() => {
    if (!polyline.length) return;

    map.fitBounds(polyline, {
      padding: [50, 50],
    });
  }, [map, polyline]);

  return null;
}
export default function RouteMap({ route }) {

  if (!route) return null;

  const pickup = route.pickupCoordinates;

  const delivery = route.deliveryCoordinates;

  const polyline = useMemo(() => {

    if (!route.routeGeometry?.coordinates) return [];

    return route.routeGeometry.coordinates.map(
      ([lng, lat]) => [lat, lng]
    );

  }, [route]);

  const center = pickup
    ? [pickup.lat, pickup.lng]
    : [20.5937, 78.9629];

  return (

    <MapContainer
      center={center}
      zoom={10}
      scrollWheelZoom={true}
      className="route-map"
    >

      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {pickup && (
        <Marker
          position={[pickup.lat, pickup.lng]}
        />
      )}

      {delivery && (
        <Marker
          position={[delivery.lat, delivery.lng]}
        />
      )}

      {polyline.length > 0 && (
        <Polyline
          positions={polyline}
          pathOptions={{
            color: "#818263",
            weight: 5,
          }}
        />
      )}

<FitBounds polyline={polyline} />
    </MapContainer>

  );

}