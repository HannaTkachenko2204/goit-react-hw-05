import { useParams } from "react-router-dom";

const MovieDetailsPage = () => {
  const { productId } = useParams();
  return (
    <div>{productId}</div>
  )
}

export default MovieDetailsPage