import React from 'react'
import AnimeList from './AnimeList'

const TopRated = () => {
  const defaultFilters = {
    order_by: 'score',
    sort: 'desc',
    min_score: 8.5
  }

  return <AnimeList initialFilters={defaultFilters} />
}

export default TopRated 