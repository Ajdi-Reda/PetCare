"use client";

import React, { createContext, useState } from "react";

type SearchContextProps = {
  children: React.ReactNode;
};

type TSearchContext = {
  searchQuery: string;
  handleSearchQueryChange: (value: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);
const SearchContextProvider = ({ children }: SearchContextProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchQueryChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleSearchQueryChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
