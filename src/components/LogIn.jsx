import { useState, useContext } from "react";
import UserContext from "../context/UserContext";

const LogIn = () => {

  const [formFields, setFormFields] = useState({
    username: '',
    password: ''
  })

  const { users, setLoggedInUser } = useContext(UserContext);

  const [failedLogIn, setFailedLogIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formFields)
    const loggedInUser  = users.find(user => user.username === formFields.username && user.password === formFields.password)
    if (loggedInUser ){
      setLoggedInUser(loggedInUser)
      console.log('sucess');
    } else {
      console.log('fail');
      setFailedLogIn(true);
    }
  }

  return ( 
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <input 
              type="text"
              placeholder="username" 
              name="username"
              value={formFields.username}
              onChange={(e)=>setFormFields({...formFields, username:e.target.value})}
            />
          </label>
          <label>
            <input 
              type="password"
              placeholder="password" 
              name="password"
              value={formFields.password}
              onChange={(e)=>setFormFields({...formFields, password:e.target.value})}
            />
          </label>
          <input type="submit" value="Log In" />
          {
            failedLogIn && <p>Wrong log in info</p>
          }
        </form>
      </div>
    </>
   );
}
 
export default LogIn;