
import { CloseOutlined } from '@ant-design/icons';
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import classNames from 'classnames/bind';
import styles from './Guide.module.scss';
const cx = classNames.bind(styles);


export default function Guide({ hook }) {
    const {
        hideGuide,
        setHideGuide
    } = hook;
    return (
        hideGuide && (
            <div className={cx("guide")} >
                <Layout
                    className={cx('guide-container')}
                >
                    <Header
                        className={cx('guide-header')}
                    >
                        <h1>Hướng dẫn cho người dùng</h1>
                        <button class={cx("close-button")}
                            onClick={() => setHideGuide(false)}
                        >
                            <CloseOutlined />
                        </button>
                    </Header>
                    <Content>
                        <span>
                            <h2>1. Chọn nhà cung cấp</h2>
                            <p>Chọn nhà cung cấp bằng cách check vào những nhà cung cấp nào cần tìm ở thanh sidebar</p>
                            <h2>2. Chọn mã cổ phiếu</h2>
                            <p>Chọn mã cổ phiếu bằng cách check vào mã cổ phiếu cần tìm ở thanh sidebar</p>
                            <h2>3. Chọn năm</h2>
                            <p>Chọn năm bằng cách kéo thanh cho biết khoảng thời gian từ năm nào đến năm nào</p>
                            <h2>4. Nhập thông tin cần tìm</h2>
                            <p>Nhập thông tin cần tìm bằng cách nhập vào ô tìm kiếm</p>
                            <p> <b>(*)</b>: nếu thông tin cần nhập liên quan đến tiền xin hãy nhập số tiền với định dạng #.###.### vnđ</p>
                            <p> <b>ví dụ</b>:</p>
                            <ul>
                                <li>100 ngàn sẽ nhập là 100.000 vnđ </li>
                                <li>2000k sẽ nhập là 2.000.000 vnđ </li>
                            </ul>
                        </span>
                    </Content>
                </Layout>
            </div>
        )
    )
}
