import React from "react";
import { MapContainer, TileLayer} from 'react-leaflet';

import { cities} from '../data/cities';
import { mountains } from "../data/highest_points";

import { MarkerLayer } from "../layers/MarkerLayers";
import { MarkerLayerWithTooltip } from "../layers/MarkerLayerWithTooltip";

export const Map = () => {
  const scrollWheelZoom = true;

  return (
    <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={scrollWheelZoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerLayer data={cities} />
      <MarkerLayerWithTooltip data={mountains} />
    </MapContainer>
  )
}