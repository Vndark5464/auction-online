import React, { useState, useEffect } from 'react';
import { collection, getDocs ,query,where} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../../firebase-config';
import "../../assets/css/notification.css";
import { auth } from '../../firebase-config';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const currentUser = auth.currentUser;

    useEffect(() => {
        const fetchNotifications = async () => {
            if (currentUser && currentUser.uid) {
                const notificationCollection = collection(db, 'notifications');
                const notificationQuery = query(notificationCollection, where('userId', '==', currentUser.uid));
                const notificationDocs = await getDocs(notificationQuery);
                const fetchedNotifications = notificationDocs.docs.map(doc => doc.data());
                setNotifications(fetchedNotifications);
            }
        };
    
        fetchNotifications();
        return () => {
            setNotifications([]); // Reset notifications
        };
    }, [currentUser]);
    
    
    

    const hasUnreadNotifications = notifications.some(notification => !notification.read);

    return (
        <div className="notification-container">
        <Link to="/notification-page" className="notification-icon" onClick={() => setIsOpen(!isOpen)}>
            Notification
            {hasUnreadNotifications && <span className="notification-dot"></span>}
        </Link>

            {isOpen && (
                <div className="notification-list">
                    {notifications.map((notification, index) => (
                        <div key={index} className={`notification-item ${notification.read ? '' : 'unread'}`}>
                            {notification.message}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Notification;

