import styles from './Chat.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Chat() {
    return <div className={cx('wrapper')}>UX UI Chat</div>;
}

export default Chat;
