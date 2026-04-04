"use client";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();

  return (
    <div style={{minHeight:"100vh",background:"#050914",color:"white",fontFamily:"'Segoe UI',sans-serif"}}>

      {/* Background glow */}
      <div style={{position:"fixed",top:"-200px",left:"50%",transform:"translateX(-50%)",width:"800px",height:"400px",background:"radial-gradient(ellipse,rgba(59,130,246,0.1) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>

      {/* Header */}
      <div style={{borderBottom:"1px solid #1f2937",padding:"16px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:"rgba(5,9,20,0.9)",backdropFilter:"blur(12px)",zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <div style={{width:"36px",height:"36px",background:"linear-gradient(135deg,#3b82f6,#6366f1)",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"}}>⚖️</div>
          <div>
            <div style={{fontWeight:"800",fontSize:"18px",letterSpacing:"-0.5px"}}>LegalLens</div>
            <div style={{fontSize:"11px",color:"#6b7280"}}>AI Contract Analyzer</div>
          </div>
        </div>
        <button
          onClick={() => router.push("/")}
          style={{padding:"10px 24px",borderRadius:"8px",border:"none",background:"linear-gradient(135deg,#3b82f6,#6366f1)",color:"white",fontSize:"13px",fontWeight:"700",cursor:"pointer"}}
        >
          Start Analyzing
        </button>
      </div>

      <div style={{maxWidth:"900px",margin:"0 auto",padding:"0 24px",position:"relative",zIndex:1}}>

        {/* Hero Section */}
        <div style={{textAlign:"center",padding:"100px 0 80px"}}>
          <div style={{display:"inline-block",background:"rgba(59,130,246,0.1)",border:"1px solid rgba(59,130,246,0.3)",borderRadius:"20px",padding:"6px 16px",fontSize:"12px",color:"#60a5fa",fontWeight:"600",marginBottom:"24px",letterSpacing:"1px"}}>
            🇮🇳 MADE FOR INDIA · FREE TO USE · POWERED BY AI
          </div>
          <h1 style={{fontSize:"56px",fontWeight:"900",letterSpacing:"-2px",lineHeight:"1.1",marginBottom:"24px",background:"linear-gradient(135deg,#ffffff 0%,#93c5fd 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            Understand Any Contract<br/>Before You Sign
          </h1>
          <p style={{color:"#6b7280",fontSize:"18px",maxWidth:"600px",margin:"0 auto 40px",lineHeight:"1.7"}}>
            LegalLens uses AI to analyze legal documents in seconds. Get plain-English explanations, risk detection, and negotiation tips — in English, Hindi, or Marathi.
          </p>
          <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
            <button
              onClick={() => router.push("/")}
              style={{padding:"14px 36px",borderRadius:"10px",border:"none",background:"linear-gradient(135deg,#3b82f6,#6366f1)",color:"white",fontSize:"15px",fontWeight:"700",cursor:"pointer"}}
            >
              Analyze a Contract Free
            </button>
            <button
              onClick={() => document.getElementById("how").scrollIntoView({behavior:"smooth"})}
              style={{padding:"14px 36px",borderRadius:"10px",border:"1px solid #374151",background:"transparent",color:"#9ca3af",fontSize:"15px",fontWeight:"700",cursor:"pointer"}}
            >
              How it Works
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"16px",marginBottom:"80px"}}>
          {[
            {value:"7", label:"Analysis Sections"},
            {value:"3", label:"Languages Supported"},
            {value:"5", label:"Contract Types"},
            {value:"Free", label:"Always Free"},
          ].map((s,i) => (
            <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid #1f2937",borderRadius:"12px",padding:"20px",textAlign:"center"}}>
              <div style={{fontSize:"28px",fontWeight:"900",color:"#60a5fa",marginBottom:"4px"}}>{s.value}</div>
              <div style={{fontSize:"12px",color:"#6b7280"}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{marginBottom:"80px"}}>
          <div style={{textAlign:"center",marginBottom:"48px"}}>
            <h2 style={{fontSize:"36px",fontWeight:"900",letterSpacing:"-1px",marginBottom:"12px"}}>
              Everything You Need to Stay Safe
            </h2>
            <p style={{color:"#6b7280",fontSize:"16px"}}>LegalLens gives you complete contract intelligence in seconds</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"20px"}}>
            {[
              {icon:"🔴", title:"Risk Detection", desc:"Automatically identifies HIGH, MEDIUM and LOW risk clauses in any contract"},
              {icon:"📋", title:"Plain English", desc:"Rewrites complex legal language into simple words anyone can understand"},
              {icon:"🌍", title:"3 Languages", desc:"Analyze contracts and get results in English, Hindi, or Marathi"},
              {icon:"💡", title:"Negotiation Tips", desc:"Get specific suggestions on what to negotiate or change before signing"},
              {icon:"🏷️", title:"Auto Detection", desc:"Automatically identifies contract type — Rental, Freelance, Job Offer, NDA and more"},
              {icon:"📊", title:"Risk Score", desc:"Visual risk score from 1-10 so you know exactly how dangerous a contract is"},
            ].map((f,i) => (
              <div key={i} style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"14px",padding:"24px"}}>
                <div style={{fontSize:"32px",marginBottom:"12px"}}>{f.icon}</div>
                <div style={{fontWeight:"700",fontSize:"16px",marginBottom:"8px",color:"#f9fafb"}}>{f.title}</div>
                <div style={{color:"#6b7280",fontSize:"14px",lineHeight:"1.6"}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div id="how" style={{marginBottom:"80px"}}>
          <div style={{textAlign:"center",marginBottom:"48px"}}>
            <h2 style={{fontSize:"36px",fontWeight:"900",letterSpacing:"-1px",marginBottom:"12px"}}>
              How LegalLens Works
            </h2>
            <p style={{color:"#6b7280",fontSize:"16px"}}>Get contract analysis in 3 simple steps</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"20px"}}>
            {[
              {step:"01", icon:"📄", title:"Paste Your Contract", desc:"Copy and paste any legal document or choose from our sample contracts library"},
              {step:"02", icon:"⚡", title:"AI Analyzes It", desc:"Our AI reads the entire contract and identifies risks, clauses, and red flags in seconds"},
              {step:"03", icon:"✅", title:"Get Full Report", desc:"Receive a complete analysis with risk score, plain English translation, and negotiation tips"},
            ].map((s,i) => (
              <div key={i} style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"14px",padding:"28px",position:"relative"}}>
                <div style={{fontSize:"48px",fontWeight:"900",color:"#1f2937",position:"absolute",top:"16px",right:"20px"}}>{s.step}</div>
                <div style={{fontSize:"36px",marginBottom:"16px"}}>{s.icon}</div>
                <div style={{fontWeight:"700",fontSize:"16px",marginBottom:"8px",color:"#f9fafb"}}>{s.title}</div>
                <div style={{color:"#6b7280",fontSize:"14px",lineHeight:"1.6"}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contract Types */}
        <div style={{marginBottom:"80px"}}>
          <div style={{textAlign:"center",marginBottom:"48px"}}>
            <h2 style={{fontSize:"36px",fontWeight:"900",letterSpacing:"-1px",marginBottom:"12px"}}>
              Works With Any Contract
            </h2>
            <p style={{color:"#6b7280",fontSize:"16px"}}>LegalLens can analyze all types of legal documents</p>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:"12px",justifyContent:"center"}}>
            {[
              "🏠 Rental Agreement",
              "💻 Freelance Contract",
              "💼 Job Offer Letter",
              "🔒 NDA Agreement",
              "🏦 Loan Agreement",
              "🤝 Service Agreement",
              "🤲 Partnership Deed",
              "📱 Terms of Service",
              "🏥 Insurance Policy",
              "📝 Any Legal Document",
            ].map((type,i) => (
              <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid #1f2937",borderRadius:"20px",padding:"10px 20px",fontSize:"14px",fontWeight:"600",color:"#9ca3af"}}>
                {type}
              </div>
            ))}
          </div>
        </div>

        {/* Language Section */}
        <div style={{marginBottom:"80px",background:"rgba(59,130,246,0.05)",border:"1px solid rgba(59,130,246,0.2)",borderRadius:"20px",padding:"48px",textAlign:"center"}}>
          <h2 style={{fontSize:"32px",fontWeight:"900",letterSpacing:"-1px",marginBottom:"12px"}}>
            Available in 3 Indian Languages
          </h2>
          <p style={{color:"#6b7280",fontSize:"16px",marginBottom:"32px"}}>
            Get your contract analysis in the language you are most comfortable with
          </p>
          <div style={{display:"flex",gap:"20px",justifyContent:"center",flexWrap:"wrap"}}>
            {[
              {flag:"🇬🇧", lang:"English", desc:"Full analysis in English"},
              {flag:"🇮🇳", lang:"हिंदी", desc:"Hindi mein poora analysis"},
              {flag:"🇮🇳", lang:"मराठी", desc:"Marathi madhe sampurna vishleshan"},
            ].map((l,i) => (
              <div key={i} style={{background:"rgba(255,255,255,0.05)",border:"1px solid #1f2937",borderRadius:"14px",padding:"24px 32px",textAlign:"center"}}>
                <div style={{fontSize:"36px",marginBottom:"8px"}}>{l.flag}</div>
                <div style={{fontSize:"20px",fontWeight:"800",color:"#f9fafb",marginBottom:"4px"}}>{l.lang}</div>
                <div style={{fontSize:"13px",color:"#6b7280"}}>{l.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{marginBottom:"80px"}}>
          <div style={{textAlign:"center",marginBottom:"48px"}}>
            <h2 style={{fontSize:"36px",fontWeight:"900",letterSpacing:"-1px",marginBottom:"12px"}}>
              Frequently Asked Questions
            </h2>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
            {[
              {q:"Is LegalLens free to use?", a:"Yes! LegalLens is completely free to use. No signup required to analyze contracts."},
              {q:"Is my contract data safe?", a:"Yes. Your contract text is only sent to the AI for analysis and is never stored on our servers."},
              {q:"Which languages are supported?", a:"LegalLens supports English, Hindi, and Marathi. You can paste contracts in any of these languages and get analysis in your preferred language."},
              {q:"Can LegalLens replace a lawyer?", a:"No. LegalLens is an AI tool designed to help you understand contracts better. Always consult a qualified lawyer for critical legal decisions."},
              {q:"What types of contracts can I analyze?", a:"Any legal document — rental agreements, job offers, freelance contracts, NDAs, loan agreements, service agreements, and more."},
              {q:"How accurate is the analysis?", a:"LegalLens uses advanced AI to provide accurate analysis. However, it may not catch every nuance. Use it as a first check before consulting a lawyer."},
            ].map((item,i) => (
              <div key={i} style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"12px",padding:"20px 24px"}}>
                <div style={{fontWeight:"700",fontSize:"15px",color:"#f9fafb",marginBottom:"8px"}}>❓ {item.q}</div>
                <div style={{color:"#6b7280",fontSize:"14px",lineHeight:"1.6"}}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{textAlign:"center",marginBottom:"80px",background:"linear-gradient(135deg,rgba(59,130,246,0.1),rgba(99,102,241,0.1))",border:"1px solid rgba(59,130,246,0.2)",borderRadius:"20px",padding:"60px 40px"}}>
          <h2 style={{fontSize:"40px",fontWeight:"900",letterSpacing:"-1px",marginBottom:"16px"}}>
            Ready to Analyze Your Contract?
          </h2>
          <p style={{color:"#6b7280",fontSize:"16px",marginBottom:"32px"}}>
            Free · No signup required · Results in 15 seconds
          </p>
          <button
            onClick={() => router.push("/")}
            style={{padding:"16px 48px",borderRadius:"12px",border:"none",background:"linear-gradient(135deg,#3b82f6,#6366f1)",color:"white",fontSize:"16px",fontWeight:"700",cursor:"pointer"}}
          >
            Start Analyzing Now — It's Free
          </button>
        </div>

      </div>

      {/* Footer */}
      <div style={{borderTop:"1px solid #1f2937",padding:"32px",textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",marginBottom:"16px"}}>
          <div style={{width:"28px",height:"28px",background:"linear-gradient(135deg,#3b82f6,#6366f1)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px"}}>⚖️</div>
          <span style={{fontWeight:"800",fontSize:"16px"}}>LegalLens</span>
        </div>
        <p style={{color:"#4b5563",fontSize:"13px",marginBottom:"8px"}}>
          AI-Powered Contract Analyzer · India Edition 🇮🇳
        </p>
        <p style={{color:"#374151",fontSize:"12px"}}>
          LegalLens is an AI tool. Always consult a qualified lawyer for critical legal decisions.
        </p>
      </div>

      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  );
}