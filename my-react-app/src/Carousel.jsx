import { useEffect, useState, useRef } from 'react';
import './index.css';

function Carousel({ fetchGames, platform, limit }) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const carouselRef = useRef(null);
    const [centeredGameIndex, setCenteredGameIndex] = useState(2); // Default to the third card (index 2)

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            fetchGames(platform, limit) // Using the passed props here
                .then((res) => {
                    setGames(res.results);
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

    // The games array to display
    const displayedGames = games.length > 0 ? games : [];

    // Move the carousel left or right
    const moveCarousel = (direction) => {
        const carousel = carouselRef.current;
        const itemWidth = carousel.children[0].offsetWidth;
        const scrollAmount = direction === 'left' ? -itemWidth : itemWidth;

        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    // Update the center card based on the scroll position
    const updateCenterCard = () => {
        const carousel = carouselRef.current;
        const centerPosition = carousel.scrollLeft + carousel.offsetWidth / 2;
        let closestCardIndex = 0;
        let minDistance = Infinity;

        Array.from(carousel.children).forEach((card, index) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(cardCenter - centerPosition);
            if (distance < minDistance) {
                minDistance = distance;
                closestCardIndex = index;
            }
        });

        setCenteredGameIndex(closestCardIndex); // Update the centered card index
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        const handleScroll = () => updateCenterCard();
        carousel.addEventListener('scroll', handleScroll);

        return () => {
            carousel.removeEventListener('scroll', handleScroll);
        };
    }, [games]);

    const addSpace = (numSpaces = 2) => {
        const spaces = new Array(numSpaces).fill(null).map((_, index) => (
            <div key={`empty-space-${index}`} className="empty-space" />
        ));
        return [...spaces, ...displayedGames, ...spaces];
    };

    const adjustedGames = addSpace(); // Add space before and after the games for extra scroll room

    // Handle card click
    const handleCardClick = (index) => {
        setCenteredGameIndex(index);
        const carousel = carouselRef.current;
        const cardWidth = carousel.children[index].offsetWidth;
        carousel.scrollTo({
            left: carousel.children[index].offsetLeft - carousel.offsetWidth / 2 + cardWidth / 2,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel && carousel.children.length > 0) {
            const cardWidth = carousel.children[2].offsetWidth;
            const centerPosition = (carousel.scrollWidth - carousel.offsetWidth) / 2;
            carousel.scrollLeft = centerPosition - cardWidth / 2;
        }
    }, [games]);

    return (
        <div className="games-container">
            <h1 className="page-title">{platform} Games</h1>
            {loading && <p className="loading-text">Loading games...</p>}
            {games.length === 0 && !loading && <p className="no-games-text">No games found.</p>}
            <div className="carousel-container">
                <button className="carousel-button left" onClick={() => moveCarousel('left')}>
                    ‹
                </button>
                <div id="carousel" className="carousel" ref={carouselRef}>
                    {adjustedGames.map((game, index) => {
                        const isHighlighted = index === centeredGameIndex;
    
                        return (
                            <div
                                key={game?.id || index}
                                className={`game-card ${isHighlighted ? 'center' : ''}`}
                                onClick={() => handleCardClick(index)}
                            >
                                {game?.background_image ? (
                                    <img src={game.background_image} alt={game.name} className="game-image" />
                                ) : (
                                    <div className="no-image">No Image Available</div>
                                )}
                                <h2 className="game-title">{game.name}</h2>
                                
                            </div>
                        );
                    })}
                </div>
                <button className="carousel-button right" onClick={() => moveCarousel('right')}>
                    ›
                </button>
            </div>
        </div>
    );    
}

export default Carousel;
