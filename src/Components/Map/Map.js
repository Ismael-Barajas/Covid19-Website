import React from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { api2FetchCountries, api2FetchStateData } from "../../api";
import L from "leaflet";

class MyMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 0,
      lng: 0,
      zoom: 2,
      data: [],
      counties: [],
    };
  }

  async componentDidMount() {
    const fetchedData = await api2FetchCountries();
    const fetchedCounties = await api2FetchStateData();
    this.setState({ data: fetchedData, counties: fetchedCounties });
  }

  // markerData() {
  //   const html = `
  //   <span class="icon-marker">
  //   <span class="icon-marker-tooltip">
  //     <h2>test</h2>
  //     <ul>
  //       <li><strong>Confirmed:</strong>test </li>
  //       <li><strong>Deaths:</strong>test </li>
  //       <li><strong>Recovered:</strong> test</li>
  //       <li><strong>Last Update:</strong> test</li>
  //     </ul>
  //   </span>
  //   test
  //   </span>
  //   `;

  //   const customIcon = new L.divIcon({
  //     className: "icon",
  //     html,
  //   });
  //   return customIcon;
  // }

  render() {
    const position = [this.state.lat, this.state.lng];

    const customIcon = new L.divIcon({
      className: "icon",
    });

    return (
      <MapContainer
        className="map"
        center={position}
        zoom={this.state.zoom}
        style={{ height: 1000, width: "56%" }}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        minZoom={this.state.zoom}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          noWrap="true"
        />
        {this.state.data.map((countries, index) => (
          <Marker
            key={index}
            position={[countries.countryInfo.lat, countries.countryInfo.long]}
            icon={customIcon}
          >
            {/* <Popup className="popupme">
              <div>
                <h2>
                  {countries.country}
                  <img
                    src={countries.countryInfo.flag}
                    alt={countries.country}
                    className="flag-popup"
                  />
                </h2>
                <ul>
                  <li>
                    <strong>Confirmed:</strong> {countries.cases}
                  </li>
                  <li>
                    <strong>Deaths:</strong> {countries.deaths}
                  </li>
                  <li>
                    <strong>Recovered:</strong> {countries.recovered}
                  </li>
                  <li>
                    <strong>Last Update:</strong>{" "}
                    {new Date(countries.updated).toLocaleString()}
                  </li>
                </ul>
              </div>
            </Popup> */}
            <Tooltip className="toolTip">
              <div>
                <h2 className="h2mem">
                  {countries.country}
                  <img
                    src={countries.countryInfo.flag}
                    alt={countries.country}
                    className="flag-popup"
                  />
                </h2>
                <ul>
                  <li>
                    <strong>Confirmed:</strong> {countries.cases}
                  </li>
                  <li>
                    <strong>Deaths:</strong> {countries.deaths}
                  </li>
                  <li>
                    <strong>Recovered:</strong> {countries.recovered}
                  </li>
                  <li>
                    <strong>Last Update:</strong>{" "}
                    {new Date(countries.updated).toLocaleString()}
                  </li>
                </ul>
              </div>
            </Tooltip>
          </Marker>
        ))}

        {/* {this.state.counties.map((counties, index) =>(
          <Marker
          key={index} position={[counties.coordinates.latitude, counties.coordinates.longitude]} icon={customIcon}
          >
          </Marker>
          ))} */}
      </MapContainer>
    );
  }
}

export default MyMap;
