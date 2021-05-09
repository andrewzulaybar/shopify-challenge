import Movie from './Movie';
import { useMoviesContext } from '../contexts/MoviesContext';

export default function MovieList() {
  const { state } = useMoviesContext();

  return (
    <div className="py-8 grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {state.movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          id={movie.imdbID}
          imgUrl={movie.Poster}
          title={movie.Title}
          year={movie.Year}
        />
      ))}
    </div>
  );
}
