import axios from "axios";

const url = "https://covid19.mathdro.id/api";
const url2 = "https://corona.lmao.ninja/v3/covid-19/countries";
const url3 = "https://corona.lmao.ninja/v3/covid-19/jhucsse/counties";

// //fetcher for map countries
// const fetcheries = url => axios.get(url2).then(res => res.data);
// //fetcher for map counties
// const fetcherties = url => axios.get(url3).then(res => res.data);


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

//axios version
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

//axios version
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

// //swr version
// export const api2FetchCountries = async () => {
//   let response;
//   try {
//     response = await axios.get(url2);
//   } catch (error) {
//     console.log(`Failed to fetch countries: ${error.message}`, error);
//     return;
//   }
//   const { data } = response;
//   const hasData = Array.isArray(data) && data.length > 0;
//   if (!hasData) return;
//   return data;
// };

// //swr version
// export const api2FetchStateData = async () => {
//   let response;
//   try {
//     response = await axios.get(url3);
//   } catch (error) {
//     console.log(`Failed to fetch countries: ${error.message}`, error);
//     return;
//   }
//   const { data } = response;
//   const hasData = Array.isArray(data) && data.length > 0;
//   if (!hasData) return;
//   return data;
// };