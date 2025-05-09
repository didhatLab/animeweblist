import React from 'react'
import { useLocation } from 'react-router-dom'

const SearchBar = ({ value, onChange, onSearch, onToggleFilters, isFiltersOpen }) => {
  const location = useLocation()
  const isMainPage = location.pathname === '/'

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-bar"
          placeholder="Search anime..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
        {isMainPage && (
          <button 
            type="button" 
            className={`toggle-filters ${isFiltersOpen ? 'active' : ''}`}
            onClick={onToggleFilters}
          >
            Filters
          </button>
        )}
      </form>
    </div>
  )
}

export default SearchBar 