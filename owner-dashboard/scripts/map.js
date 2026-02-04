// India regions with coordinates (percentage-based positioning)
const indiaRegions = [
    { name: 'Patna, Bihar', top: '35%', left: '68%', users: 0 },
    { name: 'Muzaffarpur, Bihar', top: '33%', left: '66%', users: 0 },
    { name: 'Gaya, Bihar', top: '37%', left: '67%', users: 0 },
    { name: 'Bhagalpur, Bihar', top: '36%', left: '71%', users: 0 },
    { name: 'Delhi NCR', top: '28%', left: '62%', users: 0 },
    { name: 'Mumbai, Maharashtra', top: '52%', left: '58%', users: 0 },
    { name: 'Bangalore, Karnataka', top: '65%', left: '62%', users: 0 },
    { name: 'Kolkata, West Bengal', top: '38%', left: '72%', users: 0 },
    { name: 'Lucknow, UP', top: '32%', left: '65%', users: 0 },
    { name: 'Pune, Maharashtra', top: '54%', left: '59%', users: 0 },
    { name: 'Hyderabad, Telangana', top: '58%', left: '64%', users: 0 },
    { name: 'Chennai, Tamil Nadu', top: '68%', left: '66%', users: 0 },
    { name: 'Jaipur, Rajasthan', top: '32%', left: '60%', users: 0 },
    { name: 'Ahmedabad, Gujarat', top: '45%', left: '57%', users: 0 },
    { name: 'Indore, MP', top: '42%', left: '61%', users: 0 },
    { name: 'Guwahati, Assam', top: '34%', left: '78%', users: 0 },
    { name: 'Chandigarh, Punjab', top: '25%', left: '61%', users: 0 }
];

