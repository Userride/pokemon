import React, { useState } from 'react';
import '../styles/SearchBar.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name or type..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar; 