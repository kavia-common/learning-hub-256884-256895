import React from "react";

/** PUBLIC_INTERFACE
 * Progress bar
 * @param {{value: number}} props - number from 0 to 100
 */
export default function ProgressBar({ value }) {
  const safe = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
  return (
    <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={safe} aria-label="Progress">
      <div className="bar" style={{ width: `${safe}%` }} />
    </div>
  );
}
