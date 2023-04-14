/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames/bind';

import styles from './Answer.module.scss';
import logo from '~/img/logo.png';

const cx = classNames.bind(styles);

function Answer({ data }) {
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
