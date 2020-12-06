import React from "react";
import { Cards, Chart, CountryPicker, MyMap, Footer, RegionChart } from "./Components";
import styles from "./App.module.css";
import { fetchData, fetchCountryTimeline } from "./api";
//import coronaImage from "./images/image.png";

class App extends React.Component {
  state = {
    data: {},
    timeline: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    const fetchedTimeline = await fetchCountryTimeline(country);
    this.setState({ data: fetchedData, timeline: fetchedTimeline, country: country });
  };

  render() {
    const { data, country, timeline } = this.state;
    return (
      <div className={styles.container}>
        {/* <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <br />
          <b>Global and Country Wise Cases of Corona Virus</b>
        <br />
          <i>(For a particular graph select a Country from below)</i>
        <br />
        <br /> */}
        <Cards data={data} country={country} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} timeline={timeline}/>
        <MyMap />
        <iframe title="Continent filter" src="https://public.domo.com/cards/dPn4z" className={styles.domo1}></iframe>
        <iframe title="Key Metrics" src="https://public.domo.com/cards/aOm4g" className={styles.domo1}></iframe>
        <iframe title="COVID19 Details" src="https://public.domo.com/cards/dJ45D" className={styles.domo1}></iframe>  
        <Footer />
      </div>
    );

}}

export default App;
