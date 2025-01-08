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
    const platform = 4; // PC platform ID
    return axios.get(`https://api.rawg.io/api/games?key=b51ee96f2e4e4800a8b4064e77d7c4a6&page_size=${limit}&platforms=${platform}`)
        .then(({ data }) => data)
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
    return axios.get(`https://api.rawg.io/api/games?key=b51ee96f2e4e4800a8b4064e77d7c4a6&publishers=sony%20interactive%20entertainment&ordering=-rating&page_size=20`)
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
