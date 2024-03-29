import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});

const Main = () => {
  return (
      <ApolloProvider client={client} >
          <App />
      </ApolloProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA