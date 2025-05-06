import Header from './Header';
import GptSearch from './GptSearch';
import { useNowPlayingMovies } from '../hooks/useNowPlayingMovies';
import { usePopularMovies } from '../hooks/usePopularMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import { useTrendingMovies } from '../hooks/useTrendingMovies';
import { useUpcommingMovies } from '../hooks/useUpcommingMovies';
import { useHorrorMovies } from '../hooks/useHorrorMovies';
import { useSelector } from 'react-redux';

const Browse = () => {
const showGptSearch = useSelector((store)=> store.gpt.showGptSearch)

useNowPlayingMovies();
usePopularMovies();
useTrendingMovies();
useUpcommingMovies();
useHorrorMovies();

  return (
    <div>
      <Header />
      {
        showGptSearch ?(
          <GptSearch />
        ):(
          <>
            <MainContainer />
            <SecondaryContainer />
          </>
        )
      }
      {/* <GptSearch /> */}
      {/* <MainContainer />
      <SecondaryContainer /> */}
    </div>
  )
} 

export default Browse
