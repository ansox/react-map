import React from "react";
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

import { cities} from '../data/cities';
import { MarkerLayer } from "../layers/MarkerLayers";

export const Map = () => {
  const scrollWheelZoom = true;

  return (
    <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={scrollWheelZoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerLayer data={cities} />
    </MapContainer>
  )
}