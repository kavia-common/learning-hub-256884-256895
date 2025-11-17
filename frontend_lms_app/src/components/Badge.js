import React from "react";

/** PUBLIC_INTERFACE
 * Badge component
 * @param {{children: React.ReactNode, kind?: "success"|"info"|"error"|"default", className?: string}} props
 */
export default function Badge({ children, kind="default", className="" }) {
  const base = ["badge"];
  if (["success","info","error"].includes(kind)) base.push(kind);
  if (className) base.push(className);
  return <span className={base.join(" ")}>{children}</span>;
}
