import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useLoginViewModel } from '../../hooks/useLoginViewModel'
import './LoginPage.css'
import { useTranslation } from 'react-i18next'

const LoginPage = () => {
    const [email, setEmail] = useState('test@example.com')
    const [password, setPassword] = useState('password123')
    const { t } = useTranslation()
    const { login } = useLoginViewModel()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const { token } = await login(email, password)
            console.log('Login successful:', token)

            navigate({ to: '/todos' })
        } catch (err) {
            console.error('Login failed:', err)
        }
    }

    return (
        <div className="login-page">
            <h2>{t('pages.login')}</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage
