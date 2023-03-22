import React, { useState } from "react";
import "./App.css";
import { RepositoryList } from "./components/RepositoryList";
import { SearchBar } from "./components/SearchBar";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  return (
    <div className="App">
      <h1>GitHub Repositories Search</h1>
      <SearchBar query={query} setQuery={setQuery} setPage={setPage} />
      <RepositoryList query={query} page={page} setPage={setPage} />
    </div>
  );
}

export default App;
