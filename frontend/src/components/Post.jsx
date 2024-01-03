import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { CommentOutlined, HeartFilled } from "@ant-design/icons";
import { getAllPosts, likeOrUnlikePost } from "../redux/actions/postActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Post({ post }) {
  const dispatch = useDispatch();
  const currentuser = JSON.parse(localStorage.getItem('user'))
  const alreadyLiked = post.likes.find(obj=>obj.user.toString()==currentuser._id)
  const { likeOrUnlikeLoading } = useSelector(state=>state.alertsReducer)
  useEffect(()=>{
    dispatch(getAllPosts())

  },[likeOrUnlikeLoading])
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
          <HeartFilled
            style={{ color: alreadyLiked ? "red" : "grey" }}
            onClick={() => {
              dispatch(likeOrUnlikePost({ postid: post._id }));
            }}
          />
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
