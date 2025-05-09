export const AnimeType = {
  TV: 'tv',
  MOVIE: 'movie',
  OVA: 'ova',
  SPECIAL: 'special',
  ONA: 'ona',
  MUSIC: 'music',
  CM: 'cm',
  PV: 'pv',
  TV_SPECIAL: 'tv_special'
}

export const AnimeStatus = {
  AIRING: 'airing',
  COMPLETE: 'complete',
  UPCOMING: 'upcoming'
}

export const AnimeRating = {
  G: 'g',
  PG: 'pg',
  PG13: 'pg13',
  R17: 'r17',
  R: 'r',
  RX: 'rx'
}

export const OrderBy = {
  MAL_ID: 'mal_id',
  TITLE: 'title',
  START_DATE: 'start_date',
  END_DATE: 'end_date',
  EPISODES: 'episodes',
  SCORE: 'score',
  SCORED_BY: 'scored_by',
  RANK: 'rank',
  POPULARITY: 'popularity',
  MEMBERS: 'members',
  FAVORITES: 'favorites'
}

export const SortDirection = {
  ASC: 'asc',
  DESC: 'desc'
}

export class AnimeSearchParams {
  constructor(params = {}) {
    this.page = params.page || 1
    this.limit = params.limit || 20
    this.q = params.q || ''
    this.type = params.type || null
    this.score = params.score || null
    this.min_score = params.min_score || null
    this.max_score = params.max_score || null
    this.status = params.status || null
    this.rating = params.rating || null
    this.order_by = params.order_by || null
    this.sort = params.sort || null
  }

  toQueryString() {
    const params = new URLSearchParams()
    
    if (this.page) params.append('page', this.page)
    if (this.limit) params.append('limit', this.limit)
    if (this.q) params.append('q', this.q)
    if (this.type) params.append('type', this.type)
    if (this.score) params.append('score', this.score)
    if (this.min_score) params.append('min_score', this.min_score)
    if (this.max_score) params.append('max_score', this.max_score)
    if (this.status) params.append('status', this.status)
    if (this.rating) params.append('rating', this.rating)
    if (this.order_by) params.append('order_by', this.order_by)
    if (this.sort) params.append('sort', this.sort)

    return params.toString()
  }
} 