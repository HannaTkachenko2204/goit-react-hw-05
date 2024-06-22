import { useEffect, useState } from "react";
import { getMovieDetails } from "../../components/apiServise/movies";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
  const backLink = location.state?.from ?? "/movies";

  useEffect(() => {
    if (!movieId) return;
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
      <Link to={backLink}>
        <GoArrowLeft />
        Go back
      </Link>
      {isLoading && <Loader />}
      {error && toast.error("Can not be empty!")}
      <h1>{movie.title}</h1>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : defaultImg
        }
        width={250}
        alt={movie.title || "poster"}
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
        <li>
          <Link to="cast" state={{ from: backLink }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLink }}>
            Reviews
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
