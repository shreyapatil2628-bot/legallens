"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div style={{minHeight:"100vh",background:"#050914",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Segoe UI,sans-serif"}}>
      <div style={{width:"100%",maxWidth:"420px",padding:"24px"}}>

        <div style={{textAlign:"center",marginBottom:"40px"}}>
          <div style={{width:"48px",height:"48px",background:"linear-gradient(135deg,#3b82f6,#6366f1)",borderRadius:"14px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px",margin:"0 auto 16px"}}>
            ⚖️
          </div>
          <h1 style={{fontSize:"28px",fontWeight:"900",color:"white",letterSpacing:"-1px",marginBottom:"8px"}}>
            Welcome Back
          </h1>
          <p style={{color:"#6b7280",fontSize:"14px"}}>Login to your LegalLens account</p>
        </div>

        <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"16px",padding:"24px"}}>

          <div style={{marginBottom:"16px"}}>
            <label style={{display:"block",fontSize:"12px",color:"#6b7280",fontWeight:"600",letterSpacing:"1px",marginBottom:"8px"}}>
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{width:"100%",background:"rgba(0,0,0,0.3)",border:"1px solid #1f2937",borderRadius:"10px",padding:"12px 16px",color:"white",fontSize:"14px",outline:"none",boxSizing:"border-box"}}
              onFocus={(e) => e.target.style.borderColor="#3b82f6"}
              onBlur={(e) => e.target.style.borderColor="#1f2937"}
            />
          </div>

          <div style={{marginBottom:"24px"}}>
            <label style={{display:"block",fontSize:"12px",color:"#6b7280",fontWeight:"600",letterSpacing:"1px",marginBottom:"8px"}}>
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              style={{width:"100%",background:"rgba(0,0,0,0.3)",border:"1px solid #1f2937",borderRadius:"10px",padding:"12px 16px",color:"white",fontSize:"14px",outline:"none",boxSizing:"border-box"}}
              onFocus={(e) => e.target.style.borderColor="#3b82f6"}
              onBlur={(e) => e.target.style.borderColor="#1f2937"}
            />
          </div>

          {error && (
            <div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"10px",padding:"12px",color:"#fca5a5",fontSize:"13px",marginBottom:"16px"}}>
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{width:"100%",padding:"13px",borderRadius:"10px",border:"none",background:loading?"#1f2937":"linear-gradient(135deg,#3b82f6,#6366f1)",color:loading?"#6b7280":"white",fontSize:"14px",fontWeight:"700",cursor:loading?"not-allowed":"pointer"}}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p style={{textAlign:"center",color:"#6b7280",fontSize:"14px",marginTop:"20px"}}>
          Don't have an account?{" "}
          <a href="/signup" style={{color:"#60a5fa",fontWeight:"600",textDecoration:"none"}}>
            Sign Up
          </a>
        </p>

      </div>
    </div>
  );
}