import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import AuthContext from '../contexts/AuthContext';
import './ActivateAccount.css';

const ActivateAccount = () => {
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const activateAccount = async () => {
            try {
                const response = await api.get(`/auth/activate/${token}`);
                setMessage(response.data.msg);
                toast.success(response.data.msg);
                
                // Store token and user info in context and local storage
                const { token: newToken, user } = response.data;
                localStorage.setItem('token', newToken);
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);

                // Redirect to dashboard
                navigate('/dashboard');
            } catch (error) {
                setMessage('Error activating account');
                toast.error('Error activating account. Please try again.');
            }
        };
        activateAccount();
    }, [token, navigate, setUser]);

    return (
        <div className="activate-container">
            <div className="activate-box">
                <h2>Account Activation</h2>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ActivateAccount;
