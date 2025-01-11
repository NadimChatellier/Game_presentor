import React, { useEffect, useState } from "react";
import "./index.css";
import { fetchGame, fetchTrailer, fetchYouTubeTrailers } from "../app";
import Carousel from "./Carousel";
import TrailerPlayer from "./Trailer"; // Import the TrailerPlayer component
import { fetchGamesForPC } from "../app";
import "@dotlottie/player-component"; // Import Lottie Player component

function GamePage() {
  const [game, setGame] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isYouTubeRequested, setIsYouTubeRequested] = useState(false);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);

        // Fetch game details
        const gameData = await fetchGame();
        setGame(gameData);

        // Fetch trailers
        const trailerData = await fetchTrailer(gameData.slug); // Assuming `slug` is the unique identifier
        if (trailerData.results && trailerData.results.length > 0) {
          setTrailers(trailerData.results);
          setSelectedTrailer(trailerData.results[0]);
        } else {
          setTrailers([]); // No trailers found
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching the game data.");
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, []);

  const handleFetchYouTubeTrailers = async () => {
    if (!game?.name) {
      setError("Game name is required to search YouTube trailers.");
      return;
    }

    try {
      setIsYouTubeRequested(true);

      const ytTrailers = await fetchYouTubeTrailers(game.name);
      if (ytTrailers && ytTrailers.length > 0) {
        setTrailers(ytTrailers);
        setSelectedTrailer(ytTrailers[0]);
      } else {
        setError("No YouTube trailers found.");
      }
    } catch (err) {
      setError("Error fetching YouTube trailers: " + err.message);
    } finally {
      setIsYouTubeRequested(false);
    }
  };

  if (loading) {
    return (
      <div className="gamepage-container">
        <dotlottie-player
          src="https://lottie.host/023bc649-5601-4ad4-ae9b-7b0f43e941c3/PXgoYXRVjM.lottie"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay
        ></dotlottie-player>
        <p className="loading-text">Loading game details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gamepage-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="gamepage-container">
      <div className="game-info-wrapper">
        <img
          src={game?.background_image || "/default-game-banner.jpg"}
          alt={game?.name || "Game Banner"}
          className="game-banner"
        />
        <div className="game-info-container">
          <h1>{game.name}</h1>
          <div className="platforms-container">
            {game.platforms?.map((platform, index) => (
              <span key={index} className="platform">
                {platform.platform.name}
              </span>
            ))}
          </div>
          <button className="borrow-button">Borrow Now</button>
        </div>
      </div>
      <div className="game-further-info">{game.genres.map((genre) =><span key={genre.name} className="platform">
                {genre.name}
              </span>
               )}
            <p>{game.released}</p>
            {game.stores.map((store) => {
                return <p>{store.store.name}</p>
            })}

              </div>

      <div className="game-description-container">
        <h1>Details</h1>
        <p>{game?.description_raw || "No description available for this game."}</p>
      </div>
      

      {trailers.length > 0 && (
        <TrailerPlayer
          trailers={trailers}
          selectedTrailer={selectedTrailer}
          onSelectTrailer={setSelectedTrailer}
        />
      )}

      {trailers.length === 0 && !isYouTubeRequested && (
        <div className="game-description-container">
          <p>No trailers available. Would you like to search for trailers on YouTube?</p>
          <button onClick={handleFetchYouTubeTrailers}>Fetch YouTube Trailers</button>
        </div>
      )}

      {isYouTubeRequested && (
        <div className="game-description-container">
          <p>Searching for trailers on YouTube...</p>
        </div>
      )}

      <div className="game-description-container">
        <h1>We think you would like:</h1>
      </div>
      <Carousel fetchGames={fetchGamesForPC} platform="0" />
    </div>
  );
}

export default GamePage;
