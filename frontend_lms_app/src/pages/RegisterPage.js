import React, { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { setUser, getUser } from "../js/storage";
import { useNavigate, Navigate, Link } from "react-router-dom";

/** PUBLIC_INTERFACE
 * RegisterPage - mock registration
 * Minimal client-side register that persists a mock user in localStorage.
 */
export default function RegisterPage(){
  const existing = getUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  if(existing) return <Navigate to="/" replace />;

  const onSubmit = (e)=>{
    e.preventDefault();
    if(!email || !name){ alert("Please enter name and email"); return; }
    setUser({ id: Date.now().toString(), name, email });
    navigate("/");
  };

  return (
    <div className="container">
      <div className="grid" style={{gridTemplateColumns:"1fr", maxWidth:520, margin:"40px auto"}}>
        <Card title="Create your account" subtitle="Start learning today">
          <form onSubmit={onSubmit}>
            <label className="small" htmlFor="name">Full Name</label>
            <input id="name" className="input mb12" value={name} onChange={e=>setName(e.target.value)} placeholder="Jane Doe" aria-label="Full Name"/>
            <label className="small" htmlFor="email">Email</label>
            <input id="email" className="input mb16" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="jane@example.com" aria-label="Email"/>
            <Button type="submit" ariaLabel="Register">Register</Button>
            <div className="small mt16">Already have an account? <Link to="/login">Login</Link></div>
          </form>
        </Card>
      </div>
    </div>
  );
}
