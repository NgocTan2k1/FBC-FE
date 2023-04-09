import { axiosAuth } from '~/setup/axios';

const SendQuestion = (data) => {
    return axiosAuth.post('/api/v1/messages', data);
};

const GetPublicKey = () => {
    return axiosAuth.post('/api/v1/cryption');
};

export { SendQuestion, GetPublicKey };
