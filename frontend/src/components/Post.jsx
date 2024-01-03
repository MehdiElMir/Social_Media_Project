import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { HeartOutlined, CommentOutlined } from "@ant-design/icons";

function Post({ post }) {
  return (
    <div className="bs1 p-2 mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center ">
          {post.user.profilePicUrl == "" ? (
            <span className="ProfilPic1 d-flex align-items-center">
              {post.user.username[0]}
            </span>
          ) : (
            <span>{post.user.profilePicUrl}</span>
          )}
          <Link className="ms-2">{post.user.username}</Link>
        </div>
        <div>
          <p>{moment(post.createdAt).format("MMM DD yyyy")}</p>
        </div>
      </div>
      <img src={post.image} className="postimage" />
      <p className="mt-1 mb-1 text-start">{post.description}</p>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center ms-3">
          <HeartOutlined />
          <p>{post.likes.length}</p>
        </div>
        <div className="d-flex align-items-center">
          <CommentOutlined />
          <p>{post.comments.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
