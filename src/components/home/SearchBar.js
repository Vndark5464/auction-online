// SearchBar.js
import React, { useState,useEffect } from 'react';
import ProductDataService from '../../services/product.services';

const productService = new ProductDataService();

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = async (e) => {
    setSearchTerm(e.target.value);
    const querySnapshot = await productService.searchByTitle(e.target.value);
    const results = querySnapshot.docs.map(doc => doc.data());
    setSearchResults(results);
  };

  // clear search result when input is clear
  useEffect(() => {
    if (searchTerm === '') {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <form className="d-flex" role="search">
      <label htmlFor="search" className="visually-hidden">Product Search</label>
      <input
        id="search"
        className="form-control me-2"
        type="search"
        placeholder="Search products..."
        aria-label="Product Search"
        value={searchTerm}
        onChange={handleChange}
      />
      {searchResults.length > 0 && (
        <div className="search-results-dropdown">
          {searchResults.map((products, i) => (
            <div key={i} className="search-result-item">
              {products.title}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;