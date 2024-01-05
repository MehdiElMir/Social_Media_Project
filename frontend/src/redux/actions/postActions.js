import axios from "axios";
import { message } from "antd";

export const addPost = (data) => async (dispatch) => {
  data.user = JSON.parse(localStorage.getItem("user"))._id;
  data.likes = [];
  data.comments = [];

  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/posts/addpost", data);
    dispatch({ type: "LOADING", payload: false });
    message.success("Post Added successfully ✅");
    window.location.href="/"
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong ❌");
  }
};

export const getAllPosts = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get("/api/posts/getallposts");
    dispatch({ type: "LOADING", payload: false });
    dispatch({ type: "GET_ALL_POSTS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong ❌");
  }
};
export const likeOrUnlikePost = (data) => async (dispatch) => {
  data.userid = JSON.parse(localStorage.getItem("user"))._id;

  dispatch({ type: "LIKE_UNLIKE_LOADING", payload: true });
  try {
    await axios.post("/api/posts/likeorunlike", data);
    dispatch({ type: "LIKE_UNLIKE_LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LIKE_UNLIKE_LOADING", payload: false });
    message.error("Something went wrong ❌");
  }
};

export const addComment = (data) => async (dispatch) => {
  data.userid = JSON.parse(localStorage.getItem("user"))._id;

  dispatch({ type: "ADD_COMMENT_LOADING", payload: true });
  try {
    await axios.post("/api/posts/addcomment", data);
    dispatch({ type: "ADD_COMMENT_LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ADD_COMMENT_LOADING", payload: false });
    message.error("Something went wrong ❌");
  }
};
export const editPost = (data) => async (dispatch) => {
  console.log(data)
  dispatch({ type: "EDIT_POST_LOADING", payload: true });
  try {
    await axios.post("/api/posts/editpost", data);
    dispatch({ type: "EDIT_POST_LOADING", payload: false });
    message.success("Post updated successfully ✅");

  } catch (error) {
    console.log(error);
    dispatch({ type: "EDIT_POST_LOADING", payload: false });
    message.error("Something went wrong ❌");
  }
};
export const deletePost = (data) => async (dispatch) => {
  console.log(data);
  dispatch({ type: "DELETE_POST_LOADING", payload: true });
  try {
    await axios.post("/api/posts/deletepost", data);
    dispatch({ type: "DELETE_POST_LOADING", payload: false });
    message.success("Post deleted successfully ✅");
  } catch (error) {
    console.log(error);
    dispatch({ type: "DELETE_POST_LOADING", payload: false });
    message.error("Something went wrong ❌");
  }
};

