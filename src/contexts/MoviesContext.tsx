import {
  createContext,
  Dispatch,
  ReactElement,
  useContext,
  useReducer,
} from 'react';

import MoviesReducer from '../reducers/MoviesReducer';
import { MovieDTO } from '../services/OMDBService';

export enum DispatchAction {
  // Error occurred while fetching movie data
  DATA_FAILURE,
  // Loading the movie data from the API
  DATA_LOAD,
  // Successfully fetched the movie data
  DATA_SUCCESS,
}

export interface State {
  // Whether or not an error occurred when fetching the data
  hasError: boolean;
  // Whether or not the data is currently being fetched
  isLoading: boolean;
  // The entire list of fetched movies
  movies: MovieDTO[];
}

export interface DispatchParams {
  type: DispatchAction;
  payload?: unknown;
}

interface MoviesContext {
  state: State;
  dispatch: Dispatch<DispatchParams>;
}

const initialState: State = {
  hasError: false,
  isLoading: false,
  movies: [],
};

const MoviesContext = createContext<MoviesContext>({
  state: initialState,
  dispatch: () => null,
});

export function MoviesProvider({
  children,
}: {
  children: ReactElement | ReactElement[];
}): ReactElement {
  const [state, dispatch] = useReducer(MoviesReducer, initialState);

  return (
    <MoviesContext.Provider value={{ state, dispatch }}>
      {children}
    </MoviesContext.Provider>
  );
}

export function useMoviesContext(): MoviesContext {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMoviesContext must be used within a MoviesProvider');
  }
  return context;
}
