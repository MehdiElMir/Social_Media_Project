import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Form, Input, Row, Col, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { editUser } from "../redux/actions/userActions";

function EditProfile() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [profilePicUrl, setProfilePicUrl] = useState(user.profilePicUrl);
  function handleFileInput(e) {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfilePicUrl(reader.result);
    };
  }
  function edit(data) {
    data.profilePicUrl = profilePicUrl;
    data._id = user._id;
    dispatch(editUser(data));
  }
  return (
    <DefaultLayout>
      <Row justify="center mt-5">
        <Col className="mt-5">
          <div>
            <Form
              layout="vertical"
              initialValues={user}
              className="p-2 bs1"
              onFinish={edit}
            >
              <h3>Edit Profile</h3>
              <Form.Item name="username" label="Username">
                <Input />
              </Form.Item>
              <Form.Item name="bio" label="Bio">
                <Input />
              </Form.Item>
              <Form.Item label="Profile picture" name="profilePicUrl">
                <div className="d-flex align-items-center">
                  {profilePicUrl == "" ? (
                    <p className="ProfilPic2">{user.username[0]}</p>
                  ) : (
                    <img height="60" width="60" src={profilePicUrl} alt="" />
                  )}
                  <Input type="file" onChange={handleFileInput} />
                </div>
              </Form.Item>

              <Form.Item name="privateAccount">
                <Select>
                  <Select.Option value={true}>Private</Select.Option>
                  <Select.Option value={false}>Public</Select.Option>
                </Select>
              </Form.Item>
              <Button htmlType="submit">Edit</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditProfile;
