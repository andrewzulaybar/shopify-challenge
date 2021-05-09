import { useCallback, useMemo, useState } from 'react';

import MoviePoster from './MoviePoster';
import { MovieDTO } from '../services/OMDBService';

interface NominatedMovieProps {
  movie: MovieDTO;
  onNominate: (movie: MovieDTO) => void;
  onRemoveNomination: (movie: MovieDTO) => void;
}

export default function NominatedMovie(props: NominatedMovieProps) {
  const [isNominated, setIsNominated] = useState<boolean>(true);

  const buttonClasses = useMemo(() => {
    const buttonClasses = 'border-2 font-semibold p-1 mb-2 rounded-2xl w-full';
    const onButtonFocus = 'focus:outline-none';
    const baseClasses = [buttonClasses, onButtonFocus];

    const onButtonHover =
      'hover:border-blue-400 hover:text-blue-400 transition ease-in-out duration-500';
    const notNominated = 'bg-white text-gray-500';
    const isNotNominatedClasses = [onButtonHover, notNominated];

    const remove = 'bg-red-500 border-red-500 text-white';
    const onRemoveHover =
      'hover:bg-white hover:text-red-500 transition ease-in-out duration-500';
    const isNominatedClasses = [remove, onRemoveHover];

    return [
      ...baseClasses,
      ...(isNominated ? isNominatedClasses : isNotNominatedClasses),
    ].join(' ');
  }, [isNominated]);

  const onClickHandler = useCallback(() => {
    if (isNominated) {
      props.onRemoveNomination(props.movie);
    } else {
      props.onNominate(props.movie);
    }
    setIsNominated(!isNominated);
  }, [isNominated, props]);

  return (
    <div className="movie w-full rounded-xl p-4">
      <MoviePoster imgUrl={props.movie.Poster} />
      <div className="description w-full">
        <button onClick={onClickHandler} className={buttonClasses}>
          {isNominated ? 'Remove' : 'Nominate'}
        </button>
        <h2 className="text-lg mb-0 leading-6">{props.movie.Title}</h2>
        <p className="text-sm text-gray-400">{props.movie.Year}</p>
      </div>
    </div>
  );
}
