// Información de los marcadores
// import markersData from "@/pages/api/markers";
import { markers } from "@/pages/api/markers";

// Leaflet
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";

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
  const [markersData, setMarkersData] = useState(markers.markers);
  const [markersFiltered, setMarkersFiltered] = useState(markers.markers);
  const [newRating, setNewRating] = useState(0);

  const updateMarkerRating = (markerId, numStars) => {
    fetch("/api/markers", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: markerId,
        numStars: numStars,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualizar los datos del marcador en el componente si es necesario
        // Si la respuesta enviada fue exitosa, se actualiza el estado
        if (data.success) {
          setMarkersData((prevState) => {
            const newState = prevState.map((marker) => {
              if (marker.id === markerId) {
                marker.estrellas.push(numStars);
              }
              return marker;
            });
            return newState;
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleRating = (id) => {
    // Actualizar el rating del marcador
    updateMarkerRating(id, newRating);
    // Resetear el rating
    setNewRating(0);
  };

  // Si cambia el filtro, se actualiza el mapa
  useEffect(() => {
    // Aplicamos filtro de 'tipo', 'hora' y 'estrellas'
    let filtered = markersData.filter((marker) => {
      // FILTRO: TIPO
      if (filtro.tipo !== "todos" && marker.tipo !== filtro.tipo) {
        return false;
      }

      // FILTRO: HORA

      // FILTRO: ESTRELLAS
      if (filtro.estrellas > 0) {
        if (marker.estrellas.length === 0) {
          return false;
        }
        const promedioEstrellas =
          marker.estrellas.reduce((a, b) => a + b, 0) / marker.estrellas.length;
        if (promedioEstrellas < filtro.estrellas) {
          return false;
        }
      }

      return true;
    });
    setMarkersFiltered(filtered);
  }, [filtro]);

  return (
    <div className="map__box">
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

        {markersFiltered.map((marker) => (
          //  Todo esto podria ser un nuevo componente "Marcador"
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={myIcon}
          >
            <Popup>
              <h3>{marker.title}</h3>
              <p>{marker.tipo}</p>
              <ul>
                {marker.hora.map((hora) => (
                  <li key={hora}>{hora}</li>
                ))}
              </ul>

              <p>
                Valoración:{" "}
                {marker.estrellas.length === 0 ? (
                  <span>Sin valoraciones</span>
                ) : (
                  (
                    marker.estrellas.reduce((a, b) => a + b, 0) /
                    marker.estrellas.length
                  ).toFixed(1)
                )}
              </p>
              <div>
                <p>
                  Deja una valoración:
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setNewRating(star)}
                      style={{
                        color: star <= newRating ? "#ffc107" : "#e4e5e9",
                        cursor: "pointer",
                      }}
                    >
                      &#9733;
                    </span>
                  ))}
                </p>
                <button onClick={() => handleRating(marker.id)}>Enviar</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
