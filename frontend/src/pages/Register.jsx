import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/actions/userActions";

function Register() {
  const dispatch = useDispatch();

  function register(data) {
    console.log(data);
    delete data.cpassword;
    dispatch(userRegister(data));
  }

  return (
    <div>
      <Row justify="center" className="register-div">
        <Col lg={10} xs={24}>
          <Form layout="vertical" className="bs1 p-3" onFinish={register}>
            <h3>Register</h3>
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

            <Form.Item
              label="confirm password"
              name="cpassword"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <div className="text-end">
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </div>
            <Link to="/login">Already registered, click here to login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
