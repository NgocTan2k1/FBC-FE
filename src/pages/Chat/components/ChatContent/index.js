import { faArrowRotateRight, faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';

import Answer from '~/pages/Chat/components/Answer';
import FormChat from '~/pages/Chat/components/FormChat';
import NewChat from '~/pages/Chat/components/NewChat';
import Question from '~/pages/Chat/components/Question';
import styles from './ChatContent.module.scss';

const NodeRSA = require('node-rsa');
const cx = classNames.bind(styles);

console.log('Chat - re-render - out');
function ChatContent({ hook }) {
    // console.log('stocks: ', stocks);
    const [shouldRepeat, setShouldRepeat] = useState(false);
    const { message, setMessage, dataQA, handleKeyDown, handleSendQuestion, loading, inputRef, handleConfirmLogout } =
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
                    <button className={cx('btn-logout')}>
                        <p className={cx('button-logout-title')}>Instruct</p>
                    </button>
                </div>
            </div>

            {/* <div className={cx('wrapper-logout', 'hide')}>
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
            </div> */}
        </>
    );
}

export default ChatContent;
