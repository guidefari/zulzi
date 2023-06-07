import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCities } from "../util/api-endpoints";
import { SelectOption } from "../util/types";
import { SingleValue } from "react-select";

type Props = {
  onSearchChange: (selectedCity: SelectOption) => void;
};

const Search = ({ onSearchChange }: Props) => {
  const [search, setSearch] = useState<SelectOption>();

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
      loadOptions={fetchCities}
      className="max-w-lg mx-auto"
      id="search-input"
    />
  );
};

export default Search;
