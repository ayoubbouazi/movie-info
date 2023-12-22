// MovieGallery.js
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import axios from "axios";
import "./MovieGallery.css";
import { MovieSearch } from "../export";

const MovieGallery = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const apiKey = "192e0b9821564f26f52949758ea3c473&language=es-MX";

  useEffect(() => {
    fetchMovies();
  }, [apiKey, currentPage]);

  const fetchMovies = async (searchTerm = "") => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${
          searchTerm !== "" ? "search/movie" : "discover/movie"
        }?api_key=${apiKey}&query=${searchTerm}&page=${currentPage}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const handleSearch = (searchTerm) => {
    setCurrentPage(1); // Restart the page when making a new search
    fetchMovies(searchTerm);
  };

  if (movies.length === 0) {
    return <p className="loading">Cargando...</p>;
  }

  return (
    <>
      {" "}
      <MovieSearch onSearch={handleSearch} />
      <div className="container-movie-gallery">
        {movies.map((movie) => (
          <div key={movie.id} className="movie">
            <Link to={`/movie/${movie.id}`}>
              <img
                className="poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
            <div className="title">{movie.title}</div>
          </div>
        ))}
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Anterior
          </button>
          <span>Página {currentPage}</span>
          <button onClick={handleNext}>Siguiente</button>
        </div>
      </div>
    </>
  );
};

export default MovieGallery;
