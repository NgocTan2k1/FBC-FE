import classNames from 'classnames/bind';

import styles from './FormChat.module.scss';

const cx = classNames.bind(styles);

console.log('FormChat - re-render - out');
function FormChat({ children }) {
    console.log('FormChat - re-render - in');
    return <div className={cx('wrapper')}>{children}</div>;
}

export default FormChat;
