/*eslint consistent-return: 0*/
/*eslint no-undef: 0*/

import { isUndefined } from 'lodash';

if (isUndefined(API_URL)) {
  throw new Error('API_URL must be set.');
}

/**
 *
 * @param {string} url
 * @param {Object} init
 * @param {function} dispatch
 * @returns {Object} response
 * @returns {Error} err
 */
export function fetchFromApi(url, init) {
  fetch(buildRequest(url, init))
    .then(response => response)
    .catch(err => err);
}

/**
 *
 * @param {string} url
 * @param {Object} init
 * @returns {Request}
 */
export function buildRequest(url, init) {
  const request = new Request(buildApiUrl(url), { ...init, mode: 'cors' });
  request.headers.set('Accept', 'application/json');
  return request;
}

/**
 *
 * @param {string} url
 * @returns {string}
 */
function buildApiUrl(url) {
  return [API_URL, url].join('/');
}
