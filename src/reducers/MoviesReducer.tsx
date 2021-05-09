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
  }
  return nextState;
}
