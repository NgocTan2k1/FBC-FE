import { axiosAuth } from '~/setup/axios';

const SendQuestion = (data) => {
    return axiosAuth.post('/api/v1/messages', data);
};

const GetPublicKey = () => {
    return axiosAuth.post('/api/v1/cryption');
};

const GetProviders = () => {
    return axiosAuth.get('/api/v1/configs/provider/');
};

const GetStocks = () => {
    return axiosAuth.get('/api/v1/configs/stock/');
};

export { SendQuestion, GetPublicKey, GetProviders, GetStocks };
