export const markers = {
  markers: [
    {
      id: "1",
      title: "Carrito Azul",
      lat: "-39.82905753914309",
      lng: "-73.25060917770293",
      tipo: "comida rapida",
      hora: ["12:00", "16:00"],
      estrellas: [1, 1, 3, 3, 5],
    },
    {
      id: "2",
      title: "Mall",
      lat: "-39.816227653484844",
      lng: "-73.24234433812194",
      tipo: "completos",
      hora: ["7:00", "18:00"],
      estrellas: [],
    },
  ],
};

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(markers);
  } else if (req.method === "PUT") {
    const markerId = req.body.id;
    const numStars = req.body.numStars;

    const markerIndex = markers.markers.findIndex((m) => m.id === markerId);
    if (markerIndex === -1) {
      res.status(404).json({ success: false, message: "Marker not found" });
    } else {
      markers.markers[markerIndex].estrellas.push(numStars);
      res
        .status(200)
        .json({ success: true, message: "Stars added successfully!" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
