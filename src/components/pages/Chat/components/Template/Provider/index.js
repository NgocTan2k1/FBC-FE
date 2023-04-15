import classNames from 'classnames/bind';

import styles from './Provider.module.scss';

const cx = classNames.bind(styles);

localStorage.setItem('dataSendProviders', JSON.stringify([]));
let dataSendProviders = JSON.parse(localStorage.getItem('dataSendProviders')) || [];

function Provider({ data }) {
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

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Providers</h3>
            <div className={cx('list')}>
                {data.map((item, index) => {
                    return (
                        <div onClick={(e) => handleOnlick(e, index)} className={cx(`item`)} key={index}>
                            {item.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Provider;
