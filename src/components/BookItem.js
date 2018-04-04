import React from 'react';

class BookItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.shelf };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    // console.log(event.target.value);
  }
  render() {
    let books = this.props.books;
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => {
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`,
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        value={this.state.value}
                        onChange={event => {
                          console.log(event.target.value);
                          console.log(book.id);
                          book.shelf=event.target.value;
                          this.props.changeShelf(book);
                        }}
                      >
                        <option value="none" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

export default BookItem;
