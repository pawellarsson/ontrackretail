import getQueryStringParams from '../../helpers/urlQuery/urlQuery';

const APIURL = 'http://nyx.vima.ekt.gr:3000/';

/**
 * Fetch books service
 * Will call API with pre-set values or user defined
 *
 * @param pageNumber    Number  Page number to get
 * @param searchString  String  Search value to get
 * @returns {*}         Object  Result from API with books
 */
const fetchBooks = (pageNumber, searchString) => {
  const objParams = getQueryStringParams(window.location.search);
  const filter = searchString ? [{type: 'all', values: [searchString]}] : [];

  try {
    return fetch(`${APIURL}api/books`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({page: pageNumber || objParams.p || 1, itemsPerPage: parseInt(objParams.i) || 20, filters: filter})
    })
    .then(json => json.json())
    .then(data => data);
  }
  catch (err) { return err; }
};

export default fetchBooks;
