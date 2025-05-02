import Header from './Header';
import { useNowPlayingMovies } from '../hooks/useNowPlayingMovies';
import { usePopularMovies } from '../hooks/usePopularMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import { useTrendingMovies } from '../hooks/useTrendingMovies';
import { useUpcommingMovies } from '../hooks/useUpcommingMovies';
import { useHorrorMovies } from '../hooks/useHorrorMovies';

const Browse = () => {

useNowPlayingMovies();
usePopularMovies();
useTrendingMovies();
useUpcommingMovies();
useHorrorMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  )
} 

export default Browse
