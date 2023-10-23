import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import MenuAdmin from './menu-admin';

const UserManagement = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const userCollection = collection(db, 'Users');
      const userDocs = await getDocs(userCollection);
      const users = userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllUsers(users);
      setDisplayedUsers(users);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredUsers = allUsers.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedUsers(filteredUsers);
    } else {
      setDisplayedUsers(allUsers);
    }
  }, [searchTerm, allUsers]);

  const handleDelete = async (userId) => {
    await deleteDoc(doc(db, 'Users', userId));
    setAllUsers(allUsers.filter(user => user.id !== userId));
  };

  return (
    <>
      <div className="container mt-5">
        <MenuAdmin />
      </div>
      <div className="container mt-5">
        <h1>Quản lý người dùng</h1>
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm người dùng theo tên"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>UID</th>
              <th>Username</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map(user => (
              <tr key={user.id}>
                <td><img src={user.profileImageURL} alt={user.username} width="50" /></td>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.dob}</td>
                <td>{user.address}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserManagement;
