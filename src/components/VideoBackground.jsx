import { useSelector } from 'react-redux'
import useMovieTrailer from '../hooks/useMovieTrailer'

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo)

  // fetch trailer video and update the store with trailer video data
  useMovieTrailer(movieId)

  const src = "https://www.youtube.com/embed/" + trailerVideo?.key + "?&autoplay=1&mute=1"

  return (
    <div className="w-screen h-screen relative overflow-hidden ">
      <iframe
        className="absolute top-10  w-full h-full object-cover transform scale-150"
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  )
}

export default VideoBackground
