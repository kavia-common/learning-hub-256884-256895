import React from "react";
import Card from "./Card";
import Badge from "./Badge";

/** PUBLIC_INTERFACE
 * ScoreSummary shows score and breakdown.
 * @param {{score:number, total:number}} props
 */
export default function ScoreSummary({ score, total }) {
  const percent = total>0 ? Math.round((score/total)*100) : 0;
  const status = percent >= 70 ? "Passed" : "Try Again";
  return (
    <Card title="Quiz Result" subtitle="Your latest attempt">
      <div className="row" style={{gap:16}}>
        <Badge kind={percent >= 70 ? "success":"error"}>{status}</Badge>
        <div style={{fontWeight:800, fontSize:20}}>{score} / {total} ({percent}%)</div>
      </div>
    </Card>
  );
}
