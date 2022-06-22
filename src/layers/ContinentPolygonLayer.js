import { GeoJSON } from "react-leaflet";

export function ContinentsPolygonLayer({data, setGeoFilter, getGeoFilter}) {
  const geoFilter = getGeoFilter();

  return <GeoJSON key="geo-json-layer" data={data}
    eventHandlers={{
      click: (e) => {
        setGeoFilter((prevState) => {
          const same = prevState === e.propagatedFrom.feature;
          return same ? null : e.propagatedFrom.feature;
        })
      }
    }}
  ></GeoJSON>
}