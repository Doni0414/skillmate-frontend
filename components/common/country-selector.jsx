import axios from "axios";
import { useEffect, useState } from "react";
import { Select } from "./select";
import clsx from "clsx";

export function CountrySelector({ selectedCountry, selectCountry, className }) {
  // country selector handlers
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://valid.layercode.workers.dev/list/countries?format=select")
      .then((response) => {
        setCountries(response.data.countries.map((country) => country.label));
      })
      .catch((error) => {
        console.log("Error while fetching countries", error);
      });
  });

  return (
    <Select
      value={selectedCountry}
      labels={countries}
      values={countries}
      onSelect={selectCountry}
      className={clsx(className)}
    />
  );
}
