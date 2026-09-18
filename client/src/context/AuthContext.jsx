import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const storedUser = localStorage.getItem("user");

const [user, setUser] = useState(
  storedUser ? JSON.parse(storedUser) : null
);

 const login = (userData, token) => {

    localStorage.setItem("token", token);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);

};

 const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

};

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}