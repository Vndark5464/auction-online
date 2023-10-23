import React, { useState, useEffect } from 'react';
import { collection, getDocs ,query,where} from 'firebase/firestore';
import { db } from '../../firebase-config';
import "../../assets/css/notification.css";
import { auth } from '../../firebase-config';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const currentUser = auth.currentUser;

    useEffect(() => {
        const fetchNotifications = async () => {
            const notificationCollection = collection(db, 'notifications');
            const notificationQuery = query(notificationCollection, where('userId', '==', currentUser.id)); // giả định bạn có trạng thái currentUser
            const notificationDocs = await getDocs(notificationQuery);
            const fetchedNotifications = notificationDocs.docs.map(doc => doc.data());
            setNotifications(fetchedNotifications);
        };
    
        fetchNotifications();
    }, []);
    

    const hasUnreadNotifications = notifications.some(notification => !notification.read);

    return (
        <div className="notification-container">
            <div className="notification-icon" onClick={() => setIsOpen(!isOpen)}>
                Notification
                {hasUnreadNotifications && <span className="notification-dot"></span>}
            </div>

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

