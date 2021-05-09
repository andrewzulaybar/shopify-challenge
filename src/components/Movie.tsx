import { useMemo } from 'react';

import { DispatchAction, useMoviesContext } from '../contexts/MoviesContext';
import { MovieDTO } from '../services/OMDBService';

interface Props {
  movie: MovieDTO;
}

export default function Movie(props: Props) {
  const { state, dispatch } = useMoviesContext();

  const isNominated = useMemo(() => {
    return Array.from(state.nominated).some(
      (movie) => movie.imdbID === props.movie.imdbID
    );
  }, [props.movie.imdbID, state.nominated]);

  const buttonClasses = () => {
    const buttonClasses = 'border-2 font-semibold mb-2 p-1 rounded-2xl w-full';
    const onButtonFocus = 'focus:outline-none';
    const baseClasses = [buttonClasses, onButtonFocus];

    const onButtonHover =
      'hover:border-blue-400 hover:text-blue-400 transition ease-in-out duration-500';
    const notNominated = 'bg-white text-gray-500';
    const isNotNominatedClasses = [onButtonHover, notNominated];

    const onButtonDisabledHover = 'opacity-75';
    const nominated = 'bg-blue-500 border-blue-500 text-white';
    const isNominatedClasses = [onButtonDisabledHover, nominated];

    return [
      ...baseClasses,
      ...(isNominated ? isNominatedClasses : isNotNominatedClasses),
    ].join(' ');
  };

  const onAddNomination = (movie: MovieDTO) => {
    dispatch({ type: DispatchAction.ADD_NOMINATION, payload: { movie } });
  };

  const onRemoveNomination = (movie: MovieDTO) => {
    dispatch({ type: DispatchAction.REMOVE_NOMINATION, payload: { movie } });
  };

  return (
    <div className="p-4 rounded-xl w-full">
      <div className="mb-4">
        <img
          src={props.movie.Poster}
          className="h-64 object-cover rounded-lg w-full"
        />
      </div>
      <div className="description w-full">
        <button
          onClick={() =>
            isNominated
              ? onRemoveNomination(props.movie)
              : onAddNomination(props.movie)
          }
          className={buttonClasses()}
        >
          {isNominated ? 'Nominated' : 'Nominate'}
        </button>
        <h2 className="leading-6 mb-0 text-lg">{props.movie.Title}</h2>
        <p className="text-sm text-gray-400">{props.movie.Year}</p>
      </div>
    </div>
  );
}
