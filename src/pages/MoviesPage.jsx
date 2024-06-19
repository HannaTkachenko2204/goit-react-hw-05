import { useState } from "react";
import MovieList from "../components/MovieList/MovieList";
import { searchMovies } from "../components/apiServise/movies";
import Loader from "../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = searchParams.get("query");

  const handleSearch = async (event) => {
      event.preventDefault();
      if (!searchQuery.trim()) {
        return toast.error("Can not be empty!");
      }
      setIsLoading(true);
      try {
        const data = await searchMovies(searchQuery);
        setMovies(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
      setSearchQuery("");
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
