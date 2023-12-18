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
          <b>Fecha de lanzamiento:</b> {movie.release_date}
        </p>
        <p className="vote-average">
          <b>Calificación promedio:</b> {movie.vote_average}
        </p>
        {/*Verify and map the properties if they are defined */}
        {movie.genres && movie.genres.length > 0 && (
          <p>
            <b>Géneros:</b> {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
        )}
        {/* Verify and map the properties if they are defined */}
        {/* {movie.cast && movie.cast.length > 0 && (
          <p>
            <b>Reparto:</b> {movie.cast.map((actor) => actor.name).join(", ")}
          </p>
        )} */}
        <p>
          <b>Duración:</b> {movie.runtime} minutos
        </p>
        <p>
          {" "}
          <b>Recaudación:</b> ${movie.revenue}
        </p>
        <p>
          <b>Presupuesto:</b> ${movie.budget}
        </p>
        <p>
          <b>Estado:</b> {movie.status}
        </p>
        <p>
          <b>Popularidad:</b> {movie.popularity}
        </p>
        <p>
          <b>Compañía:</b> {movie.production_companies[0].name}
        </p>
        <p>
          <b>País:</b> {movie.production_countries[0].name}
        </p>
        <p>
          <b>Idioma:</b> {movie.spoken_languages[0].name}
        </p>
        <p>
          <b>Adulto:</b> {movie.adult ? "Sí" : "No"}
        </p>
        <p>
          <b>Idioma original:</b> {movie.original_language}
        </p>
        <p>
          <b>Titulo original:</b> {movie.original_title}
        </p>
        <p>
          <b>Calificación:</b> {movie.vote_count}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
