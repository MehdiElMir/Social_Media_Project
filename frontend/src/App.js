import logo from "./logo.svg";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Addpost from "./pages/Addpost";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector ,useDispatch} from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "./redux/actions/postActions";

function App() {
  const { loading, likeOrUnlikeLoading } = useSelector(
    (state) => state.alertsReducer
  );
  const isAuthenticated = !!localStorage.getItem("user");
    const dispatch = useDispatch();
  useEffect(()=>{

  dispatch(getAllPosts())


  },[]);


  return (
    <div className="App">
      {(loading || likeOrUnlikeLoading) && (
        <div className="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <Protected isLoggedIn={isAuthenticated}>
                <Home></Home>
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected isLoggedIn={isAuthenticated}>
                <Profile></Profile>
              </Protected>
            }
          />
          <Route
            path="/addpost"
            element={
              <Protected isLoggedIn={isAuthenticated}>
                <Addpost></Addpost>
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoute = (props) => {
  const isAuthenticated = !!localStorage.getItem("user");

  if (isAuthenticated) {
    return <Route {...props} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
