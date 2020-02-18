/**
 * URL query param helper
 * Check for params in URL and return all as object
 *
 * @param query     String  URL params string starting with ?
 * @returns {{}}   Object  Return all params in for of object
 */
const getQueryStringParams = query => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
      .split('&')
      .reduce((params, param) => {
          let [key, value] = param.split('=');
          params[key] = value ? decodeURIComponent(value) : '';
          return params;
        }, {}
      )
    : {}
};

export default getQueryStringParams;
