import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useLoginViewModel } from '../../hooks/useLoginViewModel';
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
      storage.setItem('user-profile', user);
      navigate({ to: '/' });
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role:</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="org">Organization</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
