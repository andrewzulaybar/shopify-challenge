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

export default function IndexPage() {
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

      dispatch({ type: DispatchAction.DATA_LOAD });
      OMDBService.findMovies(queryParams)
        .then((movies: MovieDTO[]) => {
          dispatch({
            type: DispatchAction.DATA_SUCCESS,
            payload: { movies },
          });
        })
        .catch(() => {
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
      <MovieList movies={state.movies} />
    </main>
  );
}
