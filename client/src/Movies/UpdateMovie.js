import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

const UpdateMovie = props => {
    const [movie, setMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

    const { id } = useParams();

    const { goBack } = useHistory();

    const handleChanges = e => {
        e.persist()
        setMovie({...movie, [e.target.name]: e.target.value});
    };

    const fetchMovie = (id) => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
            setMovie(res.data); 
            console.log('fetch movie success:',res.data);})
        .catch((err) => console.log(err.response));
    };

    useEffect(() => {
        fetchMovie(id);
    }, [id]);

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            console.log('post movie success!', res);
           props.getMovieList();
           goBack();
        })
        .catch(err => {
            console.error('post movie error!', err)
        });
    };

    return (
        <div className='movie-card'o>
                <h1>
                    edit
                </h1>
                <form nSubmit={handleSubmit} className='input-cont log'>
                    <div className='wrap'>
                    <span htmlFor='title'>Title: {'  '}</span>
                    <input
                    name='title'
                    value={movie.title}
                    onChange={handleChanges}
                    className='input'
                    />
                    </div>
                   
                    <div className='wrap'>
                    <label className="movie-director" htmlFor='director'>Director: {'  '}</label>
                    <input
                    name='director'
                    value={movie.director}
                    onChange={handleChanges}
                    className='input'
                    />
                    </div>
                    
                    <div className='wrap'>
                    <label className="movie-metascore" htmlFor='director'>Metascore: {'  '}</label>
                    <input
                    name='metascore'
                    value={movie.metascore}
                    onChange={handleChanges}
                    className='input'
                    />
                    </div>
                   
                    <div className='wrap'>
                    <label className="movie-star" htmlFor='director'>Actors: {'  '}</label>
                    <input
                    name='stars'
                    value={movie.stars}
                    onChange={handleChanges}
                    className='input'
                    />
                    </div>

                    <br/>

                    <button className='btn'>confirm changes</button>
                </form>
            </div>
    );
};

export default UpdateMovie;

