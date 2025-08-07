// public/firebase-messaging-sw.js

// Optional, but safe default:
self.addEventListener('install', () => {
    console.log('Firebase service worker installed')
})

importScripts(
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js'
)
importScripts(
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js'
)

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG)

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()
