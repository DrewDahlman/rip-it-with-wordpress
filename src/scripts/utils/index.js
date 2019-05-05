/**
 * @param {String} selector : The selector to query
 * @param {Element} context : The element to search within.
 */
export let q = function q(selector, context) {
  return (context || document).querySelector(selector);
};

/**
 * @param {String} selector : The selector to query
 * @param {Element} context : The element to search within.
 */
export let qAll = function qAll(selector, context) {
  return (context || document).querySelectorAll(selector);
};