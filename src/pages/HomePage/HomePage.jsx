import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../components/apiServise/movies.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import toast from "react-hot-toast";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const { results } = await getTrendingMovies();
        setMovies(results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Trending movies</h2>
      {isLoading && <Loader />}
      {error && toast.error("Can not be empty!")}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
