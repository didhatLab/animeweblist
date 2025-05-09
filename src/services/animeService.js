import { AnimeSearchParams } from './types'

const API_URL = 'https://api.jikan.moe/v4'

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const fetchWithRetry = async (url, options = {}, retries = 2) => {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    if (retries > 0) {
      const delay = retries === 2 ? 3000 : 5000 // 3 seconds for first retry, 5 seconds for second
      console.log(`Request failed, retrying in ${delay/1000} seconds...`)
      await sleep(delay)
      return fetchWithRetry(url, options, retries - 1)
    }
    throw error
  }
}

export const animeService = {
  searchAnime: async (params = {}) => {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value)
    })
    
    const url = `${API_URL}/anime?${queryParams.toString()}`
    return fetchWithRetry(url)
  },

  getAnimeById: async (id) => {
    const url = `${API_URL}/anime/${id}`
    return fetchWithRetry(url)
  },

  getAnimePictures: async (id) => {
    const url = `${API_URL}/anime/${id}/pictures`
    return fetchWithRetry(url)
  }
} 