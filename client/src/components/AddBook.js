import React, { Component } from 'react';
import { graphql , compose } from 'react-apollo';
import {
    getBooksQuery,
    getAuthorsQuery,
    addBookMutation,
} from '../queries/queries';


class AddBookComp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            genre: '',
            authorId: '',
        };
    }

    displayAuthors = () => {
        const { getAuthorsQuery } = this.props;

        if(getAuthorsQuery.loading) {
            return <option>Loading...</option>
        } else {
            return getAuthorsQuery.authors.map(author => (
                <option key={author.id} value={author.name}>{author.name}</option>
            ));
        }
    }

    submitForm(e) {
        e.preventDefault();

        const { addBookMutation } = this.props;

        addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId,
            },
            refetchQueries: [{ query: getBooksQuery }]
        })

    }

    render() {

        return (
             <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                 <div>
                     <div className="field">
                         <label>Book Name</label>
                         <input
                             type="text"
                             value={this.state.name}
                             onChange={(e) => this.setState({name: e.target.value})}
                         />
                     </div>
                     <div className="field">
                         <label>Genre</label>
                         <input
                             type="text"
                             value={this.state.genre}
                             onChange={(e) => this.setState({genre: e.target.value})}
                         />
                     </div>
                     <div className="field">
                         <label>Author</label>
                         <select
                             onChange={(e) => this.setState({authorId: e.target.value})}
                         >
                             {this.displayAuthors()}
                         </select>
                     </div>
                 </div>
                 <div>
                     <button>+</button>
                 </div>
             </form>
        );
    }
}

export const AddBook = compose(
    graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
    graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBookComp);
