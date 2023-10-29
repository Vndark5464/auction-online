import React, { useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

function AdminNotificationPage() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const notificationRef = collection(getFirestore(), 'notifications');
      await addDoc(notificationRef, {
        message,
        timestamp: serverTimestamp()
      });
      alert('Notification sent successfully!');
      setMessage(''); // Reset the message input
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
