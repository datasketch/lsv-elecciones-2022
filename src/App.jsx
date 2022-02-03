import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from './components/AppHeader';
import CandidateList from './components/CandidateList';
import Filters from './components/Filters';
import Modal from './components/Modal';
import { selectCandidateById } from './features/candidates/candidates-slice';
import { selectModal, showCandidateCard } from './features/modal/modal-slice';

function App() {
  const showModal = useSelector(selectModal);
  const dispatch = useDispatch();
  const featuredCandidate = useSelector((state) =>
    selectCandidateById(state, window.LSV_FEATURED_CANDIDATE_ID)
  );

  useEffect(() => {
    if (featuredCandidate) {
      dispatch(showCandidateCard(featuredCandidate));
    }
  }, [dispatch, featuredCandidate]);

  return (
    <>
      {showModal && <Modal />}
      <div className="container mx-auto">
        <AppHeader />
        <Filters />
        <CandidateList />
      </div>
    </>
  );
}

export default App;
