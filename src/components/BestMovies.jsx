import React from 'react'
import AnimeList from './AnimeList'

const BEST_MOVIES_FILTERS = {
  type: 'movie',
  order_by: 'score',
  sort: 'desc'
}

const BestMovies = () => {
  return <AnimeList initialFilters={BEST_MOVIES_FILTERS} />
}

export default BestMovies 