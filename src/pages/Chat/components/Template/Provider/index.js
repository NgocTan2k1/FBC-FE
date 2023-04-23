import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';

import { Checkbox, Collapse } from 'antd';
import { useEffect, useState } from 'react';
import styles from './Provider.module.scss';
const { Panel } = Collapse;
const cx = classNames.bind(styles);

function Provider({ hook }) {
    const { providers } = hook;
    const [checkboxProvider, setCheckboxProvider] = useState([]);
    useEffect(() => {
        const data = providers.map((item) => {
            return {
                label: item.name,
                value: item.id,
            };
        });
        setCheckboxProvider(data);
    }, [providers]);

    const onChangeHandler = (providers) => {
        console.log(providers);
    };
    return (
        <div className={cx('wrapper')}>
            <Collapse>
                <Panel header="Provider" key="1"
                    className={cx('panel')}
                >
                    <Checkbox.Group
                        options={checkboxProvider}
                        onChange={onChangeHandler} />
                </Panel>
            </Collapse>
        </div>
    );
}

export default Provider;
