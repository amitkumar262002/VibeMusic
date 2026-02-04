// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVdjD4Bnv9FTuziPnhD3-GZxhcrNWjLoM",
    authDomain: "vibemusic-7723f.firebaseapp.com",
    databaseURL: "https://vibemusic-7723f-default-rtdb.firebaseio.com",
    projectId: "vibemusic-7723f",
    storageBucket: "vibemusic-7723f.firebasestorage.app",
    messagingSenderId: "322504383560",
    appId: "1:322504383560:android:9bfd1edfb95e6a63b60c7d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Check authentication
function checkAuth() {
    const auth = sessionStorage.getItem('vibe_owner_auth');
    if (!auth) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Logout
function logout() {
    sessionStorage.removeItem('vibe_owner_auth');
    window.location.href = 'index.html';
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('expanded');
}

// Show section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(`${sectionName}-section`).classList.add('active');

    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');
}

// Load all data
async function loadAllData() {
    try {
        await Promise.all([
            loadAnalytics(),
            loadInstalls(),
            loadFeedback()
        ]);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Load analytics
async function loadAnalytics() {
    try {
        // Get total installs
        const statsDoc = await db.collection('vibe_stats').doc('live_counter').get();
        const totalInstalls = statsDoc.data()?.totalInstalls || 0;
        document.getElementById('totalInstalls').textContent = totalInstalls.toLocaleString();

        // Get all installs
        const installsSnapshot = await db.collection('vibe_installs')
            .orderBy('timestamp', 'desc')
            .limit(100)
            .get();

        const installs = [];
        installsSnapshot.forEach(doc => {
            installs.push({ id: doc.id, ...doc.data() });
        });

        // Calculate active today
        const today = new Date().setHours(0, 0, 0, 0);
        const activeToday = installs.filter(i => i.timestamp >= today).length;
        document.getElementById('activeToday').textContent = activeToday;

        // Get top location
        const locationCounts = {};
        installs.forEach(install => {
            const loc = install.location?.state || 'Unknown';
            locationCounts[loc] = (locationCounts[loc] || 0) + 1;
        });

        const topLocation = Object.keys(locationCounts).reduce((a, b) =>
            locationCounts[a] > locationCounts[b] ? a : b, 'Unknown'
        );
        document.getElementById('topLocation').textContent = topLocation;

        // Last install time
        if (installs.length > 0) {
            const lastTime = new Date(installs[0].timestamp);
            const timeAgo = getTimeAgo(lastTime);
            document.getElementById('lastInstall').textContent = timeAgo;
        }

        // Update charts
        updateCharts(installs, locationCounts);

    } catch (error) {
        console.error('Error loading analytics:', error);
    }
}

// Load installs table
async function loadInstalls() {
    try {
        const installsSnapshot = await db.collection('vibe_installs')
            .orderBy('timestamp', 'desc')
            .limit(50)
            .get();

        const tbody = document.getElementById('installsTableBody');
        tbody.innerHTML = '';

        const locations = new Set();

        installsSnapshot.forEach(doc => {
            const data = doc.data();
            const row = document.createElement('tr');

            const time = new Date(data.timestamp).toLocaleString();
            const location = `${data.location?.city || 'Unknown'}, ${data.location?.state || 'Unknown'}`;
            const device = `${data.device?.manufacturer || 'Unknown'} ${data.device?.model || ''}`;
            const android = data.androidVersion || 'Unknown';
            const appVersion = data.appVersion || 'Unknown';

            locations.add(data.location?.state || 'Unknown');

            row.innerHTML = `
                <td>${time}</td>
                <td><i class="fas fa-map-marker-alt" style="color: #ff2d55;"></i> ${location}</td>
                <td><i class="fas fa-mobile-alt" style="color: #8a2be2;"></i> ${device}</td>
                <td>Android ${android}</td>
                <td>v${appVersion}</td>
            `;

            tbody.appendChild(row);
        });

        // Update location filter
        const locationFilter = document.getElementById('locationFilter');
        locationFilter.innerHTML = '<option value="all">All Locations</option>';
        locations.forEach(loc => {
            const option = document.createElement('option');
            option.value = loc;
            option.textContent = loc;
            locationFilter.appendChild(option);
        });

    } catch (error) {
        console.error('Error loading installs:', error);
    }
}

// Update charts
function updateCharts(installs, locationCounts) {
    // Install growth chart (last 7 days)
    const last7Days = [];
    const installCounts = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);

        const dayStart = date.getTime();
        const dayEnd = dayStart + 86400000;

        const count = installs.filter(install =>
            install.timestamp >= dayStart && install.timestamp < dayEnd
        ).length;

        last7Days.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        installCounts.push(count);
    }

    const ctx = document.getElementById('installChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Days,
                datasets: [{
                    label: 'Installs',
                    data: installCounts,
                    borderColor: '#ff2d55',
                    backgroundColor: 'rgba(255, 45, 85, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Location chart
    const locationChart = document.getElementById('locationChart');
    if (locationChart) {
        const sortedLocations = Object.entries(locationCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        locationChart.innerHTML = sortedLocations.map(([loc, count]) => `
            <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>${loc}</span>
                    <span style="color: #ff2d55; font-weight: 600;">${count}</span>
                </div>
                <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                    <div style="width: ${(count / sortedLocations[0][1]) * 100}%; height: 100%; background: linear-gradient(90deg, #ff2d55, #8a2be2);"></div>
                </div>
            </div>
        `).join('');
    }
}

// Get time ago
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
    return Math.floor(seconds / 86400) + 'd ago';
}

// Filter installs
function filterInstalls() {
    const locationFilter = document.getElementById('locationFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;

    const rows = document.querySelectorAll('#installsTableBody tr');

    rows.forEach(row => {
        const location = row.children[1].textContent;
        const timestamp = row.children[0].textContent;

        let showLocation = locationFilter === 'all' || location.includes(locationFilter);
        let showDate = true;

        if (dateFilter !== 'all') {
            const installDate = new Date(timestamp);
            const now = new Date();

            if (dateFilter === 'today') {
                showDate = installDate.toDateString() === now.toDateString();
            } else if (dateFilter === 'week') {
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                showDate = installDate >= weekAgo;
            } else if (dateFilter === 'month') {
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                showDate = installDate >= monthAgo;
            }
        }

        row.style.display = (showLocation && showDate) ? '' : 'none';
    });
}

// Auto-refresh every 30 seconds
setInterval(loadAllData, 30000);

// Initial load
if (checkAuth()) {
    loadAllData();
}
