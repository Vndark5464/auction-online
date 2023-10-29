import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';

function AdminNotificationPage() {
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch all user IDs from Firebase (excluding admin)
    const fetchUsers = async () => {
      const usersRef = collection(getFirestore(), 'Users'); // Assuming 'users' is the collection name
      const userSnapshot = await getDocs(usersRef);
      const userList = userSnapshot.docs.map(doc => doc.id).filter(id => id !== 'admin'); // Exclude admin
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
      setMessage(''); // Reset the message input
      setUserId(''); // Reset the user ID
    } catch (error) {
      console.error("Error sending notification: ", error);
      alert('Failed to send notification. Please try again.');
    }
  };

  return (
    <div>
      <h2>Send Notification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select User:</label>
          <select value={userId} onChange={(e) => setUserId(e.target.value)}>
            {users.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Send Notification</button>
      </form>
    </div>
  );
}

export default AdminNotificationPage;
