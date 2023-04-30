import { Form } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInApi } from '~/services/auth';
import { GetPublicKey } from '~/services/chat';

export const useLogin = ({ ...param }) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');
    const [form] = Form.useForm();
    const [valueUpdate, setValueUpdate] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [tokenCaptcha, setTokenCaptcha] = useState('');
    const navigate = useNavigate();

    async function handleSubmit() {
        setLoading(true);
        if (valueUpdate.password && valueUpdate.username) {
            const data = {
                password: valueUpdate.password,
                username: valueUpdate.username,
                gcaptcha: tokenCaptcha,
            };
            await SignInApi(data)
                .then(async (response) => {
                    console.log('response:', response);
                    localStorage.setItem(
                        'userInfo',
                        JSON.stringify({
                            access: response.data.access,
                            refresh: response.data.refresh,
                        }),
                    );
                    setError(false);
                    const getData = async () => {
                        const key = await GetPublicKey();
                        localStorage.setItem(
                            'key',
                            JSON.stringify({
                                public: key.data.public_key,
                                expire: key.data.expire,
                                private: key.data.private_key,
                            }),
                        );
                    };
                    await getData();
                    setLoading(false);
                    navigate('/chat');
                })
                .catch((error) => {
                    if (error) {
                        console.log('error:', error);
                        setError(true);
                        setContent('Tên đăng nhập hoặc mật khẩu không đúng!');
                        setOpen(true);
                    }
                });
        } else {
            setError(true);
        }
        setLoading(false);
    }

    function handleSetValueUpdate(value) {
        if (value) {
            setValueUpdate({ ...valueUpdate, ...value });
        }
    }
    return {
        form,
        handleSubmit,
        handleSetValueUpdate,
        loading,
        showPassword,
        setShowPassword,
        error,
        setError,
        valueUpdate,
        setValueUpdate,
        tokenCaptcha,
        setTokenCaptcha,
        open,
        setOpen,
        content,
        setContent,
    };
};
