import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance'; // adjust the path as per your project structure

import './profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact_no: '',
    about_myself: ''
  });

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/uni/profile/');

      setProfile(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setLoading(false);
    }
  };
  fetchProfile();
}, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('access_token');

    const updatePayload = {
  name: formData.name,
  address: formData.address,
  contact_no: formData.contact_no,
  about_myself: formData.about_myself
};

        const res = await axios.put('/api/uni/profile/', updatePayload);



    showToast("Profile updated successfully!");

    // Update profile state with original formData values
    setProfile((prev) => ({ ...prev, ...formData }));
    setIsEditing(false);
  } catch (err) {
    console.error("Error updating profile:", err.response?.data || err.message);
    showToast("Failed to update profile.", "error");
  }
};

  const handleEditClick = () => {
  setFormData({
    name: profile.name || '',
    address: profile.address || '',
    contact_no: profile.contact || '',         // use 'contact'
    about_myself: profile.about || ''          // use 'about'
  });
  setIsEditing(true);
};

  const showToast = (message, type = "success") => {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-icon">
        ${type === "success" ? `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>` :
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>`}
      </div>
      <div class="toast-message">${message}</div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 3000);
    }, 100);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p className="subtitle">Manage your personal information</p>
      </div>

      <div className="profile-card">
        <div className="profile-sidebar">
          <div className="profile-image-container">
            <img
              src={profile.picture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="profile-pic"
            />
            <div className="profile-badge">
              <span>Student</span>
            </div>
          </div>

          <div className="profile-id-card">
            <p className="id-label">UNIVERSITY ID</p>
            <p className="id-value">{profile.u_id || 'N/A'}</p>
          </div>

          <div className="edit-button-container">
            <button
              className="edit-profile-btn"
              onClick={handleEditClick}
            >
              <span className="btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </span>
              {(profile.address && profile.contact && profile.about) ? 'Update Info' : 'Add Info'}

            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Full Name</span>
                <span className="info-value">{profile.name || 'Not specified'}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Address</span>
                <span className="info-value">{profile.address || 'Not specified'}</span>
              </div>

              <div className="info-item">
  <span className="info-label">Contact Number</span>
  <span className="info-value">{profile.contact || 'Not specified'}</span>
</div>


            </div>
          </div>

          <div className="profile-section">
            <h3 className="section-title">About Me</h3>
            <div className="about-content">
              {profile.about ? (
  <p>{profile.about}</p>
) : (
  <p className="empty-about">No information provided</p>
)}

            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>{(profile.address && profile.contact_no && profile.about_myself) ? 'Update Your Profile' : 'Complete Your Profile'}</h3>
              <button className="close-modal" onClick={() => setIsEditing(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact_no">Contact Number</label>
                <input
                  type="text"
                  id="contact_no"
                  name="contact_no"
                  placeholder="Enter your contact number"
                  value={formData.contact_no}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="about_myself">About Me</label>
                <textarea
                  id="about_myself"
                  name="about_myself"
                  placeholder="Tell us about yourself"
                  value={formData.about_myself}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>

              <div className="form-buttons">
                <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                <button type="submit" className="save-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
