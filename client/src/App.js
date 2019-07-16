import React, { Component } from 'react';
import { BookList } from './components/BookList';
import { AddBook } from "./components/AddBook";

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
    uri: 'http://localhost:9003/graphql/',
});

export class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
          <div className="app">
              <div className="">
                  <h1>Book List</h1>
              </div>
              <AddBook/>
              <BookList/>
          </div>
        </ApolloProvider>
    );
  }
}
