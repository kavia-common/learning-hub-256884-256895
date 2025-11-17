import React from "react";

/** PUBLIC_INTERFACE
 * Card container with title/subtitle
 * @param {{title?: string, subtitle?: string, children: React.ReactNode, className?: string, footer?: React.ReactNode, variant?: "default"|"colored"}} props
 */
export default function Card({ title, subtitle, children, className="", footer, variant="default" }) {
  const classes = ["card"];
  if (variant === "colored") classes.push("card-colored");
  if (className) classes.push(className);
  return (
    <div className={classes.join(" ")}>
      <div className="card-body">
        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        <div>{children}</div>
        {footer && <div className="mt16">{footer}</div>}
      </div>
    </div>
  );
}
