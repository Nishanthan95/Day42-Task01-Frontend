import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../contexts/AuthContext';
import './UrlList.css';

const UrlList = () => {
    const [urls, setUrls] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/urls', {
                    headers: { 'x-auth-token': token }
                });
                setUrls(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUrls();
    }, []);

    return (
        <div className="url-list-container">
            <div className="url-list-box">
                <h2>Your Shortened URLs</h2>
                <table className="url-table">
                    <thead>
                        <tr>
                            <th>Original URL</th>
                            <th>Short URL</th>
                            <th>Clicks</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {urls.map((url) => (
                            <tr key={url._id}>
                                <td><a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.originalUrl}</a></td>
                                <td><a href={`http://localhost:5000/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">{`http://localhost:5000/${url.shortUrl}`}</a></td>
                                <td>{url.clicks}</td>
                                <td>{new Date(url.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => navigate('/create')} className="btn-primary">Create Short URL</button>
                <button onClick={() => navigate('/dashboard')} className="btn-primary">Dashboard</button>
            </div>
        </div>
    );
};

export default UrlList;
