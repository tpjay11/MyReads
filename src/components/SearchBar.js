import React from 'react';
import BookItem from './BookItem';
import * as BooksAPI from '../BooksAPI';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      querybooks: [],
      query: '',
    };
  }
  updateQuery = query => {
    this.setState({ query: query.trim() });
    BooksAPI.search(query).then(querybooks => {
      this.setState({ querybooks });
    });
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a
            className="close-search"
            onClick={() => this.props.hideSearchPage()}
          >
            Close
          </a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <div>
            <BookItem
              books={this.state.querybooks}
              allBooks={this.props.allBooks}
              changeShelf={this.props.addToShelf}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
