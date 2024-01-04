import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Button, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

function Profile({ match }) {
  const { userid } = useParams();
  const { users } = useSelector((state) => state.usersReducer);
  const { posts } = useSelector((state) => state.postsReducer);
  const user = users.find((obj) => obj._id == userid);
  const userposts = posts.filter((obj) => obj.user._id == userid);
  const currentuser = localStorage.getItem("user");
  return (
    <DefaultLayout>
      {users.length > 0 && (
        <Row justify="center">
          <Col lg={12} sm={24} xs={24}>
            <div className="bs1 m-2 p-2">
              <div className="d-flex align-items-center text-start">
                {user.profilePicUrl == "" ? (
                  <p className="ProfilPic2 d-flex align-items-center">
                    {user.username[0]}
                  </p>
                ) : (
                  <img src={user.profilePicUrl} height="60" width="60" alt="" />
                )}
                <div className="text-start ms-3">
                  <p style={{ color: "black" }}>{user.username}</p>
                  <p style={{ fontSize: 15 }}>
                    {moment(user.createdAt).format("MMM DD yyyy")}
                  </p>
                  {currentuser._id == userid && (
                    <Button>
                      <Link to="/editprofile">Edit Profile</Link>
                    </Button>
                  )}
                </div>
              </div>
              <p style={{ color: "black", fontSize: 16, textAlign: "start" }}>
                {user.bio == "" ? "FullStack Developer" : user.bio}
              </p>
              <div className="text-start">
                <Button className="me-3">
                  Followers : {user.followers.length}
                </Button>
                <Button>Following : {user.following.length}</Button>
              </div>

              <p style={{ color: "black", fontSize: 16, textAlign: "start" }}>
                Total Posts : {userposts.length}
              </p>
            </div>
          </Col>
        </Row>
      )}
    </DefaultLayout>
  );
}

export default Profile;
