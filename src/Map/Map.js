import React from "react";
import { MapContainer, TileLayer, LayersControl} from 'react-leaflet';

import { cities} from '../data/cities';
import { mountains } from "../data/highest_points";
import { continents } from "../data/continents";
import { ContinentsPolygonLayer } from "../layers/ContinentPolygonLayer";

import { MarkerLayer } from "../layers/MarkerLayers";
import { MarkerLayerWithTooltip } from "../layers/MarkerLayerWithTooltip";
import { RadiusFilter } from "../layers/RadiusFilter";
import { FitDataToBoundControl } from "../controls/FitDataToBound";

export const Map = () => {
  const [geoFilter, setGeoFilter] = React.useState(null);
  const [radiusFilter, setRadiusFilter] = React.useState(null);
  const getRadiusFilter = () => radiusFilter;
  const getGeoFilter = () => geoFilter;

  const scrollWheelZoom = true;

  return (
    <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={scrollWheelZoom}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OSM Streets">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <MarkerLayer data={cities} setRadiusFilter={setRadiusFilter} getRadiusFilter={getRadiusFilter}  getGeoFilter={getGeoFilter}/>
        <MarkerLayerWithTooltip data={mountains} />
        <RadiusFilter radiusFilter={radiusFilter} setRadiusFilter={setRadiusFilter}/>
        <ContinentsPolygonLayer data={continents}  setGeoFilter={setGeoFilter} getGeoFilter={getGeoFilter} />
      </LayersControl>
      <FitDataToBoundControl />
    </MapContainer>
  )
}