import { notification } from 'antd';
import { useCallback, useMemo } from 'react';

import MoviePoster from './MoviePoster';
import { DispatchAction, useMoviesContext } from '../contexts/MoviesContext';
import { MovieDTO } from '../services/OMDBService';
import { MAXIMUM_MOVIES_TO_NOMINATE } from '../utils/constants';

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

  const onAddNomination = useCallback(
    (movie: MovieDTO) => {
      dispatch({ type: DispatchAction.ADD_NOMINATION, payload: { movie } });
    },
    [dispatch]
  );

  const onRemoveNomination = useCallback(
    (movie: MovieDTO) => {
      dispatch({ type: DispatchAction.REMOVE_NOMINATION, payload: { movie } });
    },
    [dispatch]
  );

  const notify = useCallback((numNominees: number) => {
    if (numNominees === MAXIMUM_MOVIES_TO_NOMINATE) {
      notification.success({
        message: "You're done!",
        description: `You have chosen the maximum number of ${MAXIMUM_MOVIES_TO_NOMINATE} nominated movies. 
          Navigate to the Nominations page to manage your list.`,
        duration: 10,
      });
    } else if (numNominees > MAXIMUM_MOVIES_TO_NOMINATE) {
      notification.error({
        message: 'You have too many nominees!',
        description: `You have chosen more than the maximum number of ${MAXIMUM_MOVIES_TO_NOMINATE} nominated movies. 
          Navigate to the Nominations page to manage your list.`,
        duration: 10,
      });
    }
  }, []);

  const onClickHandler = useCallback(() => {
    if (isNominated) {
      onRemoveNomination(props.movie);
      notify(state.nominated.size - 1);
    } else {
      onAddNomination(props.movie);
      notify(state.nominated.size + 1);
    }
  }, [
    isNominated,
    notify,
    onAddNomination,
    onRemoveNomination,
    props.movie,
    state.nominated.size,
  ]);

  return (
    <div className="movie p-4 rounded-xl w-full">
      <MoviePoster imgUrl={props.movie.Poster} />
      <div className="description w-full">
        <button onClick={onClickHandler} className={buttonClasses()}>
          {isNominated ? 'Nominated' : 'Nominate'}
        </button>
        <h2 className="leading-6 mb-0 text-lg">{props.movie.Title}</h2>
        <p className="text-sm text-gray-400">{props.movie.Year}</p>
      </div>
    </div>
  );
}
