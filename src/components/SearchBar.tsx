import React from "react";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  setPage,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setPage(1);
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="search here..."
      />
    </div>
  );
};
