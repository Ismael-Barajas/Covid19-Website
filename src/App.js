import React from "react";
import { Cards, Chart, CountryPicker, MyMap } from "./Components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/image.png";

import axios from 'axios'
import L from 'leaflet';

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };
  

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;
    const LOCATION = {
      lat: 0,
      lng: 0,
    };
    const CENTER = [LOCATION.lat, LOCATION.lng];
    const DEFAULT_ZOOM = 2;

    async function mapEffect({ leafletElement: map } = {}) {
      let response;
  
      try {
        response = await axios.get('https://corona.lmao.ninja/v2/countries');
      } catch(e) {
        console.log(`Failed to fetch countries: ${e.message}`, e);
        return;
      }
  
      const { data = [] } = response;
      // console.log(data);

      const hasData = Array.isArray(data) && data.length > 0;

      if ( !hasData ) return;

      const geoJson = {
        type: 'FeatureCollection',
        features: data.map((country = {}) => {
          const { countryInfo = {} } = country;
          const { lat, long: lng } = countryInfo;
          return {
            type: 'Feature',
            properties: {
              ...country,
            },
            geometry: {
              type: 'Point',
              coordinates: [ lng, lat ]
            }
          }
        })
      }

      console.log(geoJson);
      
const geoJsonLayers = new L.GeoJSON(geoJson, {
  pointToLayer: (feature = {}, latlng) => {
    const { properties = {} } = feature;
    let updatedFormatted;
    let casesString;

    const {
      country,
      updated,
      cases,
      deaths,
      recovered
    } = properties

    casesString = `${cases}`;

    if ( cases > 1000 ) {
      casesString = `${casesString.slice(0, -3)}k+`
    }

    if ( updated ) {
      updatedFormatted = new Date(updated).toLocaleString();
    }

    const html = `
      <span class="icon-marker">
        <span class="icon-marker-tooltip">
          <h2>${country}</h2>
          <ul>
            <li><strong>Confirmed:</strong> ${cases}</li>
            <li><strong>Deaths:</strong> ${deaths}</li>
            <li><strong>Recovered:</strong> ${recovered}</li>
            <li><strong>Last Update:</strong> ${updatedFormatted}</li>
          </ul>
        </span>
        ${ casesString }
      </span>
    `;

    return L.marker( latlng, {
      icon: L.divIcon({
        className: 'icon',
        html
      }),
      riseOnHover: true
    });
  }
});
geoJsonLayers.addTo(map)
console.log(geoJson);
    };

    const mapSettings = {
      center: CENTER,
      defaultBaseMap: 'OpenStreetMap',
      zoom: DEFAULT_ZOOM,
      mapEffect,
    };

    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <br />
        <text>
          <b>Global and Country Wise Cases of Corona Virus</b>
        </text>
        <br />
        <text>
          <i>(For a particular select a Country from below)</i>
        </text>
        <br />
        <br />
        <Cards data={data} country={country} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
        <MyMap {...mapSettings}></MyMap>
      </div>
    );
  }
}

export default App;
