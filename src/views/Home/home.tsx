import {Link, useHistory, useParams} from "react-router-dom";
import {Button} from "../../UIComponents/Button";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {ClipLoader} from "react-spinners";
import {Header} from "../Header/Header";
import {ListMovies} from "../ListMovies/ListMovies";
import {MoviesFilter} from "../MoviesFilter/MoviesFilter";
import {AnimatePresence, motion} from "framer-motion";
import {SetMovieToFavorite} from "../../utils/Utils";

const Home = () => {
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

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState<any>(null);
    const [searchValue, setSearchValue] = useState('');
    const [selectTypeMovie, setSelectTypeMovie] = useState('');

    const {idMovie} = useParams();

    useEffect(() => {
        fetch(`https://apimovies.fr/api/movies?page=7&search?search=` + searchValue, {
            "method": "GET",
        })
            .then(response => response.json())
            .then((data) => {
                console.log('result get movies', data.data);
                return setMovies(data.data);
            })
            .catch(err => {
                console.error('error get movies', err);
                setMovies([]);
            })
            .finally(() => setLoading(false))

    }, [searchValue])

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
    }, [idMovie, selectTypeMovie]);

    let history = useHistory()
    const onCardClick = (e) => {
        // @ts-ignore
        if (!document.getElementById('cardContent').contains(e.target)) {
            setMovie(null);
            history.push("/recipes");
        }
    }

    return (
        <Body>
            <div><Header activeTab={'movies'}/></div>
           {/*< <div><MoviesFilter/></div>>*/}
            <div>
                <input type="text" value={searchValue} placeholder="Search movies..."
                       onChange={e => setSearchValue(e.target.value)} />
                <select onChange={e => setSelectTypeMovie(e.target.value)}>
                    <option>On Netflix</option>
                </select>
            </div>
            <div>
                <ClipLoader color={redColor} loading={loading} css={override} size={60}/>
                {loading ? <LoadingText>Chargement</LoadingText> : <ListMovies type={'movies'} movies={movies}/>}
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

                                    <Button theme={{color: '#D13F3F'}} onClick={() => SetMovieToFavorite(movie)}>AJOUTER AUX FAVORIS</Button>
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

export default Home;
