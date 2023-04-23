import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';

import { Checkbox, Collapse } from 'antd';
import { useEffect, useState } from 'react';
import styles from './Stock.module.scss';

const cx = classNames.bind(styles);


const { Panel } = Collapse;

console.log('Stock - re-render - out');
function Stock({ hook }) {
    const { stocks } = hook;
    const [checkboxStock, setCheckboxStock] = useState([]);
    useEffect(() => {
        const data = stocks.map((item) => {
            return {
                label: item.name,
                value: item.id,
            };
        });
        setCheckboxStock(data);
    }, [stocks]);

    const onChangeHandler = (stocks) => {
        console.log(stocks);
    };
    return (
        <div className={cx('wrapper')}>
            <Collapse>
                <Panel header="Stock" key="2"
                    className={cx('panel')}
                >
                    <div className={cx("list")}>
                        <Checkbox.Group
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                alignContent: 'space-between',
                                padding: '10px'
                            }}
                            onChange={onChangeHandler} >
                            {checkboxStock.map((item) => {
                                return (
                                    <Checkbox
                                        key={item.value}
                                        value={item.value}
                                        style={{
                                            width: '30%',
                                            margin: '0 0 10px 0',
                                            flex: '0 0 30%'
                                        }}
                                    >
                                        {item.label}
                                    </Checkbox>
                                );
                            })}
                        </Checkbox.Group>
                    </div>
                </Panel>
            </Collapse>
        </div>
    );
}

export default Stock;
