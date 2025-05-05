// src/pages/CreateRoom.js
import React, { useState } from 'react';

const CreateRoom = () => {
  const [roomNo, setRoomNo] = useState('');
  const [roomType, setRoomType] = useState('');
  const [roomPic, setRoomPic] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('room_no', roomNo);
    formData.append('room_type', roomType);
    formData.append('room_pic', roomPic);

    try {
      const response = await fetch('http://localhost:8000/api/rooms/create/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Room created successfully!');
        setRoomNo('');
        setRoomType('');
        setRoomPic(null);
      } else {
        setMessage('Error creating room');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-6 max-w-lg mx-auto bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Create Room</h2>

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
        <label className="block mb-1 font-medium">Room Image</label>
        <input
          type="file"
          onChange={(e) => setRoomPic(e.target.files[0])}
          className="w-full"
          accept="image/*"
          required
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Submit
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  );
};

export default CreateRoom;
