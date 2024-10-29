import React, { createContext,useState } from 'react'

export const AuthContext=createContext()
function AuthProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const [user,setUser]=useState();
    const handleLogin = (name) => {
        if (name) {
          setIsLoggedIn(true);
          setUser(name);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      };
  return (
    <AuthContext.Provider value={{handleLogin,user,isLoggedIn}} >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
