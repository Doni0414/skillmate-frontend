import clsx from "clsx";
import { CountryIcon } from "./icons/country-icon";
import { CityIcon } from "./icons/city-icon";
import { LevelIcon } from "./icons/level-icon";
import { useEffect, useState } from "react";
import axios from "axios";

export function AdsFiltersContainer({
  className,
  selectedCountries,
  setSelectedCountries,
  selectedLevels,
  setSelectedLevels,
  selectedCities,
  setSelectedCities,
}) {
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
  }, []);

  return (
    <div
      className={clsx(
        className,
        "pl-[55px] pr-[100px] h-fit py-8 space-y-8 bg-[#F9F9F9]/60 rounded-[10px] shadow-md",
      )}
    >
      <Filter
        filterName="Country"
        values={countries}
        Icon={CountryIcon}
        selectedValues={selectedCountries}
        setSelectedValues={setSelectedCountries}
      />
      <FilterWithInput
        filterName="City"
        Icon={CityIcon}
        selectedValues={selectedCities}
        setSelectedValues={setSelectedCities}
      />
      <Filter
        filterName="Level"
        values={["Beginner", "Intermediate", "Pro"]}
        Icon={LevelIcon}
        selectedValues={selectedLevels}
        setSelectedValues={setSelectedLevels}
      />
    </div>
  );
}

function Filter({
  filterName,
  values,
  Icon,
  selectedValues,
  setSelectedValues,
}) {
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
    setSelectedValues((lastSelectedValues) =>
      lastSelectedValues.filter((value, i) => i !== index),
    );
  };
  return (
    <div className="w-fit text-black/80 text-[22px]">
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
      {selectedValues &&
        selectedValues.map((selectedValue, index) => (
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

function FilterWithInput({
  filterName,
  Icon,
  selectedValues,
  setSelectedValues,
  placeholder = "Type here...",
}) {
  const [inputValue, setInputValue] = useState("");
  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleOnCloseOfSelectedValue = (index) => {
    setSelectedValues((lastSelectedValues) =>
      lastSelectedValues.filter((value, i) => i !== index),
    );
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      if (
        inputValue &&
        inputValue.trim() !== "" &&
        !selectedValues.includes(inputValue)
      ) {
        const trimmedValue = inputValue.trim();
        setSelectedValues((lastSelectedValues) => {
          if (lastSelectedValues.includes(trimmedValue)) {
            return lastSelectedValues;
          }
          return [...lastSelectedValues, trimmedValue];
        });
      }

      setInputValue("");
    }
  };
  return (
    <div className="text-black/80 text-[22px]">
      <button className="flex gap-[5px] items-start cursor-pointer">
        <div className="flex gap-[5px] items-center">
          <Icon />
          {filterName}
        </div>
      </button>
      {selectedValues &&
        selectedValues.map((selectedValue, index) => (
          <SelectedValueContainer
            key={index}
            index={index}
            value={selectedValue}
            onClose={handleOnCloseOfSelectedValue}
          />
        ))}
      <div className="mt-2">
        <input
          placeholder={placeholder}
          onChange={handleOnChange}
          value={inputValue}
          onKeyDown={handleOnKeyDown}
          className="text-[16px] bg-white w-[130px] px-2 py-1 border border-[#d0d0d0] rounded-[10px] focus:outline-none"
        />
      </div>
    </div>
  );
}

function SelectedValueContainer({ value, index, onClose }) {
  return (
    <div className="text-[15px] w-fit flex items-center gap-2">
      {value}
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
