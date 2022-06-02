import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import PoweredBy from '../PoweredBy';
import { toggleMainModalWindow } from '../../features/modal/modal-slice';
import { selectAllPresidentialCandidates } from '../../features/presidential/presidential-slice';
import Carousel from './Carousel';
// import FiltersSection from './FilterSection';

function AppPresidentialElection() {
  const dispatch = useDispatch();
  const candidates = useSelector(selectAllPresidentialCandidates);

  function handleImageError(e) {
    e.target.src = 'https://www.lasillavacia.com/media/candidato-nn-h.jpg';
  }

  return (
    <>
      {/* <FiltersSection /> */}
      <div className="py-8 max-w-5xl mx-auto grid grid-cols-2 gap-6 lg:gap-12 justify-center">
        {candidates.map((candidate) => (
          <button
            className={classNames('inline-flex flex-col w-48 mx-auto items-center', {
              'opacity-25': !candidate.highlight,
            })}
            key={candidate.id}
            onClick={() => dispatch(toggleMainModalWindow(candidate))}
            type="button"
          >
            <img
              src={candidate.photo}
              className="max-w-full h-48"
              alt={candidate.fullname}
              onError={handleImageError}
            />
            <span className="text-2xl uppercase leading-tight font-martin">{candidate.fullname}</span>
          </button>
        ))}
      </div>
      <Carousel />
      <PoweredBy />
    </>
  );
}

export default AppPresidentialElection;
