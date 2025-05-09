import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { getAccessToken, refreshAccessToken } from '../../auth';
import './profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    u_id: '',
    picture: null,
    about_myself: '',
    address: '',
    contact_no: '',
  });

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get('/uni/profile/');
      setProfile(res.data);
      setFormData(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          const res = await axiosInstance.get('/uni/profile/', {
            headers: { Authorization: `Bearer ${newToken}` },
          });
          setProfile(res.data);
          setFormData(res.data);
        } else {
          alert('Session expired. Please log in again.');
        }
      } else if (err.response?.status === 404) {
        setProfile(null); // New user, no profile yet
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    try {
      const res = await axiosInstance.post('/uni/profile/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfile(res.data);
      setEditMode(false);
    } catch (err) {
      console.error('Submission error:', err);
      alert('Something went wrong while saving profile.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
        {profile && !editMode && (
          <button
            className="edit-button"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      {profile && !editMode ? (
        <div className="profile-card">
          <div className="profile-info-container">
            <div className="profile-image-container">
              {profile.picture ? (
                <img
                  src={`http://localhost:8000${profile.picture}`}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <div className="profile-image-placeholder">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
            </div>
            <div className="profile-details">
              <div className="profile-field">
                <span className="field-label">Name</span>
                <span className="field-value">{profile.name}</span>
              </div>
              <div className="profile-field">
                <span className="field-label">UID</span>
                <span className="field-value">{profile.u_id}</span>
              </div>
              <div className="profile-field">
                <span className="field-label">Contact</span>
                <span className="field-value">{profile.contact_no}</span>
              </div>
              <div className="profile-field">
                <span className="field-label">Address</span>
                <span className="field-value">{profile.address}</span>
              </div>
              <div className="profile-field about-field">
                <span className="field-label">About me</span>
                <span className="field-value about-text">{profile.about_myself}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="profile-form-container">
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="u_id">UID</label>
              <input
                id="u_id"
                name="u_id"
                value={formData.u_id}
                onChange={handleChange}
                placeholder="Enter your UID"
              />
            </div>

            <div className="form-group file-input-group">
              <label htmlFor="picture">Profile Picture</label>
              <input
                type="file"
                id="picture"
                name="picture"
                onChange={handleChange}
                className="file-input"
              />
              <label htmlFor="picture" className="file-input-label">
                Choose a file
              </label>
              <span className="file-name">
                {formData.picture?.name || (profile?.picture ? "Current image" : "No file chosen")}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="about_myself">About Me</label>
              <textarea
                id="about_myself"
                name="about_myself"
                value={formData.about_myself}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact_no">Contact Number</label>
              <input
                id="contact_no"
                name="contact_no"
                value={formData.contact_no}
                onChange={handleChange}
                placeholder="Enter your contact number"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => profile ? setEditMode(false) : null}>
                Cancel
              </button>
              <button type="submit" className="submit-button">
                {profile ? 'Update' : 'Create'} Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;