/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const coalitions = {
  'Pacto Histórico':
    'Nació en julio de 2021 como una invitación de Gustavo Petro a otros movimientos. Inicialmente recogió a los partidos de izquierda, varios sindicatos y organizaciones sociales de afros e indígenas. Luego ha buscado atraer a políticos liberales y sectores cristianos. Todos se han aglutinado bajo el liderazgo de Petro, quien propone un cambio profundo del modelo económico. Lanzó una lista cerrada al Senado y varias a Cámara. Su plataforma incluye propuestas de intervención estatal fuerte en la economía para superar la desigualdad y la pobreza.',
  'Centro Esperanza':
    'Nació en julio de 2021 como una alianza de políticos independientes, disidentes del liberalismo y miembros del partido Verde. Hacia finales del año incorporó a Alejandro Gaviria e Ingrid Betancourt, que luego se salió. Propone una política alejada de la polarización y afirma ser una alternativa al uribismo y al petrismo. Lanzó una lista al Senado y varias a la Cámara. Es una plataforma de centro izquierda, que propone un reformismo gradual, con un Estado activo en la regulación de los mercados, pero respetuoso de la libre empresa.',
  'Equipo por Colombia':
    'Nació en noviembre del 2021 como una alianza de políticos con experiencia de gobierno en gobiernos regionales. Es la alianza que cuenta con el apoyo de la mayoría de los partidos tradicionales. La mayoría de sus integrantes apoyaron al Gobierno Duque e ideológicamente son los más conservadores. Sin embargo, tomaron la decisión crucial de no incorporar al Centro Democrático a la coalición. Se han perfilado como buenos ejecutores, y defensores de la democracia ante las amenazas del populismo.',
};

const initialState = {
  showMainModalWindow: false,
  showComparisonModalWindow: false,
  showCoalitionModalWindow: false,
  selectedCoalition: {
    label: '',
    description: '',
  },
  blocks: {
    congress: [
      ['A Presidencia apoya a', 'supportedPresidentialCandidate'],
      ['Apoyo u oposición a Gobierno Duque', 'positionTowardsGovernment'],
      ['Nivel de estudios', 'educationalLevel'],
      ['Líos o cuestionamientos', 'hasQuestioning'],
      ['Experiencia más alta en el Estado', 'hasExperienceInNation'],
    ],
    presidential: [
      ['Voto en el Plebiscito', 'voteInThePlebiscite'],
      ['Despenalización total del aborto', 'decriminalizingAbortion'],
      ['Máximo de personas que ha tenido a cargo', 'maximumNumberOfDependents'],
      [
        'Ha tenido la responsabilidad de tomar decisiones determinantes para el país',
        'responsibilityForDecisiveDecisionsForTheCountry',
      ],
      ['Apoyo u oposición a Gobierno Duque', 'oppositionOrSupportToGovernment'],
      ['Subir el impuesto al patrimonio', 'raisingTheWealthTax'],
      ['Máximo cargo en el Ejecutivo', 'highestPositionInTheExecutive'],
      [
        'Popularidad con la que terminó el último cargo en el Ejecutivo',
        'mostRecentFavorability',
      ],
      [
        'Máximo cargo en el sector privado',
        'highestPositionInThePrivateSector',
      ],
      ['Apoyó el Paro', 'supportedTheStrike'],
      [
        'Obligar a funcionarios públicos a vacunarse',
        'forcingPublicOfficialsToGetVaccinated',
      ],
    ],
    presidentialElections: [
      ['Qué propone', null, { title: true, conditions: ['majorProposals', 'lieMesaure'] }],
      ['Sus propuestas bomba:', 'majorProposals', { separator: '\n', readMore: 'majorProposalsAbout' }],
      ['Carretómetro a su bandera', 'lieMesaure', { readMore: 'lieMeasureAbout', inline: true }],
      ['Cómo gobernó', null, { title: true, conditions: ['favorabilityAsMajor', 'governWith', 'frameOfMind', 'management', 'relationWithOtherPowers', 'achievements', 'video', 'governAbout'] }],
      ['Favorabilidad al final de su alcaldía', 'favorabilityAsMajor'],
      ['Gobernó con', 'governWith'],
      ['Talante', 'frameOfMind'],
      ['Gerencia', 'management'],
      ['Relación con otros poderes', 'relationWithOtherPowers'],
      ['Logros', 'achievements', { separator: '\n' }],
      ['', '', { embed: 'video' }],
      ['', '', { readMore: 'governAbout' }],
      ['Sombras', null, { title: true, conditions: ['greaterMole', 'riskOf'] }],
      ['Su mayor lunar', 'greaterMole', { readMore: 'greaterMoleAbout', inline: true }],
      ['Encarna el riesgo de', 'riskOf', { readMore: 'riskOfAbout', inline: true }],
      ['¿Qué piensa?', null, { title: true }],
      ['Voto en el plebiscito', 'voteInThePlebiscite'],
      ['Fallo sobre el aborto', 'rulingOnAbortion'],
      ['Subir el impuesto al patrimonio', 'raisingTheWealthTax'],
      ['Apoyó el Paro', 'supportedTheStrike'],
    ],
  },
  candidates: {
    main: '',
    secondary: '',
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleMainModalWindow(state, action) {
      if (!action.payload) {
        state.showMainModalWindow = false;
        state.candidates.main = undefined;
        state.candidates.secondary = undefined;
        state.showComparisonModalWindow = false;
      } else {
        state.showMainModalWindow = true;
        state.candidates.main = action.payload;
      }
    },
    toggleComparisonModalWindow(state) {
      state.showComparisonModalWindow = !state.showComparisonModalWindow;
      state.candidates.secondary = undefined;
    },
    setSecondaryCandidate(state, action) {
      if (!state.showComparisonModalWindow) {
        state.showComparisonModalWindow = true;
      }
      state.candidates.secondary = action.payload;
    },
    toggleCoalitionModalWindow(state, action) {
      state.showCoalitionModalWindow = !state.showCoalitionModalWindow;
      if (!action.payload) {
        state.selectedCoalition = { label: '', description: '' };
      } else {
        state.selectedCoalition.label = action.payload;
        state.selectedCoalition.description = coalitions[action.payload];
      }
    },
  },
});

export const {
  toggleMainModalWindow,
  toggleComparisonModalWindow,
  setSecondaryCandidate,
  toggleCoalitionModalWindow,
} = modalSlice.actions;

export const selectMainModalWindow = (state) => state.modal.showMainModalWindow;

export const selectMainCandidate = (state) => state.modal.candidates.main;

export const selectSecondaryCandidate = (state) => state.modal.candidates.secondary;

export const selectComparisonModalWindow = (state) => state.modal.showComparisonModalWindow;

export const selectCongressCandidatesBlocks = (state) => state.modal.blocks.congress;

export const selectPresidentialCandidatesBlocks = (state) => state.modal.blocks.presidential;

export const selectPresidentialElectionsCandidatesBlocks = (state) => state
  .modal.blocks.presidentialElections;

export const selectShowCoalitionModalWindow = (state) => state.modal.showCoalitionModalWindow;

export const selectSelectedCoalition = (state) => state.modal.selectedCoalition;

export default modalSlice.reducer;
