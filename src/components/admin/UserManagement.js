import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      let userQuery = collection(db, 'Users');
      if (searchTerm) {
        userQuery = query(userQuery, where('username', '==', searchTerm));
      }
      const userDocs = await getDocs(userQuery);
      setUsers(userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchUsers();
  }, [searchTerm]);

  const handleDelete = async (userId) => {
    await deleteDoc(doc(db, 'Users', userId));
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
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
          {users.map(user => (
            <tr key={user.id}>
              <td><img src={user.photoURL} alt={user.username} width="50" /></td>
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
  );
}

export default UserManagement;
