/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import candidates from '../../data/presidential.json';

const candidatesData = candidates.map((c) => ({ ...c, highlight: true }));

const getCategories = (data, key) => Array.from(
  new Set(
    data
      .map((record) => record[key])
      .filter((r) => r)
      .sort(),
  ),
);

function normalizeStr(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function highlightCandidates(state) {
  return state.filtered.map((c) => ({
    ...c,
    highlight: Object.entries(state.filters).every(
      ([filterKey, filterValue]) => {
        const candidateValue = c[filterKey];
        if (Array.isArray(filterValue)) { return filterValue.includes(candidateValue); }
        return typeof candidateValue === 'object'
          ? candidateValue.label.includes(filterValue)
          : normalizeStr(candidateValue).includes(normalizeStr(filterValue));
      },
    ),
  }));
}

const presidentialSlice = createSlice({
  name: 'presidential',
  initialState: {
    all: candidatesData,
    filtered: candidatesData,
    filters: {
      supportedTheStrike: '',
      raisingTheWealthTax: '',
      oppositionOrSupportToGovernment: '',
      voteInThePlebiscite: '',
      responsibilityForDecisiveDecisionsForTheCountry: '',
    },
    grouped: candidates.reduce((result, candidate) => {
      result[candidate.coalition] = result[candidate.coalition] || [];
      result[candidate.coalition].push(candidate);
      return result;
    }, {}),
  },
  reducers: {
    filterBySupportToStrike(state, action) {
      state.filters.supportedTheStrike = action.payload;
      state.filtered = highlightCandidates(state);
    },
    filterByRaiseToWealthTax(state, action) {
      state.filters.raisingTheWealthTax = action.payload;
      state.filtered = highlightCandidates(state);
    },
    filterByOppositionOrSupportToGovernment(state, action) {
      state.filters.oppositionOrSupportToGovernment = action.payload;
      state.filtered = highlightCandidates(state);
    },
    filterByVoteInPlebiscite(state, action) {
      state.filters.voteInThePlebiscite = action.payload;
      state.filtered = highlightCandidates(state);
    },
    filterByResponsibilityForDecisiveDecisionsForTheCountry(state, action) {
      state.filters.responsibilityForDecisiveDecisionsForTheCountry = action.payload;
      state.filtered = highlightCandidates(state);
    },
  },
});

export const {
  filterBySupportToStrike,
  filterByRaiseToWealthTax,
  filterByOppositionOrSupportToGovernment,
  filterByVoteInPlebiscite, filterByResponsibilityForDecisiveDecisionsForTheCountry,
} = presidentialSlice.actions;

export const selectAllPresidentialCandidates = (state) => state.presidential.filtered;

export const selectPresidentialCandidatesWithCoalition = (state) => ({
  'Pacto Histórico': state.presidential.all.filter(
    (c) => c.coalition === 'Pacto Histórico',
  ),
  'Centro Esperanza': state.presidential.all.filter(
    (c) => c.coalition === 'Centro Esperanza',
  ),
  'Equipo por Colombia': state.presidential.all.filter(
    (c) => c.coalition === 'Equipo por Colombia',
  ),
});

export const selectPresidentialCandidatesWithoutCoalition = (state) => state.presidential.all.filter((c) => c.coalition === 'No consulta');

export const selectSortedPresidentialCandidates = (state) => state.presidential.all
  .slice()
  .sort((a, b) => {
    if (a.fullname.toLowerCase() > b.fullname.toLowerCase()) return 1;
    if (a.fullname.toLowerCase() < b.fullname.toLowerCase()) return -1;
    return 0;
  });

export const selectSupportToStrike = (state) => getCategories(state.presidential.all, 'supportedTheStrike').filter((record) => record.toLowerCase() !== 'sin datos');

export const selectRaiseWealthTax = (state) => getCategories(state.presidential.all, 'raisingTheWealthTax').filter((record) => record.toLowerCase() !== 'sin datos');

export const selectOppositionOrSupportToGovernment = (state) => getCategories(state.presidential.all, 'oppositionOrSupportToGovernment').filter((record) => record.toLowerCase() !== 'sin datos');

export const selectVoteInPlebiscite = (state) => getCategories(state.presidential.all, 'voteInThePlebiscite').filter((record) => record.toLowerCase() !== 'sin datos');

export const selectResponsibilityForDecisiveDecisionsForTheCountry = (state) => getCategories(state.presidential.all, 'responsibilityForDecisiveDecisionsForTheCountry').filter((record) => record.toLowerCase() !== 'sin datos');

export default presidentialSlice.reducer;
