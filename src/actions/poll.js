/*eslint no-undef: 0*/

import { fetchFromApi } from '../helpers/api';

export const PollApiActionTypes = [
  'POLL/MUTATE_REQUEST',
  'POLL/MUTATE_SUCCESS',
  'POLL/MUTATE_FAILURE'
];

export const PollActionTypes = {
  CREATE_CHOICE: 'POLL/CREATE_CHOICE',
  CREATE_TITLE: 'POLL/CREATE_TITLE'
};

/**
 *
 * @param {string} username
 * @param {string }password
 * @returns {Object}
 */
export function vote(choice, pollID) {
  const init = { method: 'POST', body: { choice_id: choice } };
  return {
    types: PollApiActionTypes,
    callApi: () => fetchFromApi(`poll/${pollID}/vote`, init)
  };
}

/**
 *
 * @param {string} username
 * @param {string }password
 * @returns {Object}
 */
export function createChoice(choice) {
  return {
    type: [PollActionTypes.CREATE_CHOICE],
    data: choice
  };
}

/**
 *
 * @param {string} username
 * @param {string }password
 * @returns {Object}
 */
export function createTitle(title) {
  return {
    type: [PollActionTypes.CREATE_TITLE],
    data: title
  };
}

/**
 *
 * @param {string} username
 * @param {string }password
 * @returns {Object}
 */
export function create(poll) {
  const init = { method: 'POST', body: poll };
  return {
    types: PollApiActionTypes,
    callApi: () => fetchFromApi('poll', init)
  };
}

/**
 *
 * @param {string} username
 * @param {string }password
 * @returns {Object}
 */
export function get(pollID) {
  const init = { method: 'GET' };
  return {
    types: PollApiActionTypes,
    callApi: () => fetchFromApi(`poll/${pollID}`, init)
  };
}

/**
 *
 * @param {string} username
 * @param {string }password
 * @returns {Object}
 */
export function getWithResults(pollID) {
  const init = { method: 'GET' };
  return {
    types: PollApiActionTypes,
    callApi: () => fetchFromApi(`poll/${pollID}/results`, init)
  };
}
