import { faker } from '@faker-js/faker';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import classNames from 'classnames/bind';
import { Bar } from 'react-chartjs-2';

import random_rgba from '~/utils/color';
import styles from './VerticalChart.module.scss';

const cx = classNames.bind(styles);
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function VerticalChart(
    {
        years,
        dataRaw,
        title,
    }
) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
    };
    const labels = years;

    const data = {
        labels,
        datasets: dataRaw.map((item) => ({
            label: item.name,
            data: item.data,
            backgroundColor: random_rgba(),
        })),
    };
    return (
        <div
            className={cx('vertical-chart-container')}
        >
            <Bar options={options} data={data} />;
        </div>
    )
}
