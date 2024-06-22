import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../apiServise/movies";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!movieId) return;
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieCast(movieId);
        setCast(data);
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
      {isLoading && <Loader />}
      {error && toast.error("Can not be empty!")}
      {cast.length > 0 && (
        <ul>
          {cast.map((actor) => (
            <ul key={actor.id}>
              <li>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.original_name}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
              </li>
            </ul>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
