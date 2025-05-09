import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'

const apiUrl = "https://api.jikan.moe/v4/anime"
const MAX_IMAGES = 8

function AnimeDetails() {
  const { id } = useParams()
  const [anime, setAnime] = useState(null)
  const [pictures, setPictures] = useState([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isImagesLoading, setIsImagesLoading] = useState(true)
  const [maxImageSize, setMaxImageSize] = useState({ width: 0, height: 0 })
  const galleryRef = useRef(null)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [baseImageSize, setBaseImageSize] = useState(null)

  useEffect(() => {
    fetchAnimeDetails()
  }, [id])

  useEffect(() => {
    if (anime) {
      fetchAnimePictures()
    }
  }, [anime])

  useEffect(() => {
    if (galleryRef.current && pictures[selectedImage]) {
      const container = galleryRef.current
      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight
      const containerRatio = containerWidth / containerHeight

      // Используем размеры первой картинки как эталон
      const referenceImage = pictures[0]
      const imageRatio = referenceImage.size.width / referenceImage.size.height

      let width, height
      if (imageRatio > containerRatio) {
        width = containerWidth
        height = width / imageRatio
      } else {
        height = containerHeight
        width = height * imageRatio
      }

      setBaseImageSize({ width, height })
    }
  }, [pictures])

  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
          url: url
        })
      }
      img.onerror = reject
      img.src = url
    })
  }

  const findMaxImageSize = (images) => {
    return images.reduce((max, img) => {
      const area = img.width * img.height
      const maxArea = max.width * max.height
      return area > maxArea ? img : max
    }, { width: 0, height: 0 })
  }

  async function fetchAnimeDetails() {
    try {
      const response = await fetch(`${apiUrl}/${id}`)
      const data = await response.json()
      setAnime(data.data)
      if (data.data && data.data.images) {
        const mainImage = await preloadImage(data.data.images.jpg.large_image_url)
        setPictures([{
          jpg: {
            large_image_url: data.data.images.jpg.large_image_url
          },
          size: mainImage
        }])
      }
    } catch (error) {
      console.error('Error fetching anime details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchAnimePictures() {
    try {
      setIsImagesLoading(true)
      const response = await fetch(`${apiUrl}/${id}/pictures`)
      const data = await response.json()
      const newPictures = data.data.slice(0, MAX_IMAGES - 1)
      
      // Предзагружаем все изображения
      const loadedImages = await Promise.all(
        newPictures.map(pic => preloadImage(pic.jpg.large_image_url))
      )

      // Находим максимальный размер
      const maxSize = findMaxImageSize(loadedImages)
      setMaxImageSize(maxSize)

      // Добавляем изображения с их размерами
      const picturesWithSizes = newPictures.map((pic, index) => ({
        ...pic,
        size: loadedImages[index]
      }))

      setPictures(prev => {
        const coverImageUrl = prev[0].jpg.large_image_url
        const filteredPictures = picturesWithSizes.filter(pic => 
          pic.jpg.large_image_url !== coverImageUrl
        )
        return [...prev, ...filteredPictures]
      })
    } catch (error) {
      console.error('Error fetching anime pictures:', error)
    } finally {
      setIsImagesLoading(false)
    }
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % pictures.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + pictures.length) % pictures.length)
  }

  const getImageStyle = () => {
    if (!baseImageSize) return {}
    return {
      width: `${baseImageSize.width}px`,
      height: `${baseImageSize.height}px`,
      objectFit: 'contain'
    }
  }

  if (isLoading || !anime) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  return (
    <div className="anime-details-page">
      <div className="anime-hero">
        <div className="hero-overlay">
          <div className="container">
            <h1>{anime.title}</h1>
            <div className="hero-info">
              <div className="hero-score">
                <span className="score-value">{anime.score || 'N/A'}</span>
                <span className="score-label">Score</span>
              </div>
              <div className="hero-meta">
                <span>{anime.type}</span>
                <span>•</span>
                <span>{anime.episodes || '?'} Episodes</span>
                <span>•</span>
                <span>{anime.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="anime-content">
          {pictures.length > 0 && (
            <div className="anime-gallery">
              <div className="gallery-container" ref={galleryRef}>
                <div className="gallery-main">
                  <div className="gallery-image-wrapper">
                    <img 
                      src={pictures[selectedImage].jpg.large_image_url} 
                      alt={`${anime.title} - Image ${selectedImage + 1}`}
                      style={getImageStyle()}
                    />
                  </div>
                </div>
              </div>
              {isImagesLoading ? (
                <div style={{ textAlign: 'center', padding: '10px' }}>Loading images...</div>
              ) : (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px',
                  width: '100%',
                  position: 'relative',
                  left: '0',
                  right: '0',
                  padding: '0'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '8px',
                    overflowX: 'auto',
                    padding: '5px 0',
                    width: '100%',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#FF6B81 #f0f0f0',
                    justifyContent: 'flex-start'
                  }}>
                    {pictures.map((picture, index) => (
                      <div 
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        style={{
                          width: '40px',
                          height: '40px',
                          cursor: 'pointer',
                          border: index === selectedImage ? '2px solid #FF6B81' : '2px solid transparent',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          opacity: index === selectedImage ? 1 : 0.7,
                          transition: 'all 0.3s ease',
                          flexShrink: 0
                        }}
                      >
                        <img 
                          src={picture.jpg.large_image_url} 
                          alt={`${anime.title} - Thumbnail ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="anime-main">
            <div className="anime-info">
              <div className="info-section">
                <h3>Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Type</span>
                    <span className="info-value">{anime.type}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Episodes</span>
                    <span className="info-value">{anime.episodes || 'Unknown'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status</span>
                    <span className="info-value">{anime.status}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Rating</span>
                    <span className="info-value">{anime.rating}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Source</span>
                    <span className="info-value">{anime.source}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Season</span>
                    <span className="info-value">{anime.season} {anime.year}</span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Genres</h3>
                <div className="genres-list">
                  {anime.genres.map(genre => (
                    <span key={genre.mal_id} className="genre-tag">{genre.name}</span>
                  ))}
                </div>
              </div>

              <div className="info-section">
                <h3>Studios</h3>
                <div className="studios-list">
                  {anime.studios.map(studio => (
                    <span key={studio.mal_id} className="studio-name">{studio.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="anime-synopsis">
            <h2>Synopsis</h2>
            <p>{anime.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimeDetails 