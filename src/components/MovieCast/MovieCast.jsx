import { Link, Outlet } from "react-router-dom";

const MovieCast = () => {
  return (
    <div>
      <Link to="cast">MovieCast</Link>
      <Outlet />
    </div>
  )
}

export default MovieCast