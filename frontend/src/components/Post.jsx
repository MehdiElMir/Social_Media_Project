import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  CommentOutlined,
  HeartFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  addComment,
  getAllPosts,
  likeOrUnlikePost,
} from "../redux/actions/postActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Modal, Row, Input } from "antd";

function Post({ post, postInProfilePage }) {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const currentuser = JSON.parse(localStorage.getItem("user"));
  const alreadyLiked = post.likes.find(
    (obj) => obj.user.toString() == currentuser._id
  );

  const { likeOrUnlikeLoading, addCommentLoading } = useSelector(
    (state) => state.alertsReducer
  );
  const [commentModalVisibility, setCommentModalVisibility] = useState(false);
  const [comment, setComment] = useState("");
  const { users } = useSelector((state) => state.usersReducer);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [likeOrUnlikeLoading, addCommentLoading]);
  return (
    <div className="bs1 p-2 mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center ">
          {post.user.profilePicUrl == "" ? (
            <span className="ProfilPic1 d-flex align-items-center">
              {post.user.username[0]}
            </span>
          ) : (
            <img
              src={post.user.profilePicUrl}
              height="35"
              width="35"
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          )}
          <div>
            <Link className="ms-2">{post.user.username}</Link>
          </div>
        </div>
        <div>
          <p>{moment(post.createdAt).format("MMM DD yyyy")}</p>
        </div>
      </div>
      <img
        style={{ height: postInProfilePage ? "200px" : "500px" }}
        className="w-100"
        src={post.image}
      />
      <p className="mt-1 mb-1 text-start">{post.description}</p>
      <div
        className={
          postInProfilePage
            ? "d-flex align-items-center justify-content-between"
            : "d-flex align-items-center"
        }
      >
        <div className="d-flex align-items-center ms-3">
          <HeartFilled
            style={{ color: alreadyLiked ? "red" : "grey" }}
            onClick={() => {
              dispatch(likeOrUnlikePost({ postid: post._id }));
            }}
          />
          <p>{post.likes.length}</p>
        </div>
        <div className="d-flex align-items-center">
          <CommentOutlined onClick={() => setCommentModalVisibility(true)} />
          <p>{post.comments.length}</p>
        </div>
        {post.user._id == currentuser._id && (
          <>
            <div>
              <DeleteOutlined />
            </div>
            <div>
              <EditOutlined />
            </div>
          </>
        )}
      </div>
      <Modal
        visible={commentModalVisibility}
        title="comments"
        closable="false"
        width={900}
        okText="Add Comment"
        onOk={() => {
          dispatch(addComment({ postid: post._id, comment: comment }));
          setCommentModalVisibility(false);
        }}
        onCancel={() => {
          setCommentModalVisibility(false);
        }}
      >
        <Row>
          <Col lg={13} xs={0}>
            <img
              src={post.image}
              height="200"
              width="200"
              className="postimage"
            />
          </Col>
          <Col lg={11} xs={24}>
            <TextArea
              placeholder="add your comment here ..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            {post.comments.map((comment) => {
              const user = users.find((obj) => obj._id == comment.user);

              return (
                <div className="d-flex align-items-center mt-2 m-1 p-1 justify-content-between">
                  <div className="d-flex align-items-center">
                    {user && user.profilePicUrl == "" ? (
                      <span className="ProfilPic1 d-flex align-items-center">
                        {user.username[0]}
                      </span>
                    ) : (
                      user && (
                        <img height="50" width="50" src={user.profilePicUrl} />
                      )
                    )}
                    {user && <Link className="ms-2">{user.username}</Link>}
                    <p className="ms-3" style={{ fontSize: 15 }}>
                      {comment.comment}
                    </p>
                  </div>
                  <div className="text-end">
                    <p className="text-right" style={{ fontSize: 13 }}>
                      {comment.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default Post;
