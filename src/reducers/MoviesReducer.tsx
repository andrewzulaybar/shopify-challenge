import {
  State,
  DispatchParams,
  DispatchAction,
} from '../contexts/MoviesContext';

import { MovieDTO } from '../services/OMDBService';

const updateState = (
  oldState: State,
  payload: Record<string, unknown>
): State => {
  return {
    ...oldState,
    ...payload,
  };
};

export default function MoviesReducer(
  state: State,
  { type, payload }: DispatchParams
): State {
  let nextState = state;

  switch (type) {
    /**
     * Adds the given movie to the list of nominated movies
     */
    case DispatchAction.ADD_NOMINATION: {
      const { movie } = payload as { movie: MovieDTO };
      const nominated = new Set(nextState.nominated);
      nominated.add(movie);
      nextState = updateState(nextState, { nominated });
      break;
    }
    /**
     * Sets `isLoading` to false, `hasError` to true, and `movies` to given array if provided
     */
    case DispatchAction.DATA_FAILURE: {
      const { movies } = payload as { movies: MovieDTO[] };
      const newValues: Partial<State> = {
        isLoading: false,
        hasError: true,
        movies: movies ?? [],
      };
      nextState = updateState(nextState, newValues);
      break;
    }
    /**
     * Sets `isLoading` to true and `hasError` to false
     */
    case DispatchAction.DATA_LOAD: {
      const newValues: Partial<State> = { isLoading: true, hasError: false };
      nextState = updateState(nextState, newValues);
      break;
    }
    /**
     * Sets `isLoading` to false, `hasError` to false, and `movies` to given array
     */
    case DispatchAction.DATA_SUCCESS: {
      const { movies } = payload as { movies: MovieDTO[] };
      const newValues: Partial<State> = {
        isLoading: false,
        hasError: false,
        movies,
      };
      nextState = updateState(nextState, newValues);
      break;
    }
    /**
     * Removes the given movie from the list of nominated movies
     */
    case DispatchAction.REMOVE_NOMINATION: {
      const { movie } = payload as { movie: MovieDTO };
      const nominated = new Set(nextState.nominated);
      nominated.delete(movie);
      nextState = updateState(nextState, { nominated });
      break;
    }
    /**
     * Updates the list of nominated movies to be the given list of movies
     */
    case DispatchAction.UPDATE_NOMINATIONS: {
      const { movies } = payload as { movies: MovieDTO[] };
      const nominated = new Set(movies);
      nextState = updateState(nextState, { nominated });
      break;
    }
  }
  return nextState;
}
