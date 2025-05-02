import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addHorrorMovies } from '../utils/moviesSlice'
import { useEffect } from 'react'

export const useHorrorMovies = () => {

    //fetch data and update store
    const dispatch = useDispatch()
    const getHorrorMovies = async () => {

        const data = await fetch(
            'https://api.themoviedb.org/3/discover/movie?with_genres=27&sort_by=popularity.desc&page=1',
            API_OPTIONS
        );
        const json = await data.json();
        // console.log(json.results);
        dispatch(addHorrorMovies(json.results))
    }

    useEffect(() => {
        getHorrorMovies()
    }, [])
}