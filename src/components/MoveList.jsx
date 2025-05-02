import React from 'react'
import MovieCard from './MovieCard'
import DragScrollContainer from './DragScrollContainer'

const MoveList = ({ title, movies }) => {
    if (!movies || movies.length === 0) {
        return <p>Loading...</p>
    }

    return (
        <div className='px-6  '>
            <h1 className='font-extrabold text-2xl py-4 text-white'>{title}</h1>
            <div className='flex overflow-x-scroll hide-scrollbar select-none '>
                <DragScrollContainer>
                    <div className='flex '>
                        {movies?.map(movie =>
                            <MovieCard key={movie.id} posterPath={movie.poster_path} />
                        )}

                    </div>
                </DragScrollContainer>
            </div>
        </div>
    )
}

export default MoveList
