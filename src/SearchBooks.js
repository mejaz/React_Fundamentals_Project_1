import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SearchBooks extends Component {
  
  state = {
    query : ''
  }

  onQueryUpdate = (query) => (
    this.setState({
      query : query
    })
  )

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
    const {query} = this.state

    let showingBooks

    if (query === '') {
      showingBooks = allBooks
    } else {
      const match = new RegExp(query, 'i')
      showingBooks = allBooks.filter((book) => (match.test(book.title)|| match.test(book.authors[0])))
    }


		return (

          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */
                }
                <input 
                  type="text" 
                  value={query}
                  onChange={(event) => (this.onQueryUpdate(event.target.value))} 
                  placeholder="Search by title or author"
                />

              </div>
            </div>

            {/* Book Search Results */}
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  showingBooks.map((book) => (
                    <li key={ book.id }>
                    <div className="book">
                      <div className='book-top' style={{
                        backgroundImage:`url(${book.imageLinks.thumbnail})`
                        }}>
                        <div className="book-shelf-changer">
                          <select value={this.checkShelf(book, shelfBooks)} onChange={(e) => this.changeHandler(e, book, addCurrBooks, addWantBooks, addReadBooks, removeBooks)}>
                            <option value="moved" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors[0]}</div>
                    </div>
                    </li>
                  ))
                }
              </ol>
            </div>          
          </div>
		)
	}
}

export default SearchBooks