import { useEffect, useState } from "react";
import { searchMovies } from "../../components/apiServise/movies";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        setIsLoading(true);
        try {
          const data = await searchMovies(query);
          if (!data.length) return setIsEmpty(true);
          setMovies(data);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMovies();
    }
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      return toast.error("Can not be empty!");
    }
    setSearchParams({ query: searchQuery });
    setSearchQuery("");
    setMovies([]);
    setIsLoading(false);
    setError(null);
    setIsEmpty(false);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <SearchForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        searchQuery={searchQuery}
      />
      {isLoading && <Loader />}
      {error && toast.error("Something went wrong!")}
      {isEmpty && <p>Sorry. There are no images...😭</p>}
      <MovieList movies={movies} />
      <Toaster />
    </div>
  );
};

export default MoviesPage;
