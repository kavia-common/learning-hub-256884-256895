import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getCourseById, getLesson, getNextLesson, getPrevLesson } from "../js/courseService";
import { completeLesson, isLessonCompleted, saveLastLesson } from "../js/storage";

/** PUBLIC_INTERFACE
 * LessonPage - content view with completion tracking and navigation
 */
export default function LessonPage(){
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const course = getCourseById(courseId);
  const lesson = course ? getLesson(course, lessonId) : null;

  useEffect(()=>{
    if(course && lesson) {
      saveLastLesson(String(course.id), String(lesson.id));
    }
  }, [course, lesson]);

  if(!course || !lesson){
    return (
      <Layout title="Lesson Not Found">
        <p>We couldn't find this lesson. <Link to={`/courses/${courseId}`}>Back to course</Link></p>
      </Layout>
    );
  }

  const completed = isLessonCompleted(course.id, lesson.id);

  const markDone = ()=>{
    completeLesson(String(course.id), String(lesson.id));
    // trigger a rerender by navigating or using state; simple approach: force navigate to same path
    navigate(0);
  };

  const next = getNextLesson(course, lesson.id);
  const prev = getPrevLesson(course, lesson.id);

  return (
    <Layout title={lesson.title} subtitle={lesson.description}>
      <div className="card mb16">
        <div className="card-body">
          <div className="row" style={{justifyContent:"space-between"}}>
            <div className="small">Video</div>
            <Badge kind={completed ? "success" : "info"}>{completed ? "Completed" : "In progress"}</Badge>
          </div>
          <div className="mt12 surface-alt" style={{border:"1px dashed var(--border)", padding:16, borderRadius:10}}>
            {lesson.videoUrl ? (
              <>
                <div className="small" style={{marginBottom:8}}>Watch: {new URL(lesson.videoUrl).hostname}</div>
                <div style={{position:"relative", paddingTop:"56.25%", width:"100%", borderRadius:8, overflow:"hidden"}}>
                  <iframe
                    title={`${lesson.title} video`}
                    src={(() => {
                      try {
                        const url = new URL(lesson.videoUrl);
                        // Convert common YouTube watch URL to embed form
                        if ((url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be"))) {
                          let videoId = "";
                          if (url.hostname.includes("youtu.be")) {
                            videoId = url.pathname.replace("/", "");
                          } else {
                            videoId = url.searchParams.get("v") || "";
                          }
                          const embedBase = "https://www.youtube.com/embed/";
                          return videoId ? `${embedBase}${videoId}` : lesson.videoUrl;
                        }
                        return lesson.videoUrl;
                      } catch {
                        return lesson.videoUrl;
                      }
                    })()}
                    style={{position:"absolute", inset:0, width:"100%", height:"100%", border:0}}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="small mt8">
                  Having trouble?{" "}
                  <a href={lesson.videoUrl} target="_blank" rel="noreferrer">Open in a new tab</a>
                </div>
              </>
            ) : (
              <>
                <div className="small">Video not available</div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="card mb16">
        <div className="card-body">
          {lesson.content.map((p, i)=>(<p key={i} style={{lineHeight:1.6}}>{p}</p>))}
          <div className="mt16">
            <div style={{fontWeight:800}}>Key takeaways</div>
            <ul>
              {lesson.keyTakeaways.map((k, idx)=>(<li key={idx}>{k}</li>))}
            </ul>
          </div>
        </div>
      </div>

      <div className="row" style={{justifyContent:"space-between"}}>
        <div className="row" style={{gap:8}}>
          {prev && <Button variant="ghost" onClick={()=>navigate(`/courses/${course.id}/lessons/${prev.id}`)} ariaLabel="Previous lesson">← Previous</Button>}
          {next && <Button variant="ghost" onClick={()=>navigate(`/courses/${course.id}/lessons/${next.id}`)} ariaLabel="Next lesson">Next →</Button>}
        </div>
        {!completed ? (
          <Button onClick={markDone} ariaLabel="Mark lesson as completed">Mark as Completed</Button>
        ) : (
          <Button onClick={()=>{ if(next){ navigate(`/courses/${course.id}/lessons/${next.id}`);} else { navigate(`/courses/${course.id}`);} }} ariaLabel="Go to next">
            {next ? "Go to Next Lesson" : "Back to Course"}
          </Button>
        )}
      </div>
    </Layout>
  );
}
