import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppCongress from './components/AppCongress';
import AppHeader from './components/AppHeader';
import AppPresidential from './components/AppPresidential';
import Modal from './components/congress/Modal';
import ModalCoalitionWindow from './components/ModalCoalitionWindow';
import { selectCandidateById } from './features/candidates/candidates-slice';
import {
  selectComparisonModalWindow,
  selectMainModalWindow,
  selectShowCoalitionModalWindow,
  toggleMainModalWindow,
} from './features/modal/modal-slice';
import { hideNav, selectActiveTab, selectTab } from './features/nav/nav-slice';
import useResize from './hooks/use-resize';

function App() {
  const dispatch = useDispatch();
  const showMainModalWindow = useSelector(selectMainModalWindow);
  const showCoalitionModalWindow = useSelector(selectShowCoalitionModalWindow);
  const showComparisonModalWindow = useSelector(selectComparisonModalWindow)
  const activeTab = useSelector(selectActiveTab);
  const featuredCandidate = useSelector((state) =>
    selectCandidateById(state, window.LSV_FEATURED_CANDIDATE_ID)
  );

  const { width } = useResize();

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
      if (['congreso', 'consultas'].includes(tab.toLowerCase())) {
        dispatch(selectTab(tab));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if ((!showMainModalWindow && !showComparisonModalWindow && !showCoalitionModalWindow) || (showComparisonModalWindow && width < 768)) {
      document.body.classList.remove('overflow-hidden');
    } else {
      document.body.classList.add('overflow-hidden');
    }
  }, [showMainModalWindow, showCoalitionModalWindow, showComparisonModalWindow, width]);

  return (
    <>
      {showCoalitionModalWindow && <ModalCoalitionWindow />}
      {showMainModalWindow && <Modal />}
      <div className="px-8 mx-auto text-jet font-manrope">
        <AppHeader />
        {activeTab === 'congreso' ? <AppCongress /> : <AppPresidential />}
      </div>
    </>
  );
}

export default App;
