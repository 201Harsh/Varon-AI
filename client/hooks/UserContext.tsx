"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext<string>("");

export default function UserCheckAuth({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) {
  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
