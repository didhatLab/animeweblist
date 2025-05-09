import React from 'react'
import { Link } from 'react-router-dom'

const AnimeCard = ({ anime }) => {
  return (
    <Link to={`/anime/${anime.mal_id}`} className="anime-item">
      <div className="anime-item-image">
        <img src={anime.images.jpg.image_url} alt={anime.title} />
      </div>
      <div className="anime-item-info">
        <h3>{anime.title}</h3>
        <div className="anime-score">Score: {anime.score}</div>
        <div className="anime-type">{anime.type}</div>
      </div>
    </Link>
  )
}

export default AnimeCard 