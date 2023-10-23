import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import Header from './Head';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const notificationCollection = collection(db, 'notifications');
            const notificationDocs = await getDocs(notificationCollection);
            const fetchedNotifications = notificationDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log(fetchedNotifications);
            setNotifications(fetchedNotifications);
        };

        fetchNotifications();
    }, []);

    const markAsRead = async (notificationId) => {
        const notificationRef = doc(db, 'notifications', notificationId);
        await updateDoc(notificationRef, { read: true });
        setNotifications(notifications.map(notification => 
            notification.id === notificationId ? { ...notification, read: true } : notification
        ));
    };

    return (
        <>
        <Header />
        <div className="container mt-5">
            <h2>Thông báo</h2>
            <ul className="list-group">
                {notifications.map(notification => (
                    <li key={notification.id} className={`list-group-item ${notification.read ? '' : 'list-group-item-warning'}`}>
                        {notification.message}
                        {!notification.read && (
                            <button className="btn btn-sm btn-primary float-right" onClick={() => markAsRead(notification.id)}>
                                Đánh dấu đã đọc
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default NotificationPage;
