import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';

function LoginModal({ onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (isSignUp) {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.find(user => user.email === email)) {
        setMessage('User already exists');
        return;
      }

      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));
      setMessage('Sign Up successful! You can now log in.');
      setTimeout(() => setIsSignUp(false), 2000);
    } else {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        setMessage('Login successful');
        setTimeout(() => onClose(), 2000);
      } else {
        setMessage('Invalid email or password');
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 'Weak';
    if (password.length > 8) {
      strength = 'Medium';
      if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
        strength = 'Strong';
      }
    }
    return strength;
  };

  const passwordStrength = formData.password ? calculatePasswordStrength(formData.password) : '';

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-black text-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
        <h2 className="text-2xl font-bold mb-4 text-center">{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 top-6 right-0 pr-3 flex items-center"
              onClick={toggleShowPassword}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {isSignUp && (
            <>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  required
                />
              </div>
              {formData.password && (
                <div className="mb-4">
                  <p>Password Strength: <span className={`font-bold ${passwordStrength === 'Strong' ? 'text-green-400' : passwordStrength === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{passwordStrength}</span></p>
                </div>
              )}
            </>
          )}
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full">Submit</button>
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-400"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center">
            <p>{message}</p>
          </div>
        )}
        <button
          type="button"
          className="mt-4 text-gray-400 w-full"
          onClick={() => {
            setMessage('');
            setIsSignUp(!isSignUp);
            setFormData({ email: '', password: '', confirmPassword: '' });
          }}
        >
          {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
