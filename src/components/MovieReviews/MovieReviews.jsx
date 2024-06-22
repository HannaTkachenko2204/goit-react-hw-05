import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../apiServise/movies";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!movieId) return;
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data);
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
      {reviews.length > 0 && (
        <ul>
          {reviews.map((review) => (
            <ul key={review.id}>
              <li>
              <h2>Author: {review.author}</h2>
              <p>{review.content}</p>
              </li>
            </ul>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
