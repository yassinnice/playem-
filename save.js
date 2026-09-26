/**
 * STATE ENGINE & GAME DATABASE
 */
const state = {
    user: null,
    searchQuery: "",
    activeGenre: "All",
    activeGameUrl: "",
    recentGames: [] // Tracks recently played game IDs
};

// --- LOCAL STORAGE SYSTEM ---
function saveLocalData() {
    const data = {
        user: state.user,
        recentGames: state.recentGames
    };
    localStorage.setItem('playthem_savedata', JSON.stringify(data));
}

function loadLocalData() {
    const saved = localStorage.getItem('playthem_savedata');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed.user) state.user = parsed.user;
            if (parsed.recentGames) state.recentGames = parsed.recentGames;
        } catch (e) {
            console.error("Save data corrupted, resetting.");
        }
    }

    // Restore User UI if logged in
    if (state.user) {
        document.getElementById('auth-text').innerText = state.user.name;
        document.getElementById('user-avatar').src = state.user.picture;
    }
}
// ----------------------------

const gamesDB = [
    // Core Featured Games
    { id: "growden", title: "Growden", genre: "Strategy / MMO", isFeatured: true, thumbnail: "", icon: "", url: "https://growden.io" },
    { id: "veck", title: "Veck.io", genre: "Action / FPS", isFeatured: true, thumbnail: "", icon: "", url: "https://veck.io/" },
    { id: "krunker", title: "Krunker.io", genre: "FPS / Multiplayer", isFeatured: true, thumbnail: "", icon: "", url: "https://krunker.io/" },
    { id: "bloxd-io", title: "Bloxd.io", genre: "Multiplayer / Sandbox", isFeatured: true, thumbnail: "", icon: "", url: "https://bloxd.io/" },
    { id: "ragdoll-archers", title: "Ragdoll Archers", genre: "Arcade / Action", isFeatured: true, thumbnail: "", icon: "", url: "https://archers.io/" },
    { id: "zombs-royale", title: "Zombs Royale", genre: "Battle Royale / Action", isFeatured: true, thumbnail: "", icon: "", url: "https://zombsroyale.io/" },

    // 🧩 Puzzle & Brain Games
    { id: "2048", title: "2048", genre: "Puzzle & Brain", isFeatured: false, thumbnail: "", url: "https://play2048.co/" },
    { id: "little-alchemy-2", title: "Little Alchemy 2", genre: "Puzzle & Brain", isFeatured: false, thumbnail: "", url: "https://littlealchemy2.com/" },
    { id: "wordle", title: "Wordle", genre: "Puzzle & Brain", isFeatured: false, thumbnail: "", url: "https://www.nytimes.com/games/wordle/index.html" },
    { id: "jigsaw-explorer", title: "Jigsaw Explorer", genre: "Puzzle & Brain", isFeatured: false, thumbnail: "", url: "https://www.jigsawexplorer.com/" },
    { id: "coolmath-games", title: "Coolmath Games", genre: "Puzzle & Brain", isFeatured: false, thumbnail: "", url: "https://www.coolmathgames.com/" },
    { id: "math-playground", title: "Math Playground", genre: "Puzzle & Brain", isFeatured: false, thumbnail: "", url: "https://www.mathplayground.com/" },
    { id: "neal-fun", title: "Neal.fun", genre: "Puzzle & Brain", isFeatured: false, thumbnail: "", url: "https://neal.fun/" },
    { id: "infinite-craft", title: "Infinite Craft", genre: "Puzzle & Brain", isFeatured: false, thumbnail: "", url: "https://neal.fun/infinite-craft/" },

    // 🌐 Multiplayer & .IO
    { id: "agar-io", title: "Agar.io", genre: "Multiplayer & .IO", isFeatured: false, thumbnail: "", url: "https://agar.io/" },
    { id: "slither-io", title: "Slither.io", genre: "Multiplayer & .IO", isFeatured: false, thumbnail: "", url: "https://slither.io/" },
    { id: "diep-io", title: "Diep.io", genre: "Multiplayer & .IO", isFeatured: false, thumbnail: "", url: "https://diep.io/" },
    { id: "tetr-io", title: "Tetr.io", genre: "Multiplayer & .IO", isFeatured: false, thumbnail: "", url: "https://tetr.io/" },
    { id: "skribbl-io", title: "Skribbl.io", genre: "Multiplayer & .IO", isFeatured: false, thumbnail: "", url: "https://skribbl.io/" },
    { id: "shell-shockers", title: "Shell Shockers", genre: "Multiplayer & .IO", isFeatured: false, thumbnail: "", url: "https://shellshock.io/" },
    { id: "paper-io-2", title: "Paper.io 2", genre: "Multiplayer & .IO", isFeatured: false, thumbnail: "", url: "https://paper-io.com/" },
    { id: "chess-com", title: "Chess.com", genre: "Multiplayer & .IO", isFeatured: false, thumbnail: "", url: "https://www.chess.com/play" },
    { id: "lichess", title: "Lichess", genre: "Multiplayer & .IO", isFeatured: false, thumbnail: "", url: "https://lichess.org/" },

    // 🏎️ Racing & Driving
    { id: "crazygames-racing", title: "CrazyGames Racing", genre: "Racing & Driving", isFeatured: false, thumbnail: "", url: "https://www.crazygames.com/" },
    { id: "poki-racing", title: "Poki Racing", genre: "Racing & Driving", isFeatured: false, thumbnail: "", url: "https://poki.com/" },
    { id: "miniclip", title: "Miniclip", genre: "Racing & Driving", isFeatured: false, thumbnail: "", url: "https://www.miniclip.com/" },
    { id: "y8-racing", title: "Y8 Games", genre: "Racing & Driving", isFeatured: false, thumbnail: "", url: "https://www.y8.com/" },
    { id: "silvergames", title: "SilverGames", genre: "Racing & Driving", isFeatured: false, thumbnail: "", url: "https://www.silvergames.com/" },
    { id: "onlinegames-io", title: "OnlineGames.io", genre: "Racing & Driving", isFeatured: false, thumbnail: "", url: "https://www.onlinegames.io/" },
    { id: "smash-karts", title: "Smash Karts", genre: "Racing & Driving", isFeatured: false, thumbnail: "", url: "https://smashkarts.io/" },
    { id: "moto-x3m", title: "Moto X3M", genre: "Racing & Driving", isFeatured: false, thumbnail: "", url: "https://motox3m.co" },

    // 🎯 Action & Arcade
    { id: "armor-games", title: "Armor Games", genre: "Action & Arcade", isFeatured: false, thumbnail: "", url: "https://armorgames.com/" },
    { id: "addicting-games", title: "Addicting Games", genre: "Action & Arcade", isFeatured: false, thumbnail: "", url: "https://www.addictinggames.com/" },
    { id: "newgrounds", title: "Newgrounds", genre: "Action & Arcade", isFeatured: false, thumbnail: "", url: "https://www.newgrounds.com/games" },
    { id: "kongregate", title: "Kongregate", genre: "Action & Arcade", isFeatured: false, thumbnail: "", url: "https://www.kongregate.com/" },
    { id: "gamepix", title: "GamePix", genre: "Action & Arcade", isFeatured: false, thumbnail: "", url: "https://www.gamepix.com/" },
    { id: "lagged", title: "Lagged", genre: "Action & Arcade", isFeatured: false, thumbnail: "", url: "https://lagged.com/" },
    { id: "friv", title: "Friv", genre: "Action & Arcade", isFeatured: false, thumbnail: "", url: "https://www.friv.com/" },
    { id: "kizi", title: "Kizi", genre: "Action & Arcade", isFeatured: false, thumbnail: "", url: "https://kizi.com/" },
    { id: "stickman-clash", title: "Stickman Clash", genre: "Action & Arcade", isFeatured: false, thumbnail: "", url: "https://game-embed.com/stickman-clash" },
    { id: "1v1-lol", title: "1v1.lol", genre: "Action & Arcade", isFeatured: false, thumbnail: "", url: "https://1v1.lol/" },
    { id: "venge-io", title: "Venge.io", genre: "Action & Arcade", isFeatured: false, thumbnail: "", url: "https://venge.io/" },
    { id: "slope", title: "Slope", genre: "Action & Arcade", isFeatured: false, thumbnail: "", url: "https://slopegame.io" },

    // 🗺️ Adventure & Exploration
    { id: "itch-io", title: "Itch.io Games", genre: "Adventure & Exploration", isFeatured: false, thumbnail: "", url: "https://itch.io/games" },
    { id: "game-jolt", title: "Game Jolt", genre: "Adventure & Exploration", isFeatured: false, thumbnail: "", url: "https://gamejolt.com/" },
    { id: "pog", title: "Pog", genre: "Adventure & Exploration", isFeatured: false, thumbnail: "", url: "https://www.pog.com/" },
    { id: "a10-games", title: "A10 Games", genre: "Adventure & Exploration", isFeatured: false, thumbnail: "", url: "https://www.a10.com/" },
    { id: "not-doppler", title: "Not Doppler", genre: "Adventure & Exploration", isFeatured: false, thumbnail: "", url: "https://www.notdoppler.com/" },
    { id: "free-games-org", title: "FreeGames.org", genre: "Adventure & Exploration", isFeatured: false, thumbnail: "", url: "https://www.freegames.org/" },

    // 🌍 Geography & Trivia
    { id: "geoguessr", title: "GeoGuessr", genre: "Geography & Trivia", isFeatured: false, thumbnail: "", url: "https://www.geoguessr.com/" },
    { id: "hooda-math", title: "Hooda Math", genre: "Geography & Trivia", isFeatured: false, thumbnail: "", url: "https://www.hoodamath.com/" },
    { id: "abcya", title: "ABCya!", genre: "Geography & Trivia", isFeatured: false, thumbnail: "", url: "https://www.abcya.com/" },
    { id: "primarygames", title: "PrimaryGames", genre: "Geography & Trivia", isFeatured: false, thumbnail: "", url: "https://www.primarygames.com/" },

    // 🎨 Creative & Weird
    { id: "quick-draw", title: "Quick, Draw!", genre: "Creative & Weird", isFeatured: false, thumbnail: "", url: "https://quickdraw.withgoogle.com/" },
    { id: "cookie-clicker", title: "Cookie Clicker", genre: "Creative & Weird", isFeatured: false, thumbnail: "", url: "https://orteil.dashnet.org/cookieclicker/" },
    { id: "funbrain", title: "Funbrain", genre: "Creative & Weird", isFeatured: false, thumbnail: "", url: "https://www.funbrain.com/" },
    { id: "google-doodles", title: "Google Doodles", genre: "Creative & Weird", isFeatured: false, thumbnail: "", url: "https://www.google.com/doodles" },

    // 🏆 Huge Game Collections & Extras
    { id: "scary-teacher-3d", title: "Scary Teacher 3D", genre: "Horror", isFeatured: false, thumbnail: "", url: "https://horrorgames.io/scary-teacher-3d.embed" },
    { id: "man-from-window", title: "Man From Window", genre: "Horror", isFeatured: false, thumbnail: "", url: "https://horrorgames.io/the-man-from-the-window.embed" },
    { id: "red-face-horror", title: "Red Face Horror", genre: "Horror", isFeatured: false, thumbnail: "", url: "https://horrorgames.io/red-face-horror.embed" },
    { id: "thief-puzzle", title: "Thief Puzzle", genre: "Puzzle & Brain", isFeatured: false, thumbnail: "", url: "https://game-embed.com/thief-puzzle" },

    // NEWLY ADDED GAMES
    { id: "gm-001", title: "DIY Ugly Christmas Sweater", genre: "Girls", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/8c3sjuae8vo7epvhr6gsk025gulyuecd/" },
    { id: "gm-002", title: "Crazy Christmas Fun 2", genre: "Hypercasual", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/kf4zckp8q2ls38dy3xx6bgsfv50gsnaw/" },
    { id: "gm-003", title: "Santas Snowy Sprint", genre: "Adventure", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/v4rl3sdyui8v4xrk4ahgccdlpwan5au8/" },
    { id: "gm-004", title: "Santa Collecting Gifts", genre: "Arcade", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/9l3npfpud13rxnfixu6dx9yoojgw1tng/" },
    { id: "gm-005", title: "Santa Gift Collect Game", genre: "Hypercasual", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/vfrlkliuah2j0wzrg405r58i9ytilf8f/" },
    { id: "gm-006", title: "Santa on Fire", genre: "Action", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/734cmz6mrjj4vwxeyaxhw6mepp7msdhr/" },
    { id: "gm-007", title: "Christmas Onet Connect", genre: "Puzzle", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/d9nv7htz1ahz633c0vcjiv25qutmwyf2/" },
    { id: "gm-008", title: "Santa Vs Zomby", genre: "Action", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/ssyulsswaf3fi5ycarggemnrmysrv3gd/" },
    { id: "gm-009", title: "Christmas Hexa Puzzle", genre: "Puzzle", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/r5yewhqbovg8et5g93jg55kmpsopj75a/" },
    { id: "gm-010", title: "Christmas Puzzle With Santa", genre: "Puzzle", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/s80ixkrfmqkfbbm9wpgfhusidlad6j9o/" },
    { id: "gm-011", title: "Celebrities Get Ready For Christmas", genre: "Girls", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/1ppyg0qwhtdvfhcvfobnhym4j123ytux/" },
    { id: "gm-012", title: "Trump Winter Adventure", genre: "Adventure", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/sbe7ep8jinyyd0vylm65mqq1j7aeorvg/" },
    { id: "gm-013", title: "Winter Battle", genre: "Action", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/dncor1an3qhktld28weh6bqzd56iw14s/" },
    { id: "gm-014", title: "Duo Family Santa", genre: "Adventure", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/qn4ri5pm4ohq9mk391wpd6ka1fojxjk5/" },
    { id: "gm-015", title: "Fashionista Christmas Eve Party", genre: "Girls", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/5atjh0rucpsr1fsh0pkgzkj15r4xjkia/" },
    { id: "gm-016", title: "Easy Coloring Labubu Time", genre: "Puzzle", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/ssspxwzt95e93vzbhabrl3rbomuzzyc5/" },
    { id: "gm-017", title: "Nine Cards Of Winter", genre: "Puzzle", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/f3r5sex50ro1fwrmks41k5najty3mhll/" },
    { id: "gm-018", title: "Christmas Cooking Chef", genre: "Cooking", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/9uho62wbqke96m407nyebsylh0f60hw6/" },
    { id: "gm-019", title: "Christmas Dentist Doctor", genre: "Girls", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/yqceek971a1yq0idgz0vnrvn7rszuvsy/" },
    { id: "gm-020", title: "Taylor And Jessica Christmas Party", genre: "Girls", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/auqr71k26c5fdzjsau9o0ney2kawi8ln/" },
    { id: "gm-021", title: "Find the Set", genre: "Puzzle", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/n7hoa1t36i9lx3gc6isv255w706btl1q/" },
    { id: "gm-022", title: "HURDLES", genre: "Sports", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/c949dg0t8o3i8oykfuwinevumjysy9tr/" },
    { id: "gm-023", title: "Find gems", genre: "Puzzle", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/r42v3ogyi0lsuenn0hseh814ng007ymx/" },
    { id: "gm-024", title: "Get On Board", genre: "Arcade", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/p4zntfeujzj7emy0je63mzdnxauudk85/" },
    { id: "gm-025", title: "Connect Game", genre: "Puzzle", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/hqq3w3dkliv8obb94mo7yqbqzs78rj9u/" },
    { id: "gm-026", title: "Get 5", genre: "Puzzle", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/rpaj2hk304kfpbd0r85ojt99j7j2yy0p/" },
    { id: "gm-027", title: "Package Deliver Game", genre: "Racing", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/zvkxmsf5vg68uvryhnxz0ynak03k7sh3/" },
    { id: "gm-028", title: "Water Race Game", genre: "Racing", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/dcjxwtp3mpyefae6jayjps2govev43n6/" },
    { id: "gm-029", title: "Our Land", genre: "Strategy", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/bmk9a3en9l0fep2fpeeg9rhee5k5r9hf/" },
    { id: "gm-030", title: "Can You Catch", genre: "Arcade", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/of1wzi1gjtfitmnbrnvthopy5w7oi6ue/" },
    { id: "gm-031", title: "Hyper", genre: "Arcade", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/2yrufglar5f04z65sjbo2jmhn880lxan/" },
    { id: "gm-032", title: "Point Game", genre: "Arcade", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/8mewltiyjri4yp13twu27fpht7uuz7rp/" },
    { id: "gm-033", title: "Connect Me", genre: "Puzzle", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/tl7piph1abhd7b6v8ug1hls3rals218w/" },
    { id: "gm-034", title: "Impossible To Run", genre: "Action", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/6hiekx3roptm61vueo1yaiffr9b8qrzj/" },
    { id: "gm-035", title: "Money Up", genre: "Arcade", isFeatured: false, thumbnail: "", url: "https://html5.gamemonetize.co/fa522sgi5k6hffgec7ddqm41r9v7ah2y/" }
];

const genres = ["All", ...new Set(gamesDB.map(g => g.genre.split('/')[0].trim()))];

const continueEl = document.getElementById('continue-playing');
const gridEl = document.getElementById('top-picks');
const genreBarEl = document.getElementById('genre-bar');
const searchInput = document.getElementById('searchInput');
const homeView = document.getElementById('home-view');
const playerView = document.getElementById('player-view');
const gameFrame = document.getElementById('game-frame');

/**
 * GOOGLE AUTHENTICATION SYSTEM
 */
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => 
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Failed to parse JWT", e);
        return null;
    }
}

function handleGoogleAuth() {
    if (state.user) {
        state.user = null;
        document.getElementById('auth-text').innerText = "Sign In";
        document.getElementById('user-avatar').src = "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg";
        saveLocalData();
        alert("You have logged out.");
    } else {
        if (window.google && google.accounts) {
            google.accounts.id.initialize({
                client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
                callback: handleGoogleCredentialResponse,
                auto_select: false,
                cancel_on_tap_outside: true
            });
            
            google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                    fallbackAuth();
                }
            });
        } else {
            fallbackAuth();
        }
    }
}

function handleGoogleCredentialResponse(response) {
    const payload = parseJwt(response.credential);
    if (payload) {
        state.user = { 
            name: payload.given_name || payload.name, 
            picture: payload.picture,
            email: payload.email
        };
        
        document.getElementById('auth-text').innerText = state.user.name;
        document.getElementById('user-avatar').src = state.user.picture;
        saveLocalData();
    }
}

function fallbackAuth() {
    state.user = { name: "GamerOne", picture: "https://api.dicebear.com/7.x/bottts/svg?seed=GamerOne" };
    document.getElementById('auth-text').innerText = state.user.name;
    document.getElementById('user-avatar').src = state.user.picture;
    saveLocalData();
}

/**
 * RENDERING ENGINE
 */
function renderGenres() {
    genreBarEl.innerHTML = genres.map(genre => `
        <button class="genre-chip ${state.activeGenre === genre ? 'active' : ''}" onclick="setGenre('${genre}')">
            ${genre}
        </button>
    `).join('');
}

function renderUI() {
    const query = state.searchQuery.toLowerCase();
    const filteredGames = gamesDB.filter(g => {
        const matchesGenre = state.activeGenre === "All" || g.genre.toLowerCase().includes(state.activeGenre.toLowerCase());
        const matchesQuery = g.title.toLowerCase().includes(query) || g.genre.toLowerCase().includes(query);
        return matchesGenre && matchesQuery;
    });

    // Map IDs from recentGames back to full game objects
    const recentGameObjects = state.recentGames
        .map(id => gamesDB.find(g => g.id === id))
        .filter(Boolean); // removes any that might have been deleted from DB

    if (recentGameObjects.length > 0) {
        continueEl.innerHTML = recentGameObjects.map(game => {
            const imgTag = game.thumbnail ? `<img src="${game.thumbnail}" alt="${game.title}" loading="lazy">` : `<div class="img-placeholder">${game.title.charAt(0)}</div>`;
            return `
            <div class="mini-card" onclick="openGame('${game.id}')" title="${game.title}">
                ${imgTag}
            </div>`;
        }).join('');
    } else {
        continueEl.innerHTML = `<p style="color:var(--text-secondary); font-size: 13px; margin-left: 5px;">Play some games to see them here!</p>`;
    }

    let gridHTML = "";
    let largeCards = filteredGames.filter(g => g.isFeatured);
    let smallCards = filteredGames.filter(g => !g.isFeatured);

    if (largeCards.length > 0) {
        gridHTML += `<div class="grid-row-large">`;
        largeCards.slice(0, 2).forEach(game => gridHTML += generateLargeCardHTML(game));
        gridHTML += `</div>`;
    }

    if (smallCards.length > 0) {
        gridHTML += `<div class="grid-row-small">`;
        smallCards.forEach(game => gridHTML += generateSmallCardHTML(game));
        gridHTML += `</div>`;
    }

    if (largeCards.length > 2) {
        gridHTML += `<div class="grid-row-large">`;
        largeCards.slice(2).forEach(game => gridHTML += generateLargeCardHTML(game));
        gridHTML += `</div>`;
    }

    gridEl.innerHTML = gridHTML || `<p style="color:var(--text-secondary); text-align:center; padding:40px 0;">No games found matching your search.</p>`;
}

function generateLargeCardHTML(game) {
    const bgTag = game.thumbnail ? `<img class="bg" src="${game.thumbnail}" alt="${game.title}" loading="lazy">` : `<div class="img-placeholder">${game.title}</div>`;
    const iconTag = game.icon ? `<img class="large-card-icon" src="${game.icon}" alt="Icon">` : `<div class="large-card-icon"><div class="img-placeholder" style="font-size:14px;">${game.title.charAt(0)}</div></div>`;
    
    return `
        <div class="large-card" onclick="openGame('${game.id}')">
            ${bgTag}
            <div class="overlay">
                <div class="large-card-info">
                    ${iconTag}
                    <div class="large-card-text">
                        <h3>${game.title}</h3>
                        <p>${game.genre}</p>
                    </div>
                </div>
                <button class="play-btn">Play Now</button>
            </div>
        </div>
    `;
}

function generateSmallCardHTML(game) {
    const imgTag = game.thumbnail ? `<img src="${game.thumbnail}" alt="${game.title}" loading="lazy">` : `<div class="img-placeholder">${game.title.charAt(0)}</div>`;
    return `
        <div class="small-card" onclick="openGame('${game.id}')">
            <div class="small-card-img-container">
                ${imgTag}
            </div>
            <p>${game.title}</p>
        </div>
    `;
}

function setGenre(genre) {
    state.activeGenre = genre;
    renderGenres();
    renderUI();
}

function resetFilters() {
    state.activeGenre = "All";
    state.searchQuery = "";
    searchInput.value = "";
    renderGenres();
    renderUI();
}

let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        state.searchQuery = e.target.value;
        renderUI();
    }, 200);
});

function openGame(id) {
    const game = gamesDB.find(g => g.id === id);
    if (!game || !game.url) return;

    // Track Recently Played (max 15 games)
    state.recentGames = state.recentGames.filter(storedId => storedId !== id); // Remove duplicate if exists
    state.recentGames.unshift(id); // Add to front
    if (state.recentGames.length > 15) state.recentGames.pop(); // Keep array small
    saveLocalData(); // Save new history

    state.activeGameUrl = game.url;
    gameFrame.src = game.url;
    
    homeView.style.display = 'none';
    playerView.style.display = 'flex';
    
    // Re-render UI in the background so history updates visually when they close the game
    renderUI();
}

function closeGame() {
    gameFrame.src = ""; 
    state.activeGameUrl = "";
    playerView.style.display = 'none';
    homeView.style.display = 'block';
}

function toggleFullscreen() {
    if (gameFrame.requestFullscreen) { gameFrame.requestFullscreen(); }
    else if (gameFrame.webkitRequestFullscreen) { gameFrame.webkitRequestFullscreen(); }
}

function openRawWindow() {
    if (state.activeGameUrl) {
        window.open(state.activeGameUrl, '_blank');
    }
}

// App Initialization
loadLocalData();
renderGenres();
renderUI();
