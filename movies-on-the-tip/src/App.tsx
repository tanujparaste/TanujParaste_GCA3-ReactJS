import { ChangeEvent, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom"
import IMovieItem from "./components/model/IMovieItem";
import { addToFavourites, deleteFromFavourites, getMovies } from "./components/services/Movie";
import { toast } from "react-toastify";
import MovieList from "./components/MovieList";
import "./App.css";
import NavigationMenu from "./components/NavigationMenu";

const apiPaths = new Map();
apiPaths.set("/", "movies-in-theaters");
apiPaths.set("/upcoming", "movies-coming");
apiPaths.set("/topindian", "top-rated-india");
apiPaths.set("/top", "top-rated-movies");
apiPaths.set("/favorites", "favourit");

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<IMovieItem[]>([]);
  const [error, setError] = useState<Error | null>(null);

  let location = useLocation();

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const searchString = event.target.value;
    const data = await getMovies(apiPaths.get(location.pathname));
    setMovies(data.filter(movie => movie.title.toLowerCase().includes(searchString.toLowerCase())));
  };

  const onAdd = async (movie: IMovieItem) => {
    try {
      movie.id = `${movie.poster}${movie.title}${movie.year}`;
      await addToFavourites(movie);
      toast.success(`Successfully added to favourites: ${movie.title} ${movie.year}`);
    } catch (error: any) {
      toast.error(`Already added to favourites: ${movie.title} ${movie.year}`);
    }
  }

  const onRemove = async (movie: IMovieItem) => {
    const filtered = movies.filter(item => item.id !== movie.id);
    setMovies(filtered);
    try {
      await deleteFromFavourites(`${movie.id}`);
      toast.success(`Removed:  ${movie.title} ${movie.year}`);
    } catch (error: any) {
      toast.error(`Not found:  ${movie.title} ${movie.year}`);
    }
  }

  useEffect(() => {
    const fetchHelper = async (path: string) => {
      try {
        const data = await getMovies(path);
        setMovies(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchHelper(apiPaths.get(location.pathname));
  }, [location]);

  return (
    <>
      <NavigationMenu search={handleSearch} />
      {/* route configuration */}
      <Routes>
        <Route
          path="/"
          element={
            <MovieList
              loadingStatus={loading}
              errorStatus={error!}
              movies={movies}
              headerText="Movies in theatre"
              enableAdd={true}
              enableRemove={false}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          }
        />
        <Route
          path="/upcoming"
          element={
            <MovieList
              loadingStatus={loading}
              errorStatus={error!}
              movies={movies}
              headerText="Coming Soon"
              enableAdd={true}
              enableRemove={false}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          }
        />
        <Route
          path="/topindian"
          element={
            <MovieList
              loadingStatus={loading}
              errorStatus={error!}
              movies={movies}
              headerText="Top Rated India"
              enableAdd={true}
              enableRemove={false}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          }
        />
        <Route
          path="/top"
          element={
            <MovieList
              loadingStatus={loading}
              errorStatus={error!}
              movies={movies}
              headerText="Top Rated Movies"
              enableAdd={true}
              enableRemove={false}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <MovieList
              loadingStatus={loading}
              errorStatus={error!}
              movies={movies}
              headerText="Favourites"
              enableAdd={false}
              enableRemove={true}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;