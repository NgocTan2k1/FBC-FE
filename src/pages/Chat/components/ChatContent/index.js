import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'antd';
import classNames from 'classnames/bind';

import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Answer, FormChat, NewChat, Question } from '..';
import styles from './ChatContent.module.scss';

const cx = classNames.bind(styles);

console.log('Chat - re-render - out');
function ChatContent({ hook }) {
    // console.log('stocks: ', stocks);
    // const [loading, setLoading] = useState(false);
    const { message, setMessage, dataQA, handleKeyDown, handleSendQuestion, loading, inputRef, setHideGuide } = hook;
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
                            <div className={cx('send-question')}>
                                {!loading ? (
                                    <button onClick={handleSendQuestion} className={cx('btn-send-question')}>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                    </button>
                                ) : (
                                    <FontAwesomeIcon className={cx('icon-loading-answer')} icon={faSpinner} />
                                )}
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setHideGuide(true)} className={cx('btn-logout')}>
                        <p className={cx('button-logout-title')}>Instruct</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChatContent;
