// MovieDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const apiKey = "192e0b9821564f26f52949758ea3c473&language=es-MX";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        setMovie(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id, apiKey]);

  if (!movie) {
    return <p className="loading">Cargando detalles de la película...</p>;
  }

  return (
    <div className="movie-details-container">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="poster"
      />
      <div className="movie-info">
        <h2 className="title">{movie.title}</h2>
        <p className="overview">{movie.overview}</p>
        <p className="release-date">
          Fecha de lanzamiento: {movie.release_date}
        </p>
        <p className="vote-average">
          Calificación promedio: {movie.vote_average}
        </p>

        <p>Duración: {movie.runtime} minutos</p>
        <p>Recaudación: ${movie.revenue}</p>
        <p>Presupuesto: ${movie.budget}</p>
        {/*Verify and map the properties if they are defined */}
        {movie.genres && movie.genres.length > 0 && (
          <p>Géneros: {movie.genres.map((genre) => genre.name).join(", ")}</p>
        )}
        {/* Verify and map the properties if they are defined */}
        {movie.cast && movie.cast.length > 0 && (
          <p>Reparto: {movie.cast.map((actor) => actor.name).join(", ")}</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
