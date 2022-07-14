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
import { ShowActiveFiltersControl } from "../controls/ShowActiveFilters";
import { MarkerLayerWithTooltipCluster } from "../layers/MarkerLayerWithTooltipCluster";

export const Map = () => {
  const [geoFilter, setGeoFilter] = React.useState(null);
  const [radiusFilter, setRadiusFilter] = React.useState(null);
  const getRadiusFilter = () => radiusFilter;
  const getGeoFilter = () => geoFilter;
  const [asyncCities, setAsyncCities] = React.useState({features: []})

  const scrollWheelZoom = true;

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_populated_places_simple.geojson')
      const cities = await response.json();

      setAsyncCities(cities);
    }
    fetchData().catch(console.error);
  }, []);

  return (
    <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={scrollWheelZoom}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OSM Streets">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>


        <LayersControl.BaseLayer name="ESRI World Imagery">
          <TileLayer
           url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
           attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          />
        </LayersControl.BaseLayer>

        <MarkerLayer data={asyncCities} setRadiusFilter={setRadiusFilter} getRadiusFilter={getRadiusFilter}  getGeoFilter={getGeoFilter}/>
        <MarkerLayerWithTooltip data={mountains} />
        {/* <MarkerLayerWithTooltipCluster data={cities}/> */}
        <RadiusFilter radiusFilter={radiusFilter} setRadiusFilter={setRadiusFilter}/>
        <ContinentsPolygonLayer data={continents}  setGeoFilter={setGeoFilter} getGeoFilter={getGeoFilter} />
      </LayersControl>
      <FitDataToBoundControl />
      <ShowActiveFiltersControl getFilters={() => ({geoFilter, radiusFilter})}/>
    </MapContainer>
  )
}