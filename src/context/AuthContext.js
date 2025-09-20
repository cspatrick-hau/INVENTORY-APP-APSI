import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../components/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserRole = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user?.email) {
        setRole(null);
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("login")
        .select("roles")
        .eq("email", session.user.email.toLowerCase())
        .maybeSingle();

      setRole(profile?.roles || null);
      setLoading(false);
    };

    getUserRole();
  }, []);

  return (
    <AuthContext.Provider value={{ role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);