import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import { BookDetails } from "./BookDetails";


class BookListComp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: null,
        };
    }

    displayBooks = () => {
        const { data } = this.props;

        if(!data.loading) {
            return data.books.map(book => (
                <div className="book" key={book.id}>
                    <div>
                        Name: <a href="#" onClick={(e) => this.setState({selected: book.id}) }>{book.name}</a>
                    </div>
                </div>
            ))
        }

    }

    render() {
        const { selected } = this.state;

        return (
            <div className="App">
                <BookDetails bookId={selected}/>
                <div className="books">
                    {this.displayBooks()}
                </div>
            </div>
        );
    }
}

export const BookList = graphql(getBooksQuery)(BookListComp);
