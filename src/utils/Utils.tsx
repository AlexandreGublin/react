const KEY = 'KEY_FAVORITES_MOVIES';

export const GetFavoritesMovies = () => {
    if (KEY && localStorage.getItem(KEY)) {
        console.log('test GetFavoritesMovies', JSON.parse(localStorage.getItem(KEY) as string) || [])
        return JSON.parse(localStorage.getItem(KEY) as string) || [];
    }
    return [];
};

export const SetMovieToFavorite = (movie : any) => {
    const movies = GetFavoritesMovies();

    if (!movies.find((mv) => mv.id === movie.id)) {
        const newMovies = [...GetFavoritesMovies(), movie];
        localStorage.setItem(KEY, JSON.stringify(newMovies));
    }
};

export const SetMoviesList = (movies : any) => {
    localStorage.setItem(KEY, JSON.stringify(movies || []));
};

export const RemoveMovieFromFavorites = (movie : any) => {
    SetMovieToFavorite(GetFavoritesMovies().filter((mv) => mv.id !== movie.id));
};
