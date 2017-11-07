import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class BooksHome extends Component {

	render() {

		const { allBooks, shelfBooks, addCurrBooks, addWantBooks, addReadBooks, removeBooks } = this.props
		// const { currentlyReadingBookIds, wantToReadBookIds,readBookIds } = this.state

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
                      	shelfBooks.currentlyReadingBookIds.map((cur_id) => (
                      		<li key={ cur_id }>
                      			{(
                      				allBooks.filter((book) => book.id === cur_id)).map((bObj) => (
				                        <div className="book">
				                          <div className="book-top">
				                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bObj.imageLinks.thumbnail})` }}></div>
				                            <div className="book-shelf-changer">
				                              <select>
				                                <option value="moved" disabled>Move to...</option>
				                                <option value="currentlyReading" selected onClick={(e)=>addCurrBooks(bObj)}>Currently Reading</option>
				                                <option value="wantToRead" onClick={(e)=>addWantBooks(bObj)}>Want to Read</option>
				                                <option value="read" onClick={(e)=>addReadBooks(bObj)}>Read</option>
				                                <option value="none" onClick={(e)=>removeBooks(bObj)}>None</option>
				                              </select>
				                            </div>
				                          </div>
				                          <div className="book-title">{bObj.title}</div>
				                          <div className="book-authors">{bObj.authors[0]}</div>
				                        </div>
                      				)
                      			)}
                      		</li>)
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
                      	shelfBooks.wantToReadBookIds.map((cur_id) => (
                      		<li key={ cur_id }>
                      			{(
                      				allBooks.filter((book) => book.id === cur_id)).map((bObj) => (
				                        <div className="book">
				                          <div className="book-top">
				                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bObj.imageLinks.thumbnail})` }}></div>
				                            <div className="book-shelf-changer">
				                              <select>
				                                <option value="moved" disabled>Move to...</option>
				                                <option value="currentlyReading" onClick={(e)=>addCurrBooks(bObj)}>Currently Reading</option>
				                                <option value="wantToRead" selected onClick={(e)=>addWantBooks(bObj)}>Want to Read</option>
				                                <option value="read" onClick={(e)=>addReadBooks(bObj)}>Read</option>
				                                <option value="none" onClick={(e)=>removeBooks(bObj)}>None</option>
				                              </select>
				                            </div>
				                          </div>
				                          <div className="book-title">{bObj.title}</div>
				                          <div className="book-authors">{bObj.authors[0]}</div>
				                        </div>
                      				)
                      			)}
                      		</li>)
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
                      	shelfBooks.readBookIds.map((cur_id) => (
                      		<li key={ cur_id }>
                      			{(
                      				allBooks.filter((book) => book.id === cur_id)).map((bObj) => (
				                        <div className="book">
				                          <div className="book-top">
				                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bObj.imageLinks.thumbnail})` }}></div>
				                            <div className="book-shelf-changer">
				                              <select>
				                                <option value="moved" disabled>Move to...</option>
				                                <option value="currentlyReading" onClick={(e)=>addCurrBooks(bObj)}>Currently Reading</option>
				                                <option value="wantToRead" onClick={(e)=>addWantBooks(bObj)}>Want to Read</option>
				                                <option value="read" selected onClick={(e)=>addReadBooks(bObj)}>Read</option>
				                                <option value="none" onClick={(e)=>removeBooks(bObj)}>None</option>
				                              </select>
				                            </div>
				                          </div>
				                          <div className="book-title">{bObj.title}</div>
				                          <div className="book-authors">{bObj.authors[0]}</div>
				                        </div>
                      				)
                      			)}
                      		</li>)
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