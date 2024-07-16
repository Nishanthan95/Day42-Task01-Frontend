import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { email, firstName, lastName, password });
            toast.success('Registration successful! Please check your email to activate your account.');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            <i className="fas fa-envelope"></i>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <i className="fas fa-user"></i>
                            <input 
                                type="text" 
                                placeholder="First Name" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
                                required 
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <i className="fas fa-user"></i>
                            <input 
                                type="text" 
                                placeholder="Last Name" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} 
                                required 
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <i className="fas fa-lock"></i>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </label>
                    </div>
                    <button type="submit" className="btn-register">Sign Up</button>
                </form>
                <div className="login-link">
                    <span>Already have an account? </span><Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
