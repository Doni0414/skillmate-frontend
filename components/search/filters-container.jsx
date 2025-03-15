import clsx from "clsx";
import { CountryIcon } from "./icons/country-icon";
import { CityIcon } from "./icons/city-icon";
import { LevelIcon } from "./icons/level-icon";
import { LanguageIcon } from "./icons/language-icon";
import { use, useEffect, useState } from "react";
import { Select } from "../common/select";
import axios from "axios";

export function FiltersContainer({ className }) {
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
    <div
      className={clsx(
        className,
        "w-[220px] pl-[55px] py-8 space-y-8 bg-[#F9F9F9]/60 rounded-[10px] shadow-md",
      )}
    >
      <Filter filterName="Country" values={countries} Icon={CountryIcon} />
      <Filter filterName="City" Icon={CityIcon} />
      <Filter filterName="Level" Icon={LevelIcon} />
      {/* <Filter filterName="Language" Icon={LanguageIcon} /> */}
    </div>
  );
}

function Filter({ filterName, values, Icon }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const handleOnMouseEnter = () => {
    setIsSelectVisible(true);
  };
  const handleOnMouseLeave = () => {
    setIsSelectVisible(false);
  };
  const onSelect = (e) => {
    setSelectedValues((lastSelectedValues) => {
      if (lastSelectedValues.includes(e.target.value)) {
        return lastSelectedValues;
      }
      return [...lastSelectedValues, e.target.value];
    });
  };
  const handleOnCloseOfSelectedValue = (index) => {
    console.log("asdasd");
    console.log(selectedValues);
    console.log(index);
    setSelectedValues((lastSelectedValues) =>
      lastSelectedValues.filter((value, i) => i !== index),
    );
  };
  return (
    <div className="text-black/80 text-[22px]">
      <button
        className="flex gap-[5px] items-start cursor-pointer"
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <div className="flex gap-[5px] items-center">
          <Icon />
          {filterName}
        </div>
        {isSelectVisible && (
          <MultiSelect
            className="absolute bg-[#F9F9F9] text-black/70 text-[15px] w-[240px] px-5 border border-black/10 rounded-[7px] cursor-pointer focus:outline-none"
            labels={values}
            values={values}
            onSelect={onSelect}
          />
        )}
      </button>
      {selectedValues.map((selectedValue, index) => (
        <SelectedValueContainer
          key={index}
          index={index}
          value={selectedValue}
          onClose={handleOnCloseOfSelectedValue}
        />
      ))}
    </div>
  );
}

function SelectedValueContainer({ value, index, onClose }) {
  return (
    <div className="text-[15px] ">
      {value}{" "}
      <button
        className="text-gray-500 hover:text-black cursor-pointer"
        onClick={() => onClose(index)}
      >
        ✖
      </button>
    </div>
  );
}

function MultiSelect({ className, values, labels, onSelect }) {
  return (
    <div className="relative">
      <select onChange={(e) => onSelect(e)} className={className} multiple>
        {values.map((value, index) => (
          <option key={index} className="w-fit cursor-pointer" value={value}>
            {labels[index]}
          </option>
        ))}
      </select>
    </div>
  );
}
