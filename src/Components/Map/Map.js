import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { api2FetchCountries } from "../../api";
import { customIcon } from "./customIcon";


class MyMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 0,
      lng: 0,
      zoom: 2,
      data: [],
    };
  }

  async componentDidMount() {
    const fetchedData = await api2FetchCountries();
    this.setState({data: fetchedData});
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <MapContainer
        className="map"
        center={position}
        zoom={this.state.zoom}
        style={{ height: 1000, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

        {this.state.data.map((countries) => (
          <Marker
            key={countries.countryInfo._id}
            position={[countries.countryInfo.lat, countries.countryInfo.long]}
            icon={customIcon}
          ></Marker>
        ))}
      </MapContainer>
    );
  }
}

export default MyMap;
