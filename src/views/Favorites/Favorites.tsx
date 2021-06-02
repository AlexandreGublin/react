import {Header} from "../Header/Header";
import {MoviesFilter} from "../MoviesFilter/MoviesFilter";
import {ClipLoader} from "react-spinners";
import {ListMovies} from "../ListMovies/ListMovies";
import {AnimatePresence, motion} from "framer-motion";
import {GetFavoritesMovies, RemoveMovieFromFavorites, SetMoviesList, SetMovieToFavorite} from "../../utils/Utils";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {useHistory, useParams} from "react-router";
import {Button} from "../../UIComponents/Button";

export const Favorites = () => {

    const LoadingText = styled.p`
      color: white;
      text-align: center;
    `;

    const Body = styled.div`
      width: 100%;
      height: 100%;
      margin: 15px;
    `;

    const override = `display: block; margin: 10px auto;`;
    const redColor = '#D13F3F';

    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState(GetFavoritesMovies());
    const [movie, setMovie] = useState<any>(null);

    const {idMovie} = useParams();
    console.log('test idMovie', idMovie);

    useEffect(() => {
        fetch("https://apimovies.fr/api/movies/" + idMovie, {
            "method": "GET",
        })
            .then(response => response.json())
            .then((data) => {
                console.log('get movie detail', data)
                return setMovie(data)
            })
            .catch(err => {
                console.error('error get movie detail', err);
            });
    }, [idMovie]);

    let history = useHistory()
    const onCardClick = (e) => {
        // @ts-ignore
        if (!document.getElementById('cardContent').contains(e.target)) {
            setMovie(null);
            history.push("/recipes");
        }
    }

    const onClickRemove = (movie) => {
        setMovies(movies.filter((mv) => mv.id !== movie.id));
        SetMoviesList(movies);
    };

    return (
        <Body>
            <div><Header activeTab={'favorites'}/></div>
            <div>
                <ClipLoader color={redColor} loading={loading} css={override} size={60}/>
                {loading ? <LoadingText>Chargement</LoadingText> : <ListMovies type={'favorites'} movies={movies}/>}
            </div>

            <AnimatePresence>
                {idMovie && movie !== null &&
                <>
                    <motion.div className="overlay"/>
                    <div className="open" onClick={(e) => onCardClick(e)}>
                        <motion.div layoutId={idMovie} className="card">
                            <motion.div id="cardContent">
                                <motion.div className='center'>
                                    <motion.img className='img' src={movie.poster}/>
                                    <motion.h3>{movie?.title || ''}</motion.h3>
                                    <p>Réalisateur : {movie.director}</p>
                                    <p>Durée : {movie.duration} min</p>
                                    <p>Sortie le : {movie.created_at}</p>
                                    <p>Voir sur Netlix</p>

                                    <Button theme={{color: '#D13F3F'}} onClick={() => onClickRemove(movie)}>ENLEVER DES FAVORIS</Button>
                                </motion.div>
                                <br/>
                            </motion.div>
                        </motion.div>
                    </div>
                </>}
            </AnimatePresence>
        </Body>
    );
};
