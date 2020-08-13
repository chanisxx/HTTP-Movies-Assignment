import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory} from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { goBack } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const deleteMovie = (id) => {
    axios
    .delete(`http://localhost:5000/api/movies/${id}`, movie)
    .then(res => 
    {
    props.getMovieList();
    goBack();
    })
    .catch(err => console.log(err))
  }

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save 
      </div>
      <div className="save-button update">
        <Link to={`/update-movie/${movie.id}`}>Update</Link>
      </div>
      <div className="save-button delete" onClick={() => deleteMovie(movie.id)}>
        <p>Delete</p>
  
      </div>
    </div>
  );
}

export default Movie;
