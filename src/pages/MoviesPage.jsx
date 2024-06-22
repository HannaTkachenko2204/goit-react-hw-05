import { useEffect, useState } from "react";
import { searchMovies } from "../components/apiServise/movies";
import Loader from "../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        setIsLoading(true);
      try {
        const data = await searchMovies(query);
        setMovies(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
      fetchMovies();
  }
    }, [query])

  const handleSearch = (event) => {
      event.preventDefault();
      if (!searchQuery.trim()) {
        return toast.error("Can not be empty!");
      }
      setSearchParams({ query: searchQuery });
    }

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          name="search"
          onChange={handleChange}
          value={searchQuery}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <Loader />}
      {error && toast.error("Something went wrong!")}
      <MovieList movies={movies} />
      <Toaster />
    </div>
  );
};

export default MoviesPage;
