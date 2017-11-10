import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import BooksHome from './BooksHome'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allBooks : []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        allBooks : books
      })
    })
  }

  updateBook = (book, shelf) => {
    var books = this.state.allBooks
    BooksAPI.update(book, shelf).then((res) => {
      
        if((books.filter((b) => b.id === book.id)).length > 0) {
          console.log("book already present")
          books[books.indexOf(book)].shelf = shelf
        } else {
          console.log("book to be added")
          const newBook = book
          newBook['shelf'] = shelf
          books.push(newBook)
        }
        
        this.setState({
          allBooks : books
        })
      })
  }


  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks 
          allBooks={this.state.allBooks}
          updateBook={this.updateBook}        
          />
        )}/>
        <Route exact path='/' render={() => (
          <BooksHome 
            allBooks={this.state.allBooks}
            updateBook={this.updateBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
