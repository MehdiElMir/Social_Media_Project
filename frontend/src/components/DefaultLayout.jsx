import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const DefaultLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
        >
          <Menu.Item key="/" icon={<UserOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/profile" icon={<VideoCameraOutlined />}>
            <Link to={`/profile/${user._id}`}>Profile</Link>
          </Menu.Item>
          <Menu.Item key="/allusers" icon={<UserOutlined />}>
            <Link to="/allusers">All users</Link>
          </Menu.Item>
          <Menu.Item key="/addpost" icon={<UploadOutlined />}>
            <Link to="/addpost">AddPost</Link>
          </Menu.Item>

          <Menu.Item icon={<LogoutOutlined />}>
            <Link
              onClick={() => {
                localStorage.removeItem("user", window.location.reload());
              }}
            >
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <h2>SocialMundia</h2>
            <h4>{JSON.parse(localStorage.getItem("user")).username}</h4>
          </div>
        </Header>
        <Content
          style={{
            margin: "10px 10px",
            padding: 24,
            minHeight: "90vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
