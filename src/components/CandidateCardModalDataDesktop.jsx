import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCongressCandidatesBlocks,
  // selectPresidentialCandidatesBlocks,
  selectPresidentialElectionsCandidatesBlocks,
} from '../features/modal/modal-slice';
import { selectActiveTab } from '../features/nav/nav-slice';

function CandidateCardModalDataDesktop({ candidate }) {
  const activeTab = useSelector(selectActiveTab);
  const congressBlocks = useSelector(selectCongressCandidatesBlocks);
  // const presidentialBlocks = useSelector(selectPresidentialCandidatesBlocks);
  const presidentialElectionsBlocks = useSelector(selectPresidentialElectionsCandidatesBlocks);
  const [blocks, setBlocks] = useState([]);

  const blocksChoices = {
    congreso: congressBlocks,
    // consultas: presidentialBlocks,
    consultas: presidentialElectionsBlocks,
    'elecciones-presidenciales': presidentialElectionsBlocks,
  };

  useEffect(() => {
    setBlocks(blocksChoices[activeTab]);
  }, [activeTab, congressBlocks, presidentialElectionsBlocks]);

  return (
    <>
      {blocks.map(([label, field, conf = {}], index) => {
        let fieldText = field && candidate[field] ? <p>{candidate[field]}</p> : null;
        if (conf.separator && fieldText) {
          fieldText = candidate[field].split(conf.separator).map((text) => (
            <p key={text}>{text}</p>
          ));
        }
        if (fieldText && !conf.separator && conf.readMore && conf.inline) {
          fieldText = <p><a href={candidate[conf.readMore]} className="text-dodger-blue" target="_blank" rel="noopener noreferrer">{candidate[field]}</a></p>;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={index}>
            {conf.title && (
            <h3 className={classNames('font-martin text-2xl uppercase text-jet border-l-2 border-jet pl-2 leading-none', {
              'mt-8': index > 0,
            })}
            >
              {label}
            </h3>
            )}
            {!conf.title && fieldText && (
            <p className={classNames('text-dim-gray', {
              'mt-4': index > 0,
            })}
            >
              {label}
            </p>
            )}
            {fieldText}
            {conf.embed && candidate[conf.embed] && (
            <div
              className="mt-4 flex items-center justify-center"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: candidate[conf.embed],
              }}
            />
            )}
            {conf.readMore && candidate[conf.readMore] && !conf.inline && <p className="mt-2"><a href={candidate[conf.readMore]} className="text-dodger-blue" target="_blank" rel="noopener noreferrer">Saber más</a></p>}
          </React.Fragment>
        );
      })}
      {activeTab === 'consultas' && candidate.vicepresident && (
        <>
          <p className="font-martin text-2xl uppercase text-jet border-l-2 border-jet pl-2 leading-none mt-8">Fórmula vicepresidencial</p>
          <div className="flex items-center mt-4 mb-8 space-x-2">
            <img
              className="w-20 h-20 max-w-full object-cover object-center"
              src={candidate.vicepresidentPhoto}
              alt=""
            />
            <div>
              <p className="text-base">{candidate.vicepresident}</p>
              {candidate.vicepresidentProfileLink
              && (
              <a href={candidate.vicepresidentProfileLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 border border-black uppercase text-xxs py-0 px-4 mr-2">
                Ver perfil
              </a>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CandidateCardModalDataDesktop;
