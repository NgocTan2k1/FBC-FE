/* eslint-disable react-hooks/exhaustive-deps */
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Layout } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AugmentedReality, CalendarIcon, Logo, ReadyStock } from '~/img';
import styles from './Chat.module.scss';

import { ChatContent, ConfirmLogout, Guide, Template } from './components';

import { useChat } from './hooks';

const { Provider, Stock, Year } = Template;
const { Sider, Content } = Layout;

const cx = classNames.bind(styles);

function Chat() {
    const [collapsed, setCollapsed] = useState(false);
    const chatHook = useChat({});
    useEffect(() => {
        chatHook.fetchProviders();
        chatHook.fetchStocks();
    }, []);

    return (
        <>
            <Guide hook={chatHook} />
            <Layout className={cx('chat-container')}>
                <Sider
                    className={cx('side-bar')}
                    width={280}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <div className={cx('logo-container')}>
                        <img alt="logo" className={cx('logo')} src={Logo} />
                    </div>
                    <div className={cx('sider-collapse')}>
                        {collapsed ? (
                            <div className={cx('collapse-icon')} onClick={() => setCollapsed(false)}>
                                <img src={AugmentedReality} alt="provider" />
                            </div>
                        ) : (
                            <Provider hook={chatHook} />
                        )}
                        <br />
                        {collapsed ? (
                            <div className={cx('collapse-icon')} onClick={() => setCollapsed(false)}>
                                <img src={ReadyStock} alt="stock" />
                            </div>
                        ) : (
                            <Stock hook={chatHook} />
                        )}
                        <br />
                        {collapsed ? (
                            <div className={cx('collapse-icon')} onClick={() => setCollapsed(false)}>
                                <img src={CalendarIcon} alt="year" />
                            </div>
                        ) : (
                            <Year hook={chatHook} />
                        )}
                        <br />
                    </div>
                    <div onClick={() => chatHook.setHideLogout(false)} className={cx('logout-button')}>
                        {collapsed ? (
                            <FontAwesomeIcon className={cx('icon-show')} icon={faSignOut} />
                        ) : (
                            <>
                                Logout
                                <FontAwesomeIcon className={cx('icon-logout')} icon={faSignOut} />
                            </>
                        )}
                    </div>
                </Sider>
                <Layout className={cx('site-layout')}>
                    <Content className={cx('site-layout-background')}>
                        <ChatContent hook={chatHook} />
                    </Content>
                </Layout>
            </Layout>

            <ConfirmLogout hook={chatHook} />
        </>
    );
}

export default Chat;
