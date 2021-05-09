import { DispatchAction, useMoviesContext } from '../contexts/MoviesContext';

type MovieProps = {
  id: string;
  imgUrl: string;
  title: string;
  year: string;
};

export default function Movie(props: MovieProps) {
  const { state, dispatch } = useMoviesContext();

  const isNominated = state.nominated.has(props.id);

  const buttonClasses = () => {
    const buttonClasses = 'border-2 font-semibold mb-2 p-1 rounded-2xl w-full';
    const onButtonFocus = 'focus:outline-none';
    const baseClasses = [buttonClasses, onButtonFocus];

    const onButtonHover =
      'hover:border-blue-400 hover:text-blue-400 transition ease-in-out duration-500';
    const notNominated = 'bg-white text-gray-500';
    const isNotNominatedClasses = [onButtonHover, notNominated];

    const onButtonDisabledHover = 'opacity-75';
    const nominated = 'bg-blue-500 border-blue-500 text-white';
    const isNominatedClasses = [onButtonDisabledHover, nominated];

    return [
      ...baseClasses,
      ...(isNominated ? isNominatedClasses : isNotNominatedClasses),
    ].join(' ');
  };

  const onAddNomination = (id: string) => {
    dispatch({ type: DispatchAction.ADD_NOMINATION, payload: { id } });
  };

  return (
    <div className="p-4 rounded-xl w-full">
      <div className="mb-4">
        <img
          src={props.imgUrl}
          className="h-64 object-cover rounded-lg w-full"
        />
      </div>
      <div className="description w-full">
        <button
          onClick={() => onAddNomination(props.id)}
          className={buttonClasses()}
          disabled={isNominated}
        >
          {isNominated ? 'Nominated' : 'Nominate'}
        </button>
        <h2 className="leading-6 mb-0 text-lg">{props.title}</h2>
        <p className="text-sm text-gray-400">{props.year}</p>
      </div>
    </div>
  );
}
