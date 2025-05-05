import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    about_myself: '',
    u_id: '',
    contact_no: '',
    address: '',
    picture: null,
  });

  const [profilePicPreview, setProfilePicPreview] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");

    axios.get('/api/profile/update/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setFormData({
        name: res.data.name || '',
        about_myself: res.data.about_myself || '',
        u_id: res.data.u_id || '',
        contact_no: res.data.contact_no || '',
        address: res.data.address || '',
        picture: null,
      });
      setProfilePicPreview(res.data.picture);
    })
    .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, picture: file }));
    setProfilePicPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("access");

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      await axios.put('/api/profile/update/', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <section className="ItemsPart">
      <div className="container">
        <div className="ItemsPartTopWrapper mb-5">
          <h1 className="ItemsPartTop__title">User Profile</h1>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card CustomCardFull mb-5">
              <img
                className="img-fluid-100 card-img-top CardImage"
                src={profilePicPreview}
                alt="Profile Preview"
              />
              <div className="card-body CustomeCard">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>About Myself</label>
                    <textarea
                      name="about_myself"
                      className="form-control"
                      value={formData.about_myself}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label>University ID</label>
                    <input
                      type="text"
                      name="u_id"
                      className="form-control"
                      value={formData.u_id}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Contact Number</label>
                    <input
                      type="text"
                      name="contact_no"
                      className="form-control"
                      value={formData.contact_no}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Profile Picture</label>
                    <input
                      type="file"
                      name="picture"
                      className="form-control"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </div>

                  <button className="btn btn-primary" type="submit">Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileForm;
