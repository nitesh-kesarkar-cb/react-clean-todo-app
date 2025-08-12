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

const firebaseConfig = {
    apiKey: 'AIzaSyBeoMAGOb02Fsd0lvfROREiGURh1ovWv3Q',
    authDomain: 'fir-test-react-468305.firebaseapp.com',
    projectId: 'firebase-test-react-468305',
    storageBucket: 'firebase-test-react-468305.firebasestorage.app',
    messagingSenderId: '386155533989',
    appId: '1:386155533989:web:bf4345b34fc41f355e9f4c',
    measurementId: 'G-8KZZ7Q2F5F',
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()
