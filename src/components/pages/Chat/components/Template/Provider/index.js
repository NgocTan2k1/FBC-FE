import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Provider.module.scss';

const cx = classNames.bind(styles);

let dataSendProviders = [];
localStorage.setItem('dataSendProviders', JSON.stringify(dataSendProviders));

console.log('Provider - re-render out');
function Provider({ providers }) {
    const handleOnlick = (e, index) => {
        e.target.classList.toggle(cx('check'));
        if (dataSendProviders.includes(index + 1)) {
            dataSendProviders = dataSendProviders.filter((item) => item !== index + 1);
        } else {
            dataSendProviders.push(index + 1);
        }
        dataSendProviders.sort((a, b) => a - b);
        localStorage.setItem('dataSendProviders', JSON.stringify(dataSendProviders));
    };

    console.log('Provider - re-render - in');
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>{`Providers`}</h3>
            <div className={cx('list')}>
                {providers.map((item, index) => {
                    return (
                        <Tippy key={index} placement="left" content={`source: ${item.alias}`}>
                            <div onClick={(e) => handleOnlick(e, index)} className={cx(`item`)}>
                                {item.name}
                            </div>
                        </Tippy>
                    );
                })}
            </div>
        </div>
    );
}

export default Provider;
