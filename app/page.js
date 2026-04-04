"use client";
import { useState, useEffect, useRef } from "react";

const SAMPLE_CONTRACTS = {
  rental: {
    label: "🏠 Rental Agreement",
    text: `RENTAL AGREEMENT

This Rental Agreement is made between the Landlord (Mr. Ramesh Sharma) and the Tenant (Mr. Amit Kumar).

PROPERTY: The landlord agrees to rent the property located at Flat No. 302, Sunshine Apartments, Andheri West, Mumbai - 400058.

RENT: The monthly rent is Rs. 25,000 per month. Rent is due on the 1st of every month. Late payment will attract a penalty of Rs. 500 per day.

SECURITY DEPOSIT: The tenant shall pay a security deposit of Rs. 75,000 which will be refunded within 30 days after vacating, subject to deductions for damages.

DURATION: This agreement is valid for 11 months starting from 1st April 2024. It will auto-renew unless either party gives 2 months written notice.

TERMINATION: Either party can terminate this agreement with 2 months written notice. If tenant leaves before the agreement ends, the security deposit will be forfeited.

MAINTENANCE: Minor repairs up to Rs. 500 shall be the responsibility of the tenant. Major repairs shall be done by the landlord.

RESTRICTIONS: The tenant shall not sublet the property. No pets allowed. No loud music after 10 PM.

UTILITIES: Electricity, water, and maintenance charges shall be paid by the tenant separately.

DISPUTES: All disputes shall be resolved in the courts of Mumbai, Maharashtra, India.`
  },
  freelance: {
    label: "💻 Freelance Contract",
    text: `FREELANCE SERVICE AGREEMENT

This agreement is between TechStart Solutions Pvt Ltd (Client) and the Freelancer (Developer).

PROJECT: The Freelancer agrees to design and develop a complete e-commerce website with payment gateway integration.

PAYMENT: Total project cost is Rs. 1,20,000. Payment schedule:
- Rs. 40,000 upfront before work begins
- Rs. 40,000 after first milestone approval
- Rs. 40,000 after final delivery

LATE PAYMENT: If client delays payment beyond 7 days, a penalty of 2% per week will be charged.

CANCELLATION: If the client cancels the project after work has started, no refund will be given for work completed.

TIMELINE: The freelancer must complete the work within 60 days. Delay beyond 60 days will incur a penalty of Rs. 2,000 per day.

OWNERSHIP: All code and designs become the sole property of the Client only after full payment is received.

NON-COMPETE: The Freelancer cannot work for any direct competitor of the Client for 2 years after this contract ends.

CONFIDENTIALITY: The Freelancer cannot share any project details publicly or with third parties.

DISPUTES: All disputes will be resolved through arbitration in Mumbai, India.`
  },
  job: {
    label: "💼 Job Offer Letter",
    text: `JOB OFFER LETTER

Dear Candidate, We are pleased to offer you the position of Senior Software Engineer at InnovateTech Pvt Ltd.

SALARY: Your gross salary will be Rs. 18,00,000 per annum (Rs. 1,50,000 per month).

PROBATION: You will be on probation for 6 months. During probation, either party can terminate with 7 days notice. After probation, 3 months notice is required.

WORKING HOURS: Standard working hours are 9 AM to 6 PM, Monday to Friday. You may be required to work extra hours or weekends without additional compensation.

BOND: You are required to serve the company for a minimum of 2 years. If you leave before 2 years, you must pay Rs. 3,00,000 as bond penalty.

NON-COMPETE: For 1 year after leaving, you cannot join any direct competitor or start a competing business.

INTELLECTUAL PROPERTY: Any code or product developed during employment belongs entirely to the company, even if developed in personal time.

TERMINATION: The company reserves the right to terminate employment at any time for misconduct without notice.`
  },
  nda: {
    label: "🔒 NDA Agreement",
    text: `NON-DISCLOSURE AGREEMENT

This NDA is entered into between Alpha Innovations Pvt Ltd (Disclosing Party) and the Receiving Party.

CONFIDENTIAL INFORMATION: Includes all business plans, financial data, technical specifications, client lists, pricing strategies, and trade secrets.

OBLIGATIONS: The Receiving Party agrees to keep all confidential information strictly secret and not disclose to any third party.

DURATION: This NDA is valid for 5 years from the date of signing.

PENALTIES: Breach of this agreement will result in compensation of Rs. 50,00,000 as liquidated damages.

RETURN OF INFORMATION: Upon request, all confidential documents must be returned or destroyed within 48 hours.

NON-SOLICITATION: The Receiving Party shall not solicit or hire any employee of the Disclosing Party for 2 years.

JURISDICTION: All disputes shall be resolved in courts of Bangalore, Karnataka.`
  },
  loan: {
    label: "🏦 Loan Agreement",
    text: `PERSONAL LOAN AGREEMENT

This Loan Agreement is made between Sunrise Finance Pvt Ltd (Lender) and the Borrower.

LOAN AMOUNT: Rs. 5,00,000 (Five Lakh Rupees).

INTEREST RATE: 24% per annum (2% per month), calculated on reducing balance.

REPAYMENT: 24 equal monthly installments (EMI) of Rs. 25,870 each.

LATE PAYMENT: Any EMI paid after due date attracts a penalty of 3% per month on overdue amount.

PREPAYMENT: Allowed after 6 months with a prepayment penalty of 4% on outstanding principal.

DEFAULT: If the borrower defaults on 2 consecutive EMIs, the entire outstanding amount becomes immediately due.

PROCESSING FEE: Non-refundable processing fee of Rs. 10,000 deducted from loan amount before disbursement.

JURISDICTION: All disputes shall be settled in courts of Delhi, India only.`
  }
};

