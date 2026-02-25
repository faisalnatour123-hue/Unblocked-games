// Game data will be fetched from games.json
let games = [];
let filteredGames = [];

// DOM Elements
const gamesGrid = document.getElementById('games-grid');
const gameListView = document.getElementById('game-list-view');
const gamePlayerView = document.getElementById('game-player-view');
const searchInputDesktop = document.getElementById('search-input-desktop');
const searchInputMobile = document.getElementById('search-input-mobile');
const noResults = document.getElementById('no-results');
const searchTermSpan = document.getElementById('search-term');
const gameIframe = document.getElementById('game-iframe');
const gameTitle = document.getElementById('game-title');
const gameAboutTitle = document.getElementById('game-about-title');
const gameDescription = document.getElementById('game-description');
const fullscreenIcon = document.getElementById('fullscreen-icon');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    lucide.createIcons();

    try {
        const response = await fetch('games.json');
        games = await response.json();
        filteredGames = [...games];
        renderGames();
    } catch (error) {
        console.error('Error loading games:', error);
        gamesGrid.innerHTML = '<p class="text-red-500 text-center col-span-full">Failed to load games. Please try again later.</p>';
    }

    // Search listeners
    searchInputDesktop.addEventListener('input', handleSearch);
    searchInputMobile.addEventListener('input', handleSearch);
});

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    // Sync inputs
    if (e.target === searchInputDesktop) {
        searchInputMobile.value = query;
    } else {
        searchInputDesktop.value = query;
    }

    filteredGames = games.filter(game => 
        game.title.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query)
    );

    renderGames();

    if (filteredGames.length === 0) {
        noResults.classList.remove('hidden');
        searchTermSpan.textContent = query;
    } else {
        noResults.classList.add('hidden');
    }
}

function clearSearch() {
    searchInputDesktop.value = '';
    searchInputMobile.value = '';
    filteredGames = [...games];
    renderGames();
    noResults.classList.add('hidden');
}

function renderGames() {
    gamesGrid.innerHTML = '';
    
    if (games.length === 0) {
        gamesGrid.innerHTML = '<div class="col-span-full text-center py-12 bg-white/90 border-4 border-black rounded-xl"><p class="text-[#E70012] text-lg font-bold pixel-font">NO GAMES IN THIS CASTLE YET!</p></div>';
        return;
    }

    filteredGames.forEach(game => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col h-full mario-card';
        card.onclick = () => openGame(game);
        
        card.innerHTML = `
            <div class="h-40 w-full bg-[#6b8cff] relative overflow-hidden border-b-4 border-black">
                <img 
                    src="${game.thumbnail}" 
                    alt="${game.title}"
                    class="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onerror="this.src='https://placehold.co/600x400?text=${encodeURIComponent(game.title)}'"
                />
            </div>
            <div class="p-4 flex-1 flex flex-col bg-[#FFD700]">
                <h3 class="text-lg font-bold text-[#E70012] mb-1 pixel-font tracking-tight leading-tight">${game.title}</h3>
                <p class="text-sm text-black font-bold line-clamp-2">${game.description}</p>
            </div>
        `;
        
        gamesGrid.appendChild(card);
    });
}

function openGame(game) {
    gameListView.classList.add('hidden');
    gamePlayerView.classList.remove('hidden');
    
    gameTitle.textContent = game.title;
    gameAboutTitle.textContent = game.title;
    gameDescription.textContent = game.description;
    gameIframe.src = game.url;

    // Handle Controls
    const controlsContainer = document.getElementById('game-controls');
    const controlsList = document.getElementById('controls-list');
    
    if (game.controls && game.controls.length > 0) {
        controlsContainer.classList.remove('hidden');
        controlsList.innerHTML = game.controls.map(control => `
            <li class="flex items-center justify-between bg-white/50 p-2 rounded border-2 border-black">
                <span class="bg-black text-white px-2 py-1 rounded font-mono text-xs">${control.key}</span>
                <span class="text-[#E70012] text-xs uppercase tracking-wide">${control.action}</span>
            </li>
        `).join('');
    } else {
        controlsContainer.classList.add('hidden');
        controlsList.innerHTML = '';
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function showGameList() {
    gamePlayerView.classList.add('hidden');
    gameListView.classList.remove('hidden');
    gameIframe.src = ''; // Stop game execution
}

function toggleFullscreen() {
    const container = document.getElementById('game-container');
    
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
        fullscreenIcon.setAttribute('data-lucide', 'minimize-2');
    } else {
        document.exitFullscreen();
        fullscreenIcon.setAttribute('data-lucide', 'maximize-2');
    }
    lucide.createIcons();
}

// Listen for fullscreen changes to update icon
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        fullscreenIcon.setAttribute('data-lucide', 'maximize-2');
        lucide.createIcons();
    } else {
        fullscreenIcon.setAttribute('data-lucide', 'minimize-2');
        lucide.createIcons();
    }
});
