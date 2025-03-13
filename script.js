// Variables from User selection

const genre = "action"
const platform = "4"


const yearStart = document.getElementById("yearStart").value
const yearEnd = document.getElementById("yearEnd").value
const pageNumber = Math.floor(Math.random() * 4 + 1);


// Variables in RAWG API
const baseUrl = "https://api.rawg.io/api/"
const apikey = "46ecfc48e5144c6dbcff3e720ad64632";



async function fetchData(){

    const response  = await fetch(`${baseUrl}games?key=${apikey}&platforms=${platform}&genres=${genre}&page=${pageNumber}&page_size=10&dates=${yearStart}-01-01,${yearEnd}-12-31`);

    // const response = await fetch(`https://api.rawg.io/api/genres?key=${apikey}`); //fetch all genres
    // const response = await fetch(`https://api.rawg.io/api/platforms?key=${apikey}`); //fetch all platforms

    const data = await response .json();
    console.log(data);
    displayGames(data.results);
 
}


function displayGames(games) {
    const gameContainer = document.getElementById('games');
    const randomIndex = Math.floor(Math.random() * games.length);
    const game = games[randomIndex];

    const genreNames = game.genres.map(genre => genre.name).join(', ');
    const platformNames = game.platforms.map(p => p.platform.name).join(', ');

    gameContainer.innerHTML = `

        <div class="bg-white rounded-xl p-5 m-5 w-full max-w-7xl shadow-2xl mx-auto flex flex-row ">

            <img class="p-5 w-3xl" src="${game.background_image}" alt="${game.name}">
            <div class="p-5 content-center">
                <h3 class="text-start"><strong>${game.name}</strong></h3>
                <p class="text-start"><strong>Genre:</strong> ${genreNames}</p>
                <p class="text-start"><strong>Platform:</strong> ${platformNames}</p>
                <p class="text-start"><strong>Rating:</strong> ${game.rating}</p>
                <p class="text-start"><strong>Release Date:</strong> ${game.released}</p>
            </div>
        </div>
        

    `;
}

// https://api.rawg.io/api/games?key=${apikey}  =  All Games
// https://api.rawg.io/api/games/3328?key=${apikey} = Specific Game using ID
