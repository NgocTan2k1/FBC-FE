import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Year.module.scss';

const cx = classNames.bind(styles);
console.log('Year - re-render - out');

function Year() {
    const [valueMin, setValueMin] = useState('');
    const [valueMax, setValueMax] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        // if( )
        // else{
        // }
    }, [valueMin, valueMax]);
    console.log('Year - re-render - in');
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Year</h3>
            <div className={cx('list-year')}>
                <div className={cx('year')}>
                    <label className={cx('label')} htmlFor="min-year">
                        min:{' '}
                    </label>
                    <select id="min-year" className={cx('select')}>
                        <option className={cx('item-year')}>2010</option>
                        <option className={cx('item-year')}>2011</option>
                        <option className={cx('item-year')}>2012</option>
                        <option className={cx('item-year')}>2013</option>
                        <option className={cx('item-year')}>2014</option>
                        <option className={cx('item-year')}>2015</option>
                        <option className={cx('item-year')}>2016</option>
                        <option className={cx('item-year')}>2017</option>
                        <option className={cx('item-year')}>2018</option>
                        <option className={cx('item-year')}>2019</option>
                        <option className={cx('item-year')}>2020</option>
                        <option className={cx('item-year')}>2021</option>
                    </select>
                </div>
                <div className={cx('year')}>
                    <label className={cx('label')} htmlFor="max-year">
                        max:{' '}
                    </label>
                    <select id="max-year" className={cx('select')}>
                        <option className={cx('item-year')}>2011</option>
                        <option className={cx('item-year')}>2012</option>
                        <option className={cx('item-year')}>2013</option>
                        <option className={cx('item-year')}>2014</option>
                        <option className={cx('item-year')}>2015</option>
                        <option className={cx('item-year')}>2016</option>
                        <option className={cx('item-year')}>2017</option>
                        <option className={cx('item-year')}>2018</option>
                        <option className={cx('item-year')}>2019</option>
                        <option className={cx('item-year')}>2020</option>
                        <option className={cx('item-year')}>2021</option>
                        <option className={cx('item-year')}>2022</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Year;
