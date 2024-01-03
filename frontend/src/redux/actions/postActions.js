import axios from "axios";
import { message } from "antd";
import { response } from "express";

export const addPost = (data) => async (dispatch) => {

    data.user = JSON.parse(localStorage.getItem('user'))._id
    data.likes=[]
    data.comments=[]

  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/posts/addpost", data);
    dispatch({ type: "LOADING", payload: false });
    message.success("Post Added successfully ✅");
   
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong ❌");
  }
};

export const getAllPosts = () => async (dispatch) => {


  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get("/api/posts/getallposts")
    dispatch({ type: "LOADING", payload: false })
     dispatch({ type: "GET_ALL_POSTS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong ❌");
  }
};
