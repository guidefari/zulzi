import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../util/api-endpoints";
import { City, SelectOption } from "../util/types";
import { SingleValue } from "react-select";

type Props = {
  onSearchChange: (selectedCity: SelectOption) => void;
};

const Search = ({ onSearchChange }: Props) => {
  const [search, setSearch] = useState<SelectOption>();

  const loadOptions = async (inputValue: string): Promise<{ options: SelectOption[] }> => {
    if (!inputValue || inputValue.length === 0) return { options: [] };
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const json = await response.json();
      const options = json.data?.map((city: City) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      });
      if (!options) return { options: [] };

      return { options };
    } catch (error) {
      console.error(error);
      return { options: [] };
    }
  };

  const handleOnChange = (selectedCity: SingleValue<SelectOption>) => {
    if (!selectedCity) return;
    setSearch(selectedCity);
    onSearchChange(selectedCity);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      className="max-w-lg mx-auto"
    />
  );
};

export default Search;
