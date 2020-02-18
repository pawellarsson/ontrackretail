import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import fetchBooks from './services/books/books';
import './App.scss';

/**
 * Main App
 *
 * @returns {*}
 */
const App = () => {
  const [books, setBooks] = useState(null);

  // Handle change from search input field, searchString is a string
  const handleInputChange = searchString => getBooks(null, searchString);

  // Handle pagination click, pageNumber is a number
  const handlePaginationClick = pageNumber => getBooks(pageNumber);

  // Async call to fetchBooks service
  const getBooks = async (pageNumber, searchString) => {
    let didCancel = false;

    const response = await fetchBooks(pageNumber, searchString);
    if (!didCancel) setBooks(response);

    return () => { didCancel = true; };
  };

  // Run only once on app start
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="App">
      <Container fluid={true}>
        <input
          placeholder="Search for books..."
          onKeyPress={e => e.key === 'Enter' && handleInputChange(e.target.value)}
        />
        <Row>
            {
              books && books.books.map(book => {
                return (
                  <Col key={book.id}>
                    <div className="book-box">
                      <div className="id">{book.id}</div>
                      <div className="title">{book.book_title}</div>
                      <div className="author">{book.book_author[0]}</div>
                      <div className="pages">{book.book_pages}</div>
                      <div className="year">{book.book_publication_year}</div>
                      <div className="city">{book.book_publication_city}</div>
                      <div className="country">{book.book_publication_country}</div>
                    </div>
                  </Col>
                )
              })
            }
        </Row>
        {books && (
          <ReactPaginate
            pageCount={books.count/20}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={e => handlePaginationClick(e.selected+1)}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        )}
      </Container>
    </div>
  );
};

export default App;
