import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const LogIn = () => {

  const [formFields, setFormFields] = useState({
    username: '',
    password: ''
  })

  const { users, setLoggedInUser } = useContext(UserContext);

  const [failedLogIn, setFailedLogIn] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedInUser = users.find(user => user.username === formFields.username && user.password === formFields.password)
    if (loggedInUser) {
      setLoggedInUser(loggedInUser)
      navigate('/')
    } else {
      setFailedLogIn(true);
    }
  }

  return (
    <>
      <div className="loginDiv">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="username"
              name="username"
              value={formFields.username}
              onChange={(e) => setFormFields({ ...formFields, username: e.target.value })}
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="password"
              name="password"
              value={formFields.password}
              onChange={(e) => setFormFields({ ...formFields, password: e.target.value })}
            />
          </label>
          <input className="loginbtn" type="submit" value="Log In" />
        </form>
        {
          failedLogIn && <span>Invalid username or password</span>
        }
      </div>
    </>
  );
}

export default LogIn;