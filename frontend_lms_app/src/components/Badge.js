import React from "react";

/** PUBLIC_INTERFACE
 * Badge component with themed backgrounds and readable text.
 * @param {{children: React.ReactNode, kind?: "success"|"info"|"error"|"warning"|"neutral"|"default", className?: string}} props
 */
export default function Badge({ children, kind="default", className="" }) {
  const base = ["badge"];
  if (["success","info","error","warning","neutral"].includes(kind)) base.push(kind);
  if (className) base.push(className);
  return <span className={base.join(" ")}>{children}</span>;
}
