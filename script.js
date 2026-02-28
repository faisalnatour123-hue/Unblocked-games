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

    // Initial render
    renderGames();
});

function toggleSortMenu() {
    const menu = document.getElementById('sort-menu');
    menu.classList.toggle('hidden');
}

function sortGames(method) {
    switch(method) {
        case 'az':
            filteredGames.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'za':
            filteredGames.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'newest':
            // Assuming the original 'games' array order is roughly chronological (newest at bottom)
            // We need to reverse the original index order
            filteredGames.sort((a, b) => games.indexOf(b) - games.indexOf(a));
            break;
        case 'oldest':
            filteredGames.sort((a, b) => games.indexOf(a) - games.indexOf(b));
            break;
    }
    renderGames();
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    // Sync inputs
    if (e.target === searchInputDesktop) {
        searchInputMobile.value = query;
    } else {
        searchInputDesktop.value = query;
    }

    // City Boy Easter Egg
    if (query === 'city boy') {
        triggerCityBoy();
        
        // Clear search
        searchInputDesktop.value = '';
        searchInputMobile.value = '';
        filteredGames = [...games];
        renderGames();
        return;
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

function closeCityBoy() {
    const easterEgg = document.getElementById('city-boy-easter-egg');
    if (easterEgg) {
        if (cityBoyPlayer && typeof cityBoyPlayer.stopVideo === 'function') {
            cityBoyPlayer.stopVideo();
        }
        easterEgg.classList.add('hidden');
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
    
    if (filteredGames.length === 0 && games.length > 0) {
        // Handled by search logic
        return;
    }

    if (games.length === 0) {
        gamesGrid.innerHTML = '<div class="col-span-full text-center py-12 bg-white/90 border-4 border-black rounded-xl"><p class="text-theme-card text-lg font-bold pixel-font" style="color: var(--text-card)">NO GAMES IN THIS CASTLE YET!</p></div>';
        return;
    }

    filteredGames.forEach(game => {
        const card = document.createElement('div');
        card.onclick = () => openGame(game);
        
        // Default Grid
        card.className = 'bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col h-full mario-card';
        card.innerHTML = `
            <div class="h-40 w-full bg-theme-main relative overflow-hidden border-b-4 border-black">
                <img 
                    src="${game.thumbnail}" 
                    alt="${game.title}"
                    class="w-full h-full object-fill"
                    referrerPolicy="no-referrer"
                    onerror="this.src='https://placehold.co/600x400?text=${encodeURIComponent(game.title).replace(/'/g, '%27')}'"
                />
            </div>
            <div class="p-4 flex-1 flex flex-col bg-theme-card transition-colors duration-300">
                <h3 class="text-lg font-bold text-theme-card mb-1 pixel-font tracking-tight leading-tight" style="color: var(--text-card)">${game.title}</h3>
                <p class="text-sm text-black font-bold line-clamp-2">${game.description}</p>
            </div>
        `;
        
        gamesGrid.appendChild(card);
    });
}

// Settings Logic
function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    modal.classList.toggle('hidden');
}

function saveSettings() {
    const openNewTab = document.getElementById('setting-new-tab').checked;
    const hideHeader = document.getElementById('setting-hide-header').checked;
    
    localStorage.setItem('settingNewTab', openNewTab);
    localStorage.setItem('settingHideHeader', hideHeader);
    
    toggleSettings();
    applySettings();
}

function applySettings() {
    const hideHeader = localStorage.getItem('settingHideHeader') === 'true';
    const header = document.querySelector('header');
    
    // Only hide header in game view if setting is enabled
    if (hideHeader && !gamePlayerView.classList.contains('hidden')) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
}

// Load Settings
document.addEventListener('DOMContentLoaded', () => {
    const newTab = localStorage.getItem('settingNewTab') === 'true';
    const hideHeader = localStorage.getItem('settingHideHeader') === 'true';
    
    const newTabCheckbox = document.getElementById('setting-new-tab');
    const hideHeaderCheckbox = document.getElementById('setting-hide-header');
    
    if (newTabCheckbox) newTabCheckbox.checked = newTab;
    if (hideHeaderCheckbox) hideHeaderCheckbox.checked = hideHeader;
    
    applySettings();
});

// YouTube Player API
let cityBoyPlayer;
// We don't need to do anything in onYouTubeIframeAPIReady if we init lazily,
// but we need to know if API is ready.
function onYouTubeIframeAPIReady() {
    // API is ready
}

function triggerCityBoy() {
    const easterEgg = document.getElementById('city-boy-easter-egg');
    if (!easterEgg) return;
    
    easterEgg.classList.remove('hidden');

    if (cityBoyPlayer) {
        // Player already exists
        cityBoyPlayer.seekTo(0);
        cityBoyPlayer.playVideo();
    } else {
        // Initialize player
        if (typeof YT === 'undefined' || !YT.Player) {
            console.log("YouTube API not ready");
            return; 
        }
        
        cityBoyPlayer = new YT.Player('city-boy-video', {
            height: '100%',
            width: '100%',
            videoId: 'WDkyggKE0E8',
            playerVars: {
                'playsinline': 1,
                'controls': 1,
                'autoplay': 1,
                'rel': 0
            },
            events: {
                'onReady': (event) => {
                    event.target.playVideo();
                },
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        closeCityBoy();
    }
}

// Load YouTube API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Update openGame to respect settings and show mobile controls
function openGame(game) {
    const newTab = localStorage.getItem('settingNewTab') === 'true';
    
    if (newTab) {
        window.open(game.url, '_blank');
        return;
    }

    gameListView.classList.add('hidden');
    gamePlayerView.classList.remove('hidden');
    
    // Detect mobile and apply fit screen if on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (window.innerWidth <= 768 && 'ontouchstart' in window);
    if (isMobile) {
        document.body.classList.add('mobile-fit-active');
    } else {
        document.body.classList.remove('mobile-fit-active');
    }
    
    applySettings(); // Re-apply settings (e.g. hide header)
    
    gameTitle.textContent = game.title;
    gameAboutTitle.textContent = game.title;
    gameDescription.textContent = game.description;
    gameIframe.src = game.url;

    // Apply custom styles if present (e.g. for cropping)
    gameIframe.style.cssText = '';
    if (game.customStyle) {
        gameIframe.style.cssText = game.customStyle;
    }

    // Mobile Controls Logic
    const mobileControls = document.getElementById('mobile-controls');
    
    // Show controls only for specific games on mobile
    const gamesWithControls = ['super-mario-world', 'sonic-cd'];
    
    if (mobileControls) {
        if (isMobile && gamesWithControls.includes(game.id)) {
            mobileControls.classList.remove('hidden');
            mobileControls.classList.add('flex');
            setupMobileControls();
        } else {
            mobileControls.classList.add('hidden');
            mobileControls.classList.remove('flex');
        }
    }

    // Handle Controls
    const controlsContainer = document.getElementById('game-controls');
    const controlsList = document.getElementById('controls-list');
    
    if (game.controls && game.controls.length > 0) {
        controlsContainer.classList.remove('hidden');
        controlsList.innerHTML = game.controls.map(control => `
            <li class="flex items-center justify-between bg-white/50 p-2 rounded border-2 border-black">
                <span class="bg-black text-white px-2 py-1 rounded font-mono text-xs">${control.key}</span>
                <span class="text-theme-card text-xs uppercase tracking-wide" style="color: var(--text-card)">${control.action}</span>
            </li>
        `).join('');
    } else {
        controlsContainer.classList.add('hidden');
        controlsList.innerHTML = '';
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function setupMobileControls() {
    const buttons = document.querySelectorAll('#mobile-controls button');
    const iframe = document.getElementById('game-iframe');
    
    buttons.forEach(btn => {
        const key = btn.dataset.key;
        
        const handlePress = (e) => {
            e.preventDefault();
            btn.classList.add('scale-95', 'brightness-125');
            simulateKeyEvent(iframe, key, 'keydown');
        };
        
        const handleRelease = (e) => {
            e.preventDefault();
            btn.classList.remove('scale-95', 'brightness-125');
            simulateKeyEvent(iframe, key, 'keyup');
        };

        btn.addEventListener('touchstart', handlePress, { passive: false });
        btn.addEventListener('touchend', handleRelease, { passive: false });
        btn.addEventListener('mousedown', handlePress);
        btn.addEventListener('mouseup', handleRelease);
        btn.addEventListener('mouseleave', handleRelease);
    });
}

function simulateKeyEvent(target, key, type) {
    // Mapping for specific games if needed
    let code = key;
    let keyCode = 0;
    
    switch(key) {
        case 'ArrowUp': keyCode = 38; break;
        case 'ArrowDown': keyCode = 40; break;
        case 'ArrowLeft': keyCode = 37; break;
        case 'ArrowRight': keyCode = 39; break;
        case 'Enter': keyCode = 13; code = 'Enter'; break;
        case 'z': keyCode = 90; code = 'KeyZ'; break;
        case 'x': keyCode = 88; code = 'KeyX'; break;
    }

    // Try multiple ways to dispatch the event
    const eventOptions = {
        key: key,
        code: code,
        keyCode: keyCode,
        which: keyCode,
        bubbles: true,
        cancelable: true,
        view: window
    };

    // 1. Dispatch to window (some emulators listen here)
    window.dispatchEvent(new KeyboardEvent(type, eventOptions));
    
    // 2. Dispatch to document
    document.dispatchEvent(new KeyboardEvent(type, eventOptions));

    // 3. Try to focus iframe and dispatch
    if (document.activeElement !== target) {
        target.focus();
    }
    
    // Note: Direct dispatch to cross-origin iframe content is blocked by security policies.
}

// Themes Logic
const themes = {
    mario: {
        '--bg-main': '#6b8cff',
        '--bg-header': '#E70012',
        '--bg-card': '#FFD700',
        '--bg-accent': '#009E49',
        '--text-header': '#ffffff',
        '--text-card': '#E70012',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    luigi: {
        '--bg-main': '#4B9CD3',
        '--bg-header': '#009E49',
        '--bg-card': '#00158F',
        '--bg-accent': '#FFD700',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    peach: {
        '--bg-main': '#FFD1DC',
        '--bg-header': '#FF69B4',
        '--bg-card': '#00FFFF',
        '--bg-accent': '#FF1493',
        '--text-header': '#ffffff',
        '--text-card': '#FF1493',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    bowser: {
        '--bg-main': '#2C2C2C',
        '--bg-header': '#000000',
        '--bg-card': '#ff4400',
        '--bg-accent': '#550000',
        '--text-header': '#ff0000',
        '--text-card': '#000000',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    naruto: {
        '--bg-main': '#FF8C00',
        '--bg-header': '#000000',
        '--bg-card': '#1a1a1a',
        '--bg-accent': '#FF4500',
        '--text-header': '#FF8C00',
        '--text-card': '#FFFFFF',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/clouds.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    one_piece: {
        '--bg-main': '#00BFFF',
        '--bg-header': '#DC143C',
        '--bg-card': '#FFD700',
        '--bg-accent': '#FFFFFF',
        '--text-header': '#FFFFFF',
        '--text-card': '#000000',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/nautical-leather.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    dragon_ball: {
        '--bg-main': '#FF4500',
        '--bg-header': '#00008B',
        '--bg-card': '#FFFF00',
        '--bg-accent': '#FFFFFF',
        '--text-header': '#FFFF00',
        '--text-card': '#000000',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/stardust.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    demon_slayer: {
        '--bg-main': '#2E8B57',
        '--bg-header': '#000000',
        '--bg-card': '#FFFFFF',
        '--bg-accent': '#2E8B57',
        '--text-header': '#2E8B57',
        '--text-card': '#000000',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/checkered-pattern.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    bleach: {
        '--bg-main': '#000000',
        '--bg-header': '#FFFFFF',
        '--bg-card': '#000000',
        '--bg-accent': '#FF4500',
        '--text-header': '#000000',
        '--text-card': '#FFFFFF',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/shattered-island.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    wario: {
        '--bg-main': '#9C59D1',
        '--bg-header': '#FCD116',
        '--bg-card': '#9C59D1',
        '--bg-accent': '#000000',
        '--text-header': '#000000',
        '--text-card': '#FCD116',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    classic: {
        '--bg-main': '#ffffff',
        '--bg-header': '#1a1a1a',
        '--bg-card': '#f3f4f6',
        '--bg-accent': '#e5e7eb',
        '--text-header': '#ffffff',
        '--text-card': '#000000',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    red: {
        '--bg-main': '#fee2e2',
        '--bg-header': '#dc2626',
        '--bg-card': '#fecaca',
        '--bg-accent': '#991b1b',
        '--text-header': '#ffffff',
        '--text-card': '#7f1d1d',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    green: {
        '--bg-main': '#dcfce7',
        '--bg-header': '#16a34a',
        '--bg-card': '#bbf7d0',
        '--bg-accent': '#14532d',
        '--text-header': '#ffffff',
        '--text-card': '#14532d',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    blue: {
        '--bg-main': '#dbeafe',
        '--bg-header': '#2563eb',
        '--bg-card': '#bfdbfe',
        '--bg-accent': '#1e3a8a',
        '--text-header': '#ffffff',
        '--text-card': '#1e3a8a',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    dark: {
        '--bg-main': '#111827',
        '--bg-header': '#000000',
        '--bg-card': '#1f2937',
        '--bg-accent': '#374151',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    basketball: {
        '--bg-main': '#fff7ed',
        '--bg-header': '#ea580c',
        '--bg-card': '#fdba74',
        '--bg-accent': '#9a3412',
        '--text-header': '#ffffff',
        '--text-card': '#431407',
        '--bg-image': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='15' y='40' font-size='30'%3E🏀%3C/text%3E%3C/svg%3E\")",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    soccer: {
        '--bg-main': '#f0fdf4',
        '--bg-header': '#16a34a',
        '--bg-card': '#ffffff',
        '--bg-accent': '#15803d',
        '--text-header': '#ffffff',
        '--text-card': '#000000',
        '--bg-image': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='15' y='40' font-size='30'%3E⚽%3C/text%3E%3C/svg%3E\")",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    tennis: {
        '--bg-main': '#fefce8',
        '--bg-header': '#84cc16',
        '--bg-card': '#d9f99d',
        '--bg-accent': '#3f6212',
        '--text-header': '#ffffff',
        '--text-card': '#1a2e05',
        '--bg-image': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='15' y='40' font-size='30'%3E🎾%3C/text%3E%3C/svg%3E\")",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    jordan: {
        '--bg-main': '#ffffff',
        '--bg-header': '#000000',
        '--bg-card': '#007a3d',
        '--bg-accent': '#ce1126',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "url('https://flagcdn.com/jo.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    palestine: {
        '--bg-main': '#ffffff',
        '--bg-header': '#000000',
        '--bg-card': '#009736',
        '--bg-accent': '#ce1126',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "url('https://flagcdn.com/ps.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    usa: {
        '--bg-main': '#f3f4f6',
        '--bg-header': '#3c3b6e',
        '--bg-card': '#ffffff',
        '--bg-accent': '#b22234',
        '--text-header': '#ffffff',
        '--text-card': '#000000',
        '--bg-image': "url('https://flagcdn.com/us.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    japan: {
        '--bg-main': '#ffffff',
        '--bg-header': '#bc002d',
        '--bg-card': '#ffffff',
        '--bg-accent': '#bc002d',
        '--text-header': '#ffffff',
        '--text-card': '#000000',
        '--bg-image': "url('https://flagcdn.com/jp.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    south_korea: {
        '--bg-main': '#ffffff',
        '--bg-header': '#000000',
        '--bg-card': '#0047a0',
        '--bg-accent': '#cd2e3a',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "url('https://flagcdn.com/kr.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    china: {
        '--bg-main': '#de2910',
        '--bg-header': '#ffde00',
        '--bg-card': '#de2910',
        '--bg-accent': '#ffde00',
        '--text-header': '#de2910',
        '--text-card': '#ffde00',
        '--bg-image': "url('https://flagcdn.com/cn.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    india: {
        '--bg-main': '#ff9933',
        '--bg-header': '#138808',
        '--bg-card': '#ffffff',
        '--bg-accent': '#000080',
        '--text-header': '#ffffff',
        '--text-card': '#000000',
        '--bg-image': "url('https://flagcdn.com/in.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    saudi_arabia: {
        '--bg-main': '#165d31',
        '--bg-header': '#165d31',
        '--bg-card': '#ffffff',
        '--bg-accent': '#165d31',
        '--text-header': '#ffffff',
        '--text-card': '#000000',
        '--bg-image': "url('https://flagcdn.com/sa.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    philippines: {
        '--bg-main': '#ffffff',
        '--bg-header': '#0038a8',
        '--bg-card': '#ce1126',
        '--bg-accent': '#fcd116',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "url('https://flagcdn.com/ph.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    vietnam: {
        '--bg-main': '#da251d',
        '--bg-header': '#ffff00',
        '--bg-card': '#da251d',
        '--bg-accent': '#ffff00',
        '--text-header': '#da251d',
        '--text-card': '#ffff00',
        '--bg-image': "url('https://flagcdn.com/vn.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    thailand: {
        '--bg-main': '#ffffff',
        '--bg-header': '#2D2A4A',
        '--bg-card': '#A51931',
        '--bg-accent': '#F4F5F8',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "url('https://flagcdn.com/th.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    indonesia: {
        '--bg-main': '#ffffff',
        '--bg-header': '#FF0000',
        '--bg-card': '#ffffff',
        '--bg-accent': '#FF0000',
        '--text-header': '#ffffff',
        '--text-card': '#000000',
        '--bg-image': "url('https://flagcdn.com/id.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    malaysia: {
        '--bg-main': '#ffffff',
        '--bg-header': '#010066',
        '--bg-card': '#CC0000',
        '--bg-accent': '#FFCC00',
        '--text-header': '#ffffff',
        '--text-card': '#ffffff',
        '--bg-image': "url('https://flagcdn.com/my.svg')",
        '--bg-size': 'cover',
        '--bg-repeat': 'no-repeat',
        '--bg-position': 'center',
        '--bg-attachment': 'fixed'
    },
    nes: {
        '--bg-main': '#202020',
        '--bg-header': '#000000',
        '--bg-card': '#E0E0E0',
        '--bg-accent': '#FF0000',
        '--text-header': '#FF0000',
        '--text-card': '#000000',
        '--bg-image': 'none',
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    gameboy: {
        '--bg-main': '#8BAC0F',
        '--bg-header': '#306230',
        '--bg-card': '#9BBC0F',
        '--bg-accent': '#0F380F',
        '--text-header': '#9BBC0F',
        '--text-card': '#0F380F',
        '--bg-image': 'none',
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    snes: {
        '--bg-main': '#B0A0C0',
        '--bg-header': '#5D3FD3',
        '--bg-card': '#E6E6E6',
        '--bg-accent': '#8A6FC4',
        '--text-header': '#FFFFFF',
        '--text-card': '#5D3FD3',
        '--bg-image': 'none',
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    ps1: {
        '--bg-main': '#B0B0B0',
        '--bg-header': '#003087',
        '--bg-card': '#D0D0D0',
        '--bg-accent': '#DF0024',
        '--text-header': '#FFFFFF',
        '--text-card': '#000000',
        '--bg-image': 'none',
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    cyberpunk: {
        '--bg-main': '#000b1e',
        '--bg-header': '#0f0f0f',
        '--bg-card': '#050505',
        '--bg-accent': '#fcee0a',
        '--text-header': '#00ff9f',
        '--text-card': '#00ff9f',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    pastel: {
        '--bg-main': '#fff0f5',
        '--bg-header': '#ffb7b2',
        '--bg-card': '#ffffff',
        '--bg-accent': '#c7ceea',
        '--text-header': '#ffffff',
        '--text-card': '#6d6d6d',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/diagmonds-light.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    midnight: {
        '--bg-main': '#0a0a23',
        '--bg-header': '#191970',
        '--bg-card': '#1c1c3c',
        '--bg-accent': '#483d8b',
        '--text-header': '#e6e6fa',
        '--text-card': '#e6e6fa',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/stardust.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    obsidian: {
        '--bg-main': '#0b0c10',
        '--bg-header': '#1f2833',
        '--bg-card': '#1f2833',
        '--bg-accent': '#66fcf1',
        '--text-header': '#c5c6c7',
        '--text-card': '#45a29e',
        '--bg-image': 'none',
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    deepspace: {
        '--bg-main': '#000000',
        '--bg-header': '#0f0f2d',
        '--bg-card': '#1a1a2e',
        '--bg-accent': '#e94560',
        '--text-header': '#ffffff',
        '--text-card': '#16213e',
        '--bg-image': "url('https://www.transparenttextures.com/patterns/twinkle-twinkle.png')",
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    abyss: {
        '--bg-main': '#050505',
        '--bg-header': '#0a0a0a',
        '--bg-card': '#141414',
        '--bg-accent': '#333333',
        '--text-header': '#a0a0a0',
        '--text-card': '#808080',
        '--bg-image': 'none',
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    },
    neon_night: {
        '--bg-main': '#0d0221',
        '--bg-header': '#261447',
        '--bg-card': '#2e003e',
        '--bg-accent': '#ff00cc',
        '--text-header': '#00f7ff',
        '--text-card': '#ff00cc',
        '--bg-image': 'none',
        '--bg-size': 'auto',
        '--bg-repeat': 'repeat',
        '--bg-position': 'top left',
        '--bg-attachment': 'scroll'
    }
};

function toggleThemeMenu() {
    const menu = document.getElementById('theme-menu');
    menu.classList.toggle('hidden');
}

function setTheme(themeName, toggleMenu = true) {
    const theme = themes[themeName];
    if (!theme) return;

    const root = document.documentElement;
    for (const [property, value] of Object.entries(theme)) {
        root.style.setProperty(property, value);
    }
    
    // Ensure logo is always gamepad-2
    const logoContainer = document.getElementById('logo-container');
    logoContainer.innerHTML = `<i data-lucide="gamepad-2" class="text-theme-card w-8 h-8"></i>`;
    lucide.createIcons();

    localStorage.setItem('selectedTheme', themeName);
    if (toggleMenu) {
        toggleThemeMenu();
    }
}

// Close theme menu when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.getElementById('theme-menu');
    const button = document.querySelector('button[onclick="toggleThemeMenu()"]');
    
    if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !button.contains(e.target)) {
        menu.classList.add('hidden');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('selectedTheme');
if (savedTheme && themes[savedTheme]) {
    setTheme(savedTheme, false);
} else {
    setTheme('classic', false);
}

function showGameList() {
    gamePlayerView.classList.add('hidden');
    gameListView.classList.remove('hidden');
    document.body.classList.remove('mobile-fit-active');
    document.querySelector('header').classList.remove('hidden'); // Always show header in list view
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
