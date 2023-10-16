import React, { useState, useEffect } from 'react';
import UserDataService from '../../services/uses.services';
import { useNavigate,Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import Header from '../home/Head';

import 'bootstrap/dist/css/bootstrap.min.css'; // Thêm CSS Bootstrap

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        img: '',
    });

    const [alertMessage, setAlertMessage] = useState('');
    const userService = new UserDataService();
    const navigate = useNavigate();
    const auth = getAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const registerUser = async (e) => {
        e.preventDefault();
        const userSnapshot = await userService.getAllUser();
        const { email,password,confirmPassword, ...restFormData } = formData;


        if (password !== confirmPassword) {
            setAlertMessage('Passwords do not match');
            return;
        }

        const users = userSnapshot.docs.map(doc => doc.data());
        const userExists = users.find(user => user.username === formData.username);

        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            sendEmailVerification(userCredential.user)
                .then(async () => {
                    await userService.addUsers({
                        ...restFormData,
                        img: formData.img || null
                    });
                    navigate('/login');
                })
                .catch((error) => {
                    setAlertMessage(error.message);
                });
        })
        .catch((error) => {
            setAlertMessage(error.message);
        });
    };

    useEffect(() => {
        if (alertMessage) {
            alert(alertMessage);
            setAlertMessage('');
        }
    }, [alertMessage]);

    return (
        <>
        <Header />
        <form onSubmit={registerUser} className="container mt-5">
            {alertMessage && (
                <div role="alert" className="alert alert-danger">{alertMessage}</div>
            )}
            {[
                { label: 'First Name', name: 'firstName', type: 'text' },
                { label: 'Last Name', name: 'lastName', type: 'text' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Username', name: 'username', type: 'text' },
                { label: 'Password', name: 'password', type: 'password' },
                { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
                { label: 'Date of Birth', name: 'dob', type: 'date' },
                { label: 'Address', name: 'address', type: 'text' },
            ].map((field, index) => (
                <div className="mb-3 row" key={index}>
                    <label htmlFor={field.name} className="col-sm-2 col-form-label">{field.label}:</label>
                    <div className="col-sm-10">
                        <input type={field.type} className="form-control" id={field.name} name={field.name}
                            value={formData[field.name]} onChange={handleChange}
                            required aria-required="true" aria-label={field.label} aria-describedby={field.name+"Help"} />
                        <small id={field.name+"Help"} className="form-text text-muted">Please enter your {field.label.toLowerCase()}.</small>
                    </div>
                </div>
            ))}
            <div className="mb-3 row">
                <div className="col-sm-10 offset-sm-2">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </div>
            <div className='form-check d-flex justify-content-center mb-5'>Don't have an account? <Link to="/login">Login here ..</Link></div>
        </form>
        </>
    );
}
