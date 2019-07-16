import React, { Component } from 'react';
import { graphql , compose } from 'react-apollo';
import {
    getBookQuery
} from '../queries/queries';


class BookDetailsComp extends Component {

    displayBookDetails = () => {
        const { book } = this.props.data;
        if(!book) return;

        return (
            <div className="book">
                <div>name: {book.name}</div>
                <div>genre: {book.genre}</div>
                <div>author: {book.author.name}</div>
                <div>author books: {book.author.books.map(i => (
                    <span>{i.name},</span>
                ))}</div>
            </div>
        )
    }

    render() {

        return (
            <div className="detail-book">
                {this.displayBookDetails()}
            </div>
        );
    }
}

export const BookDetails = graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetailsComp);