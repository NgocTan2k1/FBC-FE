import { Button, Form, Input, Radio } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import logo from '~/img/logo.png';
import styles from './SignIn.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SignIn() {
    const [form] = Form.useForm();
    const [valueUpdate, setValueUpdate] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);

    console.log(error);
    function handleSubmit(valueUpdate) {
        if (valueUpdate.password && valueUpdate.username) {
            console.log('data1: ', valueUpdate);
            axios
                .post('/user', {
                    password: valueUpdate.password,
                    username: valueUpdate.username,
                })
                .then((respone) => {
                    console.log(respone);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setError(true);
        }
    }

    function handleSetValueUpdate(value) {
        console.log('data1: ', value);
        if (value) {
            setValueUpdate({ ...valueUpdate, ...value });
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Sign in</h1>
                <img src={logo} className={cx('logo')}></img>
            </div>
            <div className={cx('container')}>
                <Form onChange={handleSetValueUpdate} className={cx('container_form')}>
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
                        Login
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
