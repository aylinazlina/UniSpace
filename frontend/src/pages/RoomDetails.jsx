import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './RoomDetails.css';
import BookingForm from './BookingForm';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/uni/rooms/${id}/`);
        if (!res.ok) throw new Error('Failed to fetch room');
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading room details...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <p className="error-message">Error: {error}</p>
    </div>
  );

  if (!room) return (
    <div className="not-found-container">
      <p className="not-found-message">Room not found</p>
    </div>
  );

  return (
    <div className="room-detail-page">
      <div className="room-detail-card">
        <div className="room-number-ribbon">
          <span>Room {room.room_no}</span>
        </div>

        <div className="room-image-container">
          <img
            src={room.room_pic}
            alt={`Room ${room.room_no}`}
            className="room-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
          <div className="room-type-tag">
            <span>{room.room_type}</span>
          </div>
        </div>

        <div className="room-content">
          <div className="room-info-section">
            <h2 className="content-heading">Room Details</h2>

            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon building-icon"></div>
                <div className="info-details">
                  <h4>Building</h4>
                  <p>{room.building_name}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon category-icon"></div>
                <div className="info-details">
                  <h4>Category</h4>
                  <p>{room.room_category}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon capacity-icon"></div>
                <div className="info-details">
                  <h4>Capacity</h4>
                  <p>{room.room_capacity} people</p>
                </div>
              </div>
            </div>

            {room.room_description && (
              <div className="room-description-section">
                <h2 className="content-heading">Description</h2>
                <p className="description-text">{room.room_description}</p>
              </div>
            )}

                <div>
      {/* Existing room details */}
      <button onClick={() => navigate(`/routine/${id}`)}>View Routine</button>
    </div>

          </div>

          <div className="booking-section">
            <BookingForm roomId={room.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;