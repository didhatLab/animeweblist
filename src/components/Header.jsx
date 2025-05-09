import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-container">
        <nav className="main-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>AnimeList</NavLink>
          <NavLink to="/best-movies" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Best Movies</NavLink>
          <NavLink to="/favorites" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Favorites</NavLink>
          <NavLink to="/top-rated" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Top Rated</NavLink>
          <NavLink to="/upcoming" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Upcoming</NavLink>
          <NavLink to="/seasonal" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Seasonal</NavLink>
          <NavLink to="/hentai" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Hentai</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header 