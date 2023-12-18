// MovieSearch.js
import React, { useState } from "react";
import "./MovieSearch.css";

const MovieSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm); // Perform the real -time search
  };

  return (
    <div className="search-form">
      <form>
        <input
          type="text"
          placeholder="Buscar películas..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>
    </div>
  );
};

export default MovieSearch;
