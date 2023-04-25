import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapComponent({ filtro }) {
  return <Map filtro={filtro} />;
}
