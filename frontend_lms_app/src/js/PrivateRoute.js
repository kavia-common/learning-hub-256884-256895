import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "./storage";

/** PUBLIC_INTERFACE
 * PrivateRoute to protect routes; redirects to /login if not authed
 * @param {{children: React.ReactNode}} props
 */
export default function PrivateRoute({ children }) {
  const user = getUser();
  if(!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
