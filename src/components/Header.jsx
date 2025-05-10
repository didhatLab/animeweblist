import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Добавляем/удаляем класс menu-open к body при изменении состояния меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }

    // Очистка при размонтировании компонента
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [isMenuOpen])

  return (
    <header className="site-header">
      <div className="header-container">
        <NavLink to="/" className="logo" onClick={closeMenu}>
          AnimeList
        </NavLink>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div 
          className={`overlay ${isMenuOpen ? 'active' : ''}`}
          onClick={closeMenu}
        />

        <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end onClick={closeMenu}>AnimeList</NavLink>
          <NavLink to="/best-movies" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>Best Movies</NavLink>
          <NavLink to="/favorites" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>Favorites</NavLink>
          <NavLink to="/top-rated" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>Top Rated</NavLink>
          <NavLink to="/upcoming" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>Upcoming</NavLink>
          <NavLink to="/seasonal" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>Seasonal</NavLink>
          <NavLink to="/hentai" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>Hentai</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header 