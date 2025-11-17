import React from "react";

/** PUBLIC_INTERFACE
 * Progress bar with optional status variant.
 * @param {{value: number, className?: string}} props - number from 0 to 100
 */
export default function ProgressBar({ value, className = "" }) {
  const safe = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
  const classes = ["progress"];
  if (className) classes.push(className);
  return (
    <div className={classes.join(" ")} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={safe} aria-label="Progress">
      <div className="bar" style={{ width: `${safe}%` }} />
    </div>
  );
}
