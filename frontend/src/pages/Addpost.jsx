import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Col, Form, Input, Row, Button } from "antd";

const { TextArea } = Input;
function Addpost() {
  const[image,setImage]=useState('')
  function handleFileInput(e){
    const file =e.target.files[0]
    const reader= new FileReader(file)
    reader.readAsDataURL(file)
    reader.onloadend=()=>{
     console.log(reader.result)
    }
  }
  return (
    <DefaultLayout>
      <Row justify='center'>
        <Col lg={12}>
          <Form className="bs1 p-3 mt-5" layout="vertical">
            <h3>Add new post</h3>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <TextArea/>
            </Form.Item>
            <Form.Item name="image" label="Image" rules={[{ required: true }]}>
              <Input type="file" onChange={handleFileInput}/> 
            </Form.Item>
            <Button type="primary" htmlType="submit"> Post</Button>
          </Form>
        
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default Addpost;
