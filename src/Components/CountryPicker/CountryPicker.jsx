import React, { useState, useEffect } from "react";
import {
  NativeSelect,
  FormControl,
  Select,
  InputLabel,
} from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api";

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
      // console.log("fetch countries");
    };
    fetchAPI();
  }, [setFetchedCountries]);

  return (
    <FormControl variant="standard" className={styles.formControl}>
      <InputLabel shrink>
        Pick a Country
      </InputLabel>
      <NativeSelect
        className={styles.text}
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option aria-label="None" className={styles.text} value="">
          Global
        </option>
        {fetchedCountries.map((country, key) => (
          <option className={styles.text} key={key} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
