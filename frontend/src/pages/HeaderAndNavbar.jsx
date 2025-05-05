import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './HeaderAndNavbar.css';
import unispaceLogo from '../assets/unispace-logo.svg';



const HeaderAndNavbar = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [location]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync search input with URL
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('q') || '';
    setSearchValue(query);

    if (query) {
      fetchRoomByNumber(query);
    } else {
      setSearchResult(null);
    }
  }, [location]);

  const fetchRoomByNumber = async (roomNo) => {
    if (!roomNo.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/api/uni/search/?q=${roomNo}`);

      if (!response.ok) {
        throw new Error('Failed to fetch room data');
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setSearchResult(data);
      } else {
        setError(data.message || 'No rooms found');
        setSearchResult([]);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while searching. Please try again.');
      setSearchResult([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
  e.preventDefault();
  if (searchValue.trim() === '') {
    navigate('/rooms');
  } else {
    navigate(`/search-results?q=${searchValue}`);
  }
};

  const handleClearSearch = () => {
    setSearchValue('');
    setSearchResult(null);
    navigate('/rooms');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  // Room card component - now using CSS classes only
  const RoomCard = ({ room }) => {
    return (
      <div className="room-card">
        <h3>Room {room.room_no}</h3>

        {room.room_pic && !room.room_pic.includes('Default_pic.jpg') && (
          <img
            src={`http://localhost:8000${room.room_pic}`}
            alt={`Room ${room.room_no}`}
            className="room-image"
          />
        )}

        <div className="room-details">
          <p><strong>Building:</strong> {room.building_name}</p>
          <p><strong>Type:</strong> {room.room_type}</p>
          <p><strong>Category:</strong> {room.room_category}</p>
          <p><strong>Capacity:</strong> {room.room_capacity}</p>
          {room.room_description && (
            <p><strong>Description:</strong> {room.room_description}</p>
          )}
        </div>

        <Link to={`/rooms/${room.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    );
  };

  return (
    <>
      <nav className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <form onSubmit={handleSearch} role="search">
            <div className="search-group">
              <input
                className="searchfield"
                type="search"
                name="q"
                placeholder="Search by Room No"
                aria-label="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {searchValue && (
                <button type="button" className="clear-search" onClick={handleClearSearch}>
                  ❌
                </button>
              )}
              <button className="searchBtn" type="submit">
                <i className="fa-solid fa-search"></i> Search
              </button>
            </div>

            <div className="auth-controls">
              <div className="logINSignUpBtn">
                <Link to="/login" className="logINSignUpBtnText">
                  <i className="fa-solid fa-user-plus"></i> LogIn/SignUp
                </Link>
              </div>
              <Link className="logout" to="/login">
                <i className="fa-solid fa-sign-out-alt"></i> Logout
              </Link>
              <div className="user">
                <i className="fa-solid fa-circle-user fa-beat"></i> {username}
              </div>
            </div>
          </form>
        </div>
      </nav>


       <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/">
            <picture>
              <img src={unispaceLogo} alt="logo" className="logo" />
            </picture>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarSupportedContent"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fa-solid fa-bars"></i>
            </span>
          </button>

          <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarSupportedContent">
            <ul className="navbar m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="navItem" to="/">
                  <i className="fa-solid fa-home"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navItem" to="/rooms">
                  <i className="fa-solid fa-door-open"></i> Rooms
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navItem" to="/contact">
                  <i className="fa-solid fa-envelope"></i> Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navItem" to="/chat">
                  <i className="fa-solid fa-comments fa-beat"></i> Chat
                </Link>
              </li>
            </ul>
          </div>

          <div className="MyProfileBtn">
            <Link className="profileText" to="/profile">
              <i className="fa-solid fa-user-circle"></i> My Profile
            </Link>
          </div>
        </div>
      </nav>

    </>
  );
};

export default HeaderAndNavbar;