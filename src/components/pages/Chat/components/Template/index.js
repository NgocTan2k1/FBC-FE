import classNames from 'classnames/bind';

import styles from './Template.module.scss';
import Provider from './Provider';
import Stock from './Stock';

const cx = classNames.bind(styles);

function Template({ providers, stocks }) {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Templates</h3>
            <div className={cx('container')}>
                <Provider data={providers} />
                <Stock data={stocks} />
            </div>
        </div>
    );
}

export default Template;
