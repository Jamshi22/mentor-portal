// lib/apollo-client.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const base_url_uploads = process.env.NEXT_PUBLIC_BASE_URL_UPLOADS

const client = new ApolloClient({
  // uri: "http://localhost:8008/graphql", // ✅ Your GraphQL endpoint
  uri: base_url_uploads,
  cache: new InMemoryCache(),
});

export default client;
