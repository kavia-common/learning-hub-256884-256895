import React from "react";
import Badge from "./Badge";

/** PUBLIC_INTERFACE
 * Lesson list item line with completion status.
 * @param {{lesson: any, completed: boolean, onOpen: ()=>void, index?: number}} props
 */
export default function LessonListItem({ lesson, completed, onOpen, index }) {
  return (
    <div className="row" style={{justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid var(--border)"}}>
      <div className="row" style={{gap:12}}>
        <Badge kind={completed ? "success" : "info"}>{completed ? "Done" : "Pending"}</Badge>
        <div>
          <div style={{fontWeight:700}}>{index != null ? `${index+1}. ` : ""}{lesson.title}</div>
          <div className="small">{lesson.description}</div>
        </div>
      </div>
      <a href="#open" onClick={(e)=>{e.preventDefault(); onOpen();}} className="btn ghost" style={{textDecoration:"none"}}>Open</a>
    </div>
  );
}
