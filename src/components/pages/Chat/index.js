import { useNavigate } from 'react-router-dom';

import styles from './Chat.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Chat() {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (localStorage.getItem('userInfo')) {
            console.log(JSON.parse(localStorage.getItem('userInfo')).access);
            localStorage.removeItem('userInfo');
            navigate('/');
        } else {
            navigate('/');
        }
    };

    return (
        <div className={cx('wrapper')}>
            UX UI Chat
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
}

export default Chat;
