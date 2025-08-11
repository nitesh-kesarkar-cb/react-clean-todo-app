import { useAuthContext } from '@/shared/hoc/useAuthContext'
import { useStorage } from '@/shared/hoc/useStorageContext'
import { useNavigate } from '@tanstack/react-router'

function Dashboard() {
    const { user, setUser } = useAuthContext()
    const navigate = useNavigate()
    const storage = useStorage()

    if (!user) {
        navigate({ to: '/common/login' })
        return
    }

    const handleLogout = () => {
        storage.removeItem('user-profile')
        setUser(null)
    }

    return (
        <>
            <h1>Dashboard</h1>
            <p>username: {user.name}</p>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Dashboard
