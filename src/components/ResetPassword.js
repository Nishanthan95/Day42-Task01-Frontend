import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import './ResetPassword.css';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/reset-password', { token, newPassword: password });
            setMessage(response.data.msg);
            toast.success('Password reset successful! You can now login with your new password.');
        } catch (error) {
            setMessage('Error resetting password');
            toast.error('Error resetting password. Please try again.');
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            <i className="fas fa-lock"></i>
                            <input 
                                type="password" 
                                placeholder="New Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </label>
                    </div>
                    <button type="submit" className="btn-reset-password">Reset Password</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
