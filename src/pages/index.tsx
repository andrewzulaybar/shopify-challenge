import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useCallback, useRef, useState } from 'react';

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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [totalResults, setTotalResults] = useState<number>(0);
  const nextPageButtonRef = useRef(null);

  const { state, dispatch } = useMoviesContext();

  const findMovies = useCallback(
    (params: Query, oldMovies: MovieDTO[]) => {
      OMDBService.findMovies(params)
        .then((response) => {
          setTotalResults(Number(response.totalResults));
          setHomeState(HomeState.RESULTS);
          dispatch({
            type: DispatchAction.DATA_SUCCESS,
            payload: { movies: [...oldMovies, ...response.Search] },
          });
        })
        .catch((err) => {
          setTotalResults(0);
          setErrorMessage(err.message);
          setHomeState(HomeState.RESULTS);
          dispatch({
            type: DispatchAction.DATA_FAILURE,
            payload: { movies: [] },
          });
        });
    },
    [dispatch]
  );

  const onGetNextPageHandler = useCallback(() => {
    const newPage = page + 1;
    setPage(newPage);

    const params: Query = {
      dataType: 'json',
      page: newPage,
      title: searchTerm,
      type: MovieType.Movie,
    };
    findMovies(params, state.movies);
  }, [findMovies, page, searchTerm, state.movies]);

  const onSearchHandler = useCallback(
    (title: string) => {
      setPage(1);
      setSearchTerm(title);

      setHomeState(HomeState.LOADING);
      dispatch({ type: DispatchAction.DATA_LOAD });

      const params: Query = {
        dataType: 'json',
        page: 1,
        title,
        type: MovieType.Movie,
      };
      findMovies(params, []);
    },
    [dispatch, findMovies]
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
            <div className="flex flex-col w-full">
              <MovieList movies={state.movies} />
              {state.movies.length > 0 && (
                <Button
                  className="self-center"
                  shape="circle"
                  size="large"
                  ref={nextPageButtonRef}
                  disabled={page >= totalResults / 10}
                  icon={<DownOutlined />}
                  onClick={onGetNextPageHandler}
                />
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