// Render India Map
async function renderIndiaMap() {
    const mapContainer = document.getElementById('indiaMap');
    if (!mapContainer) return;

    try {
        // Get install data from Firebase
        const installsSnapshot = await db.collection('vibe_installs')
            .orderBy('timestamp', 'desc')
            .limit(200)
            .get();

        // Count users by location
        const locationCounts = {};
        installsSnapshot.forEach(doc => {
            const data = doc.data();
            const city = data.location?.city || 'Unknown';
            const state = data.location?.state || 'Unknown';
            const key = `${city}, ${state}`;
            locationCounts[key] = (locationCounts[key] || 0) + 1;
        });

        // Update region user counts
        indiaRegions.forEach(region => {
            region.users = locationCounts[region.name] || 0;
        });

        // Clear map
        mapContainer.innerHTML = '';
        mapContainer.style.position = 'relative';
        mapContainer.style.background = 'radial-gradient(circle at 50% 50%, rgba(88, 86, 214, 0.05), transparent)';

        // Create India map SVG
        const svgMap = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgMap.setAttribute('viewBox', '0 0 300 400');
        svgMap.style.position = 'absolute';
        svgMap.style.top = '0';
        svgMap.style.left = '50%';
        svgMap.style.transform = 'translateX(-50%)';
        svgMap.style.width = '100%';
        svgMap.style.height = '100%';
        svgMap.style.opacity = '0.4';

        // India outline path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M150,50 L165,55 L175,65 L180,80 L185,100 L188,120 L190,140 L188,160 L185,180 L180,200 L175,220 L170,240 L165,260 L160,280 L155,300 L145,315 L130,325 L110,330 L90,328 L70,322 L55,312 L45,298 L38,280 L35,260 L33,240 L32,220 L33,200 L35,180 L38,160 L42,140 L48,120 L55,100 L65,80 L78,65 L95,55 L115,50 L135,48 Z');
        path.setAttribute('fill', 'rgba(138, 43, 226, 0.1)');
        path.setAttribute('stroke', 'rgba(138, 43, 226, 0.5)');
        path.setAttribute('stroke-width', '1.5');
        svgMap.appendChild(path);
        mapContainer.appendChild(svgMap);

        // Sort regions by user count
        const sortedRegions = [...indiaRegions].sort((a, b) => b.users - a.users);

        // Render activity points
        sortedRegions.forEach((region, index) => {
            if (region.users === 0) return; // Skip regions with no users

            const point = document.createElement('div');
            point.className = 'map-point';
            point.style.position = 'absolute';
            point.style.top = region.top;
            point.style.left = region.left;

            // Size based on user count
            const size = Math.max(15, Math.min(50, region.users * 2));
            point.style.width = size + 'px';
            point.style.height = size + 'px';

            // Color intensity based on user count
            const intensity = Math.min(1, region.users / 30);
            const glowSize = size * 1.5;

            point.style.background = `radial-gradient(circle, rgba(255,45,85,${intensity * 0.9}), rgba(255,45,85,${intensity * 0.4}), transparent)`;
            point.style.border = `2px solid rgba(255,45,85,${intensity})`;
            point.style.borderRadius = '50%';
            point.style.boxShadow = `0 0 ${glowSize}px rgba(255,45,85,${intensity * 0.7}), inset 0 0 ${size / 2}px rgba(255,255,255,${intensity * 0.3})`;
            point.style.animation = `mapPulse 2s infinite ${index * 0.3}s, mapGlow 3s infinite ${index * 0.5}s`;
            point.style.cursor = 'pointer';
            point.style.zIndex = 100 - index;
            point.style.transform = 'translate(-50%, -50%)';

            // Tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'map-tooltip';
            tooltip.innerHTML = `
                <strong>${region.name}</strong><br>
                <span style="color: #ff2d55;">${region.users} active users</span>
            `;
            tooltip.style.cssText = `
                position: absolute;
                bottom: calc(100% + 10px);
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.9);
                padding: 10px 15px;
                border-radius: 8px;
                white-space: nowrap;
                font-size: 0.85rem;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s;
                z-index: 1000;
            `;
            point.appendChild(tooltip);

            // Show tooltip on hover
            point.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
            });
            point.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });

            // Ripple effect for high activity
            if (region.users > 20) {
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.top = '50%';
                ripple.style.left = '50%';
                ripple.style.transform = 'translate(-50%, -50%)';
                ripple.style.width = (size * 2) + 'px';
                ripple.style.height = (size * 2) + 'px';
                ripple.style.border = '2px solid rgba(255,45,85,0.4)';
                ripple.style.borderRadius = '50%';
                ripple.style.animation = 'mapRipple 3s infinite';
                point.appendChild(ripple);
            }

            mapContainer.appendChild(point);
        });

        // Add live indicator
        const liveTag = document.createElement('div');
        liveTag.style.cssText = 'position:absolute;bottom:15px;right:15px;background:rgba(0,0,0,0.85);padding:8px 14px;border-radius:25px;font-size:0.75rem;color:#ff2d55;border:1px solid rgba(255,45,85,0.5);display:flex;align-items:center;gap:8px;backdrop-filter:blur(10px);';
        liveTag.innerHTML = '<span style="width:7px;height:7px;background:#ff2d55;border-radius:50%;box-shadow:0 0 10px #ff2d55;animation:blink 1s infinite;"></span>LIVE TRACKING';
        mapContainer.appendChild(liveTag);

        // Add animations
        addMapAnimations();

    } catch (error) {
        console.error('Error rendering map:', error);
    }
}

// Add map animations
function addMapAnimations() {
    if (document.getElementById('mapAnimations')) return;

    const style = document.createElement('style');
    style.id = 'mapAnimations';
    style.textContent = `
        @keyframes mapPulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.8; }
        }
        @keyframes mapGlow {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.3); }
        }
        @keyframes mapRipple {
            0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.6; }
            100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
        .map-point {
            transition: all 0.3s ease;
        }
        .map-point:hover {
            transform: translate(-50%, -50%) scale(1.2) !important;
            z-index: 1000 !important;
        }
    `;
    document.head.appendChild(style);
}

// Auto-refresh map every 30 seconds
setInterval(renderIndiaMap, 30000);

// Initial render
renderIndiaMap();
