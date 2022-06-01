import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppCongress from './components/congress/AppCongress';
import AppHeader from './components/AppHeader';
import AppPresidential from './components/presidential/AppPresidential';
import Modal from './components/congress/Modal';
import ModalCoalitionWindow from './components/ModalCoalitionWindow';
import { selectCandidateById } from './features/candidates/candidates-slice';
import {
  selectMainModalWindow,
  selectShowCoalitionModalWindow,
  setSecondaryCandidate,
  toggleMainModalWindow,
} from './features/modal/modal-slice';
import { hideNav, selectActiveTab, selectTab } from './features/nav/nav-slice';
import useResize from './hooks/use-resize';
import AppPresidentialElection from './components/presidential/AppPresidentialElections';
import Survey from './components/Survey';
import { selectPresidentialCandidateById } from './features/presidential/presidential-slice';

function App() {
  const dispatch = useDispatch();
  const showMainModalWindow = useSelector(selectMainModalWindow);
  const showCoalitionModalWindow = useSelector(selectShowCoalitionModalWindow);
  const activeTab = useSelector(selectActiveTab);
  const featuredCandidate = useSelector(
    (state) => selectCandidateById(state, window.LSV_FEATURED_CANDIDATE_ID),
  );
  const gp = useSelector(
    (state) => selectPresidentialCandidateById(state, 'gustavo-petro-urrego'),
  );
  const rh = useSelector(
    (state) => selectPresidentialCandidateById(state, 'rodolfo-hernandez-suarez'),
  );

  useEffect(() => {
    if (featuredCandidate) {
      dispatch(toggleMainModalWindow(featuredCandidate));
    }
  }, [dispatch, featuredCandidate]);

  useEffect(() => {
    const search = window.location.search.substring(1);
    const tabMatch = search.match(/tab=([\w-]+)&?/);
    if (search.includes('headless')) {
      dispatch(hideNav(true));
    }
    if (tabMatch) {
      const [, tab] = tabMatch;
      if (['congreso', 'consultas', 'elecciones-presidenciales', 'ponderador'].includes(tab.toLowerCase())) {
        dispatch(selectTab(tab));
        if (tab.toLowerCase() === 'consultas') {
          dispatch(toggleMainModalWindow(gp));
          dispatch(setSecondaryCandidate(rh));
        }
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (showMainModalWindow || showCoalitionModalWindow) { document.body.classList.add('overflow-hidden'); } else document.body.classList.remove('overflow-hidden');
  }, [showMainModalWindow, showCoalitionModalWindow]);

  useResize();

  return (
    <>
      {showCoalitionModalWindow && <ModalCoalitionWindow />}
      {showMainModalWindow && <Modal />}
      <div className="px-8 mx-auto text-jet font-manrope">
        <AppHeader />
        {activeTab === 'congreso' && <AppCongress />}
        {activeTab === 'consultas' && <AppPresidential />}
        {activeTab === 'elecciones-presidenciales' && <AppPresidentialElection />}
        {activeTab === 'ponderador' && <Survey />}
      </div>
    </>
  );
}

export default App;
