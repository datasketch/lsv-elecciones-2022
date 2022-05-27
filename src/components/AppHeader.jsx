import { useSelector } from 'react-redux';
import { selectActiveTab, selectHideNav } from '../features/nav/nav-slice';
import AppNav from './AppNav';

function AppHeader() {
  const hideNav = useSelector(selectHideNav);
  const activeTab = useSelector(selectActiveTab);
  return (
    <>
      <div className="max-w-md mx-auto pt-6">
        <img
          className="max-w-full mx-auto"
          src="/logo-elecciones-2022.svg"
          alt=""
        />
      </div>
      {!hideNav && (
        <div className="mx-auto max-w-xs mt-6 md:max-w-5xl">
          <AppNav />
        </div>
      )}
      <div className="max-w-xl mx-auto text-center mt-6 text-sm">
        {activeTab === 'consultas' && (
          <>
            <p className="text-lg">
              Haga click y compare cómo gobernaron, sus propuestas y sus lunares
            </p>
            {/* <p className="italic mt-4">
              Haga click en los candidatos y empiece a compararlos
            </p> */}
          </>
        )}
        {activeTab === 'congreso' && (
          <p>
            Acá puede conocer y comparar los
            {' '}
            candidatos electos a Cámara y Senado, de todas las circunscripciones y los partidos
          </p>
        )}
      </div>
      <div className="border-t-2 border-jet mt-6" />
    </>
  );
}

export default AppHeader;
