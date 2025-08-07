import type { MessagePayload } from 'firebase/messaging'

export const showNotification = (payload: MessagePayload) => {
    const title = payload.notification?.title || 'Notification'
    const body = payload.notification?.body || 'You have a new message.'
    const icon = payload.notification?.image

    if (!('Notification' in window)) {
        console.warn('This browser does not support notifications.')
        return
    }

    if (Notification.permission === 'granted') {
        display(title, body, icon)
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                display(title, body, icon)
            }
        })
    }
}

const display = (title: string, body: string, icon?: string) => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then((reg) => {
            reg?.showNotification(title, {
                body,
                icon: icon ?? '/favicon.ico',
            })
        })
    } else {
        // Fallback if no SW (optional)
        new Notification(title, { body, icon })
    }
}
