import UserContext from "../context/UserContext";
import { useContext } from "react";


const UserInfo = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const LogoutUser = () => {
    setLoggedInUser(null);
  }

  return (
    <div className="userInfoDiv">
      <img src={loggedInUser.avatar} alt="user avatar" />
      <span>{loggedInUser.username}</span>
      <button className="logOut" onClick={() => LogoutUser()}>Log out</button>
    </div>
  );
}

export default UserInfo;