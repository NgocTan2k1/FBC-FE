import { faker } from '@faker-js/faker';
import { Button, Modal } from 'antd';
import _ from 'lodash';
import { useState } from 'react';
import VerticalChart from '~/components/VerticalChart';

const GraphModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const minYear = 2010;
    const maxYear = 2021;

    const numOfYears = _.random(2, 10);
    const startYear = _.random(minYear, maxYear - numOfYears);
    const years = _.times(numOfYears, (index) => startYear + index);

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <VerticalChart
                    years={years}
                    dataRaw={[
                        {
                            name: faker.company.companyName(),
                            data: years.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                        },
                        {
                            name: faker.company.companyName(),
                            data: years.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                        },
                    ]}
                    title={faker.hacker.phrase()}
                />
            </Modal>
        </>
    );
};

export default GraphModal;