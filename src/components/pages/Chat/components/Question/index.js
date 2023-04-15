/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames/bind';

import styles from './Question.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
console.log('Question - re-render - out');
function Question({ data }) {
    console.log('Question - re-render - in');
    return (
        <>
            {data && (
                <div className={cx('wrapper')}>
                    <div className={cx('question')}>{`question: ${data}`}</div>
                    <div className={cx('icon-user')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faUserSecret} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Question;
