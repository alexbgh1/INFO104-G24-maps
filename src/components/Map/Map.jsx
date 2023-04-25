// Información de los marcadores
import markersData from "@/pages/api/markers.json";

// Leaflet
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Iconos de marcadores personalizados

// Creamos un nuevo icono de marcador personalizado
const myIcon = L.icon({
  iconUrl: "/marker_custom.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -36],
});

export default function Map({ filtro }) {
  const position_valdivia = [-39.8192, -73.2389];
  console.log(filtro);
  return (
    <MapContainer
      className="map"
      center={position_valdivia}
      zoom={14}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markersData.markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.lat, marker.lng]}
          icon={myIcon}
        >
          <Popup>{marker.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
