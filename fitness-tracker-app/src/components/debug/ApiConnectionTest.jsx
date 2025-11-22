import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ApiConnectionTest = () => {
  const [status, setStatus] = useState('checking');
  const [error, setError] = useState('');
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    setApiUrl(process.env.REACT_APP_API_BASE_URL || 'Not configured');
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setStatus('checking');
      setError('');
      
      // Try to make a simple request to test connection
      await api.get('/steps/daily/'); // Test with steps endpoint
      setStatus('connected');
    } catch (err) {
      setStatus('failed');
      
      if (err.request && !err.response) {
        setError('Cannot connect to server. Make sure the backend is running.');
      } else if (err.response) {
        setError(`Server responded with status: ${err.response.status}`);
      } else {
        setError(err.message);
      }
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'checking': return '#ffa500';
      case 'connected': return '#4caf50';
      case 'failed': return '#f44336';
      default: return '#666';
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      margin: '20px 0',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>API Connection Status</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>API URL:</strong> {apiUrl}
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Status:</strong> 
        <span style={{ 
          color: getStatusColor(), 
          marginLeft: '10px',
          fontWeight: 'bold'
        }}>
          {status.toUpperCase()}
        </span>
      </div>
      
      {error && (
        <div style={{ 
          color: '#f44336', 
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#ffebee',
          borderRadius: '4px'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <button 
        onClick={testConnection}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Test Connection
      </button>
    </div>
  );
};

export default ApiConnectionTest;