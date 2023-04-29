/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames/bind';

import logo from '~/img/logo.png';
import styles from './Answer.module.scss';

const cx = classNames.bind(styles);
console.log('Answer - re-render - out');
function Answer({ data }) {
    console.log('Answer - re-render - in');
    return (
        <>
            {data && (
                <div className={cx('wrapper')}>
                    <div className={cx('icon-user')}>
                        <img className={cx('icon')} src={logo} />
                    </div>
                    <div
                        className={cx('question')}
                    >{`respone-question: ${data.question} và respone-question_noise: ${data.question_noise}`}</div>
                </div>
            )}
        </>
    );
}

export default Answer;
