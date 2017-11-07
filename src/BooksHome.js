import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class BooksHome extends Component {

  checkShelf = (book, shelfBooks) => {
    if (shelfBooks.currentlyReadingBookIds.indexOf(book.id) > -1) {
      return "currentlyReading"
    } else if (shelfBooks.wantToReadBookIds.indexOf(book.id) > -1){
      return "wantToRead"
    } else if (shelfBooks.readBookIds.indexOf(book.id) > -1) {
      return "read"
    } else {
      return "none"
    }
  }

  changeHandler = (e, book, addCurrBooks, addWantBooks, addReadBooks, removeBooks) => {
    if (e.target.value === "currentlyReading") {
      addCurrBooks(book)
    } else if (e.target.value === "wantToRead") {
      addWantBooks(book)
    } else if (e.target.value === "read") {
      addReadBooks(book) 
    } else {
      removeBooks(book)
    }
  }

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
				                        <div className="book" key={bObj.id}>
				                          <div className="book-top">
				                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bObj.imageLinks.thumbnail})` }}></div>
				                            <div className="book-shelf-changer">
				                              <select value={this.checkShelf(bObj, shelfBooks)} onChange={(e) => this.changeHandler(e, bObj, addCurrBooks, addWantBooks, addReadBooks, removeBooks)}>
				                                <option value="moved" disabled>Move to...</option>
				                                <option value="currentlyReading">Currently Reading</option>
				                                <option value="wantToRead">Want to Read</option>
				                                <option value="read">Read</option>
				                                <option value="none">None</option>
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
				                        <div className="book" key={bObj.id}>
				                          <div className="book-top">
				                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bObj.imageLinks.thumbnail})` }}></div>
				                            <div className="book-shelf-changer">
                                      <select value={this.checkShelf(bObj, shelfBooks)} onChange={(e) => this.changeHandler(e, bObj, addCurrBooks, addWantBooks, addReadBooks, removeBooks)}>
                                        <option value="moved" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
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
				                        <div className="book" key={bObj.id}>
				                          <div className="book-top">
				                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bObj.imageLinks.thumbnail})` }}></div>
				                            <div className="book-shelf-changer">
                                      <select value={this.checkShelf(bObj, shelfBooks)} onChange={(e) => this.changeHandler(e, bObj, addCurrBooks, addWantBooks, addReadBooks, removeBooks)}>
                                        <option value="moved" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
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