# Owner Dashboard - Complete Guide

## 🔐 Login Credentials

**Owner ID:** `vibeowner2026`  
**Security Key:** `VibeMusicBloodBadshah@2026`

⚠️ **IMPORTANT:** Keep these credentials safe! Change them in `index.html` if needed.

---

## 📁 Folder Structure

```
owner-dashboard/
├── index.html              # Secure login page
├── dashboard.html          # Main dashboard
├── styles/
│   ├── login.css          # Login page styling
│   └── dashboard.css      # Dashboard styling
└── scripts/
    ├── dashboard.js       # Main dashboard logic
    ├── map.js            # India map visualization
    └── feedback.js       # Feedback management
```

---

## 🚀 Features

### 1. **Secure Login**
- Military-grade authentication
- Failed attempt tracking (max 3 attempts)
- 30-minute lockout after failed attempts
- Anti-inspection protection
- Session-based access

### 2. **Real-Time Analytics**
- 📊 Total Installs (live counter)
- 👥 Active Today (users who opened app today)
- 📍 Top Location (state with most installs)
- 🕐 Last Install (time ago)
- 📈 7-day install growth chart
- 🗺️ Top 5 locations breakdown

### 3. **Live India Map**
- Real-time user activity visualization
- Red zones for high-activity areas
- Interactive tooltips with user counts
- Pulsing animations for active regions
- Ripple effects for 20+ users
- Auto-refresh every 30 seconds

### 4. **User Feedback Management**
- View all user reviews
- Edit reviews (via website owner mode)
- Delete inappropriate reviews
- Filter by rating/date
- Direct link to website management

### 5. **Installation Log**
- Complete install history
- Filter by location
- Filter by date (today/week/month/all)
- Device information
- Android version tracking
- App version tracking

---

## 🎯 How to Use

### Step 1: Access Dashboard
1. Open `owner-dashboard/index.html` in browser
2. Enter credentials:
   - Owner ID: `vibeowner2026`
   - Security Key: `VibeMusicBloodBadshah@2026`
3. Click "Secure Login"

### Step 2: View Analytics
- Dashboard opens to Analytics section
- See real-time install count
- View 7-day growth chart
- Check top locations

### Step 3: Monitor Live Map
- Click "Live Map" in sidebar
- See India map with red zones
- Hover over zones for details
- Watch real-time updates

### Step 4: Manage Feedback
- Click "User Feedback" in sidebar
- Click "Open Website" button
- Double-click "User Feedback" title on website
- Enter password: `vibeowner2026`
- Edit/delete reviews directly

### Step 5: View Install Log
- Click "Install Log" in sidebar
- Filter by location or date
- See complete device details
- Export data if needed

---

## 🔒 Security Features

### Login Protection:
- ✅ Encrypted session storage
- ✅ Auto-logout on close
- ✅ Failed attempt tracking
- ✅ 30-minute lockout
- ✅ Right-click disabled
- ✅ F12/Inspect blocked

### Data Protection:
- ✅ Firebase security rules
- ✅ Owner-only read access
- ✅ Anonymous user tracking
- ✅ No personal data stored

---

## 📱 Responsive Design

### Desktop (1024px+):
- Full sidebar navigation
- 4-column stats grid
- Side-by-side charts
- Large map view

### Tablet (768px - 1024px):
- Collapsible sidebar
- 2-column stats grid
- Stacked charts
- Medium map view

### Mobile (< 768px):
- Hidden sidebar (toggle button)
- 1-column layout
- Stacked charts
- Compact map view

---

## 🎨 Customization

### Change Login Credentials:
Edit `index.html`:
```javascript
const OWNER_ID = "your_new_id";
const OWNER_KEY = "your_new_password";
```

### Change Color Theme:
Edit `styles/dashboard.css`:
```css
:root {
    --primary: #ff2d55;      /* Main color */
    --secondary: #8a2be2;    /* Accent color */
}
```

### Adjust Auto-Refresh:
Edit `scripts/dashboard.js`:
```javascript
setInterval(loadAllData, 30000); // 30 seconds
```

---

## 🐛 Troubleshooting

### Dashboard shows 0 installs:
1. Check Firebase config in `scripts/dashboard.js`
2. Verify Firestore rules are published
3. Wait 30 seconds and click refresh
4. Check Firebase Console for data

### Map not showing:
1. Ensure Firebase has install data
2. Check browser console for errors
3. Refresh the page
4. Clear browser cache

### Can't login:
1. Verify credentials are correct
2. Check if locked (wait 30 minutes)
3. Clear browser cache
4. Try incognito mode

### Feedback not loading:
1. Open website first
2. Submit test review
3. Enable owner mode on website
4. Manage reviews there

---

## 📊 Data Tracking

### What's Tracked:
- ✅ Install timestamp
- ✅ Location (city/state)
- ✅ Device model
- ✅ Android version
- ✅ App version
- ✅ Session count

### What's NOT Tracked:
- ❌ User names
- ❌ Phone numbers
- ❌ Exact GPS location
- ❌ Personal data
- ❌ Usage patterns

---

## 🚀 Deployment

### Option 1: Local Hosting
- Just open `index.html` in browser
- Works from your computer only

### Option 2: Firebase Hosting
```bash
firebase init hosting
firebase deploy
```

### Option 3: Netlify
1. Upload `owner-dashboard` folder
2. Add password protection
3. Deploy

---

## 📞 Support

### Common Issues:
1. **Login fails:** Check credentials
2. **No data:** Wait for first install
3. **Map empty:** Need install data
4. **Slow loading:** Check internet

### Firebase Console:
- View raw data: https://console.firebase.google.com/
- Check Firestore collections
- Monitor usage

---

## ✅ Success Checklist

- [ ] Can login successfully
- [ ] See install count
- [ ] Map shows red zones
- [ ] Charts display data
- [ ] Can filter installs
- [ ] Feedback section works
- [ ] Auto-refresh working
- [ ] Responsive on mobile

---

**Created by:** Blood Badshah (ANKIT)  
**For:** Vibe Music Owner Dashboard  
**Date:** February 2026  
**Version:** 1.0.0

---

## 🎉 You're All Set!

Your professional owner dashboard is ready! Login and start tracking your app's growth! 🚀
