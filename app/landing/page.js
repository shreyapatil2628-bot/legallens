"use client";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();

  const features = [
    { icon: "🔴", title: "Finds Red Flags", desc: "Hidden fees, auto-renewals, one-sided clauses, cancellation penalties detected instantly." },
    { icon: "📝", title: "Plain English", desc: "Rewrites confusing legal language into simple terms anyone can understand." },
    { icon: "🎯", title: "Risk Score", desc: "Overall risk score out of 10 so you know exactly how safe the contract is." },
    { icon: "💡", title: "Negotiation Tips", desc: "Tells you what to ask for and what to change before signing." },
    { icon: "🌍", title: "3 Languages", desc: "Works in English, Hindi, and Marathi — built for Indian contracts." },
    { icon: "⚡", title: "15 Seconds", desc: "Full deep analysis in under 15 seconds — faster than reading the first page." },
  ];

  const steps = [
    { num: "01", title: "Paste your contract", desc: "Copy-paste any legal document, or pick one of 5 built-in sample contracts to try instantly." },
    { num: "02", title: "Select your language", desc: "Choose English, Hindi, or Marathi for your results." },
    { num: "03", title: "Click Analyze", desc: "AI reads every clause, detects risks, and gives a complete 7-section breakdown." },
    { num: "04", title: "Review and download", desc: "Get your full report, copy it, or download it to share with a lawyer." },
  ];

  const contractTypes = [
    { icon: "🏠", label: "Rental Agreement" },
    { icon: "💻", label: "Freelance Contract" },
    { icon: "💼", label: "Job Offer Letter" },
    { icon: "🔒", label: "NDA Agreement" },
    { icon: "🏦", label: "Loan Agreement" },
    { icon: "🤝", label: "Service Agreement" },
    { icon: "🤲", label: "Partnership Deed" },
    { icon: "📱", label: "Terms of Service" },
  ];

  const faqs = [
    { q: "Is LegalLens free to use?", a: "Yes, completely free. No signup, no payment, no limits." },
    { q: "Is my contract data safe?", a: "Your document is only used to generate the analysis and is never stored or shared." },
    { q: "Which languages are supported?", a: "English, Hindi, and Marathi. You can paste contracts in any of these languages." },
    { q: "Can it replace a real lawyer?", a: "No. LegalLens is an AI tool to help you understand contracts faster. Always consult a qualified lawyer for critical decisions." },
    { q: "What types of contracts work?", a: "Any text-based contract — rental, freelance, job offer, NDA, loan, service agreements, and more." },
  ];

  return (
    <div style={{minHeight:"100vh",background:"#050914",color:"white",fontFamily:"'Segoe UI',sans-serif"}}>

      <div style={{position:"fixed",top:"-200px",left:"50%",transform:"translateX(-50%)",width:"900px",height:"500px",background:"radial-gradient(ellipse,rgba(59,130,246,0.07) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>

      {/* Nav */}
      <nav style={{borderBottom:"1px solid #1f2937",padding:"16px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:"rgba(5,9,20,0.92)",backdropFilter:"blur(12px)",zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <div style={{width:"34px",height:"34px",background:"linear-gradient(135deg,#3b82f6,#6366f1)",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"17px"}}>⚖️</div>
          <div>
            <div style={{fontWeight:"800",fontSize:"17px",letterSpacing:"-0.5px"}}>LegalLens</div>
            <div style={{fontSize:"10px",color:"#6b7280"}}>AI Contract Analyzer · India Edition 🇮🇳</div>
          </div>
        </div>
        <button
          onClick={() => router.push("/")}
          style={{padding:"9px 22px",borderRadius:"8px",border:"none",background:"linear-gradient(135deg,#3b82f6,#6366f1)",color:"white",fontSize:"13px",fontWeight:"700",cursor:"pointer"}}
        >
          Start Analyzing Free →
        </button>
      </nav>

      <div style={{maxWidth:"900px",margin:"0 auto",padding:"0 24px",position:"relative",zIndex:1}}>

        {/* Hero */}
        <div style={{textAlign:"center",padding:"80px 0 60px"}}>
          <div style={{display:"inline-block",background:"rgba(59,130,246,0.1)",border:"1px solid rgba(59,130,246,0.3)",borderRadius:"20px",padding:"5px 16px",fontSize:"11px",color:"#60a5fa",fontWeight:"600",marginBottom:"24px",letterSpacing:"1.5px"}}>
            FREE · AI-POWERED · INDIA EDITION
          </div>
          <h1 style={{fontSize:"52px",fontWeight:"900",letterSpacing:"-2.5px",lineHeight:"1.05",marginBottom:"20px",background:"linear-gradient(135deg,#ffffff 0%,#93c5fd 60%,#a78bfa 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            Don't Sign Any<br/>Contract Blind
          </h1>
          <p style={{color:"#9ca3af",fontSize:"17px",maxWidth:"520px",margin:"0 auto 36px",lineHeight:"1.7"}}>
            Paste any legal document in <strong style={{color:"#d1d5db"}}>English, Hindi or Marathi</strong>. Get instant risk analysis, plain-English summaries, and negotiation tips in Indian Rupees.
          </p>
          <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
            <button
              onClick={() => router.push("/")}
              style={{padding:"14px 32px",borderRadius:"10px",border:"none",background:"linear-gradient(135deg,#3b82f6,#6366f1)",color:"white",fontSize:"15px",fontWeight:"700",cursor:"pointer"}}
            >
              ⚡ Analyze Your Contract Free
            </button>
            <button
              onClick={() => router.push("/")}
              style={{padding:"14px 24px",borderRadius:"10px",border:"1px solid #374151",background:"transparent",color:"#9ca3af",fontSize:"15px",fontWeight:"600",cursor:"pointer"}}
            >
              Try Sample Contract
            </button>
          </div>
          <p style={{color:"#4b5563",fontSize:"12px",marginTop:"16px"}}>No signup required · Results in 15 seconds · 100% free</p>
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"12px",marginBottom:"80px"}}>
          {[
            {value:"7", label:"Analysis Sections"},
            {value:"3", label:"Languages"},
            {value:"5", label:"Sample Contracts"},
            {value:"~15s", label:"Analysis Time"},
          ].map((s,i) => (
            <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid #1f2937",borderRadius:"12px",padding:"20px",textAlign:"center"}}>
              <div style={{fontSize:"26px",fontWeight:"900",color:"#f9fafb",marginBottom:"4px"}}>{s.value}</div>
              <div style={{fontSize:"11px",color:"#6b7280"}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{marginBottom:"80px"}}>
          <div style={{textAlign:"center",marginBottom:"40px"}}>
            <div style={{fontSize:"11px",color:"#6b7280",fontWeight:"600",letterSpacing:"2px",marginBottom:"12px"}}>WHAT LEGALLENS DOES</div>
            <h2 style={{fontSize:"32px",fontWeight:"900",letterSpacing:"-1px",color:"#f9fafb",margin:0}}>Everything you need before signing</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px"}}>
            {features.map((f,i) => (
              <div key={i} style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"14px",padding:"24px"}}>
                <div style={{fontSize:"28px",marginBottom:"12px"}}>{f.icon}</div>
                <div style={{fontSize:"15px",fontWeight:"700",color:"#f9fafb",marginBottom:"8px"}}>{f.title}</div>
                <div style={{fontSize:"13px",color:"#6b7280",lineHeight:"1.6"}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div style={{marginBottom:"80px"}}>
          <div style={{textAlign:"center",marginBottom:"40px"}}>
            <div style={{fontSize:"11px",color:"#6b7280",fontWeight:"600",letterSpacing:"2px",marginBottom:"12px"}}>HOW IT WORKS</div>
            <h2 style={{fontSize:"32px",fontWeight:"900",letterSpacing:"-1px",color:"#f9fafb",margin:0}}>Simple 4-step process</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"16px"}}>
            {steps.map((s,i) => (
              <div key={i} style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"14px",padding:"24px",display:"flex",gap:"16px",alignItems:"flex-start"}}>
                <div style={{fontSize:"28px",fontWeight:"900",color:"rgba(59,130,246,0.4)",minWidth:"40px"}}>{s.num}</div>
                <div>
                  <div style={{fontSize:"15px",fontWeight:"700",color:"#f9fafb",marginBottom:"6px"}}>{s.title}</div>
                  <div style={{fontSize:"13px",color:"#6b7280",lineHeight:"1.6"}}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contract Types */}
        <div style={{marginBottom:"80px"}}>
          <div style={{textAlign:"center",marginBottom:"32px"}}>
            <div style={{fontSize:"11px",color:"#6b7280",fontWeight:"600",letterSpacing:"2px",marginBottom:"12px"}}>SUPPORTED CONTRACTS</div>
            <h2 style={{fontSize:"32px",fontWeight:"900",letterSpacing:"-1px",color:"#f9fafb",margin:0}}>Works with any legal document</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px"}}>
            {contractTypes.map((c,i) => (
              <div key={i} style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"12px",padding:"18px",textAlign:"center",cursor:"pointer",transition:"all 0.2s"}}
                onMouseEnter={(e) => e.currentTarget.style.borderColor="#3b82f6"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor="#1f2937"}
              >
                <div style={{fontSize:"26px",marginBottom:"8px"}}>{c.icon}</div>
                <div style={{fontSize:"12px",color:"#9ca3af",fontWeight:"600"}}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{marginBottom:"80px"}}>
          <div style={{textAlign:"center",marginBottom:"40px"}}>
            <div style={{fontSize:"11px",color:"#6b7280",fontWeight:"600",letterSpacing:"2px",marginBottom:"12px"}}>FAQ</div>
            <h2 style={{fontSize:"32px",fontWeight:"900",letterSpacing:"-1px",color:"#f9fafb",margin:0}}>Frequently asked questions</h2>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
            {faqs.map((f,i) => (
              <div key={i} style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"12px",padding:"20px"}}>
                <div style={{fontSize:"14px",fontWeight:"700",color:"#f9fafb",marginBottom:"8px"}}>{f.q}</div>
                <div style={{fontSize:"13px",color:"#6b7280",lineHeight:"1.6"}}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{background:"linear-gradient(135deg,rgba(59,130,246,0.12),rgba(99,102,241,0.12))",border:"1px solid rgba(99,102,241,0.3)",borderRadius:"20px",padding:"56px 40px",textAlign:"center",marginBottom:"60px"}}>
          <h2 style={{fontSize:"36px",fontWeight:"900",letterSpacing:"-1.5px",color:"#f9fafb",marginBottom:"12px",marginTop:0}}>Ready to analyze your contract?</h2>
          <p style={{color:"#9ca3af",fontSize:"15px",marginBottom:"28px"}}>Free forever. No signup needed. Results in 15 seconds.</p>
          <button
            onClick={() => router.push("/")}
            style={{padding:"14px 40px",borderRadius:"10px",border:"none",background:"linear-gradient(135deg,#3b82f6,#6366f1)",color:"white",fontSize:"15px",fontWeight:"700",cursor:"pointer"}}
          >
            ⚡ Start Analyzing Now
          </button>
        </div>

        {/* Footer */}
        <div style={{borderTop:"1px solid #1f2937",padding:"28px 0",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px",marginBottom:"24px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <div style={{width:"28px",height:"28px",background:"linear-gradient(135deg,#3b82f6,#6366f1)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px"}}>⚖️</div>
            <span style={{fontWeight:"700",fontSize:"14px"}}>LegalLens</span>
            <span style={{color:"#4b5563",fontSize:"12px"}}>· India Edition 🇮🇳</span>
          </div>
          <p style={{color:"#4b5563",fontSize:"11px",margin:0}}>AI tool only. Not a substitute for legal advice. Always consult a qualified lawyer for critical decisions.</p>
        </div>

      </div>

      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  );
}