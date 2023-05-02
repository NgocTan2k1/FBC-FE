/* eslint-disable jsx-a11y/alt-text */
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import logo from '~/img/logo-Sign-Up.png';
import { SignUpApi } from '~/services/auth';
import styles from './SignUp.module.scss';

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
    const [textEmail, setTextEmail] = useState('');
    const [textUsername, setTextUsername] = useState('');
    const [textPassword, setTextPassword] = useState('');
    const [textConfirmPassword, setTextConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');

    const codeCheckEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    async function handleSubmit() {
        setLoading(true);

        //check email
        if (!valueUpdate.email) {
            setErrorEmail((prev) => true);
            setTextEmail('Không được để trống địa chỉ email!');
            setContent('Đăng ký không thành công, vui lòng nhập lại');
        } else {
            if (!codeCheckEmail.test(valueUpdate.email)) {
                setErrorEmail((prev) => true);
                setTextEmail('Đây không phải địa chỉ email');
                setContent('Đăng ký không thành công, vui lòng nhập lại');
            } else {
                setErrorEmail((prev) => false);
            }
        }

        //check username
        if (!valueUpdate.username) {
            setErrorUsername((prev) => true);
            setTextUsername('Tên đăng nhập không được để trống');
            setContent('Đăng ký không thành công, vui lòng nhập lại');
        } else {
            setErrorUsername((prev) => false);
        }

        //check password
        if (!valueUpdate.password1) {
            setErrorPassword((prev) => true);
            setTextPassword('Mật khẩu không được để trống');
            setContent('Đăng ký không thành công, vui lòng nhập lại');
        } else {
            setErrorPassword((prev) => false);
        }

        //check confirmpassword
        if (!valueUpdate.password2) {
            setErrorConfirmPassword((prev) => true);
            setTextConfirmPassword('Ô nhập lại mật không được để trống');
            setContent('Đăng ký không thành công, vui lòng nhập lại');
        } else {
            if (valueUpdate.password1 !== valueUpdate.password2) {
                setErrorConfirmPassword((prev) => true);
                setTextConfirmPassword('Hai mật khẩu không trùng nhau');
                setContent('Đăng ký không thành công, vui lòng nhập lại');
            } else {
                setErrorConfirmPassword((prev) => false);
            }
        }

        //call api sign up
        if (!errorEmail && !errorUsername && !errorPassword && !errorConfirmPassword) {
            const data = {
                password1: valueUpdate.password1,
                password2: valueUpdate.password2,
                username: valueUpdate.username,
                email: valueUpdate.email,
            };

            console.log(data);

            //call
            await SignUpApi(data)
                .then(async (response) => {
                    setContent('Đã đăng ký thành công...');
                    setOpen(true);
                    console.log('respone:', response);
                    setErrorEmail((prev) => false);
                    setErrorUsername((prev) => false);
                    setErrorPassword((prev) => false);
                    setErrorConfirmPassword((prev) => false);
                    await setLoading(false);
                    navigate('/');
                })
                .catch((error) => {
                    setContent(error.response.data.messages);
                    setOpen(true);
                    //check email
                    if (!valueUpdate.email) {
                        setErrorEmail((prev) => true);
                        setTextEmail('Không được để trống địa chỉ email!');
                        setContent('Đăng ký không thành công, vui lòng nhập lại');
                    } else {
                        if (!codeCheckEmail.test(valueUpdate.email)) {
                            setErrorEmail((prev) => true);
                            setTextEmail('Đây không phải địa chỉ email');
                            setContent('Đăng ký không thành công, vui lòng nhập lại');
                        } else {
                            setErrorEmail((prev) => false);
                        }
                    }

                    //check username
                    if (!valueUpdate.username) {
                        setErrorUsername((prev) => true);
                        setTextUsername('Tên đăng nhập không được để trống');
                        setContent('Đăng ký không thành công, vui lòng nhập lại');
                    } else {
                        setErrorUsername((prev) => false);
                    }

                    //check password
                    if (!valueUpdate.password1) {
                        setErrorPassword((prev) => true);
                        setTextPassword('Mật khẩu không được để trống');
                        setContent('Đăng ký không thành công, vui lòng nhập lại');
                    } else {
                        setErrorPassword((prev) => false);
                    }

                    //check confirmpassword
                    if (!valueUpdate.password2) {
                        setErrorConfirmPassword((prev) => true);
                        setTextConfirmPassword('Ô nhập lại mật không được để trống');
                        setContent('Đăng ký không thành công, vui lòng nhập lại');
                    } else {
                        if (valueUpdate.password1 !== valueUpdate.password2) {
                            setErrorConfirmPassword((prev) => true);
                            setTextConfirmPassword('Hai mật khẩu không trùng nhau');
                            setContent('Đăng ký không thành công, vui lòng nhập lại');
                        } else {
                            setErrorConfirmPassword((prev) => false);
                        }
                    }
                });
        }
        setLoading(false);
    }

    function handleSetValueUpdate(value) {
        if (value) {
            setValueUpdate({ ...valueUpdate, ...value });
        }
    }

    console.log('SignUp - re-render - in');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className="title">Đăng ký</h1>
                <img src={logo} className={cx('logo')}></img>
            </div>
            <Modal
                title="Thông báo:"
                open={open}
                onOk={async () => {
                    await setOpen(false);
                    setErrorEmail((prev) => false);
                    setErrorUsername((prev) => false);
                    setErrorPassword((prev) => false);
                    setErrorConfirmPassword((prev) => false);
                }}
                onCancel={async () => {
                    await setOpen(false);
                    setErrorEmail((prev) => false);
                    setErrorUsername((prev) => false);
                    setErrorPassword((prev) => false);
                    setErrorConfirmPassword((prev) => false);
                }}
                okText="Xác Nhận"
                cancelText="Cancel"
            >
                <p>{content}</p>
            </Modal>

            <div className={cx('container')}>
                <h1 className={cx('container_title')}>Đăng ký để bắt đầu sử dụng FinanceBankChat</h1>
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
                                placeholder="Nhập email"
                            />
                        </Form.Item>
                        {errorEmail ? <div className={cx('container_form-item--error')}>{textEmail}</div> : ''}
                    </div>

                    <div className={cx('container_form-item')}>
                        <label htmlFor="username" className={cx('container_form-item--label')}>
                            Tên Đăng nhập
                        </label>
                        <Form.Item name="username" className={cx('container_form-item_item')}>
                            <Input
                                id="username"
                                className={cx('container_form-item_item--input')}
                                type="text"
                                autoComplete="off"
                                placeholder="Nhập tên đăng nhập"
                            />
                        </Form.Item>
                        {errorUsername ? <div className={cx('container_form-item--error')}>{textUsername}</div> : ''}
                    </div>
                    <div className={cx('container_form-item')}>
                        <label htmlFor="password" className={cx('container_form-item--label')}>
                            Mật khẩu
                        </label>
                        <Form.Item name="password1" className={cx('container_form-item_item')}>
                            <Input
                                id="password"
                                className={cx('container_form-item_item--input')}
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="off"
                                placeholder="Nhập mật khẩu"
                            />
                        </Form.Item>
                        <div className={cx('icon')} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <FontAwesomeIcon icon={faEye} className={cx('icon_showpassword')} />
                            ) : (
                                <FontAwesomeIcon icon={faEyeSlash} className={cx('icon_hidepassword')} />
                            )}
                        </div>
                        {errorPassword ? <div className={cx('container_form-item--error')}>{textPassword}</div> : ''}
                    </div>
                    <div className={cx('container_form-item')}>
                        <label htmlFor="confirmpassword" className={cx('container_form-item--label')}>
                            Nhập lại mật khẩu
                        </label>
                        <Form.Item name="password2" className={cx('container_form-item_item')}>
                            <Input
                                id="confirmpassword"
                                className={cx('container_form-item_item--input')}
                                type={showConfirmPassword ? 'text' : 'password'}
                                autoComplete="off"
                                placeholder="Nhập lại mật khẩu"
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
                            <div className={cx('container_form-item--error')}>{textConfirmPassword}</div>
                        ) : (
                            ''
                        )}
                    </div>
                    <button onClick={handleSubmit} className={cx('signup-btn')}>
                        {loading && <FontAwesomeIcon className={cx('icon-loading-signup')} icon={faSpinner} />}
                        {!loading && `Đăng ký ngay`}
                    </button>

                    <span className={cx('signin-link')}>
                        Nếu bạn đã có tài khoản?{' '}
                        <Link to="/" className={cx('link-to-signin')}>
                            Đăng nhập
                        </Link>{' '}
                        ngay!
                    </span>
                </Form>
            </div>
        </div>
    );
}

export default SignUp;