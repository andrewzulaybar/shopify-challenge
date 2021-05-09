import { useCallback, useState } from 'react';

import NominatedList from '../components/NominatedList';
import { DispatchAction, useMoviesContext } from '../contexts/MoviesContext';
import { MovieDTO } from '../services/OMDBService';

export default function NominationsPage() {
  const { state, dispatch } = useMoviesContext();

  const [modifiedList, setModifiedList] = useState<Set<MovieDTO>>(new Set());
  const [movieList, setMovieList] = useState<MovieDTO[]>(
    Array.from(state.nominated)
  );

  const addMovie = useCallback(
    (movie: MovieDTO) => {
      setMovieList([...movieList, movie]);

      const modifiedMovies = new Set(modifiedList);
      modifiedMovies.delete(movie);
      setModifiedList(modifiedMovies);
    },
    [modifiedList, movieList]
  );

  const removeMovie = useCallback(
    (movie: MovieDTO) => {
      const newMovies = [...movieList];
      newMovies.splice(newMovies.indexOf(movie), 1);
      setMovieList(newMovies);

      const modifiedMovies = new Set(modifiedList).add(movie);
      setModifiedList(modifiedMovies);
    },
    [modifiedList, movieList]
  );

  const updateNominationList = () => {
    dispatch({
      type: DispatchAction.UPDATE_NOMINATIONS,
      payload: { movies: movieList },
    });
  };

  return (
    <>
      {modifiedList.size > 0 && (
        <div className="flex flex-row justify-end px-8 w-full">
          <button
            className="bg-blue-400 border-2 border-blue-400 font-semibold p-2 px-4 rounded-3xl text-lg text-white 
            transition ease-in-out duration-500 
            focus:outline-none hover:bg-white hover:border-blue-400 hover:text-blue-400"
            onClick={updateNominationList}
          >
            Update Nominations
          </button>
        </div>
      )}
      <NominatedList
        movies={Array.from(state.nominated)}
        onNominate={addMovie}
        onRemoveNomination={removeMovie}
      />
    </>
  );
}
