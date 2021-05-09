import { useCallback, useState } from 'react';

import NominatedList from '../components/NominatedList';
import { DispatchAction, useMoviesContext } from '../contexts/MoviesContext';
import { MovieDTO } from '../services/OMDBService';

export default function NominationsPage() {
  const { state, dispatch } = useMoviesContext();

  const [modified, setModified] = useState<Set<MovieDTO>>(new Set());
  const [movieList, setMovieList] = useState<MovieDTO[]>(
    Array.from(state.nominated)
  );

  const addMovie = useCallback(
    (movie: MovieDTO) => {
      setMovieList([...movieList, movie]);

      const modifiedMovies = new Set(modified);
      modifiedMovies.delete(movie);
      setModified(modifiedMovies);
    },
    [modified, movieList]
  );

  const removeMovie = useCallback(
    (movie: MovieDTO) => {
      const newMovies = [...movieList];
      newMovies.splice(newMovies.indexOf(movie), 1);
      setMovieList(newMovies);

      const modifiedMovies = new Set(modified).add(movie);
      setModified(modifiedMovies);
    },
    [modified, movieList]
  );

  const updateNominationList = () => {
    dispatch({
      type: DispatchAction.UPDATE_NOMINATIONS,
      payload: { movies: movieList },
    });

    setModified(new Set());
  };

  const maximumMoviesToNominate = 5;
  const moviesLeftToNominate = maximumMoviesToNominate - movieList.length;

  let message = `You have ${moviesLeftToNominate} more ${
    moviesLeftToNominate === 1 ? 'movie' : 'movies'
  } left to nominate!`;
  if (moviesLeftToNominate === 0) {
    message = "You're all done!";
  } else if (moviesLeftToNominate < 0) {
    message = `Please remove ${-moviesLeftToNominate} ${
      -moviesLeftToNominate === 1 ? 'movie' : 'movies'
    }!`;
  }

  return (
    <div className="px-12 pb-12">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center mb-2">
          <h2 className="font-semibold mb-0 text-3xl">Nominated Movies</h2>
          {modified.size > 0 && (
            <button
              className="bg-blue-400 border-2 border-blue-400 font-semibold py-1 px-4 rounded-3xl text-base text-white 
                transition ease-in-out duration-500 
                focus:outline-none hover:bg-white hover:border-blue-400 hover:text-blue-400"
              onClick={updateNominationList}
            >
              Update Nominations
            </button>
          )}
        </div>
        <p className="text-sm">
          Manage the list of movies you believe should be up for nomination. You
          can have a <strong>maximum of 5 nominees</strong>. {message}
        </p>
      </div>
      <NominatedList
        movies={Array.from(state.nominated)}
        onNominate={addMovie}
        onRemoveNomination={removeMovie}
      />
    </div>
  );
}
