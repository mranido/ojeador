import React from "react";
import { useLocalStorage } from "./../hooks/useLocalStorage";


const AuthContext = React.createContext();
const AuthProvider = (props) => {
  const { children } = props;
  const [token, setToken] = useLocalStorage("token");
  return (
    <AuthContext.Provider value={[token, setToken]}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};