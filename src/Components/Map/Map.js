import React from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { api2FetchCountries, api2FetchStateData } from "../../api";
import L from "leaflet";
import coronaIMG from "../../images/coronavirusSmall.png";
import covidIMG from "../../images/covidCounties.svg";
import MarkerClusterGroup from 'react-leaflet-markercluster';

const covidCountries = new L.Icon({
  iconUrl: coronaIMG,
  iconSize: [30, 30],
});

const covidCounties = new L.Icon({
  iconUrl: covidIMG,
  iconSize: [20, 20],
});

class MyMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 0,
      lng: 0,
      zoom: 3,
      data: [],
      counties: [],
    };
  }

  async componentDidMount() {
    const fetchedData = await api2FetchCountries();
    const fetchedCounties = await api2FetchStateData();
    this.setState({ data: fetchedData, counties: fetchedCounties });
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    return (
      <MapContainer
        className="map"
        center={position}
        zoom={this.state.zoom}
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
        <MarkerClusterGroup>
        {this.state.data.map((countries, index) => (
          <Marker
            key={index}
            position={[countries.countryInfo.lat, countries.countryInfo.long]}
            icon={covidCountries}
          >
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

        {this.state.counties.map((counties, index) =>(
          <Marker
          key={index} position={[counties.coordinates.latitude, counties.coordinates.longitude]} icon={covidCounties}
          >
            <Tooltip className="toolTip">
              <div>
                <h2 className="h2mem">
                  {counties.county}
                </h2>
                <ul>
                  <li>
                    <strong>Confirmed:</strong> {counties.stats.confirmed}
                  </li>
                  <li>
                    <strong>Deaths:</strong> {counties.stats.deaths}
                  </li>
                  <li>
                    <strong>Recovered:</strong> {counties.stats.recovered}
                  </li>
                  <li>
                    <strong>Last Update:</strong>{counties.updatedAt}
                  </li>
                </ul>
              </div>
            </Tooltip>
          </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    );
  }
}

export default MyMap;
