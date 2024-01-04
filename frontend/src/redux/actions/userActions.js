import axios from "axios";
import { message } from "antd";

export const userRegister = (data) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/users/register", data);
    dispatch({ type: "LOADING", payload: false });
    message.success("User registered successfully ✅");
    window.location.href = "/login";
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong ❌ ");
  }
};

export const userLogin = (data) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post("/api/users/login", data);
    console.log(response.status);
    dispatch({ type: "LOADING", payload: false });
    message.success("Login success ✅");
    localStorage.setItem("user", JSON.stringify(response.data));
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Invalid Credentials ❌");
  }
};

export const getAllUsers = (data) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get("/api/users/getallusers");
    dispatch({ type: "LOADING", payload: false });
    dispatch({ type: "GET_ALL_USERS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong ❌");
  }
};
