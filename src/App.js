import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';

import VehicleScreen from "./screens/VehicleScreen";
import OrdersScreen from "./screens/OrdersScreen";
import StaffScreen from "./screens/StaffScreen";

import 'antd/dist/antd.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './App.css';


function App({location}) {
    const [collapsed, setCollapsed] = useState(false);

    const { Header, Content, Sider } = Layout;

    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(collapsed) => setCollapsed(collapsed)}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline">
                        <Menu.Item key="/">
                            <Icon type="car" />
                            <span>Vehicles</span>
                            <Link to="/" />
                        </Menu.Item>
                        <Menu.Item key="/service">
                            <Icon type="dashboard" />
                            <span>Services</span>
                            <Link to="/service" />
                        </Menu.Item>
                        <Menu.Item key="/staff">
                            <Icon type="pie-chart" />
                            <span>Staff</span>
                            <Link to="/staff" />
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, paddingLeft: 16 }}>
                        <Icon
                            className="trigger"
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setCollapsed(!collapsed)}
                        />
                    </Header>
                    <Content style={{ margin: '15px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <Route exact path="/" component={VehicleScreen} />
                        <Route path="/service" component={OrdersScreen} />
                        <Route path="/staff" component={StaffScreen} />
                    </Content>
                </Layout>

            </Layout>
        </Router>
    );

}

export default App;
