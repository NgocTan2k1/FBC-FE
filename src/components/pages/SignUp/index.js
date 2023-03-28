import { Button, Form, Input, Radio } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '~/img/logo-Sign-Up.png';

import './SignUp.css';
import { Link } from 'react-router-dom';

function SignUp() {
    const [form] = Form.useForm();
    const [valueUpdate, setValueUpdate] = useState({});
    const [showPassword, setShowPassword] = useState(true);
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
        <div className="UI-UX-signin">
            <div className="UI-UX-signin__header">
                <h1 className="UI-UX-signin__title-signin">Sign Up</h1>
                <img src={logo} className="UI-UX-signin__logo"></img>
            </div>
            <div className="UI-UX-signin__contain">
                <Form onChange={handleSetValueUpdate} className="UI-UX-signin__contain--form">
                    <Form.Item name="username" className="UI-UX-signin__form">
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Enter Email or username"
                            className="UI-UX-signin__form--input"
                        />
                    </Form.Item>

                    <Form.Item name="password" className="UI-UX-signin__form">
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="off"
                            placeholder="Password"
                            className="UI-UX-signin__form--input"
                        />
                    </Form.Item>

                    <div onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                            <FontAwesomeIcon
                                icon="fa-solid fa-eye"
                                className="UI-UX-signin__form--icon hide-password"
                            />
                        ) : (
                            <FontAwesomeIcon className="UI-UX-signin__form--icon" icon="fa-solid fa-eye-slash" />
                        )}
                    </div>

                    {error == true ? (
                        <div className="UI-UX-signin--error"> your username or password is incorrect </div>
                    ) : (
                        ''
                    )}

                    <button onClick={handleSubmit} className="UI-UX__btn">
                        Login
                    </button>

                    <Link to="/" className="UI-UX-signup--link">
                        you have alreadly account?
                    </Link>
                </Form>
            </div>
        </div>
    );
}

export default SignUp;
