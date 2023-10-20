import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Header from '../components/home/Head';

export default function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: ''
    });

    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        const { email } = formData;

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setAlertMessage('Password reset email sent. Check your inbox!');
            })
            .catch((error) => {
                setAlertMessage(error.message);
            });
    };

    return (
        <>
            <Header />
            <form onSubmit={handleForgotPassword} className="container mt-5">
                {alertMessage && (
                    <div role="alert" className="alert alert-info">{alertMessage}</div>
                )}
                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" name="email"
                            value={formData.email} onChange={handleChange}
                            required aria-required="true" aria-label="Email" aria-describedby="emailHelp" />
                        <small id="emailHelp" className="form-text text-muted">Please enter your email.</small>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-sm-10 offset-sm-2">
                        <button type="submit" className="btn btn-primary">Send Reset Email</button>
                    </div>
                </div>
                <div className='form-check d-flex justify-content-center mb-5'>Remember your password? <Link to="/login">Login here ..</Link></div>
            </form>
        </>
    );
}
