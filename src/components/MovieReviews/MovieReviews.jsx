import { Link, Outlet } from "react-router-dom";

const MovieReviews = () => {
  return (
    <div>
      <Link to="reviews">MovieReviews</Link>
      <Outlet />
    </div>
  )
}

export default MovieReviews