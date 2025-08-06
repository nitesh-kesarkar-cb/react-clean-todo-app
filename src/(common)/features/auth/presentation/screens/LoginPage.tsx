import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useLoginViewModel } from '../../hooks/useLoginViewModel';
import './LoginPage.css';
import { useStorage } from '../../../../../shared/hoc/useStorageContext';

const LoginPage = () => {
  const [email, setEmail] = useState('test@example.com');
  const [role, setRole] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Test User');
  const { login } = useLoginViewModel();
  const navigate = useNavigate();
  const storage = useStorage();

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    try {
      const user = await login({ name, email, password, role });
      console.log('Login successful:', user);

      // Store user data in local storage or context as needed
      storage.setItem('user-profile', user);
      navigate({ to: '/' });
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
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
          </select>
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
