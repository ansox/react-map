import { GeoJSON } from "react-leaflet";

export function ContinentsPolygonLayer({data}) {
  return <GeoJSON key="geo-json-layer" data={data}></GeoJSON>
}