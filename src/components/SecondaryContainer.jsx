import React from 'react'
import MoveList from './MoveList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

  const movies = useSelector((store) => store.movies)

  return (
    <div className=' bg-black'>
      <div className=' relative z-50 -m-5 -mx-1'>
        <MoveList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MoveList title={"Trending"} movies={movies.trendingVideo} />
        <MoveList title={"Popular Movies"} movies={movies.popularMovies} />
        <MoveList title={"Upcomming Movies"} movies={movies.upCommingMovies} />
        <MoveList title={"Horror Movies"} movies={movies.horrorMovies} />
      </div>
    </div>
  )
}

export default SecondaryContainer
