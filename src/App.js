import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route, Link} from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
    state = {
        books: [],
        query: '',
        searchResults: []
    }

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks = () => {
        BooksAPI.getAll()
            .then((books) => {
                this.setState((prevState) => ({
                    books
                }));
                console.log(books)
            })
    }

    changeBookShelf(event, book) {
        console.log(event.target.value);
        BooksAPI.update({id: book.id}, event.target.value)
            .then(() => this.fetchBooks());
    }

    updateQuery(value) {
        let results = null;

        this.setState((prevState) => ({
            query: value.trim()
        }));

        BooksAPI.search(this.state.query)
            .then((searchResults) => {
                console.log(searchResults);
                if (searchResults !== undefined && !searchResults.items) {
                    this.updateSearchResults(searchResults);
                }
            });
    }

    updateSearchResults = (results) => {
        for (let book of this.state.books) {
            let existingBook = (results.filter((b) => b.id === book.id))[0];
            if (existingBook){
                console.log(existingBook);
                let indexOfExistingBook = results.indexOf(existingBook);
                results[indexOfExistingBook] = book;
            }
        }
        this.setState((prevState) => ({
            searchResults : results
        }))

    }

    render() {
        const {books, query,searchResults} = this.state;


        return (
            <div className="app">
                <Route exact path={'/'} render={() => (
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

                                            {books.map((book) => ((book.shelf === 'currentlyReading') && (
                                                <li key={book.id}>
                                                    <div className="book">
                                                        <div className="book-top">
                                                            <div className="book-cover" style={{
                                                                width: 128,
                                                                height: 193,
                                                                backgroundImage: `url(${book.imageLinks.thumbnail})`
                                                            }}/>
                                                            <div className="book-shelf-changer">
                                                                <select value={book.shelf}
                                                                        onChange={(event) => this.changeBookShelf(event, book)}>
                                                                    <option value="move" disabled>Move to...
                                                                    </option>
                                                                    <option value="currentlyReading">Currently
                                                                        Reading
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
                                            )))}
                                        </ol>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {books.map((book) => ((book.shelf === 'wantToRead') && (
                                                <li key={book.id}>
                                                    <div className="book">
                                                        <div className="book-top">
                                                            <div className="book-cover" style={{
                                                                width: 128,
                                                                height: 193,
                                                                backgroundImage: `url(${book.imageLinks.thumbnail})`
                                                            }}/>
                                                            <div className="book-shelf-changer">
                                                                <select value={book.shelf}
                                                                        onChange={(event) => this.changeBookShelf(event, book)}>
                                                                    <option value="move" disabled>Move to...
                                                                    </option>
                                                                    <option value="currentlyReading">Currently
                                                                        Reading
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
                                            )))}
                                        </ol>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {books.map((book) => ((book.shelf === 'read') && (
                                                <li key={book.id}>
                                                    <div className="book">
                                                        <div className="book-top">
                                                            <div className="book-cover" style={{
                                                                width: 128,
                                                                height: 193,
                                                                backgroundImage: `url(${book.imageLinks.thumbnail})`
                                                            }}/>
                                                            <div className="book-shelf-changer">
                                                                <select value={book.shelf}
                                                                        onChange={(event) => this.changeBookShelf(event, book)}>
                                                                    <option value="move" disabled>Move to...
                                                                    </option>
                                                                    <option value="currentlyReading">Currently
                                                                        Reading
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
                                            )))}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to={'/search'}>Add a book</Link>
                        </div>
                    </div>
                )}/>

                <Route path={'/search'} render={() => (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link className="close-search" to={'/'}>Close</Link>
                            <div className="search-books-input-wrapper">
                                <input type="text" value={query}
                                       onChange={(event) => this.updateQuery(event.target.value)}
                                       placeholder="Search by title or author"/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid">
                                {query.length === 0 && books.map((book) => ((
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                {book.imageLinks && (<div className="book-cover" style={{
                                                    width: 128,
                                                    height: 193,
                                                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                                                }}/>)}
                                                <div className="book-shelf-changer">
                                                    <select value={book.shelf}
                                                            onChange={(event) => this.changeBookShelf(event, book)}>
                                                        <option value="move" disabled>Move to...
                                                        </option>
                                                        <option value="currentlyReading">Currently
                                                            Reading
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
                                )))}
                                {query.length > 0 && searchResults.map((book) => ((
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                {book.imageLinks && (<div className="book-cover" style={{
                                                    width: 128,
                                                    height: 193,
                                                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                                                }}/>)}
                                                <div className="book-shelf-changer">
                                                    <select value={book.shelf}
                                                            onChange={(event) => this.changeBookShelf(event, book)}>
                                                        <option value="move" disabled>Move to...
                                                        </option>
                                                        <option value="currentlyReading">Currently
                                                            Reading
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
                                )))}
                            </ol>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }


}

export default BooksApp
