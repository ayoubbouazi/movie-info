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
        <h2 className="title">{movie.title}</h2>{" "}
        <div className="info-subtitle">
          <p>
            <span>⭐ {movie.vote_average}</span>
            <span>{movie.release_date.split("-")[0]}</span>
            <span>{movie.runtime} min </span>
          </p>
        </div>
        <div className="overview">
          <p>{movie.overview}</p>
        </div>
        <div className="more-details">
          <div className="release-date">
            <b>Fecha de lanzamiento:</b>
          </div>
          <div>{movie.release_date}</div>
          <div>
            <b>Titulo original:</b>
          </div>
          <div>{movie.original_title}</div>
          <div>
            <b>País:</b>
          </div>
          <div>{movie.production_countries[0].name}</div>
          <div>
            <b>Idioma:</b>
          </div>
          <div>{movie.spoken_languages[0].name}</div>
          {/*Verify and map the properties if they are defined */}
          {/* {movie.genres && movie.genres.length > 0 && (
            <p>
              <b>Géneros:</b>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          )}{" "} */}
          <div>
            <b>Adulto:</b>
          </div>
          <div>{movie.adult ? "Sí" : "No"}</div>
          <div>
            <b>Estado:</b>
          </div>
          <div>{movie.status}</div>
          <div>
            <b>Idioma original:</b>
          </div>
          <div>{movie.original_language}</div>
          <div>
            <b>Popularidad:</b>
          </div>
          <div>{movie.popularity}</div>
          <div>
            <b>Compañía:</b>
          </div>
          <div>{movie.production_companies[0].name}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
