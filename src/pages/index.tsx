import { useCallback, useState } from 'react';

import SearchBar from '../components/SearchBar';
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
    <main className="font-sans flex flex-col flex-grow justify-center p-24">
      <section className="pb-4">
        <h2 className="font-bold text-3xl text-gray-700">The Shoppies</h2>
      </section>
      <section className="pb-4">
        <SearchBar onSearchHandler={onSearchHandler} />
      </section>
    </main>
  );
}
