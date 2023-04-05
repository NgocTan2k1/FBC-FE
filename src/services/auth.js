import { axiosClient } from '~/setup/axios';

const SignInApi = (data) => {
    return axiosClient.post('/token/', data);
};

const SignUpApi = (data) => {
    return axiosClient.post('/api/v1/authentication/register/', data);
};

export { SignInApi, SignUpApi };
