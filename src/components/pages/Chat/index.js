import { useRef, useState, useEffect } from 'react';
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
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import NewChat from '~/components/pages/Chat/components/NewChat';
import styles from './Chat.module.scss';
import { SendQuestion } from '~/services/chat';
import FormChat from './components/FormChat';
import Answer from './components/Answer';
import Question from './components/Question';
import { GetPublicKey } from '~/services/chat';
import Template from './components/Template';

const NodeRSA = require('node-rsa');
const cx = classNames.bind(styles);
let dataQuestionsAndAnswers = JSON.parse(localStorage.getItem('datachat')) || [];
console.log('Chat - re-render - out');
function Chat() {
    let providers = JSON.parse(localStorage.getItem('providers')) || [];
    // console.log('providers: ', providers);
    let stocks = JSON.parse(localStorage.getItem('stocks')) || [];
    // console.log('stocks: ', stocks);

    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('===');
        // dataQuestionsAndAnswers = JSON.parse(localStorage.getItem('datachat')) || [];
        // console.log(dataQuestionsAndAnswers);
    }, []);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.shiftKey && event.keyCode === 13) {
        } else if (event.keyCode === 13) {
            handleSendQuestion();
            event.preventDefault();
        }
    };

    async function handleSendQuestion() {
        setLoading(true);

        const expireDate = new Date(Date.parse(JSON.parse(localStorage.getItem('key')).expire));
        const currentDate = new Date();
        if (expireDate.getTime() <= currentDate.getTime()) {
            const fetchData = async () => {
                const key = await GetPublicKey();
                console.log('=== đang lấy key ===');
                localStorage.setItem(
                    'key',
                    JSON.stringify({
                        public: key.data.public_key,
                        expire: key.data.expire,
                        private: key.data.private_key,
                    }),
                );
            };

            await fetchData();
        } else {
            console.log('=== còn khoảng: ', (expireDate.getTime() - currentDate.getTime()) / 1000, 's mới gửi lại ===');
        }
        if (value.trim()) {
            const publicKey = new NodeRSA();
            const pub = JSON.parse(localStorage.getItem('key')).public;
            publicKey.importKey(pub, 'pkcs8-public');
            const encrypt = publicKey.encrypt(value, 'base64');

            const providers = localStorage.getItem('dataSendProviders');
            console.log('providers: ', providers);

            const stocks = localStorage.getItem('dataSendStocks');
            console.log('stocks: ', stocks);
            const dataSend = {
                message: encrypt,
                type: null,
                providers: providers,
                stock_id: stocks,
            };
            console.log('dataSend: ', dataSend);

            localStorage.setItem('oldQuestion', JSON.stringify(dataSend));

            await SendQuestion(dataSend)
                .then((respone) => {
                    dataQuestionsAndAnswers.push({
                        question: value,
                        answer: respone.data.data,
                    });
                    // localStorage.removeItem('data');
                    localStorage.setItem('datachat', JSON.stringify(dataQuestionsAndAnswers));
                    console.log('send question: ', dataQuestionsAndAnswers);
                    setValue('');
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
        setLoading(false);
    }

    const handleSendQuestionAgain = async () => {
        setLoading(true);
        const oldDataSend = JSON.parse(localStorage.getItem('oldQuestion'));

        const expireDate = new Date(Date.parse(JSON.parse(localStorage.getItem('key')).expire));
        const currentDate = new Date();

        if (expireDate.getTime() <= currentDate.getTime()) {
            const fetchData = async () => {
                const key = await GetPublicKey();
                console.log('=== đang lấy key ===');
                localStorage.setItem(
                    'key',
                    JSON.stringify({
                        public: key.data.public_key,
                        expire: key.data.expire,
                        private: key.data.private_key,
                    }),
                );
            };

            await fetchData();
        } else {
            console.log('=== còn khoảng: ', (expireDate.getTime() - currentDate.getTime()) / 1000, 's mới gửi lại ===');
        }

        SendQuestion(oldDataSend)
            .then((respone) => {
                dataQuestionsAndAnswers[dataQuestionsAndAnswers.length - 1].answer = respone.data.data;
                // localStorage.removeItem('datachat');
                localStorage.setItem('datachat', JSON.stringify(dataQuestionsAndAnswers));
                console.log(dataQuestionsAndAnswers);

                setValue('');
                inputRef.current.focus();
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                }
            });

        setLoading(false);
    };

    const handleLogout = () => {
        'your-element-class';
        const element = document.querySelector(`.${cx('wrapper-logout')}`);
        element.classList.remove(`${cx('hide')}`);
        element.classList.add(`${cx('show')}`);
    };

    const handleConfirmLogout = () => {
        // localStorage.setItem('datachat', JSON.stringify([]));
        localStorage.removeItem('userInfo');
        localStorage.removeItem('key');
        localStorage.removeItem('oldQuestion');
        localStorage.removeItem('providers');
        localStorage.removeItem('stocks');
        localStorage.removeItem('dataSendProviders');
        localStorage.removeItem('dataSendStocks');
        dataQuestionsAndAnswers = [];
        localStorage.removeItem('datachat');
        navigate('/');
    };
    const handleCancelLogout = () => {
        const element = document.querySelector(`.${cx('wrapper-logout')}`);
        element.classList.remove(`${cx('show')}`);
        element.classList.add(`${cx('hide')}`);
    };

    // console.log(dataQuestionsAndAnswers);
    console.log('Chat - re-render - in');
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container_content')}>
                    {JSON.parse(localStorage.getItem('datachat')) ? (
                        dataQuestionsAndAnswers.map((data, index) => {
                            return (
                                <FormChat key={index}>
                                    <Question data={data.question} />
                                    <Answer data={data.answer} />
                                </FormChat>
                            );
                        })
                    ) : (
                        <NewChat />
                    )}
                    <Template providers={providers} stocks={stocks} />
                </div>

                <div className={cx('container_input')}>
                    <button onClick={handleSendQuestionAgain} className={cx('repeat-answer')}>
                        {!loading && <FontAwesomeIcon className={cx('icon-repeat-answer')} icon={faArrowRotateRight} />}
                        {loading && <FontAwesomeIcon className={cx('icon-loading-answer')} icon={faSpinner} />}
                        {!loading && 'Regenerate response'}
                        {loading && 'Stop'}
                    </button>
                    <div className={cx('form')}>
                        <div className={cx('form-item')}>
                            <Input.TextArea
                                autoSize={{ minRows: 1, maxRows: 3, minHeight: 42 }}
                                className={cx('form-item--data')}
                                type="text"
                                placeholder="Enter the question!"
                                ref={inputRef}
                                value={value}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />

                            <button onClick={handleSendQuestion} className={cx('btn-send-question')}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </div>
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
