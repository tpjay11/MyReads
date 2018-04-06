import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookItem from './components/BookItem.js';
import SearchBar from './components/SearchBar.js';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.changeShelf = this.changeShelf.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.hideSearchPage = this.hideSearchPage.bind(this);
  }
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
  };
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }
  hideSearchPage() {
    this.setState({ showSearchPage: false });
  }
  changeShelf(book) {
    this.setState(state => {
      let books = state.books.filter(c => c.id !== book.id);
      BooksAPI.update(book, book.shelf);
      return {
        books: books.concat(book),
      };
    });
  }
  deleteBook(book) {
    BooksAPI.update(book, 'none');
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  render() {
    let readingList = this.state.books.filter(
      book => book.shelf === 'currentlyReading'
    );
    let wantToReadList = this.state.books.filter(
      book => book.shelf === 'wantToRead'
    );
    let readList = this.state.books.filter(book => book.shelf === 'read');
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBar
            hideSearchPage={this.hideSearchPage}
            allBooks={this.state.books}
            addToShelf={this.changeShelf}
          />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <BookItem
                      books={readingList}
                      changeShelf={this.changeShelf}
                      deleteBook={this.deleteBook}
                    />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <BookItem
                      books={wantToReadList}
                      changeShelf={this.changeShelf}
                      deleteBook={this.deleteBook}
                    />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <BookItem
                      books={readList}
                      changeShelf={this.changeShelf}
                      deleteBook={this.deleteBook}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
