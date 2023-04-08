import { useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faPaperPlane, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { useState } from 'react';
// import NodeRSA from 'node-rsa';
// const NodeRSA = require('node-rsa');

import styles from './Chat.module.scss';

const cx = classNames.bind(styles);

function Chat() {
    // const pub =
    //     '-----BEGIN PUBLIC KEY-----\nMIGhMA0GCSqGSIb3DQEBAQUAA4GPADCBiwKBgwMO0CYkaj6AE3y5f3tP4QIep76a\n35ZXcJosvQj8yjs94UZmg8/6R8tyCfBcYm6B3jfDyXMB1hKlW6IP8JtG52Hr7bQg\n4tGR4JvBIeScW9i01x3HF/URlwJibD1eYs8RXVzo4jeHrUfiXaDKxEbmRobGZ5JD\nUHGdKtfOSmx9amGZBjwdAgMBAAE=\n-----END PUBLIC KEY-----';
    // const key = new NodeRSA();
    // key.importKey(pub, 'pkcs8-public');
    // const data = 'Hello, world!';
    // const encryptedData = key.encrypt(data, 'base64');

    // console.log('pub:', pub);
    // console.log('key:', key);
    // console.log('data:', data);
    // console.log('encryptedData:', encryptedData);

    const navigate = useNavigate();
    const [value, setValue] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container_content')}>{}</div>

            <div className={cx('container_input')}>
                <button className={cx('repeat-answer')}>
                    <FontAwesomeIcon className={cx('icon-repeat-answer')} icon={faArrowRotateRight} />
                    Regenerate response
                </button>
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
