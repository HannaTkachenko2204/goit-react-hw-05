import axios from "axios";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWRmMTM2NjVkZjg2MDQ4YmQyMGE1NDU5ZWEyYzZhZSIsInN1YiI6IjY2NzFhMmE5OTYyYjg5MDdlOTBkZmQ0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r265Qvvyi2H47ajNAl9UThZxhMhZkE8GuO45M36wDCw";
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;

export const getTrendingMovies = async () => {
  const { data } = await axios.get('/trending/movie/day');
  return data;
};

export const searchMovies = async ( query, page ) => {
  const { data } = await axios.get('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}`);
  return data;
};

export const getMovieCast = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}/credits`);
  return data.cast;
};

export const getMovieReviews = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}/reviews`);
  return data.results;
};