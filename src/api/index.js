import axios from "axios";
//Country Picker Api
const url = "https://covid19.mathdro.id/api";
//Countries Api
const url2 = "https://corona.lmao.ninja/v3/covid-19/countries";
//Counties Api
const url3 = "https://corona.lmao.ninja/v3/covid-19/jhucsse/counties";
//Historical Api
const url4 = "https://disease.sh/v3/covid-19/historical";
//Vaccine Api
const url5 = "https://disease.sh/v3/covid-19/vaccine";

export const fetchVaccineData = async () => {
  let response;
  try {
    response = await axios.get(url5);
  } catch (error) {
    console.log(error);
  }
  const { data: { source, data } } = response;
  const hasData = Array.isArray(data) && data.length > 0;
  if (!hasData) return;
  return {
    source,
    data,
  };
}

export const fetchCountryTimeline = async (country) => {
  console.log(country);
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url4}/${country}/?lastdays=all`;
    try {
      const {
        data: { country_get, province, timeline: {cases, deaths, recovered} },
      } = await axios.get(changeableUrl);
      return {
        cases,
        recovered,
        deaths,
      };
    } catch (err) {
      console.log(err);
    }
  }
  return {};
};


export const fetchData = async (country) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (err) {
    console.log(err);
  }
};


export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (err) {}
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (err) {
    console.log(err);
  }
};

export const api2FetchCountries = async () => {
  let response;
  try {
    response = await axios.get(url2);
  } catch (error) {
    console.log(`Failed to fetch countries: ${error.message}`, error);
    return;
  }
  const { data } = response;
  const hasData = Array.isArray(data) && data.length > 0;
  if (!hasData) return;
  return data;
};


export const api2FetchStateData = async () => {
  let response;
  try {
    response = await axios.get(url3);
  } catch (error) {
    console.log(`Failed to fetch countries: ${error.message}`, error);
    return;
  }
  const { data } = response;
  const hasData = Array.isArray(data) && data.length > 0;
  if (!hasData) return;
  return data;
};
