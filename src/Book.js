import React from 'react'


class Book extends React.Component {

	render() {

		const {book, allBooks, updateBook} = this.props
		const title = book.title ? book.title : "Title unavailable"
		const author = book.authors ? book.authors[0] : "Author name unavailable"
		const bookImage = book.imageLinks ? book.imageLinks.thumbnail : "https://www.google.co.in/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiH4PTO17TXAhVCpo8KHfSCCKcQjRwIBw&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ANo_image_available.svg&psig=AOvVaw0voNZdouXr8GcZqA9dLXbO&ust=1510426570286957"
		const shelf = allBooks.filter((b) => b.id === book.id).length > 0 ? allBooks.filter((b) => b.id === book.id)[0].shelf : "none"

		return (

            <div className="book">
              <div className='book-top' style={{
                backgroundImage:`url(${bookImage})`
                }}>
                <div className="book-shelf-changer">
                  <select value={shelf} onChange={(e) => updateBook(book, e.target.value)}>
                    <option value="moved" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{title}</div>
              <div className="book-authors">{author}</div>
            </div>

		)
	}
}

export default Book