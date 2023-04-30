import { faCheck, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import { useEffect } from 'react';
import styles from './ConfirmLogout.module.scss';
const cx = classNames.bind(styles);

function ConfirmLogout({ hook }) {
    const { handleConfirmLogout, hideLogout, setHideLogout } = hook;

    useEffect(() => {
        const element = document.querySelector(`.${cx('wrapper-logout')}`);
        if (hideLogout) {
            element.classList.remove(`${cx('show')}`);
            element.classList.add(`${cx('hide')}`);
        } else {
            element.classList.remove(`${cx('hide')}`);
            element.classList.add(`${cx('show')}`);
        }
    }, [hideLogout]);

    return (
        <>
            <div className={cx('wrapper-logout', 'hide')}>
                <div className={cx('container-logout')}>
                    <div className={cx('title-logout')}>
                        <FontAwesomeIcon className={cx('icon-logout-warning')} icon={faTriangleExclamation} />
                        <h2>Cuộc hội thoại sẽ bị xóa khi đăng xuất hoặc làm mới lại trang!!!</h2>
                    </div>
                    <div className={cx('select-logout')}>
                        <div className={cx('question-logout')}>Bạn có muốn thoát không?</div>
                        <div className={cx('option-logout')}>
                            <button className={cx('select-btn')} onClick={handleConfirmLogout}>
                                Xác Nhận
                                <FontAwesomeIcon className={cx('icon-confirm', 'icon-select')} icon={faCheck} />
                            </button>
                            <button className={cx('select-btn')} onClick={() => setHideLogout(true)}>
                                Hủy Bỏ
                                <FontAwesomeIcon className={cx('icon-cancel', 'icon-select')} icon={faXmark} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfirmLogout;
