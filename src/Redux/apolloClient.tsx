"use client";

import { ApolloClient, InMemoryCache } from "@apollo/client";

const API = "https://node-js-graphql.onrender.com/graphql";
const token = localStorage.getItem("token")

const client = new ApolloClient({
  uri: API,
  cache: new InMemoryCache(),
  headers: {
    "Authorization" : `Bearer ${token}` 
  }
});

export default client;
