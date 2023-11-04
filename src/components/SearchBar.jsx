/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowTooltip(false);
  };

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      onSearch(searchTerm);
    } else {
      setShowTooltip(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className='search-bar'>
      <Tooltip
        open={showTooltip}
        title='The search term must be at least 3 characters long.'
        arrow
      >
        <input
          type='text'
          placeholder='Search pokemons...'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </Tooltip>
      <button onClick={handleSearch}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
