import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Stock.module.scss';

const cx = classNames.bind(styles);

let dataSendStocks = [];
localStorage.setItem('dataSendStocks', JSON.stringify(dataSendStocks));

console.log('Stock - re-render - out');
function Stock({ stocks }) {
    const handleOnlick = (e, index) => {
        e.target.classList.toggle(cx('check'));
        if (dataSendStocks.includes(index + 1)) {
            dataSendStocks = dataSendStocks.filter((item) => item !== index + 1);
        } else {
            dataSendStocks.push(index + 1);
        }
        dataSendStocks.sort((a, b) => a - b);
        localStorage.setItem('dataSendStocks', JSON.stringify(dataSendStocks));
    };
    console.log('Stock - re-render - in');
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Stocks</h3>
            <div className={cx('list')}>
                {stocks.map((item, index) => {
                    return (
                        <Tippy key={index} placement="left" content={item.alias}>
                            <div onClick={(e) => handleOnlick(e, index)} className={cx('item')}>
                                {item.name}
                            </div>
                        </Tippy>
                    );
                })}
            </div>
        </div>
    );
}

export default Stock;
