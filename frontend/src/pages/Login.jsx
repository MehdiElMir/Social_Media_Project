import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userActions";

function Login() {
  const dispatch = useDispatch();

  function login(data) {
    console.log(data);
    dispatch(userLogin(data));
  }

  return (
    <div>
      <Row justify="center" className="register-div">
        <Col lg={10} xs={24}>
          <Form layout="vertical" className="bs1 p-3" onFinish={login}>
            <h3>Login</h3>
            <hr />
            <Form.Item
              label="username"
              name="username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <div className="text-end">
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
            <Link to="/register">
              Not yet registered, click here to register
            </Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