const CONTRACT_ICONS = {
  Rental: "🏠", Freelance: "💻", Employment: "💼",
  Service: "🤝", Loan: "🏦", Partnership: "🤲",
  NDA: "🔒", "Terms of Service": "📱", Other: "📄"
};

const SUGGESTED_QUESTIONS = [
  "What happens if I miss a payment?",
  "Can I cancel this contract early?",
  "What are my main obligations?",
  "Are there any hidden fees?",
  "What is the notice period?",
];

export default function Home() {
  const [document, setDocument] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("input");
  const [language, setLanguage] = useState("English");
  const [contractType, setContractType] = useState(null);
  const [riskScore, setRiskScore] = useState(null);
  const [history, setHistory] = useState([]);
  const [showSamples, setShowSamples] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("legallens-history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const saveToHistory = (doc, res, type, score, lang) => {
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-IN"),
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      preview: doc.slice(0, 70) + "...",
      result: res,
      contractType: type,
      riskScore: score,
      language: lang,
    };
    const updated = [entry, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem("legallens-history", JSON.stringify(updated));
  };

  const loadSample = (key) => {
    setDocument(SAMPLE_CONTRACTS[key].text);
    setShowSamples(false);
    setResult("");
    setError("");
    setContractType(null);
    setRiskScore(null);
    setChatMessages([]);
  };

  const analyzeDocument = async () => {
    if (!document.trim()) { setError("Please paste your legal document first."); return; }
    if (document.trim().length < 50) { setError("Document is too short."); return; }
    setLoading(true); setError(""); setResult(""); setContractType(null); setRiskScore(null); setChatMessages([]);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document, language }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else {
        setResult(data.result);
        setContractType(data.contractType);
        setRiskScore(data.riskScore);
        saveToHistory(document, data.result, data.contractType, data.riskScore, language);
        setActiveTab("result");
      }
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const sendChatMessage = async (questionOverride) => {
    const question = questionOverride || chatInput.trim();
    if (!question || chatLoading) return;
    setChatInput("");
    const newMessages = [...chatMessages, { role: "user", content: question }];
    setChatMessages(newMessages);
    setChatLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          contractText: document,
          chatHistory: chatMessages,
          language,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setChatMessages([...newMessages, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
      } else {
        setChatMessages([...newMessages, { role: "assistant", content: data.answer }]);
      }
    } catch {
      setChatMessages([...newMessages, { role: "assistant", content: "Network error. Please try again." }]);
    } finally {
      setChatLoading(false);
    }
  };

  const loadFromHistory = (item) => {
    setResult(item.result);
    setContractType(item.contractType);
    setRiskScore(item.riskScore);
    setChatMessages([]);
    setActiveTab("result");
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("legallens-history");
  };

  const parseSection = (text, heading) => {
    const regex = new RegExp(`## ${heading}([\\s\\S]*?)(?=## |$)`);
    const match = text.match(regex);
    return match ? match[1].trim() : null;
  };

  const formatLines = (text) => {
    if (!text) return <p style={{color:"#6b7280",fontStyle:"italic"}}>Not found in document.</p>;
    return text.split("\n").map((line, i) => {
      if (line.match(/\*\*(.*?)\*\*/)) {
        const parts = line.split(/\*\*(.*?)\*\*/);
        return <p key={i} style={{marginBottom:"6px"}}>{parts.map((p,j) => j%2===1 ? <strong key={j} style={{color:"#f9fafb"}}>{p}</strong> : p)}</p>;
      }
      if (line.includes("[HIGH RISK]")) return (
        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"8px",marginBottom:"10px"}}>
          <span style={{background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.4)",color:"#f87171",fontSize:"11px",fontWeight:"700",padding:"2px 8px",borderRadius:"20px",whiteSpace:"nowrap"}}>🔴 HIGH</span>
          <span style={{color:"#d1d5db",fontSize:"14px"}}>{line.replace(/- \[HIGH RISK\]/,"").trim()}</span>
        </div>
      );
      if (line.includes("[MEDIUM RISK]")) return (
        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"8px",marginBottom:"10px"}}>
          <span style={{background:"rgba(249,115,22,0.15)",border:"1px solid rgba(249,115,22,0.4)",color:"#fb923c",fontSize:"11px",fontWeight:"700",padding:"2px 8px",borderRadius:"20px",whiteSpace:"nowrap"}}>🟠 MEDIUM</span>
          <span style={{color:"#d1d5db",fontSize:"14px"}}>{line.replace(/- \[MEDIUM RISK\]/,"").trim()}</span>
        </div>
      );
      if (line.includes("[LOW RISK]")) return (
        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"8px",marginBottom:"10px"}}>
          <span style={{background:"rgba(234,179,8,0.15)",border:"1px solid rgba(234,179,8,0.4)",color:"#facc15",fontSize:"11px",fontWeight:"700",padding:"2px 8px",borderRadius:"20px",whiteSpace:"nowrap"}}>🟡 LOW</span>
          <span style={{color:"#d1d5db",fontSize:"14px"}}>{line.replace(/- \[LOW RISK\]/,"").trim()}</span>
        </div>
      );
      if (line.startsWith("- ")) return <li key={i} style={{marginLeft:"16px",marginBottom:"6px",color:"#d1d5db",fontSize:"14px"}}>{line.slice(2)}</li>;
      if (line.trim()==="") return <br key={i}/>;
      return <p key={i} style={{marginBottom:"6px",color:"#d1d5db",fontSize:"14px"}}>{line}</p>;
    });
  };

  const getRiskColor = (score) => {
    if (score >= 7) return "#ef4444";
    if (score >= 4) return "#f97316";
    return "#10b981";
  };

  const getRiskLabel = (score) => {
    if (score >= 7) return "HIGH RISK";
    if (score >= 4) return "MEDIUM RISK";
    return "LOW RISK";
  };

  const sections = [
    { icon:"📋", title:"TL;DR — Quick Summary", heading:"TL;DR", border:"#3b82f6" },
    { icon:"📝", title:"Detailed Summary", heading:"DETAILED SUMMARY", border:"#6366f1" },
    { icon:"🔍", title:"Key Clauses Extracted", heading:"KEY CLAUSES", border:"#8b5cf6" },
    { icon:"⚠️", title:"Risks Identified", heading:"RISKS IDENTIFIED", border:"#ef4444" },
    { icon:"🔄", title:"Plain Language Translation", heading:"SIMPLIFIED LANGUAGE", border:"#f59e0b" },
    { icon:"💡", title:"Suggestions & Negotiation Tips", heading:"SUGGESTIONS", border:"#10b981" },
    { icon:"❓", title:"Your Key Questions Answered", heading:"USER QUESTIONS", border:"#3b82f6" },
  ];

  return (
    <div style={{minHeight:"100vh",background:"#050914",color:"white",fontFamily:"'Segoe UI',sans-serif"}}>

      <div style={{position:"fixed",top:"-200px",left:"50%",transform:"translateX(-50%)",width:"800px",height:"400px",background:"radial-gradient(ellipse,rgba(59,130,246,0.08) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>

      {/* Header */}
      <div style={{borderBottom:"1px solid #1f2937",padding:"16px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:"rgba(5,9,20,0.9)",backdropFilter:"blur(12px)",zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <div style={{width:"36px",height:"36px",background:"linear-gradient(135deg,#3b82f6,#6366f1)",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"}}>⚖️</div>
          <div>
            <div style={{fontWeight:"800",fontSize:"18px",letterSpacing:"-0.5px"}}>LegalLens</div>
            <div style={{fontSize:"11px",color:"#6b7280"}}>AI Contract Analyzer · India Edition 🇮🇳</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <a href="/landing" style={{fontSize:"12px",color:"#6b7280",textDecoration:"none"}}>About</a>
          <div style={{width:"8px",height:"8px",background:"#10b981",borderRadius:"50%"}}/>
          <span style={{fontSize:"12px",color:"#10b981",fontWeight:"600"}}>Live</span>
        </div>
      </div>

      <div style={{maxWidth:"860px",margin:"0 auto",padding:"48px 24px",position:"relative",zIndex:1}}>

        {/* Hero */}
        <div style={{textAlign:"center",marginBottom:"48px"}}>
          <div style={{display:"inline-block",background:"rgba(59,130,246,0.1)",border:"1px solid rgba(59,130,246,0.3)",borderRadius:"20px",padding:"6px 16px",fontSize:"12px",color:"#60a5fa",fontWeight:"600",marginBottom:"20px",letterSpacing:"1px"}}>
            POWERED BY AI · FREE TO USE
          </div>
          <h1 style={{fontSize:"48px",fontWeight:"900",letterSpacing:"-2px",lineHeight:"1.1",marginBottom:"16px",background:"linear-gradient(135deg,#ffffff 0%,#93c5fd 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            Don't Sign Blind
          </h1>
          <p style={{color:"#6b7280",fontSize:"16px",maxWidth:"500px",margin:"0 auto",lineHeight:"1.6"}}>
            Paste any contract in English, Hindi or Marathi. Get instant risk analysis in Indian Rupees.
          </p>
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px",marginBottom:"40px"}}>
          {[
            {icon:"🔍", label:"Deep Analysis", value:"7 Sections"},
            {icon:"🌍", label:"Languages", value:"EN · HI · MR"},
            {icon:"⚡", label:"Results In", value:"~15 Seconds"},
          ].map((s,i) => (
            <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid #1f2937",borderRadius:"12px",padding:"16px",textAlign:"center"}}>
              <div style={{fontSize:"22px",marginBottom:"6px"}}>{s.icon}</div>
              <div style={{fontSize:"16px",fontWeight:"700",color:"#f9fafb"}}>{s.value}</div>
              <div style={{fontSize:"11px",color:"#6b7280",marginTop:"2px"}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:"4px",marginBottom:"24px",background:"rgba(255,255,255,0.03)",border:"1px solid #1f2937",borderRadius:"12px",padding:"4px"}}>
          {[
            {key:"input", label:"📄 Input"},
            {key:"result", label:"📊 Analysis"},
            {key:"history", label:`🕐 History (${history.length})`},
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{flex:1,padding:"10px",borderRadius:"8px",border:"none",cursor:"pointer",fontSize:"13px",fontWeight:"600",transition:"all 0.2s",background:activeTab===tab.key?"linear-gradient(135deg,#3b82f6,#6366f1)":"transparent",color:activeTab===tab.key?"white":"#6b7280"}}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* INPUT TAB */}
        {activeTab==="input" && (
          <div>
            <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"16px",padding:"24px"}}>
              <div style={{marginBottom:"20px"}}>
                <div style={{fontSize:"12px",color:"#6b7280",fontWeight:"600",letterSpacing:"1px",marginBottom:"10px"}}>SELECT OUTPUT LANGUAGE</div>
                <div style={{display:"flex",gap:"8px"}}>
                  {["English","Hindi","Marathi"].map((lang) => (
                    <button key={lang} onClick={() => setLanguage(lang)} style={{padding:"8px 18px",borderRadius:"8px",border:language===lang?"1px solid #3b82f6":"1px solid #1f2937",background:language===lang?"rgba(59,130,246,0.15)":"transparent",color:language===lang?"#60a5fa":"#9ca3af",fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>
                      {lang==="English"?"🇬🇧 English":lang==="Hindi"?"🇮🇳 Hindi":"🇮🇳 Marathi"}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{marginBottom:"20px"}}>
                <div style={{fontSize:"12px",color:"#6b7280",fontWeight:"600",letterSpacing:"1px",marginBottom:"10px"}}>📚 SAMPLE CONTRACTS LIBRARY</div>
                <button onClick={() => setShowSamples(!showSamples)} style={{width:"100%",padding:"12px",borderRadius:"10px",border:"1px dashed #374151",background:"transparent",color:"#9ca3af",fontSize:"13px",fontWeight:"600",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span>Try a sample contract to test LegalLens</span>
                  <span>{showSamples ? "▲" : "▼"}</span>
                </button>
                {showSamples && (
                  <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"8px",marginTop:"10px"}}>
                    {Object.entries(SAMPLE_CONTRACTS).map(([key, val]) => (
                      <button key={key} onClick={() => loadSample(key)} style={{padding:"12px 16px",borderRadius:"10px",border:"1px solid #1f2937",background:"rgba(255,255,255,0.03)",color:"#d1d5db",fontSize:"13px",fontWeight:"600",cursor:"pointer",textAlign:"left"}}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor="#3b82f6"}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor="#1f2937"}
                      >
                        {val.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div style={{marginBottom:"16px"}}>
                <div style={{fontSize:"12px",color:"#6b7280",fontWeight:"600",letterSpacing:"1px",marginBottom:"10px"}}>PASTE YOUR CONTRACT BELOW</div>
                <textarea
                  value={document}
                  onChange={(e) => setDocument(e.target.value)}
                  placeholder="Paste your rental agreement, job offer, freelance contract, or any legal document here..."
                  style={{width:"100%",height:"300px",background:"rgba(0,0,0,0.3)",border:"1px solid #1f2937",borderRadius:"12px",padding:"16px",color:"white",fontSize:"14px",resize:"vertical",outline:"none",fontFamily:"inherit",lineHeight:"1.6",boxSizing:"border-box"}}
                  onFocus={(e) => e.target.style.borderColor="#3b82f6"}
                  onBlur={(e) => e.target.style.borderColor="#1f2937"}
                />
              </div>

              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:"12px",color:"#4b5563"}}>
                  {document.length} chars · {document.trim().split(/\s+/).filter(Boolean).length} words
                </span>
                <div style={{display:"flex",gap:"10px"}}>
                  <button onClick={() => {setDocument("");setResult("");setError("");setContractType(null);setRiskScore(null);setChatMessages([]);}} style={{padding:"10px 20px",borderRadius:"8px",border:"1px solid #374151",background:"transparent",color:"#9ca3af",fontSize:"13px",cursor:"pointer",fontWeight:"600"}}>
                    Clear
                  </button>
                  <button onClick={analyzeDocument} disabled={loading} style={{padding:"10px 28px",borderRadius:"8px",border:"none",background:loading?"#1f2937":"linear-gradient(135deg,#3b82f6,#6366f1)",color:loading?"#6b7280":"white",fontSize:"13px",fontWeight:"700",cursor:loading?"not-allowed":"pointer"}}>
                    {loading ? "Analyzing..." : "Analyze Now"}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div style={{marginTop:"16px",background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"12px",padding:"14px 18px",color:"#fca5a5",fontSize:"14px"}}>
                {error}
              </div>
            )}

            {loading && (
              <div style={{marginTop:"16px",background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"16px",padding:"48px",textAlign:"center"}}>
                <div style={{fontSize:"48px",marginBottom:"16px"}}>⚖️</div>
                <p style={{color:"#9ca3af",fontSize:"16px",marginBottom:"8px"}}>Reading the fine print so you don't have to...</p>
                <p style={{color:"#4b5563",fontSize:"12px"}}>This may take 10 to 20 seconds</p>
              </div>
            )}
          </div>
        )}

        {/* RESULT TAB */}
        {activeTab==="result" && result && (
          <div>
            {/* Contract Type + Risk Score */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"20px"}}>
              <div style={{background:"rgba(99,102,241,0.1)",border:"1px solid rgba(99,102,241,0.3)",borderRadius:"12px",padding:"16px",display:"flex",alignItems:"center",gap:"12px"}}>
                <div style={{fontSize:"32px"}}>{CONTRACT_ICONS[contractType] || "📄"}</div>
                <div>
                  <div style={{fontSize:"11px",color:"#818cf8",fontWeight:"600",letterSpacing:"1px",marginBottom:"4px"}}>CONTRACT TYPE</div>
                  <div style={{fontSize:"18px",fontWeight:"800",color:"#f9fafb"}}>{contractType || "Unknown"}</div>
                </div>
              </div>
              <div style={{background:`rgba(${riskScore>=7?"239,68,68":riskScore>=4?"249,115,22":"16,185,129"},0.1)`,border:`1px solid rgba(${riskScore>=7?"239,68,68":riskScore>=4?"249,115,22":"16,185,129"},0.3)`,borderRadius:"12px",padding:"16px"}}>
                <div style={{fontSize:"11px",color:getRiskColor(riskScore),fontWeight:"600",letterSpacing:"1px",marginBottom:"8px"}}>RISK SCORE</div>
                <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
                  <div style={{fontSize:"28px",fontWeight:"900",color:getRiskColor(riskScore)}}>{riskScore}/10</div>
                  <div style={{flex:1}}>
                    <div style={{width:"100%",background:"rgba(255,255,255,0.1)",borderRadius:"4px",height:"6px"}}>
                      <div style={{width:`${riskScore*10}%`,background:getRiskColor(riskScore),borderRadius:"4px",height:"6px"}}/>
                    </div>
                    <div style={{fontSize:"11px",color:getRiskColor(riskScore),fontWeight:"700",marginTop:"4px"}}>{getRiskLabel(riskScore)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"20px"}}>
              <button onClick={() => navigator.clipboard.writeText(result)} style={{padding:"8px 14px",borderRadius:"8px",border:"1px solid #374151",background:"transparent",color:"#9ca3af",fontSize:"12px",cursor:"pointer",fontWeight:"600"}}>
                📋 Copy
              </button>
              <button onClick={() => window.print()} style={{padding:"8px 14px",borderRadius:"8px",border:"1px solid #374151",background:"transparent",color:"#9ca3af",fontSize:"12px",cursor:"pointer",fontWeight:"600"}}>
                🖨️ Print
              </button>
              <button onClick={() => { const b=new Blob([result],{type:"text/plain"}); const u=URL.createObjectURL(b); const a=window.document.createElement("a"); a.href=u; a.download="LegalLens-Report.txt"; a.click(); }} style={{padding:"8px 14px",borderRadius:"8px",border:"none",background:"linear-gradient(135deg,#10b981,#059669)",color:"white",fontSize:"12px",cursor:"pointer",fontWeight:"600"}}>
                ⬇️ Download
              </button>
            </div>

            {/* Analysis Sections */}
            {sections.map((section, i) => (
              <div key={i} style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderLeft:`3px solid ${section.border}`,borderRadius:"12px",padding:"20px",marginBottom:"12px"}}>
                <div style={{fontWeight:"700",fontSize:"15px",color:"#f9fafb",marginBottom:"12px",display:"flex",alignItems:"center",gap:"8px"}}>
                  <span>{section.icon}</span> {section.title}
                </div>
                <div style={{lineHeight:"1.7"}}>
                  {formatLines(parseSection(result, section.heading))}
                </div>
              </div>
            ))}

            {/* CHAT WITH CONTRACT */}
            <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(99,102,241,0.4)",borderLeft:"3px solid #6366f1",borderRadius:"12px",padding:"20px",marginTop:"24px"}}>
              <div style={{fontWeight:"700",fontSize:"15px",color:"#f9fafb",marginBottom:"4px",display:"flex",alignItems:"center",gap:"8px"}}>
                💬 Chat with this Contract
              </div>
              <p style={{fontSize:"12px",color:"#6b7280",marginBottom:"16px",marginTop:0}}>Ask any question about this contract and get an instant AI answer.</p>

              {/* Suggested Questions */}
              {chatMessages.length === 0 && (
                <div style={{marginBottom:"16px"}}>
                  <div style={{fontSize:"11px",color:"#6b7280",fontWeight:"600",letterSpacing:"1px",marginBottom:"8px"}}>SUGGESTED QUESTIONS</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <button key={i} onClick={() => sendChatMessage(q)} style={{padding:"7px 14px",borderRadius:"20px",border:"1px solid #374151",background:"rgba(255,255,255,0.03)",color:"#9ca3af",fontSize:"12px",cursor:"pointer",fontWeight:"500"}}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor="#6366f1"; e.currentTarget.style.color="#a78bfa"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor="#374151"; e.currentTarget.style.color="#9ca3af"; }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              {chatMessages.length > 0 && (
                <div style={{maxHeight:"320px",overflowY:"auto",marginBottom:"16px",display:"flex",flexDirection:"column",gap:"12px"}}>
                  {chatMessages.map((msg, i) => (
                    <div key={i} style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start"}}>
                      <div style={{maxWidth:"80%",padding:"10px 14px",borderRadius:msg.role==="user"?"12px 12px 4px 12px":"12px 12px 12px 4px",background:msg.role==="user"?"linear-gradient(135deg,#3b82f6,#6366f1)":"rgba(255,255,255,0.05)",border:msg.role==="assistant"?"1px solid #1f2937":"none",fontSize:"13px",lineHeight:"1.6",color:msg.role==="user"?"white":"#d1d5db"}}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div style={{display:"flex",justifyContent:"flex-start"}}>
                      <div style={{padding:"10px 14px",borderRadius:"12px 12px 12px 4px",background:"rgba(255,255,255,0.05)",border:"1px solid #1f2937",fontSize:"13px",color:"#6b7280"}}>
                        Thinking...
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef}/>
                </div>
              )}

              {/* Chat Input */}
              <div style={{display:"flex",gap:"8px"}}>
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key==="Enter" && sendChatMessage()}
                  placeholder="Ask anything about this contract..."
                  style={{flex:1,background:"rgba(0,0,0,0.3)",border:"1px solid #1f2937",borderRadius:"10px",padding:"10px 14px",color:"white",fontSize:"13px",outline:"none",fontFamily:"inherit"}}
                  onFocus={(e) => e.target.style.borderColor="#6366f1"}
                  onBlur={(e) => e.target.style.borderColor="#1f2937"}
                />
                <button
                  onClick={() => sendChatMessage()}
                  disabled={chatLoading || !chatInput.trim()}
                  style={{padding:"10px 20px",borderRadius:"10px",border:"none",background:chatLoading||!chatInput.trim()?"#1f2937":"linear-gradient(135deg,#6366f1,#8b5cf6)",color:chatLoading||!chatInput.trim()?"#6b7280":"white",fontSize:"13px",fontWeight:"700",cursor:chatLoading||!chatInput.trim()?"not-allowed":"pointer"}}
                >
                  Send
                </button>
              </div>
            </div>

            <p style={{textAlign:"center",color:"#374151",fontSize:"12px",marginTop:"24px"}}>
              LegalLens is an AI tool. Always consult a real lawyer for critical decisions.
            </p>
          </div>
        )}

        {activeTab==="result" && !result && (
          <div style={{textAlign:"center",padding:"80px 0",color:"#4b5563"}}>
            <div style={{fontSize:"48px",marginBottom:"16px"}}>📄</div>
            <p>No analysis yet. Go to Input tab and paste a document first.</p>
          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab==="history" && (
          <div>
            {history.length === 0 ? (
              <div style={{textAlign:"center",padding:"80px 0",color:"#4b5563"}}>
                <div style={{fontSize:"48px",marginBottom:"16px"}}>🕐</div>
                <p>No history yet. Analyze a document first.</p>
              </div>
            ) : (
              <div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"}}>
                  <span style={{color:"#6b7280",fontSize:"14px"}}>Last {history.length} analyses saved locally</span>
                  <button onClick={clearHistory} style={{padding:"6px 14px",borderRadius:"8px",border:"1px solid rgba(239,68,68,0.4)",background:"rgba(239,68,68,0.1)",color:"#f87171",fontSize:"12px",cursor:"pointer",fontWeight:"600"}}>
                    🗑️ Clear All
                  </button>
                </div>
                {history.map((item) => (
                  <div key={item.id} onClick={() => loadFromHistory(item)} style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"12px",padding:"16px",marginBottom:"10px",cursor:"pointer"}}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor="#3b82f6"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor="#1f2937"}
                  >
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"}}>
                          <span style={{fontSize:"20px"}}>{CONTRACT_ICONS[item.contractType] || "📄"}</span>
                          <span style={{fontSize:"13px",fontWeight:"700",color:"#f9fafb"}}>{item.contractType || "Unknown"}</span>
                          <span style={{background:"rgba(59,130,246,0.15)",border:"1px solid rgba(59,130,246,0.3)",color:"#60a5fa",fontSize:"10px",fontWeight:"600",padding:"2px 8px",borderRadius:"20px"}}>{item.language}</span>
                        </div>
                        <p style={{color:"#9ca3af",fontSize:"12px",marginBottom:"4px"}}>{item.preview}</p>
                        <p style={{color:"#4b5563",fontSize:"11px"}}>{item.date} · {item.time}</p>
                      </div>
                      <div style={{textAlign:"right",marginLeft:"16px"}}>
                        <div style={{fontSize:"20px",fontWeight:"900",color:getRiskColor(item.riskScore)}}>{item.riskScore}/10</div>
                        <div style={{fontSize:"10px",color:getRiskColor(item.riskScore),fontWeight:"700"}}>{getRiskLabel(item.riskScore)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
      <style>{`* { box-sizing: border-box; } textarea::placeholder { color: #374151; } input::placeholder { color: #374151; }`}</style>
    </div>
  );
}