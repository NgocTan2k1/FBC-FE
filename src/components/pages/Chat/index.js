import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSignOut,
    faPaperPlane,
    faArrowRotateRight,
    faTriangleExclamation,
    faCheck,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import NewChat from '~/components/pages/Chat/components/NewChat';
import styles from './Chat.module.scss';
import { SendQuestion } from '~/services/chat';
import FormChat from './components/FormChat';

const NodeRSA = require('node-rsa');
const cx = classNames.bind(styles);

function Chat() {
    const [value, setValue] = useState('');
    const [checkQuestion, setCheckQuestion] = useState(false);

    const inputRef = useRef();
    const navigate = useNavigate();

    const handleLogout = () => {
        'your-element-class';
        const element = document.querySelector(`.${cx('wrapper-logout')}`);
        element.classList.remove(`${cx('hide')}`);
        element.classList.add(`${cx('show')}`);
    };

    const handleKeyDown = (event) => {
        if (event.shiftKey && event.keyCode === 13) {
        } else if (event.keyCode === 13) {
            handleSendQuestion();
            event.preventDefault();
        }
    };

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(value);
    };

    async function handleSendQuestion() {
        if (value.trim()) {
            const publicKey = new NodeRSA();
            const pub = JSON.parse(localStorage.getItem('key')).public;
            publicKey.importKey(pub, 'pkcs8-public');
            const encrypt = publicKey.encrypt(value, 'base64');

            const dataSend = {
                message: encrypt,
            };

            localStorage.setItem('oldQuestion', JSON.stringify(dataSend));

            SendQuestion(dataSend)
                .then((respone) => {
                    console.log(respone.data.data);
                    console.log(value);
                    setValue('');
                    setCheckQuestion(true);
                    inputRef.current.focus();
                })
                .catch((error) => {
                    if (error) {
                        console.log(error);
                    }
                });
        } else {
            alert('No data');
            inputRef.current.focus();
        }
    }

    const handleSendQuestionAgain = () => {
        const oldDataSend = JSON.parse(localStorage.getItem('oldQuestion'));
        SendQuestion(oldDataSend)
            .then((respone) => {
                console.log(respone.data.data);
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
    };

    const handleConfirmLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('key');
        navigate('/');
    };
    const handleCancelLogout = () => {
        const element = document.querySelector(`.${cx('wrapper-logout')}`);
        element.classList.remove(`${cx('show')}`);
        element.classList.add(`${cx('hide')}`);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container_content')}>{checkQuestion ? <FormChat /> : <NewChat />}</div>

                <div className={cx('container_input')}>
                    <button onClick={handleSendQuestionAgain} className={cx('repeat-answer')}>
                        <FontAwesomeIcon className={cx('icon-repeat-answer')} icon={faArrowRotateRight} />
                        Regenerate response
                    </button>
                    <div className={cx('form')}>
                        <div className={cx('form-item')}>
                            <Input.TextArea
                                autoSize={{ minRows: 1, maxRows: 10, minHeight: 42, maxHeight: 420 }}
                                className={cx('form-item--data')}
                                type="text"
                                placeholder="Enter the question!"
                                ref={inputRef}
                                value={value}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <button onClick={handleSendQuestion} className={cx('btn-send-question')}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
                    <button className={cx('btn-logout')} onClick={handleLogout}>
                        <p className={cx('button-logout-title')}>Log Out</p>
                        <FontAwesomeIcon className={cx('icon-logout')} icon={faSignOut} />
                    </button>
                </div>
            </div>
            <div className={cx('wrapper-logout', 'hide')}>
                <div className={cx('container-logout')}>
                    <div className={cx('title-logout')}>
                        <FontAwesomeIcon className={cx('icon-logout-warning')} icon={faTriangleExclamation} />
                        <h2>The content of this conversation will be deleted when you exit!</h2>
                    </div>
                    <div className={cx('select-logout')}>
                        <div className={cx('question-logout')}>Do you want to exit?</div>
                        <div className={cx('option-logout')}>
                            <button className={cx('select-btn')} onClick={handleConfirmLogout}>
                                Confirm
                                <FontAwesomeIcon className={cx('icon-confirm', 'icon-select')} icon={faCheck} />
                            </button>

                            <button className={cx('select-btn')} onClick={handleCancelLogout}>
                                Cancel
                                <FontAwesomeIcon className={cx('icon-cancel', 'icon-select')} icon={faXmark} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat;
