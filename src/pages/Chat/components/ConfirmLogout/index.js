import { faCheck, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './ConfirmLogout.module.scss';
const cx = classNames.bind(styles);

function ConfirmLogout({ hook }) {
    const { handleConfirmLogout } = hook;

    const handleCancelLogout = () => {
        const element = document.querySelector(`.${cx('wrapper-logout')}`);
        element.classList.remove(`${cx('show')}`);
        element.classList.add(`${cx('hide')}`);
    };

    return (
        <>
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

export default ConfirmLogout;
