// MovieGallery.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MovieGallery.css";
import { MovieSearch, MovieFilter } from "../export";

const MovieGallery = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const apiKey = "192e0b9821564f26f52949758ea3c473&language=es-MX";
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    fetchMovies();
  }, [apiKey, currentPage, selectedFilters]);

  const fetchMovies = async (searchTerm = "") => {
    try {
      let apiUrl = `https://api.themoviedb.org/3/${
        searchTerm !== "" ? "search/movie" : "discover/movie"
      }?api_key=${apiKey}&query=${searchTerm}&page=${currentPage}`;

      // Add selected filters to the API URL
      Object.entries(selectedFilters).forEach(([key, value]) => {
        apiUrl += `&${key}=${value}`;
      });

      const response = await axios.get(apiUrl);
      const moviesData = response.data.results;

      // Get videos information for each movie
      const moviesWithVideos = await Promise.all(
        moviesData.map(async (movie) => {
          const videosResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`
          );

          // Add video information (trailer) to the movie
          return {
            ...movie,
            videos: videosResponse.data.results,
          };
        })
      );

      setMovies(moviesWithVideos);
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

  const handleSearch = (searchTerm, filters) => {
    setCurrentPage(1);
    fetchMovies(searchTerm);
  };

  if (movies.length === 0) {
    return <p className="loading">Cargando...</p>;
  }

  return (
    <>
      <MovieSearch onSearch={handleSearch} />
      {/* <MovieFilter/> */}
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
            <div className="rating">⭐ {movie.vote_average}</div>
            <div className="title">{movie.title}</div>
            <div className="">
              {(movie.videos && movie.videos.length > 0 && (
                <div className="trailer">
                  <a
                    className="trailer-link"
                    href={`https://www.youtube.com/watch?v=${movie.videos[0].key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Trailer
                  </a>
                </div>
              )) || (
                <div className="trailer no-link">
                  <a>No hay Trailer</a>
                </div>
              )}
            </div>
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
