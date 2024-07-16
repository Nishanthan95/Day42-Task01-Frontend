import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const [urlCounts, setUrlCounts] = useState({ daily: 0, monthly: 0 });
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUrlCounts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/urls/counts', {
                    headers: { 'x-auth-token': token }
                });
                setUrlCounts(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUrlCounts();
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Welcome, {user.firstName} {user.lastName}</h2>
            <div className="dashboard-stats">
                <div className="stat-box">
                    <h3>URLs Created Today</h3>
                    <p>{urlCounts.daily}</p>
                </div>
                <div className="stat-box">
                    <h3>URLs Created This Month</h3>
                    <p>{urlCounts.monthly}</p>
                </div>
            </div>
            <button onClick={() => navigate('/create')} className="btn-primary">Create Short URL</button>
            <button onClick={() => navigate('/urls')} className="btn-primary">View URL List</button>
        </div>
    );
};

export default Dashboard;
