import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import AnimeList from './components/AnimeList'
import BestMovies from './components/BestMovies'
import Favorites from './components/Favorites'
import Hentai from './components/Hentai'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import Seasonal from './components/Seasonal'
import AnimeDetails from './components/AnimeDetails'
import './style.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<AnimeList />} />
        <Route path="/best-movies" element={<BestMovies />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/hentai" element={<Hentai />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/seasonal" element={<Seasonal />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
      </Routes>
    </Router>
  )
}

export default App 