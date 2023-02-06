import LogIn from "./LogIn";
import UserInfo from './UserInfo';
import UserContext from "../context/UserContext";
import { useContext } from "react";

const Header = () => {

  const { loggedInUser } = useContext(UserContext);

  return ( 
    <>
    { 
      loggedInUser ? 
      <UserInfo /> :
      <LogIn />
    }
    </>
  );
}
 
export default Header;