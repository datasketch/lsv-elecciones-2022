import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import PoweredBy from '../PoweredBy';
import { toggleMainModalWindow } from '../../features/modal/modal-slice';
import { selectAllPresidentialCandidates } from '../../features/presidential/presidential-slice';
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
      <div className="py-8 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-12 justify-center">
        {candidates.map((candidate) => (
          <button
            className={classNames('inline-flex flex-col w-40 mx-auto items-center', {
              'opacity-25': !candidate.highlight,
            })}
            key={candidate.id}
            onClick={() => dispatch(toggleMainModalWindow(candidate))}
            type="button"
          >
            <img
              src={candidate.photo}
              className="max-w-full h-40"
              alt={candidate.fullname}
              onError={handleImageError}
            />
            <span className="text-xs leading-tight">{candidate.fullname}</span>
          </button>
        ))}
      </div>
      <PoweredBy />
    </>
  );
}

export default AppPresidentialElection;
