import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useLoginViewModel } from '../../hooks/useLoginViewModel';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('test@example.com');
  const [role, setRole] = useState('common'); 
  const [password, setPassword] = useState('password123');
  const { login } = useLoginViewModel();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await login(email, password, role);
      console.log('Login successful:', token);

      navigate({ to: '/todos' });
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>

          <label>
            Role:
            <select value={role} onChange={e => setRole(e.target.value)} required>
              <option value="admin">Admin</option>
              <option value="org">Organization</option>
              <option value="common">Common</option>
            </select>
          </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
