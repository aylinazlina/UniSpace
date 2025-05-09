import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('access', data.access);
localStorage.setItem('refresh', data.refresh);

        localStorage.setItem('username', username); // ✅ Store username
        navigate('/');
      } else {
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h3>LOGIN</h3>
          <div className="login-header-underline"></div>
        </div>

        <div className="login-form-container">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <input
                type="text"
                placeholder="Username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <FontAwesomeIcon icon={faKey} />
              </div>
              <input
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-button-container">
              <button type="submit" className="login-btn">Login</button>
            </div>
          </form>

          {error && (
            <div className="messages">
              <p>{error}</p>
            </div>
          )}
        </div>

        <div className="login-footer">
          <div className="register-link">
            Don't have an account? <Link to="/register" className="signup-link">Sign Up now!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;