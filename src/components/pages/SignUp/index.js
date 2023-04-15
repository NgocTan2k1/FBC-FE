import { Button, Form, Input, Radio } from 'antd';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import logo from '~/img/logo-Sign-Up.png';
import styles from './SignUp.module.scss';
import classNames from 'classnames/bind';
import { SignUpApi } from '~/services/auth';

const cx = classNames.bind(styles);

console.log('SignUp - re-render - out');
function SignUp() {
    const navigate = useNavigate();
    const [valueUpdate, setValueUpdate] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

    const codeCheckEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    async function handleSubmit() {
        //check email
        if (!codeCheckEmail.test(valueUpdate.email) || !valueUpdate.email) {
            setErrorEmail((prev) => true);
        } else {
            setErrorEmail((prev) => false);
        }

        //check username
        if (!valueUpdate.username) {
            setErrorUsername((prev) => true);
        } else {
            setErrorUsername((prev) => false);
        }

        //check password
        if (!valueUpdate.password1) {
            setErrorPassword((prev) => true);
        } else {
            setErrorPassword((prev) => false);
        }

        //check confirmpassword
        if (valueUpdate.password1 !== valueUpdate.password2 || !valueUpdate.password2) {
            setErrorConfirmPassword((prev) => true);
        } else {
            setErrorConfirmPassword((prev) => false);
        }

        if (!errorEmail && !errorUsername && !errorPassword && !errorConfirmPassword) {
            const data = {
                password1: valueUpdate.password1,
                password2: valueUpdate.password2,
                username: valueUpdate.username,
                email: valueUpdate.email,
            };

            const dataSignIn = {
                password: valueUpdate.password1,
                username: valueUpdate.username,
            };

            await SignUpApi(data)
                .then((respone) => {
                    console.log('đã đăng ký thành công');
                    console.log('respone:', respone);
                    setErrorEmail((prev) => false);
                    setErrorUsername((prev) => false);
                    setErrorPassword((prev) => false);
                    setErrorConfirmPassword((prev) => false);
                    navigate('/');
                })
                .catch((error) => {
                    if (error) {
                        //check email
                        if (!codeCheckEmail.test(valueUpdate.email) || !valueUpdate.email) {
                            setErrorEmail((prev) => true);
                        } else {
                            setErrorEmail((prev) => false);
                        }

                        //check username
                        if (!valueUpdate.username) {
                            setErrorUsername((prev) => true);
                        } else {
                            setErrorUsername((prev) => false);
                        }

                        //check password
                        if (!valueUpdate.password1) {
                            setErrorPassword((prev) => true);
                        } else {
                            setErrorPassword((prev) => false);
                        }

                        //check confirmpassword
                        if (valueUpdate.password1 !== valueUpdate.password2 || !valueUpdate.password2) {
                            setErrorConfirmPassword((prev) => true);
                        } else {
                            setErrorConfirmPassword((prev) => false);
                        }

                        if (!errorEmail && !errorUsername && !errorPassword && !errorConfirmPassword) {
                            alert('Sorry! The server is overloaded at the moment');
                        }
                    }
                });
        } else {
            //check email
            if (!codeCheckEmail.test(valueUpdate.email) || !valueUpdate.email) {
                setErrorEmail((prev) => true);
            } else {
                setErrorEmail((prev) => false);
            }

            //check username
            if (!valueUpdate.username) {
                setErrorUsername((prev) => true);
            } else {
                setErrorUsername((prev) => false);
            }

            //check password
            if (!valueUpdate.password1) {
                setErrorPassword((prev) => true);
            } else {
                setErrorPassword((prev) => false);
            }

            //check confirmpassword
            if (valueUpdate.password1 !== valueUpdate.password2 || !valueUpdate.password2) {
                setErrorConfirmPassword((prev) => true);
            } else {
                setErrorConfirmPassword((prev) => false);
            }
        }
    }

    function handleSetValueUpdate(value) {
        if (value) {
            setValueUpdate({ ...valueUpdate, ...value });
        }
        console.log(valueUpdate);
    }

    console.log('SignUp - re-render - in');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className="title">Sign Up</h1>
                <img src={logo} className={cx('logo')}></img>
            </div>
            <div className={cx('container')}>
                <h1 className={cx('container_title')}>Sign up to start with financebankchat</h1>
                <Form onValuesChange={handleSetValueUpdate} className={cx('container_form')}>
                    <div className={cx('container_form-item')}>
                        <label htmlFor="email" className={cx('container_form-item--label')}>
                            Email
                        </label>
                        <Form.Item name="email" className={cx('container_form-item_item')}>
                            <Input
                                id="email"
                                className={cx('container_form-item_item--input')}
                                type="text"
                                autoComplete="off"
                                placeholder="Enter Email"
                            />
                        </Form.Item>
                        {errorEmail ? (
                            <div className={cx('container_form-item--error')}> Your email is incorrect!</div>
                        ) : (
                            ''
                        )}
                    </div>

                    <div className={cx('container_form-item')}>
                        <label htmlFor="username" className={cx('container_form-item--label')}>
                            Username
                        </label>
                        <Form.Item name="username" className={cx('container_form-item_item')}>
                            <Input
                                id="username"
                                className={cx('container_form-item_item--input')}
                                type="text"
                                autoComplete="off"
                                placeholder="Enter Username"
                            />
                        </Form.Item>
                        {errorUsername ? (
                            <div className={cx('container_form-item--error')}> Your username is incorrect!</div>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className={cx('container_form-item')}>
                        <label htmlFor="password" className={cx('container_form-item--label')}>
                            Password
                        </label>
                        <Form.Item name="password1" className={cx('container_form-item_item')}>
                            <Input
                                id="password"
                                className={cx('container_form-item_item--input')}
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="off"
                                placeholder="Enter your password"
                            />
                        </Form.Item>
                        <div className={cx('icon')} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <FontAwesomeIcon icon={faEye} className={cx('icon_showpassword')} />
                            ) : (
                                <FontAwesomeIcon icon={faEyeSlash} className={cx('icon_hidepassword')} />
                            )}
                        </div>
                        {errorPassword ? (
                            <div className={cx('container_form-item--error')}> Your password is incorrect!</div>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className={cx('container_form-item')}>
                        <label htmlFor="confirmpassword" className={cx('container_form-item--label')}>
                            Confirm Password
                        </label>
                        <Form.Item name="password2" className={cx('container_form-item_item')}>
                            <Input
                                id="confirmpassword"
                                className={cx('container_form-item_item--input')}
                                type={showConfirmPassword ? 'text' : 'password'}
                                autoComplete="off"
                                placeholder="Enter your password again"
                            />
                        </Form.Item>
                        <div className={cx('icon')} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? (
                                <FontAwesomeIcon icon={faEye} className={cx('icon_showpassword')} />
                            ) : (
                                <FontAwesomeIcon icon={faEyeSlash} className={cx('icon_hidepassword')} />
                            )}
                        </div>
                        {errorConfirmPassword ? (
                            <div className={cx('container_form-item--error')}> Your confirm password is incorrect!</div>
                        ) : (
                            ''
                        )}
                    </div>
                    <button onClick={handleSubmit} className={cx('signup-btn')}>
                        Sign Up
                    </button>

                    <span className={cx('signin-link')}>
                        Already have an Account?{' '}
                        <Link to="/" className={cx('link-to-signin')}>
                            Sign in
                        </Link>{' '}
                        now!
                    </span>
                </Form>
            </div>
        </div>
    );
}

export default SignUp;
