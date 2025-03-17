// Variables from User selection
let selectedGenres;
let selectedPlatforms;
let yearStart;
let yearEnd;

// Chooses a Random Array of Game Pages
const pageNumber = Math.floor(Math.random() * 5 + 1);


// Variables in RAWG API
const baseUrl = "https://api.rawg.io/api/"
const apikey = "46ecfc48e5144c6dbcff3e720ad64632";

function getSelectedGenres() {
    selectedGenres = document.querySelector('input[name="genre"]:checked').value;
    selectedPlatforms = document.querySelector('input[name="platform"]:checked').value;
    yearStart = document.getElementById("yearStart").value;
    yearEnd = document.getElementById("yearEnd").value;
    console.log(selectedGenres, selectedPlatforms, yearStart, yearEnd); // Logs ["Action", "PC", "2009", "2010"]
}


async function fetchData(){
    const response  = await fetch(`${baseUrl}games?key=${apikey}&platforms=${selectedPlatforms}&genres=${selectedGenres}&page=${pageNumber}&page_size=10&dates=${yearStart}-01-01,${yearEnd}-12-31`);

    // const response = await fetch(`https://api.rawg.io/api/genres?key=${apikey}`); //fetch all genres
    // const response = await fetch(`https://api.rawg.io/api/platforms?key=${apikey}`); //fetch all platforms
    // https://api.rawg.io/api/games?key=${apikey}  =  All Games
    // https://api.rawg.io/api/games/3328?key=${apikey} = Specific Game using ID

    const data = await response .json();
    console.log(data);
    displayGames(data.results);
 
}


function displayGames(games) {
    // Edits the Div of Game in HTML
    const gameContainer = document.getElementById('games');

    // Takes a Random Array of one Game
    const randomIndex = Math.floor(Math.random() * games.length);
    const game = games[randomIndex];

    const genreNames = game.genres.map(genre => genre.name).join(', ');
    const platformNames = game.platforms.map(p => p.platform.name).join(', ');

    gameContainer.innerHTML = `
        
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col xl:flex-row bg-white shadow-2xl rounded-xl overflow-hidden p-5">

            <!-- Image Section -->
                <img src="${game.background_image}" 
                    alt="Game Image" 
                    class="w-full md:w-3xl sm:w-2xl object-cover">

            <!-- Text Section -->
                <div class="p-6 flex flex-col justify-start">
                    <h2 class="text-2xl font-bold text-gray-800">${game.name}</h2>
                    <p class="mt-2">Genres: <span class="font-semibold"> ${genreNames}</span></p>
                    <p class="mt-2">Platfoms<span class="font-semibold"> ${platformNames}</span></p>
                    <p class="mt-2">Release Date: <span class="font-semibold"> ${game.released}</span></p>
                    <p class="mt-2">Rating: <span class="font-semibold">${game.rating}</span></p>
                </div>
            </div>
        </div>

    `;
}


