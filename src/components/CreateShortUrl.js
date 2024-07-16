import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import './CreateShortUrl.css';

const CreateShortUrl = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await api.post('/urls/shorten', { originalUrl }, {
                headers: { 'x-auth-token': token }
            });
            toast.success('URL shortened successfully!');
            navigate('/urls');
        } catch (error) {
            toast.error('Error shortening URL. Please try again.');
        }
    };

    return (
        <div className="create-url-container">
            <div className="create-url-box">
                <h2>Create Short URL</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            <i className="fas fa-link"></i>
                            <input 
                                type="text" 
                                placeholder="Original URL" 
                                value={originalUrl} 
                                onChange={(e) => setOriginalUrl(e.target.value)} 
                                required 
                            />
                        </label>
                    </div>
                    <button type="submit" className="btn-create-url">Shorten URL</button>
                </form>
                <button onClick={() => navigate('/urls')} className="btn-primary">Back to URL List</button>
                <button onClick={() => navigate('/dashboard')} className="btn-primary">Dashboard</button>
            </div>
        </div>
    );
};

export default CreateShortUrl;
