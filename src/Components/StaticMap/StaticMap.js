import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; ///for the mapcontainer css
import L from "leaflet";
import "./StaticMap.css";

const StaticMap = () => {
  //this is center position that map wiil show me when reload the page
  const [center, setCenter] = useState({
    lat: 23.7460554242028,
    lng: 90.42835210007698,
  });
  const zoom_Level =16;
  const interactionOptions={
       zoomControl:false,
       doubleClickZoom:false,
       closePopupOnclick:false,
       dragging:false,
       zoomSnap:false,
       trackResize:false,
       touchZoom:false,
       scrollWheelZoom:false

  }
  return (
    <section>
      <MapContainer className="static-map-container" center={center} zoom={zoom_Level} {...interactionOptions}>
         <TileLayer
          url="https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}@2x.jpg?key=C2LoN2d3iyxe58BshWvD"
          accessToken="https://api.maptiler.com/maps/openstreetmap/256/tiles.json?key=C2LoN2d3iyxe58BshWvD"
         ></TileLayer>
         <Marker position={center}>
          <Popup>Start</Popup>
        </Marker>
      </MapContainer>
    </section>
  );
};

export default StaticMap;
