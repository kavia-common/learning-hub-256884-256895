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

  // Helper to convert YouTube/watch URLs to privacy-enhanced nocookie embeds
  const toEmbedSrc = (rawUrl) => {
    try{
      const url = new URL(rawUrl);
      const isYouTube = url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be");
      if(!isYouTube) return rawUrl;
      let videoId = "";
      if (url.hostname.includes("youtu.be")) {
        videoId = url.pathname.replace("/", "");
      } else {
        videoId = url.searchParams.get("v") || "";
      }
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : rawUrl;
    }catch{
      return rawUrl;
    }
  };

  const renderVideoBlock = (srcUrl) => (
    <>
      <div className="small" style={{marginBottom:8}}>Watch: {(() => { try { return new URL(srcUrl).hostname; } catch { return "video"; } })()}</div>
      <div style={{position:"relative", paddingTop:"56.25%", width:"100%", borderRadius:8, overflow:"hidden", boxShadow:"var(--shadow-md)", background:"var(--surface)"}}>
        <iframe
          title={`${lesson.title} video`}
          src={toEmbedSrc(srcUrl)}
          style={{position:"absolute", inset:0, width:"100%", height:"100%", border:0}}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="small mt8">
        Having trouble?{" "}
        <a href={srcUrl} target="_blank" rel="noreferrer">Open in a new tab</a>
      </div>
    </>
  );

  return (
    <Layout title={lesson.title} subtitle={lesson.description}>
      <div className="card mb16">
        <div className="card-body">
          <div className="row" style={{justifyContent:"space-between"}}>
            <div className="small">Video</div>
            <Badge kind={completed ? "success" : "info"}>{completed ? "Completed" : "In progress"}</Badge>
          </div>
          <div className="mt12 surface-alt" style={{border:"1px dashed var(--border)", padding:16, borderRadius:10}}>
            {lesson.videoUrl
              ? renderVideoBlock(lesson.videoUrl)
              : (
                <>
                  <div className="small">Video not available</div>
                </>
              )
            }
          </div>
        </div>
      </div>

      {Array.isArray(lesson.resources) && lesson.resources.length > 0 && (
        <div className="card mb16">
          <div className="card-body">
            <div style={{fontWeight:800, marginBottom:8}}>Resources</div>
            <ul className="m0">
              {lesson.resources.map((r, idx) => {
                const isVideo = String(r.type).toLowerCase() === "video";
                const provider = r.provider || (r.url ? (()=>{ try{ return new URL(r.url).hostname; }catch{ return ""; } })() : "");
                return (
                  <li key={idx} className="mb12">
                    <div className="row" style={{justifyContent:"space-between", alignItems:"flex-start"}}>
                      <div>
                        <div style={{fontWeight:700}}>
                          {isVideo ? "🎬 " : ""}{r.title || "Resource"}
                        </div>
                        <div className="small">
                          {provider ? `Provider: ${provider}` : ""}
                          {isVideo ? " • Type: Video" : ""}
                        </div>
                      </div>
                      <a className="btn ghost" href={r.url} target="_blank" rel="noreferrer">Open</a>
                    </div>
                    {isVideo && r.url && (
                      <div className="mt8 surface-alt" style={{border:"1px dashed var(--border)", padding:12, borderRadius:10}}>
                        {renderVideoBlock(r.url)}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

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
