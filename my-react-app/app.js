import axios from "axios"

// export const getAllGames = (page = 1, page_size = 20) => {
//     return axios.get(`https://api.rawg.io/api/games?key=b51ee96f2e4e4800a8b4064e77d7c4a6&page=${page}&page_size=${page_size}`)
//         .then(({ data }) => {
//             return data;
//         })
//         .catch((error) => {
//             console.error("Error fetching games:", error);
//             throw error; 
//         });
// };

export const fetchGamesForPC = (limit) => {
    const platform = 7; // PC platform ID
    return axios.get(`https://api.rawg.io/api/games?ordering=-added&dates=2024-06-01,2025-01-09&key=b51ee96f2e4e4800a8b4064e77d7c4a6&page_size=20`)
        .then(({ data }) =>
            {
                console.log(data.results[0])
                return data
            })
        .catch((error) => {
            console.error("Error fetching PC games:", error);
            throw error;
        });

};

export const fetchGamesForPlayStation5 = (limit) => {
    const platform = 187; // PS5 platform ID
    return axios.get(`https://api.rawg.io/api/games?key=b51ee96f2e4e4800a8b4064e77d7c4a6&page_size=${limit}&platforms=${platform}`)
        .then(({ data }) => data)
        .catch((error) => {
            console.error("Error fetching PlayStation 5 games:", error);
            throw error;
        });
};

export const fetchGamesForMobile = (platform = 21, limit) => { // Default to Android
    return axios.get(`https://api.rawg.io/api/games?key=b51ee96f2e4e4800a8b4064e77d7c4a6&page_size=${limit}&platforms=${platform}`)
        .then(({ data }) =>{
            console.log(data.results)
            return data 
        } )
        .catch((error) => {
            console.error("Error fetching mobile games:", error);
            throw error;
        });
};


export const fetchGamesForSwitch = (platform = 21, limit) => { // Default to Android
    return axios.get(`https://api.rawg.io/api/games?key=b51ee96f2e4e4800a8b4064e77d7c4a6&page_size=${limit}&platforms=${platform}`)
        .then(({ data }) =>{
            console.log(data.results)
            return data 
        } )
        .catch((error) => {
            console.error("Error fetching mobile games:", error);
            throw error;
        });
};

export const fetchGamesForBestPS5Exclusives = (platform=187) => { 
    return axios.get(`https://api.rawg.io/api/games?key=b51ee96f2e4e4800a8b4064e77d7c4a6&publishers=nintendo&ordering=-rating&page_size=20`)
        .then(({ data }) =>{
            console.log(data.results)
            return data 
        } )
        .catch((error) => {
            console.error("Error fetching mobile games:", error);
            throw error;
        });
};

export const fetchGamesForRecentlyReleased = (platform, limit) => {
    const today = new Date();
    const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1)).toISOString().split('T')[0];

    return axios.get(
        `https://api.rawg.io/api/games?key=b51ee96f2e4e4800a8b4064e77d7c4a6&page_size=${limit}&ordering=-rating&released=${oneMonthAgo}`
    )
        .then(({ data }) => data)
        .catch((error) => {
            console.error("Error fetching recently released games:", error);
            throw error;
        });
};



export const fetchGame = () => {

    return axios.get(
        `https://api.rawg.io/api/games/among-us?key=b51ee96f2e4e4800a8b4064e77d7c4a6`
    )
        .then(({ data }) =>{
            return data
        }
            )
        .catch((error) => {
            console.error("Error fetching recently released games:", error);
            throw error;
        });
};

export const fetchTrailer = (ID) => {
    return axios.get(
        `https://api.rawg.io/api/games/${ID}/movies?key=b51ee96f2e4e4800a8b4064e77d7c4a6`
    )
        .then(({ data }) =>{
            console.log( ID)
            console.log(data)
            return data
        }
            )
        .catch((error) => {
            console.error("Error fetching recently released games:", error);
            throw error;
        });
}



export const fetchYouTubeTrailers = (gameName) => {
    const apiKey = 'AIzaSyBhvOvi_twQ-zooFigQCDOhaHR49PWQpRc'; // Provided API Key
    const searchQuery = `${gameName} videogame trailer`; // Search query for trailers
    const maxResults = 5; // Number of trailers to fetch

    // Building the URL for the API request
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&key=${apiKey}&maxResults=${maxResults}`;

    // Using fetch to call YouTube API and chaining .then() for promise handling
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Parse the trailer data and format it to match the expected structure
        const trailers = data.items.map((item) => ({
          preview: item.snippet.thumbnails.high.url, // Preview thumbnail URL
          videoId: item.id.videoId, // Direct videoId field (required by TrailerPlayer)
          title: item.snippet.title, // Trailer title
        }));
        console.log(trailers); // Check the output to ensure format is correct
        return trailers; // Return parsed trailer data in the expected format
      })
      .catch((error) => {
        console.error('There was an error fetching the trailers:', error);
      });
};
