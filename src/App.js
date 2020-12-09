import React from "react";
import {
  Cards,
  Chart,
  CountryPicker,
  MyMap,
  Footer,
  RegionChart,
  NavBar,
  Vaccine,
} from "./Components";
import styles from "./App.module.css";
import { fetchData, fetchCountryTimeline } from "./api";
import Grid from "@material-ui/core/Grid";
import { NavLink, Switch, Route, BrowserRouter } from "react-router-dom";

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
    this.setState({
      data: fetchedData,
      timeline: fetchedTimeline,
      country: country,
    });
  };

  render() {
    const { data, country, timeline } = this.state;
    return (
      <BrowserRouter>
        <NavBar />
        <Switch>

          <Route exact path="/">
            <div>
              <div className={styles.container}>
                <Grid container>
                  <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                    <MyMap />
                  </Grid>
                  <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    <div className={styles.picker}>
                      <CountryPicker
                        handleCountryChange={this.handleCountryChange}
                      />
                    </div>
                    <div className={styles.cards}>
                      <Cards data={data} country={country} />
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className={styles.charts}>
                <Chart data={data} country={country} timeline={timeline} />
              </div>
            </div>
          </Route>

          <Route exact path="/graphs">
            <iframe
              title="Continent filter"
              src="https://public.domo.com/cards/dPn4z"
              className={styles.domo1}
            ></iframe>
            <iframe
              title="Key Metrics"
              src="https://public.domo.com/cards/aOm4g"
              className={styles.domo1}
            ></iframe>
            <iframe
              title="COVID19 Details"
              src="https://public.domo.com/cards/dJ45D"
              className={styles.domo1}
            ></iframe>
          </Route>
          
          <Route exact path="/about">
            <Footer />
          </Route>

          <Route exact path="/vaccine">
            <Vaccine />
          </Route>
          
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
