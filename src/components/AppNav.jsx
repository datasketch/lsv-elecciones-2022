import { useDispatch, useSelector } from 'react-redux';
import { setSecondaryCandidate, toggleMainModalWindow } from '../features/modal/modal-slice';
import { selectActiveTab, selectTab } from '../features/nav/nav-slice';
import { selectPresidentialCandidateById } from '../features/presidential/presidential-slice';
import AppButton from './AppButton';

function AppNav() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  const gp = useSelector(
    (state) => selectPresidentialCandidateById(state, 'gustavo-petro-urrego'),
  );
  const rh = useSelector(
    (state) => selectPresidentialCandidateById(state, 'rodolfo-hernandez-suarez'),
  );
  const handleClick = () => {
    dispatch(selectTab('consultas'));
    dispatch(toggleMainModalWindow(gp));
    dispatch(setSecondaryCandidate(rh));
  };
  return (
    <nav className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 md:justify-center">
      <AppButton
        label="Candidatos presidenciales"
        inverse={activeTab !== 'consultas'}
        onClick={handleClick}
      />
      <AppButton
        label="Ponderador de encuestas"
        inverse={activeTab !== 'ponderador'}
        onClick={() => dispatch(selectTab('ponderador'))}
      />
      <AppButton
        label="Jugar con Cupibot presidencial"
        inverse
        onClick={() => window.open('https://cupibot.lasillavacia.com', '_blank').focus()}
      />
      <AppButton
        label="Así quedó el Congreso"
        inverse={activeTab !== 'congreso'}
        onClick={() => dispatch(selectTab('congreso'))}
      />
      {/* <AppButton
        label="Elecciones Presidenciales"
        inverse={activeTab !== 'elecciones-presidenciales'}
        onClick={() => dispatch(selectTab('elecciones-presidenciales'))}
      /> */}
    </nav>
  );
}

export default AppNav;
