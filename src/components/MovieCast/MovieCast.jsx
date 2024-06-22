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

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    if (!movieId) return;
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
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                      : defaultImg
                  }
                  width={150}
                  alt={actor.name || "poster"}
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
