import { useState, useCallback } from 'react';
import axios from 'axios';

const useApiRequest = (token) => {
  const [data, setData] = useState(null);
  const [reqError, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const url = process.env.REACT_APP_API;

  const makeRequest = useCallback(async (endpoint, method = 'GET', payload = null) => {
    setLoading(true);
    setError(null);

    const headers = { 
    //   'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await axios({
        method,
        url: `${url}${endpoint}`,
        data: payload,
        headers,
      });
      console.log('API Call Response:', response.data);
      setData(response.data);
    } catch (err) {
      console.error('API Call Error:', err);
      setError(err.response ? err.response.data.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [url, token]);

  return {
    data,
    reqError,
    loading,
    makeRequest,
  };
};

export default useApiRequest;
