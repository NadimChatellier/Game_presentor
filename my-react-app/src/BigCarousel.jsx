import { useEffect, useState, useRef } from 'react';
import './index.css';

function BigCarousel({ fetchGames, platform, limit, transitionTime = 0.5 }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetchGames(platform, limit)
        .then((response) => {
          setGames(response.results);
        })
        .catch((error) => {
          console.error('Error loading games:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, [fetchGames, platform, limit]);

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel || isAnimating) return;

    const totalSlides = games.length;

    // Infinite scrolling logic: Loop back to the first/last item when scrolling out of bounds
    let newSlide = currentSlide + direction;

    if (newSlide < 0) {
      newSlide = totalSlides - 1; // Go to the last slide
    } else if (newSlide >= totalSlides) {
      newSlide = 0; // Go to the first slide
    }

    setIsAnimating(true);
    setCurrentSlide(newSlide);

    carousel.scrollTo({
      left: newSlide * carousel.clientWidth,
      behavior: 'smooth',
    });

    setTimeout(() => setIsAnimating(false), transitionTime * 1000);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollTo({
        left: index * carousel.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="big-carousel-container">
      <div className="carousel" ref={carouselRef}>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          games.map((game, index) => (
            <div
              key={index}
              className={`big-carousel-item ${currentSlide === index ? 'active' : ''}`}
            >
              {game.background_image ? (
                <img src={game.background_image} alt={game.name} className="big-game-image" />
              ) : (
                <div className="no-image">No Image Available</div>
              )}
              <h3 className="game-title">{game.name}</h3>
              <button className="play-button">Play Now</button>
            </div>
          ))
        )}
      </div>

      <div className="carousel-dots">
        {games.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => {
                handleDotClick(index)
            }}
          ></span>
        ))}
      </div>

      <button
        className="nav-btn left"
        onClick={() => scrollCarousel(-1)}
        disabled={isAnimating}
        aria-label="Scroll Left"
      >
        ‹
      </button>
      <button
        className="nav-btn right"
        onClick={() => scrollCarousel(1)}
        disabled={isAnimating}
        aria-label="Scroll Right"
      >
        ›
      </button>
    </div>
  );
}

export default BigCarousel;
