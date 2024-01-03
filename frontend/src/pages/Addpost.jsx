import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Col, Form, Input, Row, Button } from "antd";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { addPost } from "../redux/actions/postActions";


const { TextArea } = Input;
function Addpost() {
  const [image, setImage] = useState("");
  const dispatch= useDispatch()
  function handleFileInput(e) {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
  }

  function sendPost(data) {
    data.image = image;
    dispatch(addPost(data));
  }

  return (
    <DefaultLayout>
      <Row justify="center">
        <Col lg={12}>
          <Form className="bs1 p-3 mt-5" layout="vertical" onFinish={sendPost}>
            <h3>Add new post</h3>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item name="image" label="Image" rules={[{ required: true }]}>
              <Input type="file" onChange={handleFileInput} />
            </Form.Item>
            {image !== "" && <img src={image} height="200" width="200" />}
            <br />
            <div className="text-end">
              <Button type="primary" htmlType="submit">
                Post
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default Addpost;
