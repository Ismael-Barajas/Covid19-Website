import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

class MyMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 38.2,
      lng: -98.07,
      zoom: 2,
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    return (
      <MapContainer
        className="map"
        center={position}
        zoom={this.state.zoom}
        style={{ height: 500, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
      </MapContainer>
    );
  }
}

export default MyMap;
