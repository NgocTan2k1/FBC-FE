/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames/bind';

import logo from '~/img/logo.png';
import styles from './NewChat.module.scss';

const cx = classNames.bind(styles);
console.log('NewChat - re-render - out');
function NewChat() {
    console.log('NewChat - re-render - in');
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>WELCOME TO FBC - FinanceBankChat</h1>
            <img className={cx('img-logo')} src={logo} />
        </div>
    );
}

export default NewChat;
