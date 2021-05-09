import NominatedMovie from './NominatedMovie';
import { MovieDTO } from '../services/OMDBService';

interface Props {
  movies: MovieDTO[];
  onNominate: (movie: MovieDTO) => void;
  onRemoveNomination: (movie: MovieDTO) => void;
}

export default function NominatedList(props: Props) {
  if (props.movies?.length === 0) {
    return (
      <div className="py-8">
        <p className="text-sm text-gray-400">
          Your nomination list is currently empty. Use the search functionality
          to find movies to nominate.
        </p>
      </div>
    );
  }

  return (
    <div className="gap-4 grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 py-8">
      {props.movies?.map((movie) => (
        <NominatedMovie
          key={movie.imdbID}
          movie={movie}
          onNominate={props.onNominate}
          onRemoveNomination={props.onRemoveNomination}
        />
      ))}
    </div>
  );
}
