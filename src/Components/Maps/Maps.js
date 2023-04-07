import React, { useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  Polyline,
} from "react-leaflet";
import info from "../../Info-provider";
import "leaflet/dist/leaflet.css";///for the mapcontainer css
import L from "leaflet";
import Cities from "../../Cities.json";
import useGeoLocation from "../../Hooks/useGeoLocation";
import { toast } from "react-hot-toast";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";//for draw css
import "./Maps.css";

//this is for marker show when i click the website loction icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

//this is for custome icon
const markerIcon = new L.icon({
  iconUrl: require("./red.png"),
  iconSize: [35, 45],
  iconAnchor: [35, 40],
  popupAnchor: [-16, -10],
});

const Maps = () => {
  //this is center position that map wiil show me when reload the page
  const [center, setCenter] = useState({
    lat: 23.7460554242028,
    lng: 90.42835210007698,
  });
  //For marking ployline into one location to other
  const [spot, setSpot] = useState({
    start: [23.74590703602926, 90.42691007637391],
    end: [23.74930285434884, 90.4208935151174],
  });
  //for zoom level
  const zoom_Level = 16;
  const mapRef = useRef();
  //this is location for show my live location and location place name
  const [location, placeName] = useGeoLocation();
  //this is funcation will locate my live location when i click a button
  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        zoom_Level,
        { animate: true }
      );
    } else {
      toast.error(location.error.message);
    }
  };
  //this function will show the cordinate when i create shape
  const _created = (e) => console.log(e);
  return (
    <section>
      <MapContainer
        center={center}
        zoom={zoom_Level}
        ref={mapRef}
        scrollWheelZoom={true}
      >
        {/* For draw shape purpose  */}
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_created}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
            }}
          ></EditControl>
        </FeatureGroup>
        <TileLayer
          url={info.maptiler.url}
          attribution={info.maptiler.attribution}
        ></TileLayer>

         {/* ployline for show marking in one location to other */}  

        <Polyline positions={[spot.start, spot.end]} color="red"  />
        <Marker position={spot.start}>
          <Popup>Start</Popup>
        </Marker>
        <Marker position={spot.end}>
          <Popup>End</Popup>
        </Marker>
        {/* showing the user live location and placeName */}

        {location.loaded && !location.error && (
          <Marker
            icon={markerIcon}
            position={[location.coordinates.lat, location.coordinates.lng]}
          >
            <Popup>{placeName}</Popup>
          </Marker>
        )}

        {/* marking in map according to citywise */}
        {Cities.map((city) => (
          <Marker
            position={[city.lat, city.long]}
            key={city.id}
            icon={markerIcon}
          >
            <Popup>
              <b>
                {city.name}, {city.country}
              </b>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="row my-4">
        <div className="col d-flex justify-content-center">
          <button className="btn btn-success" onClick={showMyLocation}>
            Locate Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default Maps;

// eslint-disable-next-line no-lone-blocks
{
  /* <Marker position={center} icon={markerIcon}>
        <Popup>
          <b>Tilpara</b>
        </Popup>
      </Marker> */
}
