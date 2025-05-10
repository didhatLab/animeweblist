import React, { useState, useEffect } from 'react'
import { AnimeType, AnimeStatus, AnimeRating, OrderBy, SortDirection } from '../services/types'

const AnimeFilters = ({ filters, setFilters, onApply, isOpen }) => {
  const [tempFilters, setTempFilters] = useState(filters)

  useEffect(() => {
    setTempFilters(filters)
  }, [filters])

  const handleFilterChange = (key, value) => {
    setTempFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleApply = () => {
    setFilters(tempFilters)
    onApply()
  }

  const handleReset = () => {
    const defaultFilters = {
      
    }
    setTempFilters(defaultFilters)
    setFilters(defaultFilters)
    onApply()
  }

  if (!isOpen) return null

  return (
    <div className="anime-filters">
      <div className="filters-group">
        <label>Type:</label>
        <select
          value={tempFilters.type || ''}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <option value="">All</option>
          <option value="tv">TV</option>
          <option value="movie">Movie</option>
          <option value="ova">OVA</option>
          <option value="special">Special</option>
          <option value="ona">ONA</option>
          <option value="music">Music</option>
        </select>
      </div>

      <div className="filters-group">
        <label>Status:</label>
        <select
          value={tempFilters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">All</option>
          <option value="airing">Airing</option>
          <option value="complete">Complete</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      <div className="filters-group">
        <label>Rating:</label>
        <select
          value={tempFilters.rating || ''}
          onChange={(e) => handleFilterChange('rating', e.target.value)}
        >
          <option value="">All</option>
          <option value="g">G</option>
          <option value="pg">PG</option>
          <option value="pg13">PG-13</option>
          <option value="r17">R-17</option>
          <option value="r">R+</option>
          <option value="rx">RX</option>
        </select>
      </div>

      <div className="filters-group">
        <label>Score:</label>
        <div className="score-range">
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={tempFilters.min_score || ''}
            onChange={(e) => handleFilterChange('min_score', e.target.value)}
            placeholder="Min"
          />
          <span>-</span>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={tempFilters.max_score || ''}
            onChange={(e) => handleFilterChange('max_score', e.target.value)}
            placeholder="Max"
          />
        </div>
      </div>

      <div className="filters-group">
        <label>Sort by:</label>
        <select
          onChange={(e) => handleFilterChange('order_by', e.target.value)}
        >
          <option value="">Select</option>
          <option value="popularity">Popularity</option>
          <option value="score">Score</option>
          <option value="title">Title</option>
          <option value="start_date">Start Date</option>
          <option value="end_date">End Date</option>
        </select>
      </div>

      <div className="filters-group">
        <label>Order:</label>
        <select
          value={tempFilters.sort || 'desc'}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
        >
          <option value="">Select</option>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="filters-actions">
        <button className="apply-filters" onClick={handleApply}>
          Apply Filters
        </button>
        <button className="reset-filters" onClick={handleReset}>
          Reset Filters
        </button>
      </div>
    </div>
  )
}

export default AnimeFilters 