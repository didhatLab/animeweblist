import React from 'react'
import AnimeList from './AnimeList'

const Upcoming = () => {
  const defaultFilters = {
    status: 'upcoming',
    order_by: 'favorites',
    sort: 'desc'
  }

  return <AnimeList initialFilters={defaultFilters} />
}

export default Upcoming 