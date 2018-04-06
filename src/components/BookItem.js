import React from 'react';

class BookItem extends React.Component {
  render() {
    let books = this.props.books;
    let allBooks = this.props.allBooks;
    if(!(books instanceof Array)){
      books=[];
    }
    return (
      <ol className="books-grid">
        {books.map(book => {
          if (allBooks) {
            allBooks.forEach(b => {
              if (b.id === book.id) {
                book.shelf = b.shelf;
              }
            });
          }
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
                      value={book.shelf || 'empty'}
                      onChange={event => {
                        book.shelf = event.target.value;
                        if (event.target.value === 'none') {
                          this.props.deleteBook(book);
                        } else {
                          this.props.changeShelf(book);
                        }
                      }}
                    >
                      <option value="empty" disabled>
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
    );
  }
}

export default BookItem;
