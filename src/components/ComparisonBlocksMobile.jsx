import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCongressCandidatesBlocks,
  selectPresidentialCandidatesBlocks,
  selectPresidentialElectionsCandidatesBlocks,
} from '../features/modal/modal-slice';
import { selectActiveTab } from '../features/nav/nav-slice';
import CandidatePhotoOverlay from './congress/CandidatePhotoOverlay';

function ComparisonBlocksMobile({ mainCandidate, secondaryCandidate }) {
  const activeTab = useSelector(selectActiveTab);
  const congressBlocks = useSelector(selectCongressCandidatesBlocks);
  const presidentialBlocks = useSelector(selectPresidentialCandidatesBlocks);
  const presidentialElectionsBlocks = useSelector(selectPresidentialElectionsCandidatesBlocks);
  const [blocks, setBlocks] = useState([]);

  const blocksChoices = {
    congreso: congressBlocks,
    consultas: presidentialElectionsBlocks,
    'elecciones-presidenciales': presidentialElectionsBlocks,
  };

  useEffect(() => {
    setBlocks(blocksChoices[activeTab]);
  }, [activeTab, congressBlocks, presidentialBlocks]);

  return (
    <>
      {blocks.map(([label, field, conf = {}], index) => {
        let mainCandidateFieldText = field && mainCandidate[field]
          ? <p>{mainCandidate[field]}</p>
          : null;
        let secondaryCandidateFieldText = field && secondaryCandidate && secondaryCandidate[field]
          ? <p>{secondaryCandidate[field]}</p>
          : null;
        let showTitle = true;
        if (conf.title) {
          showTitle = (conf.conditions || []).reduce((result, $field) => (
            result && !!mainCandidate[$field]
          ), true);
        }
        if (conf.separator && mainCandidateFieldText) {
          mainCandidateFieldText = mainCandidate[field].split(conf.separator)
            .map((text) => (
              <p key={text}>{text}</p>
            ));
        }
        if (conf.separator && secondaryCandidateFieldText) {
          secondaryCandidateFieldText = secondaryCandidate[field].split(conf.separator)
            .map((text) => (
              <p key={text}>{text}</p>
            ));
        }
        if (mainCandidateFieldText && !conf.separator && conf.readMore && conf.inline) {
          mainCandidateFieldText = <p><a href={mainCandidate[conf.readMore]} className="text-dodger-blue" target="_blank" rel="noopener noreferrer">{mainCandidate[field]}</a></p>;
        }
        if (secondaryCandidateFieldText && !conf.separator && conf.readMore && conf.inline) {
          secondaryCandidateFieldText = <p><a href={secondaryCandidate[conf.readMore]} className="text-dodger-blue" target="_blank" rel="noopener noreferrer">{secondaryCandidate[field]}</a></p>;
        }
        return (
        // eslint-disable-next-line react/no-array-index-key
          <div key={`block-${index}`} className="space-y-3">
            {conf.title && showTitle && (
            <h3 className="font-martin text-2xl uppercase text-jet leading-none mt-4 text-center">
              {label}
            </h3>
            )}
            {!conf.title && mainCandidateFieldText && (
            <p className={classNames('text-sm text-dim-gray text-center', {
              'mt-4': index > 0,
            })}
            >
              {label}
            </p>
            )}
            {field && (
            <div className="grid grid-cols-2">
              <div className="flex items-center space-x-2 border-r border-jet pr-4">
                <div className="relative w-10 flex-shrink-0">
                  <CandidatePhotoOverlay candidate={mainCandidate} />
                </div>
                <div className="text-xs">
                  {mainCandidateFieldText}
                  {conf.readMore && mainCandidate[conf.readMore] && !conf.inline && <p className="mt-2"><a href={mainCandidate[conf.readMore]} className="text-dodger-blue" target="_blank" rel="noopener noreferrer">Saber más</a></p>}
                </div>
              </div>
              {secondaryCandidate && (
                <div className="flex items-center space-x-2 pl-4">
                  <div className="relative w-10 flex-shrink-0">
                    <CandidatePhotoOverlay candidate={secondaryCandidate} />
                  </div>
                  <div className="text-xs">
                    {secondaryCandidateFieldText}
                    {conf.readMore && secondaryCandidate[conf.readMore] && !conf.inline && <p className="mt-2"><a href={secondaryCandidate[conf.readMore]} className="text-dodger-blue" target="_blank" rel="noopener noreferrer">Saber más</a></p>}
                  </div>
                </div>
              )}
            </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default ComparisonBlocksMobile;
