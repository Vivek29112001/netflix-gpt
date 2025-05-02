import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUpCommingMovies } from '../utils/moviesSlice'
import { useEffect } from 'react'

export const useUpcommingMovies = () => {

    //fetch data and update store
    const dispatch = useDispatch()
    const getUpCommingMovies = async () => {

        const data = await fetch(
            'https://api.themoviedb.org/3/movie/upcoming?page=2',
            API_OPTIONS
        );
        const json = await data.json();
        // console.log(json.results);
        dispatch(addUpCommingMovies(json.results))
    }

    useEffect(() => {
        getUpCommingMovies()
    }, [])
}