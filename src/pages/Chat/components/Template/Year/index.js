import classNames from 'classnames/bind';
import { useEffect } from 'react';

import { Collapse, Slider } from 'antd';
import styles from './Year.module.scss';

const cx = classNames.bind(styles);
const { Panel } = Collapse;
function Year({ hook }) {
    const { year , setYear } = hook;
    const marks = {
        2010: '2010',
        2021: '2021',
    };

    const onChange = (value) => {
        setYear({ min: value[0], max: value[1] });
    };
    return (
        <div className={cx('wrapper')}>
            <Collapse>
                <Panel header="Year" key="3"
                    className={cx('panel')}
                >
                    <Slider
                        range
                        marks={marks}
                        defaultValue={[year.min, year.max]}
                        min={2010}
                        max={2021}
                        step={1}
                        onChange={onChange}
                    />
                </Panel>
            </Collapse>
        </div>
    );
}

export default Year;
