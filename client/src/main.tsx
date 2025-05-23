import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./sass/custom.scss";
import ThemeProvider from "./context/ThemeProvider.tsx";

const client = new ApolloClient({
  uri: import.meta.env.DEV ? "http://localhost:4000/" : "https://footballapp-production-0d5c.up.railway.app/",
  cache: new InMemoryCache(),
});

// client.resetStore()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </Router>
  </React.StrictMode>
);
