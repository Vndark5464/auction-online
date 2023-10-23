import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Header from '../components/home/Head';
import { db } from "../firebase-config";
import { useAuth } from '../components/users/AuthContext';

export default function Login() {
    const firstInputRef = useRef();
    const { setIsLoggedIn, setUserData } = useAuth(); 
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });

    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
    useEffect(() => {
        firstInputRef.current.focus();
      }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const loginUser = async (e) => {
        e.preventDefault();

        const { email, password } = formData;
        const db = getFirestore();

        signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            if (email === "admin5464@admin.com") {
                navigate('/admin');  // Chuyển hướng đến trang quản lý
            } else {
                navigate('/');  // Chuyển hướng đến trang chính
            }

                // Fetch the user document
            const docRef = doc(db, 'Users', userCredential.user.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                // Use spread operator to get all fields, preserving original document structure
                const userData = { ...docSnap.data() };
                
                // Set the last name to the one in the database
                setUserData({ lastName: userData.lastName });
              } else {
                console.log("No such document!");
              }
              
              setIsLoggedIn(true); 
              navigate('/');  
            })
            .catch((error) => {
                setAlertMessage(error.message);
            });
    };

    return (
        <>
            <Header />
            <form onSubmit={loginUser} className="container mt-5">
                {alertMessage && (
                    <div role="alert" className="alert alert-danger" tabIndex="0">{alertMessage}</div>
                )}
                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" name="email"
                            value={formData.email} onChange={handleChange} ref={firstInputRef}
                            required aria-required="true" aria-label="Email" aria-describedby="emailHelp" />
                        <small id="emailHelp" className="form-text text-muted" aria-label="Please enter your email">Please enter your email</small>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password:</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="password" name="password"
                            value={formData.password} onChange={handleChange}
                            required aria-required="true" aria-label="Password" aria-describedby="passwordHelp" />
                        <small id="passwordHelp" className="form-text text-muted">Please enter your password.</small>
                    </div>
                </div>
                <div className='form-check d-flex justify-content-center mb-5'> <Link to="/forgot-password">Forgot password ?</Link></div>
                <div className="mb-3 row">
                    <div className="col-sm-10 offset-sm-2">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </div>
                <div className='form-check d-flex justify-content-center mb-5'>Don't have an account? <Link to="/register">Register here ..</Link></div>
            </form>
        </>
    );
}