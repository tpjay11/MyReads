import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookItem from './components/BookItem.js';
import SearchBar from './components/SearchBar.js';
import { Route,Link} from 'react-router-dom';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.changeShelf = this.changeShelf.bind(this);
  }
  state = {
    books: [],
  };
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
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

  render() {
    let readingList = this.state.books.filter(
      book => book.shelf === 'currentlyReading'
    );
    let wantToReadList = this.state.books.filter(
      book => book.shelf === 'wantToRead'
    );
    let readList = this.state.books.filter(book => book.shelf === 'read');
    let info=[{shelf:'Currently Reading',list:readingList},{shelf:'Want to Read',list:wantToReadList},{shelf:'Read',list:readList}]
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <SearchBar
              hideSearchPage={this.hideSearchPage}
              allBooks={this.state.books}
              addToShelf={this.changeShelf}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
              {info.map((book)=>{
                return (
                  <div className="bookshelf" key={book.shelf}>
                    <h2 className="bookshelf-title">{book.shelf}</h2>
                    <div className="bookshelf-books">
                      <BookItem
                        books={book.list}
                        changeShelf={this.changeShelf}
                      />
                    </div>
                  </div>
                )
              })}
              </div>
              <div className="open-search">
              <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
