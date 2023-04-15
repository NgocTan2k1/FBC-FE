import classNames from 'classnames/bind';

import styles from './Template.module.scss';
import Provider from './Provider';
import Stock from './Stock';
import Year from './Year';

const cx = classNames.bind(styles);
console.log('Template - re-render - out');
function Template({ providers, stocks }) {
    console.log('Template - re-render - in');
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>=== Templates ===</h3>
            <div className={cx('container')}>
                <Provider providers={providers} />
                <Stock stocks={stocks} />
                <Year />
            </div>
        </div>
    );
}

export default Template;
