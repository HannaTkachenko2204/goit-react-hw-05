import { useEffect, useState } from "react";
import { getMovieDetails } from "../components/apiServise/movies";
import Loader from "../components/Loader/Loader";
import toast from "react-hot-toast";
import { Link, Outlet, useParams } from "react-router-dom";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!movieId) return;
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [movieId]);

  return (
    <div>
       <Link to="/">Go back</Link>
      {isLoading && <Loader />}
      {error && toast.error("Can not be empty!")}
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      {movie.vote_average && (
        <>
          <h2>Raiting</h2>
          <p>{movie.vote_average}</p>
        </>
      )}
      {movie.genres && movie.genres.length > 0 && (
        <>
          <h2>Genres</h2>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </>
      )}
      {movie.overview && (
        <>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
        </>
      )}
      <ul>
        <li><Link to="cast">Cast</Link></li>
        <li><Link to="reviews">Reviews</Link></li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
