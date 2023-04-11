import classNames from 'classnames/bind';

import styles from './FormChat.module.scss';

const cx = classNames.bind(styles);
function FormChat() {
    return <div className={cx('wrapper')}>Form Chat</div>;
}

export default FormChat;
