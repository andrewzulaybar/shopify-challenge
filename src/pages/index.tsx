import Link from 'next/link';
import { useCallback, useState } from 'react';

import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { DispatchAction, useMoviesContext } from '../contexts/MoviesContext';
import OMDBService, {
  MovieDTO,
  MovieType,
  Query,
} from '../services/OMDBService';

import 'antd/dist/antd.css';

enum HomeState {
  INITIAL,
  LOADING,
  RESULTS,
}

export default function IndexPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [homeState, setHomeState] = useState<HomeState>(HomeState.INITIAL);
  const [page, setPage] = useState<number>(1);

  const { state, dispatch } = useMoviesContext();

  const onSearchHandler = useCallback(
    (title: string) => {
      const queryParams: Query = {
        dataType: 'json',
        page,
        title,
        type: MovieType.Movie,
      };

      setHomeState(HomeState.LOADING);
      dispatch({ type: DispatchAction.DATA_LOAD });
      OMDBService.findMovies(queryParams)
        .then((movies: MovieDTO[]) => {
          setHomeState(HomeState.RESULTS);
          dispatch({
            type: DispatchAction.DATA_SUCCESS,
            payload: { movies },
          });
        })
        .catch((err: Error) => {
          setErrorMessage(err.message);
          setHomeState(HomeState.RESULTS);
          dispatch({
            type: DispatchAction.DATA_FAILURE,
            payload: { movies: [] },
          });
        });
    },
    [dispatch, page]
  );

  return (
    <main className="flex flex-col flex-grow justify-center p-12 pt-0 transition ease-in-out duration-500">
      <SearchBar onSearchHandler={onSearchHandler} />
      {homeState === HomeState.RESULTS && (
        <div className="py-8">
          <h2 className="font-semibold text-3xl px-4">Results</h2>
          {state.hasError && (
            <p className="text-base text-red-500 px-4">{`The following error occurred: ${errorMessage}`}</p>
          )}
          {!state.isLoading && !state.hasError && (
            <MovieList movies={state.movies} />
          )}
        </div>
      )}
    </main>
  );
}
