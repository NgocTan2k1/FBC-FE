import { useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Chat.module.scss';

const cx = classNames.bind(styles);

function Chat() {
    const navigate = useNavigate();
    const [value, setValue] = useState('');

    const handleLogout = () => {
        if (localStorage.getItem('userInfo')) {
            console.log(JSON.parse(localStorage.getItem('userInfo')).access);
            localStorage.removeItem('userInfo');
            navigate('/');
        } else {
            navigate('/');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container_content')}>{}</div>

            <div className={cx('container_input')}>
                <Form className={cx('form')}>
                    <Form.Item className={cx('form-item')}>
                        <Input.TextArea
                            autoSize={{ minRows: 1, maxRows: 10, minHeight: 42, maxHeight: 420 }}
                            className={cx('form-item--data')}
                            type="text"
                            placeholder="Enter the question!"
                        />
                    </Form.Item>
                    <button className={cx('btn-send-question')}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </Form>
                <button className={cx('btn-logout')} onClick={handleLogout}>
                    <p className={cx('title-logout')}>Log Out</p>
                    <FontAwesomeIcon className={cx('icon-logout')} icon={faSignOut} />
                </button>
            </div>
        </div>
    );
}

export default Chat;
