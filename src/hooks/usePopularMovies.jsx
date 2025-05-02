import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addPopularMovies } from '../utils/moviesSlice'
import { useEffect } from 'react'

export const usePopularMovies = () => {

    //fetch data and update store
    const dispatch = useDispatch()
    const getPopularMovies = async () => {

        const data = await fetch(
            'https://api.themoviedb.org/3/movie/popular?page=2',
            API_OPTIONS
        );
        const json = await data.json();
        // console.log(json.results);
        dispatch(addPopularMovies(json.results))
    }

    useEffect(() => {
        getPopularMovies()
    }, [])
}