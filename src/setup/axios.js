import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

export default axiosClient;
