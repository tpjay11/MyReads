import React from 'react';

function BookItem(props) {
    let books =props.books;
    let allBooks =props.allBooks;
    if (!(books instanceof Array)) {
      books = [];
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
          const thumbnail = book.imageLinks
            ? book.imageLinks.thumbnail
            : 'https://vignette.wikia.nocookie.net/theannoyingroleplayers/images/4/47/Placeholder.png/revision/latest/scale-to-width-down/480?cb=20140715205720';
          const title = book.title || 'none';
          const authors = book.authors || 'none';
          return (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${thumbnail})`,
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf || 'empty'}
                      onChange={event => {
                        book.shelf = event.target.value;
                        props.changeShelf(book);
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
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
              </div>
            </li>
          );
        })}
      </ol>
    );
}

export default BookItem;
