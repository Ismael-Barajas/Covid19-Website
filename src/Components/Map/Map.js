import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

class MyMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 1.35,
      lng: 103.8,
      zoom: 13,
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
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    );
  }
}

export default MyMap;
