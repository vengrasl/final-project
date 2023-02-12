import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [loggedInUser, setLoggedInUser] = useState();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userData = async () => {
      const res = await fetch('http://localhost:5000/users');
      const data = await res.json();
      setUsers(data);
    }
    userData()
  }, []);

  const addNewUser = async (newUser) => {
    await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });
    setUsers([...users, newUser])
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