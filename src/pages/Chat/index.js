import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import ChatContent from './components/ChatContent';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import logo from '~/img/logo.png';

const { Header, Sider, Content } = Layout;

const cx = classNames.bind(styles);
function Chat() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleArrowClick = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {};

    const arrowClassName = `trigger ${collapsed ? 'trigger--collapsed' : ''}`;

    return (
        <Layout>
            <Sider
                className={cx('side-bar')}
                width={280}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className={cx('logo-container')}>
                    <img alt="logo" className={cx('logo')} src={logo} />
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
                <div className={cx('logout-button')}>Logout</div>
            </Sider>
            <div className={cx(arrowClassName)} onClick={handleArrowClick}>
                <span className={cx('arrow')} />
            </div>
            <Layout className={cx('site-layout')}>
                <Content className={cx('site-layout-background')}>
                    <ChatContent />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Chat;
