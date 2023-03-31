import { Button, Form, Input, Radio } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import logo from '~/img/logo-Sign-Up.png';
import styles from './SignUp.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SignUp() {
    const [form] = Form.useForm();
    const [valueUpdate, setValueUpdate] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(false);

    function handleSubmit() {
        if (valueUpdate.password && valueUpdate.username) {
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
        }
    }

    function handleSetValueUpdate(value) {
        console.log('data1', value);
        if (value) {
            setValueUpdate({ ...valueUpdate, ...value });
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className="title">Sign Up</h1>
                <img src={logo} className={cx('logo')}></img>
            </div>
            <div className={cx('container')}>
                <h1 className={cx('container_title')}>Sign up to start with financebankchat</h1>
                <Form onChange={handleSetValueUpdate} className={cx('container_form')}>
                    <Form.Item className={cx('container_form_item')}>
                        <label htmlFor="email" className={cx('container_form_item--label')}>
                            Email
                        </label>
                        <Input
                            id="email"
                            className={cx('container_form_item--input')}
                            type="text"
                            autoComplete="off"
                            placeholder="Enter Email"
                        />

                        <div className={cx('container_form_item--error')}> Your email is incorrect!</div>
                    </Form.Item>

                    <Form.Item className={cx('container_form_item')}>
                        <label htmlFor="username" className={cx('container_form_item--label')}>
                            Username
                        </label>
                        <Input
                            id="username"
                            className={cx('container_form_item--input')}
                            type="text"
                            autoComplete="off"
                            placeholder="Enter Username"
                        />
                        <div className={cx('container_form_item--error')}> Your username is incorrect!</div>
                    </Form.Item>

                    <Form.Item className={cx('container_form_item')}>
                        <label htmlFor="password" className={cx('container_form_item--label')}>
                            Password
                        </label>
                        <Input
                            id="password"
                            className={cx('container_form_item--input')}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="off"
                            placeholder="Enter your password"
                        />
                        <div className={cx('icon')} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <FontAwesomeIcon icon={faEye} className={cx('icon_showpassword')} />
                            ) : (
                                <FontAwesomeIcon icon={faEyeSlash} className={cx('icon_hidepassword')} />
                            )}
                        </div>
                        <div className={cx('container_form_item--error')}> Your password is incorrect!</div>
                    </Form.Item>

                    <Form.Item className={cx('container_form_item')}>
                        <label htmlFor="confirmpassword" className={cx('container_form_item--label')}>
                            Confirm Password
                        </label>
                        <Input
                            id="confirmpassword"
                            className={cx('container_form_item--input')}
                            type={showConfirmPassword ? 'text' : 'password'}
                            autoComplete="off"
                            placeholder="Enter your password again"
                        />
                        <div className={cx('icon')} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? (
                                <FontAwesomeIcon icon={faEye} className={cx('icon_showpassword')} />
                            ) : (
                                <FontAwesomeIcon icon={faEyeSlash} className={cx('icon_hidepassword')} />
                            )}
                        </div>
                        <div className={cx('container_form_item--error')}> Your confirm password is incorrect!</div>
                    </Form.Item>

                    <button onClick={handleSubmit} className={cx('signup-btn')}>
                        Sign Up
                    </button>

                    <span className={cx('signin-link')}>
                        Already have an Account?
                        <Link to="/" className={cx('link-to-signin')}>
                            {' '}
                            Sign in{' '}
                        </Link>
                        now!
                    </span>
                </Form>
            </div>
        </div>
    );
}

export default SignUp;
