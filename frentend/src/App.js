import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import SingUpPage from "./compount/SingUpPage";
import Profile from "./screens/Profile";
import Login from "./compount/Login";
import PostDetail from "./compount/PostDetail";
import WelcomPage from "./compount/WelcomPage";
import FollowingPost from "./screens/FollowingPost";
import Header from "./compount/Header";
import UserProfile from "./screens/UserProfile";
import Post from "./screens/Post";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/authContex";
import PageNotFound from "./compount/PageNotFound";
console.log("this is app page 2");
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <GoogleOAuthProvider clientId="893695687622-stat91ikrjh25f9kotsdjq7to8gthcb9.apps.googleusercontent.com">
            <Header />
            <Routes>
              <Route path="/welcom" element={<WelcomPage />}></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="/signup" element={<SingUpPage />}></Route>
              <Route exact path="/profile" element={<Profile />}></Route>
              <Route path={"/login"} element={<Login />}></Route>
              {/* <Route path="/createpost" element={<Createpost />}></Route> */}
              <Route path="/createpost" element={<Post />}></Route>
              <Route path="/postdetails" element={<PostDetail />}></Route>
              <Route
                path={"*" || "/pagenotfound"}
                element={<PageNotFound />}
              ></Route>
              <Route path="/profile/:userId" element={<UserProfile />}></Route>
              <Route path="/followingpost" element={<FollowingPost />}></Route>
            </Routes>
          </GoogleOAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
