import React, { createContext, useState } from 'react'
interface UserContextType {
  user: {
    email: string;
    fullName: {
      firstName: string;
      lastName: string;
    };
  };
  setUser: React.Dispatch<React.SetStateAction<{ 
    email: string;
    fullName: {
      firstName: string;
      lastName: string;
    };
  }>>;
}

export const UserDataContext = createContext<UserContextType | null>(null);

const UserContext = ({ children }) => {
  //const user = 'Sara'
  const [user, setUser] = useState({
    email:'',    
    fullName:{
      firstName:'',
      lastName:''
    }
  })
  return (
    <div>
      <UserDataContext.Provider value={{user, setUser}}>
        {children}
      </UserDataContext.Provider>

    </div>

  )
}

export default UserContext