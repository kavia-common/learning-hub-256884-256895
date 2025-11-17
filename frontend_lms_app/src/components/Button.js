import React from "react";

/** PUBLIC_INTERFACE
 * Button component with variants.
 * @param {{children: React.ReactNode, onClick?: ()=>void, type?: "button"|"submit"|"reset", className?: string, variant?: "primary"|"secondary"|"ghost"|"danger", disabled?: boolean, ariaLabel?: string}} props
 */
export default function Button({ children, onClick, type="button", className="", variant="primary", disabled=false, ariaLabel }) {
  const classes = ["btn"];
  if (variant !== "primary") classes.push(variant);
  if (className) classes.push(className);
  return (
    <button type={type} onClick={onClick} className={classes.join(" ")} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
