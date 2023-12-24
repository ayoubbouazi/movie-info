// MovieFilter.js
import React, { useState } from "react";
import "./MovieFilter.css";

const MovieFilter = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    genre: "",
    country: "",
    rating: "",
 
  });

  const handleSelectChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      genre: "",
      country: "",
      rating: "",
    });
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="movie-filter">
      <div className="filter-group">
        <label>Género:</label>
        <select
          value={filters.genre}
          onChange={(e) => handleSelectChange("genre", e.target.value)}
        >
          <option value="">Selecciona Género</option>
          <option value="accion">Acción</option>
          <option value="comedia">Comedia</option>
        </select>
      </div>

      <div className="filter-group">
        <label>País:</label>
        <select
          value={filters.country}
          onChange={(e) => handleSelectChange("country", e.target.value)}
        >
          <option value="">Selecciona País</option>
          <option value="usa">Estados Unidos</option>
          <option value="uk">Reino Unido</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Rating:</label>
        <select
          value={filters.rating}
          onChange={(e) => handleSelectChange("rating", e.target.value)}
        >
          <option value="">Selecciona Rating</option>
          <option value="pg">PG</option>
          <option value="pg-13">PG-13</option>
        </select>
      </div>

      <div className="button-group">
        <button
          className="btn btn-dark button-search-reset"
          onClick={handleReset}
        >
          Limpiar Filtros
        </button>
        <button className="btn btn-secondary btn-search" onClick={handleSearch}>
          Buscar
        </button>
      </div>
    </div>
  );
};

export default MovieFilter;
