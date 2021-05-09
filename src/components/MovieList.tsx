import Movie from './Movie';
import { MovieDTO } from '../services/OMDBService';

interface Props {
  movies: MovieDTO[];
}

export default function MovieList(props: Props) {
  return (
    <div className="gap-4 grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 py-8">
      {props.movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
