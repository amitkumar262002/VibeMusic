// Real-time Feedback System for Vibe Music (Firebase Integrated)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBVdjD4Bnv9FTuziPnhD3-GZxhcrNWjLoM",
    authDomain: "vibemusic-7723f.firebaseapp.com",
    projectId: "vibemusic-7723f",
    storageBucket: "vibemusic-7723f.firebasestorage.app",
    messagingSenderId: "322504383560",
    appId: "1:322504383560:android:9bfd1edfb95e6a63b60c7d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Global Exposure for UI
window.submitReviewToFirebase = async (review) => {
    try {
        await addDoc(collection(db, "vibe_reviews"), {
            ...review,
            createdAt: Date.now()
        });
        return true;
    } catch (e) {
        console.error("Error adding review: ", e);
        return false;
    }
};

window.deleteReviewFromFirebase = async (docId) => {
    try {
        await deleteDoc(doc(db, "vibe_reviews", docId));
        return true;
    } catch (e) {
        console.error("Error deleting review: ", e);
        return false;
    }
};

window.editReviewInFirebase = async (docId, newText) => {
    try {
        await updateDoc(doc(db, "vibe_reviews", docId), {
            text: newText
        });
        return true;
    } catch (e) {
        console.error("Error editing review: ", e);
        return false;
    }
};

// Listen for Real-time Updates
const q = query(collection(db, "vibe_reviews"), orderBy("createdAt", "desc"));
onSnapshot(q, (snapshot) => {
    const reviews = [];
    snapshot.forEach((doc) => {
        reviews.push({ id: doc.id, ...doc.data() });
    });

    // Call UI update function defined in index.html
    if (window.renderReviews) {
        window.renderReviews(reviews);
    }
});
