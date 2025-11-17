import React from "react";
import Card from "./Card";
import ProgressBar from "./ProgressBar";
import Button from "./Button";

/** PUBLIC_INTERFACE
 * Course card display
 * @param {{course: any, progress: number, onOpen: ()=>void}} props
 */
export default function CourseCard({ course, progress=0, onOpen }) {
  return (
    <Card title={course.title} subtitle={course.shortDescription} footer={
      <div className="row space-between">
        <div style={{minWidth:160}}>
          <ProgressBar value={progress}/>
          <div className="small mt8">Progress: {Math.round(progress)}%</div>
        </div>
        <Button onClick={onOpen} ariaLabel={`Open ${course.title}`}>Open</Button>
      </div>
    }>
      <img src={course.thumbnail} alt={`${course.title} thumbnail`} style={{width:"100%", borderRadius:10, marginBottom:12}}/>
    </Card>
  );
}
