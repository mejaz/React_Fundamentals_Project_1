import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class BooksHome extends Component {

	render() {

    const { allBooks, updateBook } = this.props

		return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                			{
                				allBooks.filter((book) => book.shelf === 'currentlyReading').map((b) => 
	                        <li key={b.id}>
                          <Book 
                            book={b}
                            updateBook={updateBook}
                            allBooks={allBooks}
                          />
                          </li>
                				)
                			}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                     <ol className="books-grid">
                      {
                        allBooks.filter((book) => book.shelf === 'wantToRead').map((b) => 
                          <li key={b.id}>
                          <Book 
                            book={b}
                            updateBook={updateBook}
                            allBooks={allBooks}
                          />
                          </li>
                        )
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        allBooks.filter((book) => book.shelf === 'read').map((b) => 
                          <li key={b.id}>
                          <Book 
                            book={b}
                            updateBook={updateBook}
                            allBooks={allBooks}
                          />
                          </li>
                        )
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )
	}
}

export default BooksHome