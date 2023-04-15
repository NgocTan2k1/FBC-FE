import classNames from 'classnames/bind';

import styles from './Stock.module.scss';

const cx = classNames.bind(styles);

localStorage.setItem('dataSendStocks', JSON.stringify([]));
let dataSendStocks = JSON.parse(localStorage.getItem('dataSendStocks')) || [];

function Stock({ data }) {
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

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Stocks</h3>
            <div className={cx('list')}>
                {data.map((item, index) => {
                    return (
                        <div onClick={(e) => handleOnlick(e, index)} className={cx('item')} key={index}>
                            {item.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Stock;
