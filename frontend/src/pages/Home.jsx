import React from 'react';
import './Home.css'; // Assuming you saved your CSS in Home.css
import bannerImage from '../assets/banner.jpg'; // Adjust path if needed
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="heroPart">
      <picture>
        <img src={bannerImage} alt="Banner" className="heroImage" />
      </picture>

      <div className="heroOverlay">
        <h1 className="heroTitle">Welcome to UniSpace</h1>
        <p className="heroSubtitle">
          Your comfort, our priority. Discover the best rooms tailored for your peace of mind.
        </p>
        <Link to="/rooms" className="heroButton">
          Explore Rooms
        </Link>
      </div>
    </section>
  );
};

export default Home;
