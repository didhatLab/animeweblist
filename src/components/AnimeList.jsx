import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { animeService } from '../services/animeService'
import SearchBar from './SearchBar'
import AnimeCard from './AnimeCard'
import Pagination from './Pagination'
import AnimeFilters from './AnimeFilters'

const AnimeList = ({ initialFilters = {} }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  
  const [animeList, setAnimeList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSearchQuery, setActiveSearchQuery] = useState('')
  const [filters, setFilters] = useState(initialFilters)
  const [isLoading, setIsLoading] = useState(false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const isMainPage = location.pathname === '/'

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1
    const query = searchParams.get('q') || ''
    if (isMainPage) {
      const newFilters = {}
      searchParams.forEach((value, key) => {
        if (key !== 'page' && key !== 'q') {
          newFilters[key] = value
        }
      })
      
      setCurrentPage(page)
      setSearchQuery(query)
      
      setFilters(Object.keys(newFilters).length > 0 ? newFilters : initialFilters)
    } else {
      setFilters(initialFilters)
      setCurrentPage(page)
      setSearchQuery(query)
      setActiveSearchQuery(query)
    }
  }, [searchParams, isMainPage, setSearchParams])

  const updateUrlParams = (params) => {
    const newParams = new URLSearchParams()

    if (params.page) newParams.set('page', params.page)
    if (params.q) newParams.set('q', params.q)

    if (isMainPage) {
      Object.entries(params).forEach(([key, value]) => {
        if (key !== 'page' && key !== 'q' && value) {
          newParams.set(key, value)
        }
      })
      
    }
    console.log('update url params')
    console.log(newParams)
    setSearchParams(newParams)
  }

  const fetchAnime = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const params = {
        page: currentPage,
        q: activeSearchQuery,
        ...filters
      }

      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key]
        }
      })

      const response = await animeService.searchAnime(params)
      setAnimeList(response.data)
      setTotalPages(Math.ceil(response.pagination.items.total / response.pagination.items.per_page))
    } catch (error) {
      console.error('Error fetching anime:', error)
      setAnimeList([])
      setTotalPages(1)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAnime()
  }, [currentPage, activeSearchQuery, filters])

  const handleSearch = (query) => {
    setSearchQuery(query)
    setActiveSearchQuery(query)
    setCurrentPage(1)
    updateUrlParams({ page: 1, q: query, ...filters })
  }

  const handleFilterApply = () => {
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    if (isMainPage) {
      updateUrlParams({ page, q: activeSearchQuery, ...filters })
    }
    else {
      updateUrlParams({ page, q: activeSearchQuery})
    }
  }

  const handleAnimeClick = (animeId) => {
    navigate(`/anime/${animeId}`)
  }

  const handleToggleFilters = () => {
    setIsFiltersOpen(prev => !prev)
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    if (isMainPage) {
        updateUrlParams({ page: currentPage, q: activeSearchQuery, ...newFilters })
    }
    else {
        updateUrlParams({ page: 1, q: activeSearchQuery})
    }
  }

  return (
    <div className="container">
      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
        onToggleFilters={handleToggleFilters}
        isFiltersOpen={isFiltersOpen}
      />
      
      <AnimeFilters 
        filters={filters}
        setFilters={handleFiltersChange}
        onApply={handleFilterApply}
        isOpen={isFiltersOpen}
      />

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="anime-list">
            {animeList.map((anime, index) => (
              <AnimeCard
                key={`${anime.mal_id}-${index}`}
                anime={anime}
                onClick={() => handleAnimeClick(anime.mal_id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  )
}

export default AnimeList 