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
        <div className="UI-UX-signup">
            <div className="UI-UX-signup__header">
                <h1 class="title">Sign Up</h1>
                <img src={logo} className="UI-UX-signup__logo"></img>
            </div>
            <div className="UI-UX-signup__contain">
                <h1 class="title-signup">Sign up to start with financebankchat</h1>
                <Form onChange={handleSetValueUpdate} className="UI-UX-signup__contain--form">
                    <Form.Item class="form--item">
                        <label for="email" className="label">
                            Email
                        </label>
                        <Input
                            id="email"
                            className="UI-UX-signup__form--input"
                            type="text"
                            autoComplete="off"
                            placeholder="Enter Email"
                        />
                        <div className="UI-UX-signup--error show-signup"> Your email is incorrect!</div>
                    </Form.Item>

                    <Form.Item class="form--item">
                        <label for="username" className="label">
                            Email
                        </label>
                        <Input
                            id="username"
                            className="UI-UX-signup__form--input"
                            type="text"
                            autoComplete="off"
                            placeholder="Enter Username"
                        />
                        <div className="UI-UX-signup--error"> Your username is incorrect!</div>
                    </Form.Item>

                    <Form.Item class="form--item">
                        <label for="password" className="label">
                            Email
                        </label>
                        <Input
                            id="password"
                            className="UI-UX-signup__form--input"
                            type="text"
                            autoComplete="off"
                            placeholder="Enter your password"
                        />
                        <div className="UI-UX-signup--error"> Your password is incorrect!</div>
                    </Form.Item>

                    <Form.Item class="form--item">
                        <label for="confirmpassword" className="label">
                            Email
                        </label>
                        <Input
                            id="confirmpassword"
                            className="UI-UX-signup__form--input"
                            type="text"
                            autoComplete="off"
                            placeholder="Enter your password again"
                        />
                        <div className="UI-UX-signup--error"> Your confirm password is incorrect!</div>
                    </Form.Item>

                    <button onClick={handleSubmit} className="UI-UX__btn-signup">
                        Sign Up
                    </button>

                    <span className="UI-UX-signup--link-signin">
                        Already have an Account?
                        <Link to="/" className="link-to-signin">
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
