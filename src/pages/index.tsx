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

  const { dispatch } = useMoviesContext();

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
    <div className="flex flex-col flex-grow font-sans">
      <section className="flex p-8 justify-between align-middle">
        <span className="flex-initial">
          <h2 className="font-bold text-3xl text-gray-700">The Shoppies</h2>
        </span>
        <span className="justify-end pt-2">
          <Link href="/">
            <span className="border-b-2 border-transparent mr-4 hover:border-gray-200">
              <a className="text-base tracking-wider uppercase">Search</a>
            </span>
          </Link>
          <Link href="/nominations">
            <span className="border-b-2 border-transparent ml-4 hover:border-gray-200">
              <a className="text-base tracking-wider uppercase">Nominations</a>
            </span>
          </Link>
        </span>
      </section>
      <main className="flex flex-col flex-grow justify-center p-12 pt-0 transition ease-in-out duration-500">
        <SearchBar onSearchHandler={onSearchHandler} />
        <MovieList />
      </main>
    </div>
  );
}
