import React, { useState, useEffect, useRef } from "react";

function TrailerPlayer({ trailers, selectedTrailer, onSelectTrailer }) {
  const [isPlaying, setIsPlaying] = useState(false); // Track if the video is playing
  const videoRef = useRef(null); // Reference to the video element
  const iframeRef = useRef(null); // Reference to YouTube iframe

  // Function to handle trailer selection
  const handleTrailerSelect = (trailer) => {
    onSelectTrailer(trailer); // Set selected trailer

    if (videoRef.current) {
      videoRef.current.pause(); // Pause the current video when a new one is selected
    }

    if (trailer.videoId) {
      // If it's a YouTube trailer, set the iframe to autoplay
      setIsPlaying(true);
    } else if (trailer?.data?.max) {
      // For default video trailers, auto-play the new video
      setIsPlaying(true);
    }
  };

  // Function to toggle play/pause when the play icon is clicked
  const handlePlayPause = () => {
    if (iframeRef.current && selectedTrailer?.videoId) {
      // If it's a YouTube video, we don't have direct control over iframe autoplay
      setIsPlaying(!isPlaying);
    } else if (videoRef.current) {
      // For default video trailers, toggle play/pause
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Auto-play selected trailer when it changes
  useEffect(() => {
    if (selectedTrailer?.videoId) {
      // For YouTube trailers, set iframe autoplay
      setIsPlaying(true);
    } else if (selectedTrailer?.data?.max) {
      // For default video trailers, play the video automatically
      if (videoRef.current) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [selectedTrailer]);

  return (
    <div className="trailer-container">
      {/* Main Video Player */}
      {selectedTrailer ? (
        selectedTrailer.videoId ? (
          <div className="youtube-player-container">
            {/* Embed YouTube video using iframe */}
            <iframe
              ref={iframeRef}
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${selectedTrailer.videoId}?autoplay=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="YouTube Trailer"
              className="youtube-trailer"
            ></iframe>
          </div>
        ) : (
          <video
            ref={videoRef}
            controls
            className="game-trailer"
            autoPlay={isPlaying} // Auto-play when isPlaying is true
            onPlay={() => setIsPlaying(true)} // Update state when the video starts playing
            onPause={() => setIsPlaying(false)} // Update state when the video is paused
          >
            <source src={selectedTrailer?.data?.max} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      ) : (
        <p className="no-trailer">No trailer available for this game.</p>
      )}

      {/* Trailer Thumbnails */}
      <div className="trailer-thumbnails">
        {trailers.map((trailer, index) => (
          <div
            key={index}
            className={`trailer-thumbnail ${
              selectedTrailer === trailer ? "selected" : ""
            }`}
            onClick={() => handleTrailerSelect(trailer)} // Handle trailer selection
          >
            <img src={trailer.preview} alt={`Trailer ${index + 1}`} />
            {/* Play Icon for Toggle */}
            <div className="play-icon" onClick={handlePlayPause}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3, 19 12, 5 21" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrailerPlayer;
