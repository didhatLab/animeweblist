import React, { useState, useEffect } from 'react'
import AnimeList from './AnimeList'

const Favorites = () => {

  const defaultFilters = {
    order_by: 'scored_by',
    sort: 'desc'
  }

  return (
    <div>
      <h1 className="anime-list-title">Favorites</h1>
      <AnimeList initialFilters={defaultFilters} />
      
    </div>
  )
}

export default Favorites 