// Load feedback from website localStorage
async function loadFeedback() {
    try {
        // Since feedback is stored in website's localStorage, we'll simulate it
        // In production, you'd sync this to Firebase from the website

        const feedbackGrid = document.getElementById('feedbackGrid');
        feedbackGrid.innerHTML = '<p style="color: rgba(255,255,255,0.5); padding: 20px;">Loading feedback from website...</p>';

        // For now, show instructions to sync feedback
        feedbackGrid.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 40px; text-align: center; background: rgba(255,255,255,0.03); border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);">
                <i class="fas fa-info-circle" style="font-size: 3rem; color: #8a2be2; margin-bottom: 20px;"></i>
                <h3 style="margin-bottom: 15px;">Feedback Management</h3>
                <p style="color: rgba(255,255,255,0.6); margin-bottom: 20px;">
                    User feedback is stored in the website's localStorage. To manage feedback:
                </p>
                <ol style="text-align: left; max-width: 600px; margin: 0 auto; color: rgba(255,255,255,0.7); line-height: 2;">
                    <li>Open your Vibe Music website</li>
                    <li>Double-click on "User Feedback" title</li>
                    <li>Enter owner password: <code style="background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 4px;">vibeowner2026</code></li>
                    <li>Edit or delete reviews directly on the website</li>
                </ol>
                <button onclick="openWebsite()" class="action-btn" style="margin-top: 30px;">
                    <i class="fas fa-external-link-alt"></i> Open Website
                </button>
            </div>
        `;

    } catch (error) {
        console.error('Error loading feedback:', error);
    }
}

// Open website in new tab
function openWebsite() {
    window.open('../website/index.html', '_blank');
}

// Edit review (would be synced from website)
function editReview(reviewId) {
    alert('Please edit reviews directly on the website using owner mode.');
}

// Delete review (would be synced from website)
function deleteReview(reviewId) {
    if (confirm('Delete this review? This action cannot be undone.')) {
        alert('Please delete reviews directly on the website using owner mode.');
    }
}

// Sync feedback to Firebase (future enhancement)
async function syncFeedbackToFirebase() {
    try {
        // This would sync website localStorage reviews to Firebase
        // For now, we manage reviews directly on the website
        console.log('Feedback sync not implemented yet');
    } catch (error) {
        console.error('Error syncing feedback:', error);
    }
}

// Initial load
loadFeedback();
