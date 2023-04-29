import { faArrowRotateRight, faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';


import { Answer, FormChat, NewChat, Question } from '..';
import styles from './ChatContent.module.scss';

const NodeRSA = require('node-rsa');
const cx = classNames.bind(styles);

console.log('Chat - re-render - out');
function ChatContent({ hook }) {
    // console.log('stocks: ', stocks);
    const [shouldRepeat, setShouldRepeat] = useState(false);
    const { message, setMessage, dataQA, handleKeyDown, handleSendQuestion, loading, inputRef, setHideGuide } =
        hook;
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container_content')}>
                    {JSON?.parse(localStorage.getItem('datachat')) ? (
                        dataQA.map((data, index) => {
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
                </div>
                {shouldRepeat && (
                    <div className={cx('repeat-content')}>
                        <button className={cx('repeat-answer')}>
                            {!loading && (
                                <FontAwesomeIcon className={cx('icon-repeat-answer')} icon={faArrowRotateRight} />
                            )}
                            {loading && <FontAwesomeIcon className={cx('icon-loading-answer')} icon={faSpinner} />}
                            {!loading && 'Regenerate response'}
                            {loading && 'Stop'}
                        </button>
                    </div>
                )}
                <div className={cx('container_input')}>
                    <div className={cx('form')}>
                        <div className={cx('form-item')}>
                            <Input.TextArea
                                autoSize={{ minRows: 1, maxRows: 3, minHeight: 42 }}
                                className={cx('form-item--data')}
                                type="text"
                                placeholder="Enter the question!"
                                ref={inputRef}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button onClick={handleSendQuestion} className={cx('btn-send-question')}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={() => setHideGuide(true)}
                        className={cx('btn-logout')}>
                        <p className={cx('button-logout-title')}>Instruct</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChatContent;
