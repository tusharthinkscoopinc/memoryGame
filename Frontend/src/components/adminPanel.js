import React, { useState } from 'react';

const AdminPanel = () => {
  const [gameStartTime, setGameStartTime] = useState('');
  const [gameEndTime, setGameEndTime] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/setGameTime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameStartTime, gameEndTime, adminUsername, adminPassword }),
      });

      const data = await response.json();
      setMessage(data);
    } catch (error) {
      console.error('Error:', error.message);
      setMessage('Error: Failed to set game time');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-lg">
      <h2 className="text-2xl mb-4">Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="gameStartTime" className="block text-sm font-medium text-gray-700">Game Start Time:</label>
          <input type="datetime-local" id="gameStartTime" value={gameStartTime} onChange={(e) => setGameStartTime(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="gameEndTime" className="block text-sm font-medium text-gray-700">Game End Time:</label>
          <input type="datetime-local" id="gameEndTime" value={gameEndTime} onChange={(e) => setGameEndTime(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="adminUsername" className="block text-sm font-medium text-gray-700">Admin Username:</label>
          <input type="text" id="adminUsername" value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700">Admin Password:</label>
          <input type="password" id="adminPassword" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded w-full" />
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Set Game Time</button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default AdminPanel;
