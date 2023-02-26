import React, { createContext, useState } from "react";

export const AuthStepContext = createContext<{
  user: {
    email: string | null;
    password: string | null;
  };
  setUser: React.Dispatch<any> | null;
}>({
  user: { email: null, password: null },
  setUser: null,
});

const AuthContext: React.FC<{ children: any }> = ({ children }) => {
  const [user, setUser] = useState<{
    email: string | null;
    password: string | null;
  }>({ email: null, password: null });

  return (
    <AuthStepContext.Provider value={{ user, setUser }}>
      {children}
    </AuthStepContext.Provider>
  );
};

export default AuthContext;
