// SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search products..."
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
