import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css'; // We'll create this CSS file

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Get CSRF token from cookies
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Log the request data for debugging
      console.log('Sending registration data:', formData);

      const response = await fetch('/api/uni/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(formData)
      });

      // Log response status for debugging
      console.log('Response status:', response.status);

      // Check if response has content before trying to parse JSON
      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        // Only try to parse JSON if the content-type is json
        const text = await response.text();
        console.log('Response text:', text);

        // Only parse as JSON if there's content
        data = text ? JSON.parse(text) : {};
      } else {
        console.log('Response is not JSON');
        data = {};
      }

      if (!response.ok) {
        // Handle validation errors from the backend
        setErrors(data || {});
        throw new Error(`Registration failed with status ${response.status}`);
      }

      // Registration successful
      setShowSuccess(true);

      // Wait 2 seconds before redirecting to login
      setTimeout(() => {
        navigate('/login/');
      }, 3000);
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        {showSuccess ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Registration Successful!</h2>
            <p>Your account has been created successfully.</p>
            <p>Redirecting to login page...</p>
          </div>
        ) : (
          <>
            <h2 className="registration-title">Create Your Account</h2>
            <form onSubmit={handleSubmit} className="registration-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className={errors.username ? "input-error" : ""}
                />
                {errors.username && <p className="error-message">{errors.username}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="password1">Password</label>
                <input
                  type="password"
                  id="password1"
                  name="password1"
                  value={formData.password1}
                  onChange={handleChange}
                  required
                  className={errors.password1 ? "input-error" : ""}
                />
                {errors.password1 && <p className="error-message">{errors.password1}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                  className={errors.password2 ? "input-error" : ""}
                />
                {errors.password2 && <p className="error-message">{errors.password2}</p>}
              </div>

              <button type="submit" disabled={isSubmitting} className="register-button">
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="login-link">
              Already have an account? <a href="/login">Log in</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Registration;