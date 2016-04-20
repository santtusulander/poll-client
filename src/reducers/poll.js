/*eslint no-unused-vars: 0*/

import { fromJS, Map, List } from 'immutable';
import { createReducer } from '../helpers/store';
import { PollActionTypes, PollApiActionTypes } from '../actions/poll';

/**
 * TODO: Create reducer for dirty data
 */

/**
 * Called when store mutation request is initiated.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleMutateRequest(state, action) {
  return state
    .set('isLoading', true)
    .delete('errorMessage');
}

/**
 * Called when store mutation request is successful.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleMutateSuccess(state, action) {
  return state
    .set('isLoading', false)
    .set('title', action.data.title)
    .set('choices', action.data.choices)
    .set('votes', action.data.votes);
}

/**
 * Called when store mutation request fails.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleMutateFailure(state, action) {
  return state
    .set('isLoading', false)
    .set('errorMessage', action.error);
}

/**
 * Called when store mutation request fails.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleAttributeCreation(state, action) {
  switch (action.type[0]) {
    case 'POLL/CREATE_CHOICE':
      state = state.update('choices', choices => choices.push(action.data));
      break;
    case 'POLL/CREATE_TITLE':
      state = state.set('title', action.data);
      break;
    default:
      break;
  }
  return state
    .delete('errorMessage');
}

const initialState = Map({
  choices: List(),
  votes: List(),
  title: ''
});

export const pollReducer = createReducer(initialState, {
  [PollApiActionTypes[0]]: handleMutateRequest,
  [PollApiActionTypes[1]]: handleMutateSuccess,
  [PollApiActionTypes[2]]: handleMutateFailure,
  [PollActionTypes.CREATE_CHOICE]: handleAttributeCreation,
  [PollActionTypes.CREATE_TITLE]: handleAttributeCreation
});
