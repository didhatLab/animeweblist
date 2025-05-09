import React from 'react'
import AnimeList from './AnimeList'

const HENTAI_FILTERS = {
  rating: 'rx',
  order_by: 'popularity',
  sort: 'desc'
}

const Hentai = () => {
  return <AnimeList initialFilters={HENTAI_FILTERS} />
}

export default Hentai 