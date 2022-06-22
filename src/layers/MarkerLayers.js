import L from 'leaflet';
import { React, useState } from "react";
import { Button, Card, InputNumber, Space } from "antd";
import { Marker, Popup } from "react-leaflet";
import { defaultIcon } from "../icons/defaultIcon";
import { FilterOutlined } from "@ant-design/icons";
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';

const DEFAULT_RADIUS = 3000;

function PopupStatistics({feature, setRadiusFilter}) {
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const name = feature.properties.NAME;
  const adm0name = feature.properties.ADM0NAME;
  const pop_max = feature.properties.POP_MAX;  

  return (
    <>
      <Card type="inner" title="Name" style={{marginTop: 16}}>
        <strong>{`${name}, ${adm0name}`}</strong>
      </Card>
      <Card type="inner" title="Population" style={{marginTop: 16}}>
         <strong>{`${pop_max}`}</strong>
      </Card>
      <Card type="inner" title="Radius filter" style={{marginTop: 16}}>
        <Space>
          <InputNumber 
            defaultValue={DEFAULT_RADIUS}
             min={0}
            onChange={(e) => setRadius(e)}>

          </InputNumber>
          <Button 
            type="primary" 
            shape="round" 
            onClick={() => setRadiusFilter((prevState) => {
              let newFilter;

              if (prevState) {
                if (radius === 0) {
                  return prevState;
                }
                
                const sameFeature = prevState.feature === feature;
                const sameRadius = prevState.radius === radius;
                if (!sameFeature || !sameRadius) {
                  newFilter = { feature, radius };
                }
               
              } else if (radius !== 0) {
                newFilter = { feature, radius };
              }
              
              return newFilter

            })}
            icon={<FilterOutlined  />}>Filter by km</Button>
        </Space>
      </Card>
    </>
  )
}

export function MarkerLayer({data, setRadiusFilter, getRadiusFilter, getGeoFilter}) {
  const geoFilter = getGeoFilter();
  const radiusFilter = getRadiusFilter();

  let centerPoint;

  if (radiusFilter) {
    const {coordinates} = radiusFilter.feature.geometry;
    centerPoint = L.latLng(coordinates[1], coordinates[0]);
  }


  return (
    data.features
      .filter(currentFeature => {
        let filterByRadius;
        let filterByGeo;


        if (centerPoint) {
          const { coordinates } = currentFeature.geometry;
          const currentPoint = L.latLng(coordinates[1], coordinates[0]);
            filterByRadius = centerPoint.distanceTo(currentPoint) / 1000 < radiusFilter.radius;
        }

        if (geoFilter) {
          filterByGeo = booleanPointInPolygon(currentFeature, geoFilter)
        }

        if (geoFilter && radiusFilter) {
          return filterByGeo && filterByRadius;
        }

        if (geoFilter) {
          return filterByGeo;
        }

        if (radiusFilter) {
          return filterByRadius;
        }

        return true;
      })
      .map(feature => {
        const { coordinates } = feature.geometry;

        return (
          <Marker key={String(coordinates)} position={[coordinates[1], coordinates[0]]} icon={defaultIcon}>
            <Popup>
              <PopupStatistics feature={feature} setRadiusFilter={setRadiusFilter}/>
            </Popup>
          </Marker>
        )
      })
    
  )
}