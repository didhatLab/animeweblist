import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AnimeDetail = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const slidesRef = useRef(null);

  // Минимальное расстояние для свайпа
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  const nextImage = () => {
    if (anime && anime.images) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === anime.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (anime && anime.images) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? anime.images.length - 1 : prevIndex - 1
      );
    }
  };

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnime(response.data.data);
      } catch (error) {
        console.error('Error fetching anime:', error);
      }
    };

    fetchAnime();
  }, [id]);

  useEffect(() => {
    if (slidesRef.current) {
      slidesRef.current.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    }
  }, [currentImageIndex]);

  if (!anime) {
    return <div>Loading...</div>;
  }

  return (
    <div className="anime-details-page">
      <div className="anime-container">
        <div className="anime-hero">
          <h1>{anime.title}</h1>
          <div className="hero-info">
            <div className="hero-score">
              <span className="score-value">{anime.score}</span>
              <span className="score-label">/10</span>
            </div>
            <div className="hero-meta">
              <span>{anime.type}</span>
              <span>•</span>
              <span>{anime.episodes} eps</span>
              <span>•</span>
              <span>{anime.status}</span>
            </div>
          </div>
        </div>

        <div className="anime-gallery">
          <div 
            className="gallery-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="gallery-slides" ref={slidesRef}>
              {anime.images.map((image, index) => (
                <div key={index} className="gallery-slide">
                  <img src={image.jpg.large_image_url} alt={`${anime.title} - Image ${index + 1}`} />
                </div>
              ))}
            </div>
            <button className="gallery-nav prev" onClick={prevImage}>❮</button>
            <button className="gallery-nav next" onClick={nextImage}>❯</button>
          </div>
          <div className="gallery-counter">
            {currentImageIndex + 1} / {anime.images.length}
          </div>
        </div>

        {/* Остальной контент */}
      </div>
    </div>
  );
};

export default AnimeDetail; 