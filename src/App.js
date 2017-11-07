import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import BooksHome from './BooksHome'
import './App.css'

class BooksApp extends React.Component {
  state = {
    allBooks : [],
    shelfBooks : {
      currentlyReadingBookIds : [],
      wantToReadBookIds : [],
      readBookIds : []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {

      var newCurBooks = this.state.shelfBooks.currentlyReadingBookIds
      var newWanRdBooks = this.state.shelfBooks.wantToReadBookIds
      var readBooks = this.state.shelfBooks.readBookIds

      for(var x in books) {

        if(books[x].shelf === "currentlyReading") {

          newCurBooks = newCurBooks.concat([books[x].id])

        } else if(books[x].shelf === "wantToRead") {

          newWanRdBooks = newWanRdBooks.concat([books[x].id])

        } else if(books[x].shelf === "read") {

          readBooks = readBooks.concat([books[x].id])
        }
      }

      console.log(newCurBooks)
      this.setState({
        allBooks : books,
        shelfBooks : {
          currentlyReadingBookIds : newCurBooks,
          wantToReadBookIds : newWanRdBooks,
          readBookIds : readBooks
        }
      })
    })
  }

  addToCurrentList = (book) => {

    var newShelfBooks = this.state.shelfBooks

    var newWantReadBooks = newShelfBooks.wantToReadBookIds.slice()
    if (newWantReadBooks.indexOf(book.id) > -1) {
      newWantReadBooks.splice(newWantReadBooks.indexOf(book.id), 1)
    }

    var newReadBooks = newShelfBooks.readBookIds.slice()
    if (newReadBooks.indexOf(book.id) > -1) {
      newReadBooks.splice(newReadBooks.indexOf(book.id), 1)
    }

    newShelfBooks.currentlyReadingBookIds = newShelfBooks.currentlyReadingBookIds.concat([book.id])
    newShelfBooks.wantToReadBookIds = newWantReadBooks
    newShelfBooks.readBookIds = newReadBooks

    BooksAPI.update(book, "currentlyReading")

    this.setState({
      shelfBooks : newShelfBooks
    })
  }

  addToWantToList = (book) => {

    var newShelfBooks = this.state.shelfBooks

    console.log(newShelfBooks.currentlyReadingBookIds)

    var newCurReadBooks = newShelfBooks.currentlyReadingBookIds.slice()
    if (newCurReadBooks.indexOf(book.id) > -1) {
      newCurReadBooks.splice(newCurReadBooks.indexOf(book.id), 1)
    }

    var newReadBooks = newShelfBooks.readBookIds.slice()
    if (newReadBooks.indexOf(book.id) > -1) {
      newReadBooks.splice(newReadBooks.indexOf(book.id), 1)
    }


    newShelfBooks.wantToReadBookIds = newShelfBooks.wantToReadBookIds.concat([book.id])
    newShelfBooks.currentlyReadingBookIds = newCurReadBooks
    newShelfBooks.readBookIds = newReadBooks
    
    BooksAPI.update(book, "wantToRead")

    this.setState({
      shelfBooks : newShelfBooks
    })
  }

  addToReadList = (book) => {

    var newShelfBooks = this.state.shelfBooks

    var newCurReadBooks = newShelfBooks.currentlyReadingBookIds.slice()
    if (newCurReadBooks.indexOf(book.id) > -1) {
      newCurReadBooks.splice(newCurReadBooks.indexOf(book.id), 1)
    }

    var newWantReadBooks = newShelfBooks.wantToReadBookIds.slice()
    if (newWantReadBooks.indexOf(book.id) > -1) {
      newWantReadBooks.splice(newWantReadBooks.indexOf(book.id), 1)
    }

    newShelfBooks.readBookIds = newShelfBooks.readBookIds.concat([book.id])
    newShelfBooks.currentlyReadingBookIds = newCurReadBooks
    newShelfBooks.wantToReadBookIds = newWantReadBooks

    BooksAPI.update(book, "read")

    this.setState({
      shelfBooks : newShelfBooks
    })
  }

  addToRemoveList = (book) => {

    var newShelfBooks = this.state.shelfBooks

    var newCurReadBooks = newShelfBooks.currentlyReadingBookIds.slice()
    if (newCurReadBooks.indexOf(book.id) > -1) {
      newCurReadBooks.splice(newCurReadBooks.indexOf(book.id), 1)
    }

    var newWantReadBooks = newShelfBooks.wantToReadBookIds.slice()
    if (newWantReadBooks.indexOf(book.id) > -1) {
      newWantReadBooks.splice(newWantReadBooks.indexOf(book.id), 1)
    }

    var newReadBooks = newShelfBooks.readBookIds.slice()
    if (newReadBooks.indexOf(book.id) > -1) {
      newReadBooks.splice(newReadBooks.indexOf(book.id), 1)
    }

    newShelfBooks.currentlyReadingBookIds = newCurReadBooks
    newShelfBooks.wantToReadBookIds = newWantReadBooks
    newShelfBooks.readBookIds = newReadBooks

    BooksAPI.update(book, "")

    this.setState({
      shelfBooks : newShelfBooks
    })
  }


  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks 
          allBooks={this.state.allBooks}
          shelfBooks = {this.state.shelfBooks}
          addCurrBooks = {this.addToCurrentList}
          addWantBooks = {this.addToWantToList}
          addReadBooks = {this.addToReadList}
          removeBooks = {this.addToRemoveList}          
          />
        )}/>

        <Route exact path='/' render={() => (
          <BooksHome 
            allBooks={this.state.allBooks}
            shelfBooks = {this.state.shelfBooks}
            addCurrBooks = {this.addToCurrentList}
            addWantBooks = {this.addToWantToList}
            addReadBooks = {this.addToReadList}
            removeBooks = {this.addToRemoveList}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
