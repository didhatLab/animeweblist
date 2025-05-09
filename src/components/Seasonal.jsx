import React from 'react'
import AnimeList from './AnimeList'

const Seasonal = () => {
  const defaultFilters = {
    status: 'airing',
    order_by: 'favorites',
    sort: 'desc'
  }

  return <AnimeList initialFilters={defaultFilters} />
}

export default Seasonal 