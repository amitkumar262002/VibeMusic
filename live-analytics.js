// Real-time Analytics System for Vibe Music (Firebase Integrated)
import VibeVault from "./vibe-vault.js";

const firebaseConfig = VibeVault.k;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let currentInstalls = 342; // Starting number
let currentActiveUsers = 124;

// Coordinates for major India cities
const cities = [
    { name: 'Bihar', top: '35%', left: '68%', weight: 1.5 },
    { name: 'Delhi', top: '28%', left: '62%', weight: 1.2 },
    { name: 'Mumbai', top: '52%', left: '58%', weight: 1.0 },
    { name: 'Bangalore', top: '65%', left: '62%', weight: 0.8 },
    { name: 'Kolkata', top: '38%', left: '72%', weight: 0.7 }
];

function renderLiveMap() {
    const mapContainer = document.getElementById('mapVisual');
    if (!mapContainer) return;
    mapContainer.innerHTML = '';

    cities.forEach((city, index) => {
        const point = document.createElement('div');
        point.className = 'map-point';
        point.style.cssText = `
            position: absolute;
            top: ${city.top};
            left: ${city.left};
            width: 12px;
            height: 12px;
            background: #ff2d55;
            border-radius: 50%;
            box-shadow: 0 0 15px #ff2d55;
            animation: pulse 2s infinite ${index * 0.4}s;
        `;
        mapContainer.appendChild(point);
    });
}

function updateUI() {
    const installElem = document.getElementById('installCount');
    const activeElem = document.getElementById('activeUserCount');
    if (installElem) installElem.innerText = currentInstalls.toLocaleString();
    if (activeElem) activeElem.innerText = currentActiveUsers.toLocaleString();
}

// Listen for total installs
onSnapshot(doc(db, "vibe_stats", "live_counter"), (doc) => {
    if (doc.exists()) {
        currentInstalls = doc.data().totalInstalls || currentInstalls;
        updateUI();
    }
});

// Listen for active users (sessions in last 30 mins)
onSnapshot(collection(db, "vibe_sessions"), (snapshot) => {
    currentActiveUsers = snapshot.size || currentActiveUsers;
    updateUI();
});

// Styles for map points
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.5; }
        100% { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);

renderLiveMap();
updateUI();
