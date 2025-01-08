import React from 'react';
import Carousel from './Carousel';
import { fetchGamesForPC, fetchGamesForPlayStation5 , fetchGamesForMobile, fetchGamesForSwitch, fetchGamesForBestPS5Exclusives, fetchGamesForRecentlyReleased} from '../app';

function App() {
    return (
        <div>
            <h1>Game Carousels</h1>
            {/* Pass props to Carousel */}
            <Carousel fetchGames={fetchGamesForPC} platform="0" />
            <Carousel fetchGames={fetchGamesForPlayStation5} platform="187" />
            <Carousel fetchGames={fetchGamesForMobile} platform="3,21" />
            <Carousel fetchGames={fetchGamesForSwitch} platform="7" />
            <Carousel fetchGames={fetchGamesForBestPS5Exclusives} platform={"187"} />
            <Carousel fetchGames={fetchGamesForRecentlyReleased} />
        </div>
    );
}

export default App;

