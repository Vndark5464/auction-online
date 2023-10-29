import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.css';

function AdminNotificationPage() {
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(getFirestore(), 'Users');
      const userSnapshot = await getDocs(usersRef);
      const userList = userSnapshot.docs.map(doc => doc.id).filter(id => id !== 'admin');
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const notificationRef = collection(getFirestore(), 'notifications');
      await addDoc(notificationRef, {
        userId,
        message,
        timestamp: serverTimestamp()
      });
      alert('Notification sent successfully!');
      setMessage('');
      setUserId('');
    } catch (error) {
      console.error("Error sending notification: ", error);
      alert('Failed to send notification. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Send Notification</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">Select User:</label>
          <select id="userId" className="form-select" value={userId} onChange={(e) => setUserId(e.target.value)}>
            {users.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message:</label>
          <textarea
            id="message"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Send Notification</button>
      </form>
    </div>
  );
}

export default AdminNotificationPage;