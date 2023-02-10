import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [loggedInUser, setLoggedInUser] = useState();

  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const userData = async () => {
      const res = await fetch('http://localhost:5000/users');
      const data = await res.json();
      setUsers(data);
    }
    userData()
  }, []);

  const addNewUser = async (newUser) => {
    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });
    const result = await response.json();
    setUsers([...users, result])
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loggedInUser,
        setLoggedInUser,
        addNewUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };
export default UserContext;