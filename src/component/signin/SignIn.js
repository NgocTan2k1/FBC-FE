import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import './SignIn.css';
import logo from '../../img/logo.png';
import React, { useEffect, useState } from 'react';
import { Input, Form, notification } from 'antd';
import axios from 'axios';
import { useForm } from 'antd/es/form/Form';


function SignIn() {

    const [form] = Form.useForm();

    const [bodyUpdate, setBodyUpdate] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async () => {

        console.log('data1', bodyUpdate.password, bodyUpdate.username);
        if (bodyUpdate.password && bodyUpdate.username) {

            setError(pre => false)
            
            await axios.post('/user', {
                password: bodyUpdate.password,
                username: bodyUpdate.username
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            setError(pre => true);
            bodyUpdate.password = '';
            bodyUpdate.username = '';
        }

    }

    const handleSetBodyUpdate = value => {
        console.log('data1', value);
        if (value) {
            setBodyUpdate({ ...bodyUpdate, ...value });
        }

    };

    // useEffect(() => {
    //     console.log(hidePassword)
    //     if(hidePassword) {
    //         iconHide.style.display = 'block';
    //         iconShow.style.display = 'none';
    //     }
    //     else {
    //         iconHide.style.display = 'none';
    //         iconShow.style.display = 'block';
    //     }


    // }, [hidePassword]);


    return (
        <div className="UI-UX-signin">
            <div className="UI-UX-signin__header">
                <h1 className="UI-UX-signin__title-signin">Sign in</h1>
                <img src={logo} className="UI-UX-signin__logo"></img>
            </div>


            <div className="UI-UX-signin__contain">
                <Form onValuesChange={handleSetBodyUpdate} className="UI-UX-signin__contain--form">
                    <div className="UI-UX-signin__form">
                        <Form.Item name='username' className='UI-UX-signin__form'>
                            <Input type="text" autoComplete="off" placeholder='Enter Email or username' className="UI-UX-signin__form--input" />

                        </Form.Item>
                    </div>
                    <div className="UI-UX-signin__form">
                        <Form.Item name='password'>
                            <Input 
                                type={showPassword ? 'text' : 'password'} autoComplete="off" placeholder='Password' className="UI-UX-signin__form--input" />
                        </Form.Item>

                        <div onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FontAwesomeIcon className="UI-UX-signin__form--icon show-password" icon={solid("eye")} /> : <FontAwesomeIcon className="UI-UX-signin__form--icon hide-password" icon={solid("eye-slash")} />}
                        </div>

                    </div>

                    { error == true ? <div className="UI-UX-signin--error"> your username or password is incorrect </div> : ''}

                    

                    <button className="UI-UX__btn" onClick={handleSubmit}>Login</button>
                    <a href='#' className="UI-UX-signup--link">
                        you don't have account?
                    </a>

                </Form>
            </div>

            {/* 
            <div className="UI-UX-signin__contain">
                <form method='POST' className="UI-UX-signin__contain--form">
                    <div className="UI-UX-signin__form">
                        <input type="text" autoComplete="off" placeholder='Enter Email or username' className="UI-UX-signin__form--input" />
                    </div>
                    <div className="UI-UX-signin__form">
                        <input type="password" autoComplete="off" placeholder='Password' className="UI-UX-signin__form--input" />
                        <div onClick={showPassword}>
                            <FontAwesomeIcon className="UI-UX-signin__form--icon hide-password" icon={solid("eye-slash")} />
                            <FontAwesomeIcon className="UI-UX-signin__form--icon show-password" icon={solid("eye")} />
                        </div>

                    </div>

                    <button className="UI-UX__btn">Login</button>
                    <a href='#' className="UI-UX-signup--link">
                        you don't have account?
                    </a>

                </form>
            </div> */}

        </div>
    );
}

export default SignIn;