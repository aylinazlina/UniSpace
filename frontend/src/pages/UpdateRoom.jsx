import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomNo, setRoomNo] = useState('');
  const [roomType, setRoomType] = useState('');
  const [roomPic, setRoomPic] = useState(null);
  const [existingPic, setExistingPic] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8000/api/rooms/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setRoomNo(data.room_no);
        setRoomType(data.room_type);
        setExistingPic(data.room_pic); // for preview if needed
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('room_no', roomNo);
    formData.append('room_type', roomType);
    if (roomPic) {
      formData.append('room_pic', roomPic);
    }

    try {
      const response = await fetch(`http://localhost:8000/api/rooms/update/${id}/`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        setMessage('Room updated successfully!');
        navigate('/rooms');
      } else {
        setMessage('Error updating room');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-6 max-w-lg mx-auto bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Update Room</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Room Number</label>
        <input
          type="text"
          value={roomNo}
          onChange={(e) => setRoomNo(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Room Type</label>
        <input
          type="text"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Room Image (optional)</label>
        <input
          type="file"
          onChange={(e) => setRoomPic(e.target.files[0])}
          className="w-full"
          accept="image/*"
        />
        {existingPic && (
          <img
            src={`http://localhost:8000${existingPic}`}
            alt="Current Room"
            className="mt-2 w-full max-h-40 object-cover rounded"
          />
        )}
      </div>

      <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
        Update
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  );
};

export default UpdateRoom;
