import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      query : '',
      books : []
    }
  }

  onQueryUpdate = (event) => {
    const query = event.target.value
    console.log(query)

    this.setState({
      query : query
    })

    if(query) {

      BooksAPI.search(query, 10).then((books) => {

        books.length > 0 ? this.setState({books : books}) : this.setState({books : []})

      })
    } else {
      this.setState({books : []})
    }

  }



	render() {

    const {allBooks, updateBook} = this.props
    const {query, books} = this.state


		return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              value={query}
              onChange={this.onQueryUpdate} 
              placeholder="Search by title or author"
            />

          </div>
        </div>

        {/* Book Search Results */}
        <div className="search-books-results">
          <ol className="books-grid">
            {
              books.map((book) => (
                <li key={ book.id }>
                <Book 
                  book={book}
                  allBooks={allBooks}
                  updateBook={updateBook}
                />
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