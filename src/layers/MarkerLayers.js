import { Marker, Popup } from "react-leaflet";
import { defaultIcon } from "../icons/defaultIcon";

export function MarkerLayer({data}) {

  return (
    data.features.map(feature => {
      const { coordinates } = feature.geometry;

      return (
        <Marker position={[coordinates[1], coordinates[0]]} icon={defaultIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )
    })
    
  )
}