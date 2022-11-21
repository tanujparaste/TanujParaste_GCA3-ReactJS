import axios from "axios";
import IMovieItem from "../model/IMovieItem";

const getMovies = async (path: string) => {
  const response = await axios.get(
    `${process.env.REACT_APP_REST_API_BASE_URL}/${path}`
  );
  return response.data as IMovieItem[];
};

const addToFavourites = async (movie: IMovieItem) => {
  //rectify id, remove ? symbol to avoid parameterization in url
  movie.id = movie.id.replaceAll("?", "");
  return axios
    .post<IMovieItem>(
      `${process.env.REACT_APP_REST_API_BASE_URL}/favourit`,
      movie
    )
    .then((response) => response.data);
};

const deleteFromFavourites = async (id: string) => {
  axios.delete<IMovieItem>(
    `${process.env.REACT_APP_REST_API_BASE_URL}/favourit/${id}`
  );
};

export { getMovies, addToFavourites, deleteFromFavourites };
