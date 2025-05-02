import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addTrendingVideo } from '../utils/moviesSlice'
import { useEffect } from 'react'

export const useTrendingMovies = () => {

    //fetch data and update store
    const dispatch = useDispatch()
    const getTrendingMovies = async () => {

        const data = await fetch(
            'https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1',
            API_OPTIONS
        );
        const json = await data.json();
        // console.log(json.results);
        dispatch(addTrendingVideo(json.results))
    }

    useEffect(() => {
        getTrendingMovies()
    }, [])
}