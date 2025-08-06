import { useNavigate } from '@tanstack/react-router'
import { useIdleTimer } from 'react-idle-timer'

const IDLE_TIMEOUT = 1000 * 60 * 0.25 // 15 seconds

const IdleTimerContainer = () => {
    const navigate = useNavigate()

    const onIdle = () => {
        console.log('User is idle. Logging out')
        navigate({ to: '/login' })
    }

    useIdleTimer({
        timeout: IDLE_TIMEOUT,
        onIdle,
        onActive: () => console.log('User is active again'),
        onAction: () => console.log('User performed an action'),
        throttle: 500, // throttle calls to event handlers
        events: ['mousemove', 'keydown', 'mousedown', 'touchstart'], // custom events
        crossTab: true, // detect activity across tabs
    })

    return null
}

export default IdleTimerContainer
