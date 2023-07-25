import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./style/style.css";
import Home from "./screens/Home";
import SingUpPage from "./compount/SingUpPage";
import Profile from "./screens/Profile";
import Login from "./compount/Login";
import Createpost from "./screens/Createpost";
import PostDetail from "./compount/PostDetail";
import WelcomPage from "./compount/WelcomPage";

import FollowingPost from "./screens/FollowingPost";
import Header from "./compount/Header";
import UserProfile from "./screens/UserProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SingUpPage />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/createpost" element={<Createpost />}></Route>
          <Route path="/postdetails" element={<PostDetail />}></Route>
          <Route path="/welcom" element={<WelcomPage />}></Route>
          <Route path="/profile/:userId" element={<UserProfile />}></Route>
          <Route path="/followingpost" element={<FollowingPost />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
