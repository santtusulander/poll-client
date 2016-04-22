/*eslint no-undef: 0*/

import { fetchFromApi } from '../helpers/api';

export const PollApiActionTypes = [
  'POLL/MUTATE_REQUEST',
  'POLL/MUTATE_FAILURE'
];
export const StoreMutateSuccess = 'POLL/MUTATE_SUCCESS';
export const SpecialActionTypes = {
  CREATE_CHOICE: 'POLL/CREATE_CHOICE',
  CREATE_TITLE: 'POLL/CREATE_TITLE',
  GET_LIMITED: 'POLL/GET_LIMITED',
  VOTE_SUCCESS: 'POLL/VOTE_SUCCESS'
};

/**
 *
 * @param {string} choice
 * @param {string} pollID
 * @returns {Object}
 */
export function vote(choice, pollID) {
  const body = JSON.stringify({ choice_id: choice });
  const init = { method: 'POST', body };
  return {
    types: [...PollApiActionTypes, SpecialActionTypes.VOTE_SUCCESS],
    callApi: () => fetchFromApi(`poll/${pollID}/vote`, init)
  };
}

/**
 *
 * @param {string} choice
 * @returns {Object}
 */
export function createChoice(choice) {
  return {
    type: [SpecialActionTypes.CREATE_CHOICE],
    data: choice
  };
}

/**
 *
 * @param {string} title
 * @returns {Object}
 */
export function createTitle(title) {
  return {
    type: [SpecialActionTypes.CREATE_TITLE],
    data: title
  };
}

/**
 *
 * @param {Object} poll
 * @returns {Object}
 */
export function create(poll) {
  const init = { method: 'POST', body: JSON.stringify(poll) };
  return {
    types: [...PollApiActionTypes, StoreMutateSuccess],
    callApi: () => fetchFromApi('poll', init)
  };
}

/**
 *
 * @param {string }pollID
 * @returns {Object}
 */
export function get(pollID) {
  const init = { method: 'GET' };
  return {
    types: [...PollApiActionTypes, SpecialActionTypes.GET_LIMITED],
    callApi: () => fetchFromApi(`poll/${pollID}`, init)
  };
}

/**
 *
 * @param {string} pollID
 * @returns {Object}
 */
export function getWithResults(pollID) {
  const init = { method: 'GET' };
  return {
    types: [...PollApiActionTypes, StoreMutateSuccess],
    callApi: () => fetchFromApi(`poll/${pollID}/results`, init)
  };
}
