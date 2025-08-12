// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG)

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// export const analytics = getAnalytics(app)
export const messaging = getMessaging(app)

export const generateToken = async () => {
    try {
        const permission = await Notification.requestPermission()

        if (permission !== 'granted') {
            console.warn('Notifications not granted')
            return
        }

        const registration = await navigator.serviceWorker.register(
            '/firebase-messaging-sw.js'
        )

        const currentToken = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FCM_VAPID_KEY,
            serviceWorkerRegistration: registration,
        })

        if (currentToken) {
            console.log('FCM Token:', currentToken)
        } else {
            console.warn('No registration token available')
        }
    } catch (err) {
        console.error('Error retrieving FCM token:', err)
    }
}

export default { app, messaging, generateToken }
