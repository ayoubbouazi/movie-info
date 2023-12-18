// MovieGallery.js
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import axios from "axios";
import "./MovieGallery.css";

const MovieGallery = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const moviesPerPage = 15;

  const apiKey = "192e0b9821564f26f52949758ea3c473&language=es-MX";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentPage}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [apiKey, currentPage]);

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  if (movies.length === 0) {
    return <p className="loading">Cargando...</p>;
  }

  return (
    <>
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
          <button onClick={handlePrev}>Anterior</button>
          <button onClick={handleNext}>Siguiente</button>
        </div>
      </div>
    </>
  );
};

export default MovieGallery;
