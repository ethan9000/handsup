// import "./profile.css";
import { useAuthValue } from "../Auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Nav } from "./nav";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { currentUser } = useAuthValue();
  const navigate = useNavigate();

  return (
    <div className="center">
      <div className="profile">
        <h1>Profile</h1>
        <p>
          <strong>Email: </strong>
          {currentUser?.email}
        </p>
        <p>
          <strong>Email verified: </strong>
          {`${currentUser?.emailVerified}`}
        </p>
        <span onClick={() => signOut(auth)}>Sign Out</span>
      </div>
      <Button onClick={() => navigate("/new-post")}>New Post</Button>
    </div>
  );
}

export default Profile;
