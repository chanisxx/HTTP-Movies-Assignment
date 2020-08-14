import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

//movie list is given the movie data through props.

function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}
// they map throught the movies array, and for every movie they return 
// the MovieCard component wrapped in a link, which if clicked, takes
// the user to the URL 

export default MovieList;
