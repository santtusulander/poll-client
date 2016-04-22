/*eslint no-unused-vars: 0*/

import { fromJS, Map, List } from 'immutable';
import { createReducer } from '../helpers/store';
import {
  PollApiActionTypes,
  SpecialActionTypes,
  StoreMutateSuccess
} from '../actions/poll';

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
  state = state
    .set('isLoading', false)
    .set('title', action.data.title)
    .set('choices', List(action.data.choices))
    .set('id', action.data.id)
    .set('sanitized', true);
  switch (action.type) {
    case SpecialActionTypes.GET_LIMITED:
      break;
    case SpecialActionTypes.VOTE_SUCCESS:
      state = state.set('hasVoted', true);
      state = state.set('votes', List(action.data.votes));
      break;
    default:
      state = state.set('votes', List(action.data.votes));
      break;
  }
  return state;
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
 * Called when new poll attribute is being created.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleAttributeCreation(state, action) {
  switch (action.type[0]) {
    case SpecialActionTypes.CREATE_CHOICE:
      state = state.update('choices', choices => choices.push(action.data));
      break;
    case SpecialActionTypes.CREATE_TITLE:
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
  votes: List()
});

export const pollReducer = createReducer(initialState, {
  [StoreMutateSuccess]: handleMutateSuccess,
  [PollApiActionTypes[0]]: handleMutateRequest,
  [PollApiActionTypes[1]]: handleMutateFailure,
  [SpecialActionTypes.GET_LIMITED]: handleMutateSuccess,
  [SpecialActionTypes.VOTE_SUCCESS]: handleMutateSuccess,
  [SpecialActionTypes.CREATE_CHOICE]: handleAttributeCreation,
  [SpecialActionTypes.CREATE_TITLE]: handleAttributeCreation
});
