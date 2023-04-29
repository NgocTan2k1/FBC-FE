import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import logo from '~/img/logo.png';
import { SignInApi } from '~/services/auth';
import { GetPublicKey } from '~/services/chat';
import styles from './SignIn.module.scss';

const cx = classNames.bind(styles);

console.log('SignIn - re-render - out');
function SignIn() {
    const [form] = Form.useForm();
    const [valueUpdate, setValueUpdate] = useState({});
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit() {
        setLoading(true);

        if (valueUpdate.password && valueUpdate.username) {
            const data = {
                password: valueUpdate.password,
                username: valueUpdate.username,
            };
            await SignInApi(data)
                .then(async (respone) => {
                    localStorage.setItem(
                        'userInfo',
                        JSON.stringify({
                            access: respone.data.access,
                            refresh: respone.data.refresh,
                        }),
                    );
                    setError(false);

                    const getData = async () => {
                        const key = await GetPublicKey();
                        console.log(key);
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
                        setError(true);
                        console.log(error);
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

    console.log('SignIn - re-render - in');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Sign in</h1>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src={logo} className={cx('logo')}></img>
            </div>
            <div className={cx('container')}>
                <Form form={form} onValuesChange={handleSetValueUpdate} className={cx('container_form')}>
                    <Form.Item name="username" className={cx('container_form_item')}>
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Enter Email or username"
                            className={cx('container_form_item--input')}
                        />
                    </Form.Item>

                    <Form.Item name="password" className={cx('container_form_item')}>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="off"
                            placeholder="Password"
                            className={cx('container_form_item--input')}
                        />
                    </Form.Item>
                    <div className={cx('icon')} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                            <FontAwesomeIcon icon={faEye} className={cx('icon_showpassword')} />
                        ) : (
                            <FontAwesomeIcon icon={faEyeSlash} className={cx('icon_hidepassword')} />
                        )}
                    </div>

                    {error ? <div className={cx('error-signin')}> your username or password is incorrect </div> : ''}

                    <button onClick={handleSubmit} className={cx('signin-btn')}>
                        {loading && <FontAwesomeIcon className={cx('icon-loading-answer')} icon={faSpinner} />}
                        {!loading && `Login`}
                    </button>

                    <Link to="/signup" className={cx('signup-link')}>
                        you don't have account?
                    </Link>
                </Form>
            </div>
        </div>
    );
}

export default SignIn;
