import LogIn from "./LogIn";
import UserInfo from './UserInfo';
import UserContext from "../context/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Header = () => {

  const { loggedInUser } = useContext(UserContext);

  return (
    <header>
      {loggedInUser ?
          <div className="loggedIn">
            <div className="loggedInLinks">
              <Link to="/"><h3>Home</h3></Link>
              <Link to="/addQuestion"><h3>Add a question</h3></Link>
            </div>
            <UserInfo />
          </div>
          :
          <div className="notLoggedIn">
            <div className="notLoggedInLinks">
              <Link to="/"><h3>Home</h3></Link>
              <Link to='/register'><h3>Register</h3></Link>
            </div>
            <LogIn />
          </div>
      }
    </header>
  );
}

export default Header;