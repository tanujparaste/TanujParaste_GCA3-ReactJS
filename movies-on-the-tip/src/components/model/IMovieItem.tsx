interface IMovieItem {
  id: string,
  title: string,
  year: number,
  genres: string[],
  ratings: number[],
  poster: string,
  contentRating: number,
  duration: string,
  releaseDate: string,
  averageRating: number,
  originalTitle: string,
  storyline: string,
  actors: string[],
  imdbRating: number,
  posterurl: string
}

export default IMovieItem;