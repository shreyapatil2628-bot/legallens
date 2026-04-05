"use client";
import { useState, useEffect, useRef } from "react";

const SAMPLE_CONTRACTS = {
  rental: {
    label: "🏠 Rental Agreement",
    text: `RENTAL AGREEMENT

This Rental Agreement is made between the Landlord (Mr. Ramesh Sharma) and the Tenant (Mr. Amit Kumar).

PROPERTY: Flat No. 302, Sunshine Apartments, Andheri West, Mumbai - 400058.

RENT: The monthly rent is Rs. 25,000 per month. Rent is due on the 1st of every month. Late payment will attract a penalty of Rs. 500 per day.

SECURITY DEPOSIT: The tenant shall pay a security deposit of Rs. 75,000 which will be refunded within 30 days after vacating, subject to deductions for damages.

DURATION: This agreement is valid for 11 months starting from 1st April 2024. It will auto-renew unless either party gives 2 months written notice.

TERMINATION: Either party can terminate with 2 months written notice. If tenant leaves before the agreement ends, the security deposit will be forfeited.

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

CANCELLATION: If the client cancels after work has started, no refund will be given for work completed.

TIMELINE: The freelancer must complete the work within 60 days. Delay beyond 60 days will incur a penalty of Rs. 2,000 per day.

OWNERSHIP: All code and designs become the sole property of the Client only after full payment is received.

NON-COMPETE: The Freelancer cannot work for any direct competitor for 2 years after this contract ends.

CONFIDENTIALITY: The Freelancer cannot share any project details publicly or with third parties.

DISPUTES: All disputes will be resolved through arbitration in Mumbai, India.`
  },
  job: {
    label: "💼 Job Offer Letter",
    text: `JOB OFFER LETTER

Dear Candidate, We are pleased to offer you the position of Senior Software Engineer at InnovateTech Pvt Ltd.

SALARY: Your gross salary will be Rs. 18,00,000 per annum (Rs. 1,50,000 per month).

PROBATION: You will be on probation for 6 months. During probation, either party can terminate with 7 days notice. After probation, 3 months notice is required.

WORKING HOURS: 9 AM to 6 PM, Monday to Friday. You may be required to work extra hours or weekends without additional compensation.

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
  },
  internship: {
    label: "🎓 Internship Agreement",
    text: `INTERNSHIP AGREEMENT

This Internship Agreement is made between InnovateTech Pvt Ltd (Company) and the Intern.

POSITION: The Intern will work as a Software Development Intern in the Technology Department.

DURATION: This internship is for 3 months starting from 1st May 2024 to 31st July 2024.

STIPEND: The Intern will receive a monthly stipend of Rs. 8,000 per month. No other benefits will be provided.

WORKING HOURS: The Intern must work 9 AM to 6 PM, Monday to Friday. More than 3 absences will result in stipend deduction.

CONFIDENTIALITY: The Intern must not share any company data, code, or business strategies with anyone outside the company.

INTELLECTUAL PROPERTY: All work created during the internship becomes the sole property of the Company.

CERTIFICATE: A completion certificate will be issued only if the Intern completes the full duration with satisfactory performance.

NON-COMPETE: The Intern cannot join any direct competitor for 6 months after the internship ends.

TERMINATION: The Company can terminate this internship at any time without notice.

DISPUTES: All disputes will be resolved in the courts of Pune, Maharashtra, India.`
  },
  vehicle: {
    label: "🚗 Vehicle Sale Agreement",
    text: `VEHICLE SALE AGREEMENT

This Vehicle Sale Agreement is made between the Seller (Mr. Suresh Mehta) and the Buyer (Mr. Rahul Singh).

VEHICLE DETAILS: Maruti Suzuki Swift VXI 2019, Registration Number MH 02 AB 1234, Pearl White.

SALE PRICE: The agreed sale price is Rs. 4,50,000. Full payment must be made at the time of transfer.

PAYMENT MODE: Payment must be made via bank transfer or demand draft only.

AS-IS CONDITION: The vehicle is sold in its current condition. The Seller makes no warranties about mechanical condition.

EXISTING DUES: The Seller confirms there are no outstanding loans, EMIs, or legal disputes on the vehicle.

TRANSFER OF OWNERSHIP: The Seller will transfer the RC within 30 days of receiving full payment. Delay beyond 30 days attracts a penalty of Rs. 500 per day.

LIABILITIES AFTER SALE: After the sale date, the Buyer is responsible for all challan, insurance, road tax, and legal matters.

DISPUTES: All disputes will be resolved in the courts of Mumbai, Maharashtra, India.`
  },
  construction: {
    label: "🏗️ Construction Contract",
    text: `CONSTRUCTION CONTRACT

This Construction Contract is made between the Client (Mr. Anil Desai) and the Contractor (BuildRight Construction Pvt Ltd).

PROJECT: Construction of a 2BHK residential flat on Plot No. 45, Sector 12, Navi Mumbai.

PROJECT COST: Total construction cost is Rs. 28,00,000. Payment schedule:
- Rs. 5,00,000 advance before work begins
- Rs. 8,00,000 after foundation completion
- Rs. 8,00,000 after slab and walls completion
- Rs. 5,00,000 after plastering and finishing
- Rs. 2,00,000 after final handover

PROJECT DURATION: Must be completed within 12 months. Delay attracts a penalty of Rs. 5,000 per day.

MATERIALS: The Contractor will use approved grade materials only. Substandard materials will be replaced at the Contractor's cost.

DEFECTS LIABILITY: Contractor responsible for fixing structural defects reported within 12 months of handover at no extra cost.

TERMINATION: If the Contractor abandons the project, the Client can terminate and forfeit the advance.

DISPUTES: All disputes will be resolved through arbitration in Mumbai, Maharashtra, India.`
  },
  investment: {
    label: "💰 Investment Agreement",
    text: `INVESTMENT AGREEMENT

This Investment Agreement is made between the Investor (Ms. Priya Kapoor) and the Company (TechVenture Pvt Ltd).

INVESTMENT AMOUNT: The Investor agrees to invest Rs. 25,00,000 in exchange for a 10% equity stake.

VALUATION: Pre-money valuation of Rs. 2,50,00,000. Post-money valuation will be Rs. 2,75,00,000.

USE OF FUNDS: Product development 40%, marketing 30%, team hiring 20%, operations 10%. Any deviation requires written approval.

RETURNS: Returns only through equity appreciation or dividends. No fixed returns are guaranteed.

LOCK-IN PERIOD: The Investor cannot sell or transfer equity for 2 years from the date of investment.

INFORMATION RIGHTS: The Company must provide quarterly financial statements and annual audited reports to the Investor.

EXIT RIGHTS: The Investor has the right to exit through secondary sale, buyback, or IPO after the lock-in period.

CONFIDENTIALITY: Both parties must keep the terms strictly confidential without written consent.

DISPUTES: All disputes will be resolved through arbitration under the Arbitration and Conciliation Act, 1996 in Mumbai, India.`
  },
  vendor: {
    label: "🤝 Vendor Agreement",
    text: `VENDOR SUPPLY AGREEMENT

This Vendor Agreement is made between ABC Enterprises (Buyer) and XYZ Suppliers Pvt Ltd (Vendor).

SCOPE: The Vendor agrees to supply office stationery, furniture, and IT equipment to the Buyer as per purchase orders raised from time to time.

PRICING: Prices are fixed for 6 months from the agreement date. Any price revision requires 30 days written notice.

PAYMENT TERMS: Payment will be made within 30 days of receiving invoice and delivery confirmation. Late payment attracts 1.5% interest per month.

DELIVERY: The Vendor must deliver goods within 7 working days of receiving a purchase order. Delay beyond 7 days attracts a penalty of 2% of order value per week.

QUALITY: All goods must meet the agreed specifications. Defective goods will be returned at the Vendor's cost and must be replaced within 3 days.

EXCLUSIVITY: The Buyer is not bound to purchase exclusively from this Vendor.

TERMINATION: Either party can terminate with 30 days written notice. The Buyer can terminate immediately for quality or delivery failures.

CONFIDENTIALITY: The Vendor must not disclose the Buyer's pricing or business information to any third party.

DISPUTES: All disputes will be resolved in the courts of Delhi, India.`
  },
  contractemployment: {
    label: "🔁 Contract Employment",
    text: `FIXED TERM CONTRACT EMPLOYMENT AGREEMENT

This Contract Employment Agreement is made between DigiSoft Pvt Ltd (Employer) and the Employee.

POSITION: The Employee is hired as a Senior Data Analyst on a fixed term contract basis.

CONTRACT PERIOD: This contract is valid for 12 months from 1st June 2024 to 31st May 2025. This contract will NOT automatically renew unless a new written agreement is signed.

SALARY: The Employee will receive a monthly salary of Rs. 75,000 per month. No annual increment is applicable during the contract period.

LEAVE: The Employee is entitled to 12 paid leaves during the contract period. Unused leaves cannot be carried forward or encashed.

NOTICE PERIOD: Either party must give 30 days written notice to terminate before the expiry date. If the Employee leaves without notice, 30 days salary will be deducted.

NO BENEFITS: Being a contract employee, the Employee is NOT entitled to PF, gratuity, health insurance, or any other permanent employee benefits.

EXTENSION: The Employer may extend this contract at its sole discretion. The Employee has no right to demand extension or permanent employment.

CONFIDENTIALITY: The Employee must not share any company data or trade secrets during or after the contract period.

INTELLECTUAL PROPERTY: All work produced during this contract belongs entirely to the Employer.

DISPUTES: All disputes will be resolved in the courts of Bangalore, Karnataka, India.`
  },
  bonusagreement: {
    label: "📊 Performance Bonus Agreement",
    text: `PERFORMANCE BONUS AGREEMENT

This Performance Bonus Agreement is made between FutureTech Pvt Ltd (Company) and the Employee (Mr. Rohit Sharma, Senior Sales Manager).

BONUS STRUCTURE:
- Achieving 80% of quarterly sales target: Rs. 25,000 bonus
- Achieving 100% of quarterly sales target: Rs. 50,000 bonus
- Achieving 120% or above of quarterly sales target: Rs. 80,000 bonus
- No bonus will be paid if target achievement is below 80%

TARGET SETTING: Sales targets will be set by the Management at the beginning of each quarter. Targets can be revised by the Company with 15 days notice.

PAYMENT TIMING: Bonus will be calculated and paid within 45 days after the end of each quarter.

DISCRETIONARY DEDUCTIONS: The Company reserves the right to reduce or cancel the bonus if the Employee violates company policies or causes financial loss.

CLAWBACK: If incorrect sales data is discovered after bonus payment, the Company can recover the excess bonus from future salary.

EMPLOYMENT CONDITION: Bonus will not be paid if the Employee resigns or is terminated before the payment date.

NO GUARANTEE: This bonus scheme does not guarantee any minimum bonus amount. The Company reserves the right to modify or discontinue this scheme at any time.

DISPUTES: All disputes will be resolved in the courts of Mumbai, Maharashtra, India.`
  },
  propertysale: {
    label: "🏠 Property Sale Agreement",
    text: `PROPERTY SALE AGREEMENT

This Property Sale Agreement is made between the Seller (Mr. Vikram Nair) and the Buyer (Mr. Sunil Joshi).

PROPERTY DETAILS: Residential flat No. 501, Tower B, Green Valley Apartments, Powai, Mumbai - 400076. Total area 1,050 sq ft.

SALE PRICE: The agreed sale price is Rs. 1,25,00,000 (One Crore Twenty Five Lakh Rupees).

PAYMENT SCHEDULE:
- Rs. 12,50,000 token amount within 7 days of agreement
- Rs. 37,50,000 within 30 days of agreement
- Rs. 75,00,000 at the time of registration and possession

TOKEN AMOUNT: The token amount of Rs. 12,50,000 is non-refundable if the Buyer backs out. If the Seller backs out, the token amount will be refunded double.

POSSESSION DATE: The Seller will hand over vacant possession within 60 days of receiving full payment.

CLEAR TITLE: The Seller confirms the property is free from all encumbrances, loans, disputes, and legal claims.

REGISTRATION: Registration charges, stamp duty, and GST will be borne entirely by the Buyer.

OUTSTANDING DUES: All outstanding society maintenance, property tax, electricity dues till the date of possession will be cleared by the Seller.

DISPUTES: All disputes will be resolved in the courts of Mumbai, Maharashtra, India.`
  },
  carrental: {
    label: "🚗 Car Rental Agreement",
    text: `CAR RENTAL AGREEMENT

This Car Rental Agreement is made between DriveEasy Car Rentals Pvt Ltd (Rental Company) and the Renter.

VEHICLE: Honda City 2022, White, Registration Number MH 04 CD 5678.

RENTAL PERIOD: From 1st June 2024 (10:00 AM) to 5th June 2024 (10:00 AM). Total 4 days.

RENTAL CHARGES: Rs. 2,500 per day. Total rental amount Rs. 10,000. Security deposit Rs. 5,000 (refundable).

FUEL POLICY: The vehicle will be provided with a full tank. The Renter must return the vehicle with a full tank. If not, fuel charges plus Rs. 500 service fee will be deducted from the deposit.

LATE RETURN: Returning the vehicle after the agreed time will attract Rs. 500 per hour as late charges.

DRIVER RESPONSIBILITY: The Renter must hold a valid driving license. The Renter is fully responsible for any traffic violations, challans, or fines during the rental period.

DAMAGE POLICY: Any damage to the vehicle during the rental period is the Renter's full responsibility. Repair costs will be deducted from the security deposit.

ACCIDENT: In case of accident, the Renter must immediately inform the Rental Company and file a police report.

PROHIBITED USE: The vehicle cannot be used for racing, off-roading, transporting illegal goods, or driven outside the agreed state without written permission.

RETURN CONDITION: The vehicle must be returned clean and in the same condition as provided.

DISPUTES: All disputes will be resolved in the courts of Mumbai, Maharashtra, India.`
  },
  eventmanagement: {
    label: "🌿 Event Management Contract",
    text: `EVENT MANAGEMENT CONTRACT

This Event Management Contract is made between StarEvents Pvt Ltd (Event Manager) and the Client (Mr. and Mrs. Kapoor).

EVENT: Wedding Reception on 20th February 2025 at The Leela Palace, Mumbai. Expected guests: 500.

SERVICES INCLUDED:
- Venue decoration and floral arrangements
- Catering for 500 guests (dinner buffet)
- Sound system and DJ
- Photography and videography coordination
- Guest coordination and event anchoring
- Lighting and stage setup

TOTAL COST: Rs. 18,00,000. Payment schedule:
- Rs. 5,00,000 advance to confirm booking (non-refundable)
- Rs. 8,00,000 one month before the event
- Rs. 5,00,000 on the day of the event before setup begins

CANCELLATION: If the Client cancels more than 30 days before the event, 50% of advance is refunded. Cancellation within 30 days results in full forfeiture of all payments made.

POSTPONEMENT: Postponement requests must be made at least 45 days in advance. A postponement fee of Rs. 1,00,000 will be charged.

FORCE MAJEURE: The Event Manager is not responsible for delays or cancellations due to natural disasters, government orders, or circumstances beyond control.

ADDITIONAL GUESTS: If guest count exceeds 500, additional catering charges of Rs. 2,500 per head will apply.

DISPUTES: All disputes will be resolved in the courts of Mumbai, Maharashtra, India.`
  },
};

const CONTRACT_ICONS = {
  Rental: "🏠", Freelance: "💻", Employment: "💼",
  Service: "🤝", Loan: "🏦", Partnership: "🤲",
  NDA: "🔒", "Terms of Service": "📱", Other: "📄"
};

const SUGGESTED_QUESTIONS = [
  "Is this contract safe?",
  "What happens if I cancel?",
  "Are there any hidden charges?",
  "What are my main obligations?",
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
  const [financialRisk, setFinancialRisk] = useState(null);
  const [legalRisk, setLegalRisk] = useState(null);
  const [privacyRisk, setPrivacyRisk] = useState(null);
  const [history, setHistory] = useState([]);
  const [showSamples, setShowSamples] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const [contract1, setContract1] = useState("");
  const [contract2, setContract2] = useState("");
  const [compareResult, setCompareResult] = useState(null);
  const [compareLoading, setCompareLoading] = useState(false);
  const [compareError, setCompareError] = useState("");
  const [showSamples1, setShowSamples1] = useState(false);
  const [showSamples2, setShowSamples2] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("legallens-history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // ✅ FIXED: Show disclaimer EVERY time the page loads
  useEffect(() => {
    setShowDisclaimer(true);
  }, []);

  // ✅ FIXED: No localStorage — just close the popup
  const acceptDisclaimer = () => {
    setShowDisclaimer(false);
  };

  const saveToHistory = (doc, res, type, score, lang, fin, leg, priv) => {
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-IN"),
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      preview: doc.slice(0, 70) + "...",
      result: res,
      contractType: type,
      riskScore: score,
      financialRisk: fin,
      legalRisk: leg,
      privacyRisk: priv,
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
    setFinancialRisk(null);
    setLegalRisk(null);
    setPrivacyRisk(null);
    setChatMessages([]);
  };

  const analyzeDocument = async () => {
    if (!document.trim()) { setError("Please paste your legal document first."); return; }
    if (document.trim().length < 50) { setError("Document is too short."); return; }
    setLoading(true); setError(""); setResult(""); setContractType(null);
    setRiskScore(null); setFinancialRisk(null); setLegalRisk(null); setPrivacyRisk(null);
    setChatMessages([]);
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
        setFinancialRisk(data.financialRisk);
        setLegalRisk(data.legalRisk);
        setPrivacyRisk(data.privacyRisk);
        saveToHistory(document, data.result, data.contractType, data.riskScore, language, data.financialRisk, data.legalRisk, data.privacyRisk);
        setActiveTab("result");
      }
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const compareContracts = async () => {
    if (!contract1.trim() || contract1.trim().length < 50) { setCompareError("Contract A is too short."); return; }
    if (!contract2.trim() || contract2.trim().length < 50) { setCompareError("Contract B is too short."); return; }
    setCompareLoading(true); setCompareError(""); setCompareResult(null);
    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contract1, contract2, language }),
      });
      const data = await res.json();
      if (data.error) setCompareError(data.error);
      else setCompareResult(data);
    } catch { setCompareError("Network error. Please try again."); }
    finally { setCompareLoading(false); }
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
        body: JSON.stringify({ question, contractText: document, chatHistory: chatMessages, language }),
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
    setFinancialRisk(item.financialRisk);
    setLegalRisk(item.legalRisk);
    setPrivacyRisk(item.privacyRisk);
    setChatMessages([]);
    setActiveTab("result");
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("legallens-history");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
      .then(() => { setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000); })
      .catch(() => alert("Copy failed — please select the text manually."));
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

  const formatCompareLines = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, i) => {
      if (line.includes("[HIGH RISK]")) return (
        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"8px",marginBottom:"8px"}}>
          <span style={{background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.4)",color:"#f87171",fontSize:"11px",fontWeight:"700",padding:"2px 8px",borderRadius:"20px",whiteSpace:"nowrap"}}>🔴 HIGH</span>
          <span style={{color:"#d1d5db",fontSize:"13px"}}>{line.replace(/- \[HIGH RISK\]/,"").trim()}</span>
        </div>
      );
      if (line.includes("[MEDIUM RISK]")) return (
        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"8px",marginBottom:"8px"}}>
          <span style={{background:"rgba(249,115,22,0.15)",border:"1px solid rgba(249,115,22,0.4)",color:"#fb923c",fontSize:"11px",fontWeight:"700",padding:"2px 8px",borderRadius:"20px",whiteSpace:"nowrap"}}>🟠 MED</span>
          <span style={{color:"#d1d5db",fontSize:"13px"}}>{line.replace(/- \[MEDIUM RISK\]/,"").trim()}</span>
        </div>
      );
      if (line.includes("[LOW RISK]")) return (
        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"8px",marginBottom:"8px"}}>
          <span style={{background:"rgba(234,179,8,0.15)",border:"1px solid rgba(234,179,8,0.4)",color:"#facc15",fontSize:"11px",fontWeight:"700",padding:"2px 8px",borderRadius:"20px",whiteSpace:"nowrap"}}>🟡 LOW</span>
          <span style={{color:"#d1d5db",fontSize:"13px"}}>{line.replace(/- \[LOW RISK\]/,"").trim()}</span>
        </div>
      );
      if (line.startsWith("- ")) return <li key={i} style={{marginLeft:"16px",marginBottom:"6px",color:"#d1d5db",fontSize:"13px"}}>{line.slice(2)}</li>;
      if (line.trim()==="") return null;
      return <p key={i} style={{marginBottom:"6px",color:"#d1d5db",fontSize:"13px"}}>{line}</p>;
    });
  };

  const parseDifferences = (text) => {
    const section = parseSection(text, "KEY_DIFFERENCES");
    if (!section) return [];
    return section.split("\n").filter(l => l.startsWith("- ")).map(line => {
      const clean = line.slice(2);
      const topicMatch = clean.match(/^\[(.+?)\]:/);
      const topic = topicMatch ? topicMatch[1] : "Clause";
      const rest = clean.replace(/^\[.+?\]:/, "").trim();
      const parts = rest.split("|");
      const aText = parts[0] ? parts[0].replace("Contract A says","").trim() : "";
      const bText = parts[1] ? parts[1].replace("Contract B says","").trim() : "";
      const winnerText = parts[2] ? parts[2].replace("Winner:","").trim() : "Equal";
      return { topic, aText, bText, winnerText };
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

  const getSafetyLabel = (score) => {
    if (score <= 3) return "VERY SAFE";
    if (score <= 5) return "MODERATE";
    if (score <= 7) return "RISKY";
    return "DANGEROUS";
  };

  const getSafetyColor = (score) => {
    if (score <= 3) return "#10b981";
    if (score <= 5) return "#f97316";
    if (score <= 7) return "#ef4444";
    return "#dc2626";
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

      {/* ── DISCLAIMER MODAL — shows every visit ── */}
      {showDisclaimer && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"}}>
          <div style={{background:"#0d1117",border:"1px solid #1f2937",borderRadius:"20px",padding:"40px",maxWidth:"480px",width:"100%",textAlign:"center"}}>
            <div style={{width:"64px",height:"64px",background:"linear-gradient(135deg,#3b82f6,#6366f1)",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"32px",margin:"0 auto 24px"}}>⚖️</div>
            <div style={{display:"inline-block",background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"20px",padding:"4px 14px",fontSize:"11px",color:"#f87171",fontWeight:"700",letterSpacing:"1px",marginBottom:"16px"}}>IMPORTANT DISCLAIMER</div>
            <h2 style={{fontSize:"22px",fontWeight:"900",color:"#f9fafb",marginBottom:"16px",letterSpacing:"-0.5px"}}>LegalLens is an AI Tool</h2>
            <p style={{color:"#9ca3af",fontSize:"14px",lineHeight:"1.8",marginBottom:"24px"}}>
              Most people sign contracts without truly understanding them. LegalLens changes that. Powered by advanced AI, it breaks down complex legal language into simple terms, highlights risks, and helps you negotiate better — before you sign.
            </p>
            <button onClick={acceptDisclaimer} style={{width:"100%",padding:"14px",borderRadius:"10px",border:"none",background:"linear-gradient(135deg,#3b82f6,#6366f1)",color:"white",fontSize:"15px",fontWeight:"700",cursor:"pointer"}}>
              ✅ I Understand — Continue to LegalLens
            </button>
            <p style={{color:"#374151",fontSize:"11px",marginTop:"12px"}}>This disclaimer appears every visit for your awareness.</p>
          </div>
        </div>
      )}

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
          <button onClick={() => setShowDisclaimer(true)} style={{fontSize:"12px",color:"#6b7280",background:"none",border:"none",cursor:"pointer"}}>⚠️ Disclaimer</button>
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
            Read less. Understand more. Let AI protect you before you sign.
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
            {key:"input",   label:"📄 Analyze"},
            {key:"compare", label:"⚖️ Compare"},
            {key:"result",  label:"📊 Analysis"},
            {key:"history", label:`🕐 History (${history.length})`},
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{flex:1,padding:"10px",borderRadius:"8px",border:"none",cursor:"pointer",fontSize:"13px",fontWeight:"600",transition:"all 0.2s",background:activeTab===tab.key?"linear-gradient(135deg,#3b82f6,#6366f1)":"transparent",color:activeTab===tab.key?"white":"#6b7280"}}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── ANALYZE TAB ── */}
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
              {/* File Upload */}
<div style={{marginBottom:"20px"}}>
  <div style={{fontSize:"12px",color:"#6b7280",fontWeight:"600",letterSpacing:"1px",marginBottom:"10px"}}>
    📎 UPLOAD CONTRACT (PDF OR IMAGE)
  </div>
  <label style={{display:"flex",alignItems:"center",gap:"16px",background:"rgba(0,0,0,0.3)",border:"2px dashed #374151",borderRadius:"12px",padding:"20px",cursor:"pointer"}}
    onMouseEnter={(e) => e.currentTarget.style.borderColor="#3b82f6"}
    onMouseLeave={(e) => e.currentTarget.style.borderColor="#374151"}
  >
    <div style={{fontSize:"36px"}}>
      {uploadLoading ? "⏳" : "📄"}
    </div>
    <div style={{flex:1}}>
      <div style={{fontSize:"14px",fontWeight:"600",color:"#f9fafb",marginBottom:"4px"}}>
        {uploadLoading ? "Reading your file..." : "📸 Click to upload Photo of Contract"}
      </div>
      <div style={{fontSize:"12px",color:"#6b7280"}}>
        Take a clear photo of your contract and upload (JPG, PNG)
      </div>
      {uploadStatus && (
        <div style={{fontSize:"12px",color:"#10b981",marginTop:"4px",fontWeight:"600"}}>
          {uploadStatus}
        </div>
      )}
    </div>
    <input
      type="file"
      accept="image/*"
      style={{display:"none"}}
      disabled={uploadLoading}
      onChange={async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadLoading(true);
        setUploadStatus("");
        setError("");
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch("/api/pdf", { method: "POST", body: formData });
          const data = await res.json();
          if (data.error) {
            setError(data.error);
          } else {
            setDocument(data.text);
            setUploadStatus(`✅ ${data.type === "pdf" ? "PDF" : "Image"} read successfully! ${data.text.split(/\s+/).length} words extracted.`);
          }
        } catch {
          setError("Failed to upload file. Please try again.");
        } finally {
          setUploadLoading(false);
          e.target.value = "";
        }
      }}
    />
  </label>
</div>

              <div style={{marginBottom:"20px"}}>
                <div style={{fontSize:"12px",color:"#6b7280",fontWeight:"600",letterSpacing:"1px",marginBottom:"10px"}}>📚 SAMPLE CONTRACTS LIBRARY</div>
                <button onClick={() => setShowSamples(!showSamples)} style={{width:"100%",padding:"12px",borderRadius:"10px",border:"1px dashed #374151",background:"transparent",color:"#9ca3af",fontSize:"13px",fontWeight:"600",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span>Try a sample contract to test LegalLens</span>
                  <span>{showSamples?"▲":"▼"}</span>
                </button>
                {showSamples && (
                  <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"8px",marginTop:"10px"}}>
                    {Object.entries(SAMPLE_CONTRACTS).map(([key,val]) => (
                      <button key={key} onClick={() => loadSample(key)} style={{padding:"12px 16px",borderRadius:"10px",border:"1px solid #1f2937",background:"rgba(255,255,255,0.03)",color:"#d1d5db",fontSize:"13px",fontWeight:"600",cursor:"pointer",textAlign:"left"}}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor="#3b82f6"}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor="#1f2937"}
                      >{val.label}</button>
                    ))}
                  </div>
                )}
              </div>

              <div style={{marginBottom:"16px"}}>
                <div style={{fontSize:"12px",color:"#6b7280",fontWeight:"600",letterSpacing:"1px",marginBottom:"10px"}}>PASTE YOUR CONTRACT BELOW</div>
                <textarea value={document} onChange={(e) => setDocument(e.target.value)}
                  placeholder="Paste your rental agreement, job offer, freelance contract, or any legal document here..."
                  style={{width:"100%",height:"300px",background:"rgba(0,0,0,0.3)",border:"1px solid #1f2937",borderRadius:"12px",padding:"16px",color:"white",fontSize:"14px",resize:"vertical",outline:"none",fontFamily:"inherit",lineHeight:"1.6",boxSizing:"border-box"}}
                  onFocus={(e) => e.target.style.borderColor="#3b82f6"}
                  onBlur={(e) => e.target.style.borderColor="#1f2937"}
                />
              </div>

              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:"12px",color:"#4b5563"}}>{document.length} chars · {document.trim().split(/\s+/).filter(Boolean).length} words</span>
                <div style={{display:"flex",gap:"10px"}}>
                  <button onClick={() => {setDocument("");setResult("");setError("");setContractType(null);setRiskScore(null);setFinancialRisk(null);setLegalRisk(null);setPrivacyRisk(null);setChatMessages([]);}} style={{padding:"10px 20px",borderRadius:"8px",border:"1px solid #374151",background:"transparent",color:"#9ca3af",fontSize:"13px",cursor:"pointer",fontWeight:"600"}}>Clear</button>
                  <button onClick={analyzeDocument} disabled={loading} style={{padding:"10px 28px",borderRadius:"8px",border:"none",background:loading?"#1f2937":"linear-gradient(135deg,#3b82f6,#6366f1)",color:loading?"#6b7280":"white",fontSize:"13px",fontWeight:"700",cursor:loading?"not-allowed":"pointer"}}>
                    {loading?"Analyzing...":"Analyze Now"}
                  </button>
                </div>
              </div>
            </div>

            {error && <div style={{marginTop:"16px",background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"12px",padding:"14px 18px",color:"#fca5a5",fontSize:"14px"}}>{error}</div>}

            {loading && (
              <div style={{marginTop:"16px",background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"16px",padding:"48px",textAlign:"center"}}>
                <div style={{fontSize:"48px",marginBottom:"16px"}}>⚖️</div>
                <p style={{color:"#9ca3af",fontSize:"16px",marginBottom:"8px"}}>Reading the fine print so you don't have to...</p>
                <p style={{color:"#4b5563",fontSize:"12px"}}>This may take 10 to 20 seconds</p>
              </div>
            )}
          </div>
        )}

        {/* ── COMPARE TAB ── */}
        {activeTab==="compare" && (
          <div>
            <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"16px",padding:"20px",marginBottom:"16px"}}>
              <div style={{fontSize:"12px",color:"#6b7280",fontWeight:"600",letterSpacing:"1px",marginBottom:"10px"}}>SELECT OUTPUT LANGUAGE</div>
              <div style={{display:"flex",gap:"8px"}}>
                {["English","Hindi","Marathi"].map((lang) => (
                  <button key={lang} onClick={() => setLanguage(lang)} style={{padding:"8px 18px",borderRadius:"8px",border:language===lang?"1px solid #3b82f6":"1px solid #1f2937",background:language===lang?"rgba(59,130,246,0.15)":"transparent",color:language===lang?"#60a5fa":"#9ca3af",fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>
                    {lang==="English"?"🇬🇧 English":lang==="Hindi"?"🇮🇳 Hindi":"🇮🇳 Marathi"}
                  </button>
                ))}
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"16px"}}>
              <div style={{background:"rgba(59,130,246,0.05)",border:"1px solid rgba(59,130,246,0.3)",borderRadius:"16px",padding:"20px"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"12px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                    <div style={{width:"28px",height:"28px",background:"rgba(59,130,246,0.2)",border:"1px solid rgba(59,130,246,0.4)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:"800",color:"#60a5fa"}}>A</div>
                    <span style={{fontSize:"14px",fontWeight:"700",color:"#93c5fd"}}>Contract A</span>
                  </div>
                  <div style={{position:"relative"}}>
                    <button onClick={() => setShowSamples1(!showSamples1)} style={{padding:"5px 10px",borderRadius:"6px",border:"1px solid rgba(59,130,246,0.3)",background:"transparent",color:"#60a5fa",fontSize:"11px",cursor:"pointer",fontWeight:"600"}}>Sample ▾</button>
                    {showSamples1 && (
                      <div style={{position:"absolute",right:0,top:"32px",background:"#0f172a",border:"1px solid #1f2937",borderRadius:"10px",padding:"8px",zIndex:20,minWidth:"200px"}}>
                        {Object.entries(SAMPLE_CONTRACTS).map(([key,val]) => (
                          <button key={key} onClick={() => {setContract1(SAMPLE_CONTRACTS[key].text);setShowSamples1(false);}} style={{display:"block",width:"100%",padding:"8px 12px",borderRadius:"6px",border:"none",background:"transparent",color:"#d1d5db",fontSize:"12px",cursor:"pointer",textAlign:"left"}}
                            onMouseEnter={(e) => e.currentTarget.style.background="#1f2937"}
                            onMouseLeave={(e) => e.currentTarget.style.background="transparent"}
                          >{val.label}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <textarea value={contract1} onChange={(e) => setContract1(e.target.value)} placeholder="Paste Contract A here..."
                  style={{width:"100%",height:"260px",background:"rgba(0,0,0,0.3)",border:"1px solid rgba(59,130,246,0.2)",borderRadius:"10px",padding:"12px",color:"white",fontSize:"13px",resize:"vertical",outline:"none",fontFamily:"inherit",lineHeight:"1.6",boxSizing:"border-box"}}
                  onFocus={(e) => e.target.style.borderColor="#3b82f6"}
                  onBlur={(e) => e.target.style.borderColor="rgba(59,130,246,0.2)"}
                />
                <div style={{fontSize:"11px",color:"#4b5563",marginTop:"6px"}}>{contract1.trim().split(/\s+/).filter(Boolean).length} words</div>
              </div>

              <div style={{background:"rgba(139,92,246,0.05)",border:"1px solid rgba(139,92,246,0.3)",borderRadius:"16px",padding:"20px"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"12px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                    <div style={{width:"28px",height:"28px",background:"rgba(139,92,246,0.2)",border:"1px solid rgba(139,92,246,0.4)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:"800",color:"#a78bfa"}}>B</div>
                    <span style={{fontSize:"14px",fontWeight:"700",color:"#c4b5fd"}}>Contract B</span>
                  </div>
                  <div style={{position:"relative"}}>
                    <button onClick={() => setShowSamples2(!showSamples2)} style={{padding:"5px 10px",borderRadius:"6px",border:"1px solid rgba(139,92,246,0.3)",background:"transparent",color:"#a78bfa",fontSize:"11px",cursor:"pointer",fontWeight:"600"}}>Sample ▾</button>
                    {showSamples2 && (
                      <div style={{position:"absolute",right:0,top:"32px",background:"#0f172a",border:"1px solid #1f2937",borderRadius:"10px",padding:"8px",zIndex:20,minWidth:"200px"}}>
                        {Object.entries(SAMPLE_CONTRACTS).map(([key,val]) => (
                          <button key={key} onClick={() => {setContract2(SAMPLE_CONTRACTS[key].text);setShowSamples2(false);}} style={{display:"block",width:"100%",padding:"8px 12px",borderRadius:"6px",border:"none",background:"transparent",color:"#d1d5db",fontSize:"12px",cursor:"pointer",textAlign:"left"}}
                            onMouseEnter={(e) => e.currentTarget.style.background="#1f2937"}
                            onMouseLeave={(e) => e.currentTarget.style.background="transparent"}
                          >{val.label}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <textarea value={contract2} onChange={(e) => setContract2(e.target.value)} placeholder="Paste Contract B here..."
                  style={{width:"100%",height:"260px",background:"rgba(0,0,0,0.3)",border:"1px solid rgba(139,92,246,0.2)",borderRadius:"10px",padding:"12px",color:"white",fontSize:"13px",resize:"vertical",outline:"none",fontFamily:"inherit",lineHeight:"1.6",boxSizing:"border-box"}}
                  onFocus={(e) => e.target.style.borderColor="#8b5cf6"}
                  onBlur={(e) => e.target.style.borderColor="rgba(139,92,246,0.2)"}
                />
                <div style={{fontSize:"11px",color:"#4b5563",marginTop:"6px"}}>{contract2.trim().split(/\s+/).filter(Boolean).length} words</div>
              </div>
            </div>

            <div style={{display:"flex",justifyContent:"center",marginBottom:"20px"}}>
              <button onClick={compareContracts} disabled={compareLoading} style={{padding:"14px 48px",borderRadius:"10px",border:"none",background:compareLoading?"#1f2937":"linear-gradient(135deg,#3b82f6,#8b5cf6)",color:compareLoading?"#6b7280":"white",fontSize:"15px",fontWeight:"700",cursor:compareLoading?"not-allowed":"pointer"}}>
                {compareLoading?"Comparing...":"⚖️ Compare Contracts"}
              </button>
            </div>

            {compareError && <div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"12px",padding:"14px 18px",color:"#fca5a5",fontSize:"14px",marginBottom:"16px"}}>{compareError}</div>}

            {compareLoading && (
              <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"16px",padding:"48px",textAlign:"center"}}>
                <div style={{fontSize:"48px",marginBottom:"16px"}}>⚖️</div>
                <p style={{color:"#9ca3af",fontSize:"16px",marginBottom:"8px"}}>Comparing contracts side by side...</p>
                <p style={{color:"#4b5563",fontSize:"12px"}}>This may take 15 to 25 seconds</p>
              </div>
            )}

            {compareResult && !compareLoading && (
              <div>
                <div style={{background:compareResult.winner==="CONTRACT_A"?"rgba(59,130,246,0.12)":compareResult.winner==="CONTRACT_B"?"rgba(139,92,246,0.12)":"rgba(16,185,129,0.12)",border:`1px solid ${compareResult.winner==="CONTRACT_A"?"rgba(59,130,246,0.5)":compareResult.winner==="CONTRACT_B"?"rgba(139,92,246,0.5)":"rgba(16,185,129,0.5)"}`,borderRadius:"16px",padding:"24px",marginBottom:"16px",textAlign:"center"}}>
                  <div style={{fontSize:"13px",color:"#6b7280",fontWeight:"600",letterSpacing:"1px",marginBottom:"8px"}}>VERDICT</div>
                  <div style={{fontSize:"28px",fontWeight:"900",color:compareResult.winner==="CONTRACT_A"?"#60a5fa":compareResult.winner==="CONTRACT_B"?"#a78bfa":"#10b981",marginBottom:"10px"}}>
                    {compareResult.winner==="CONTRACT_A"?"✅ Contract A is Safer":compareResult.winner==="CONTRACT_B"?"✅ Contract B is Safer":"🤝 Both are Equal"}
                  </div>
                  <div style={{color:"#9ca3af",fontSize:"14px",maxWidth:"600px",margin:"0 auto"}}>{parseSection(compareResult.result,"VERDICT")}</div>
                </div>

                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"16px"}}>
                  {[
                    {label:"Contract A", score:compareResult.scoreA, color:"#60a5fa", bg:"rgba(59,130,246,0.1)", border:"rgba(59,130,246,0.3)", winner:compareResult.winner==="CONTRACT_A"},
                    {label:"Contract B", score:compareResult.scoreB, color:"#a78bfa", bg:"rgba(139,92,246,0.1)", border:"rgba(139,92,246,0.3)", winner:compareResult.winner==="CONTRACT_B"},
                  ].map((c,i) => (
                    <div key={i} style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:"12px",padding:"16px",textAlign:"center",position:"relative"}}>
                      {c.winner && <div style={{position:"absolute",top:"-10px",left:"50%",transform:"translateX(-50%)",background:"#10b981",color:"white",fontSize:"10px",fontWeight:"700",padding:"3px 12px",borderRadius:"20px",whiteSpace:"nowrap"}}>✅ SAFER CHOICE</div>}
                      <div style={{fontSize:"12px",color:c.color,fontWeight:"600",letterSpacing:"1px",marginBottom:"8px"}}>{c.label.toUpperCase()}</div>
                      <div style={{fontSize:"36px",fontWeight:"900",color:getSafetyColor(c.score)}}>{c.score}/10</div>
                      <div style={{fontSize:"12px",color:getSafetyColor(c.score),fontWeight:"700",marginTop:"4px"}}>{getSafetyLabel(c.score)}</div>
                      <div style={{fontSize:"10px",color:"#4b5563",marginTop:"2px"}}>risk score · lower = safer</div>
                      <div style={{width:"100%",background:"rgba(255,255,255,0.1)",borderRadius:"4px",height:"6px",marginTop:"10px"}}>
                        <div style={{width:`${c.score*10}%`,background:getSafetyColor(c.score),borderRadius:"4px",height:"6px"}}/>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"12px",padding:"20px",marginBottom:"16px"}}>
                  <div style={{fontSize:"13px",fontWeight:"700",color:"#f9fafb",marginBottom:"14px"}}>🔄 Key Differences</div>
                  {parseDifferences(compareResult.result).map((diff,i,arr) => (
                    <div key={i} style={{borderBottom:i<arr.length-1?"1px solid #1f2937":"none",paddingBottom:"12px",marginBottom:"12px"}}>
                      <div style={{fontSize:"11px",color:"#6366f1",fontWeight:"700",letterSpacing:"1px",marginBottom:"8px"}}>{diff.topic.toUpperCase()}</div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"8px",alignItems:"start"}}>
                        <div style={{background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.2)",borderRadius:"8px",padding:"10px"}}>
                          <div style={{fontSize:"10px",color:"#60a5fa",fontWeight:"700",marginBottom:"4px"}}>CONTRACT A</div>
                          <div style={{fontSize:"12px",color:"#d1d5db"}}>{diff.aText}</div>
                        </div>
                        <div style={{fontSize:"18px",color:"#374151",paddingTop:"8px"}}>vs</div>
                        <div style={{background:"rgba(139,92,246,0.08)",border:"1px solid rgba(139,92,246,0.2)",borderRadius:"8px",padding:"10px"}}>
                          <div style={{fontSize:"10px",color:"#a78bfa",fontWeight:"700",marginBottom:"4px"}}>CONTRACT B</div>
                          <div style={{fontSize:"12px",color:"#d1d5db"}}>{diff.bText}</div>
                        </div>
                      </div>
                      {diff.winnerText && diff.winnerText!=="Equal" && (
                        <div style={{marginTop:"6px",fontSize:"11px",color:diff.winnerText.includes("A")?"#60a5fa":"#a78bfa",fontWeight:"600"}}>
                          ✓ Better clause: Contract {diff.winnerText.includes("A")?"A":"B"}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"16px"}}>
                  {[
                    {label:"Contract A — Risks", key:"CONTRACT_A_RISKS", color:"#f87171"},
                    {label:"Contract B — Risks", key:"CONTRACT_B_RISKS", color:"#f87171"},
                  ].map((c,i) => (
                    <div key={i} style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"12px",padding:"16px"}}>
                      <div style={{fontSize:"12px",color:c.color,fontWeight:"700",marginBottom:"12px"}}>{c.label}</div>
                      {formatCompareLines(parseSection(compareResult.result,c.key))}
                    </div>
                  ))}
                </div>

                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"16px"}}>
                  {[
                    {label:"Contract A — Advantages", key:"CONTRACT_A_ADVANTAGES"},
                    {label:"Contract B — Advantages", key:"CONTRACT_B_ADVANTAGES"},
                  ].map((c,i) => (
                    <div key={i} style={{background:"rgba(16,185,129,0.05)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:"12px",padding:"16px"}}>
                      <div style={{fontSize:"12px",color:"#10b981",fontWeight:"700",marginBottom:"12px"}}>{c.label}</div>
                      {formatCompareLines(parseSection(compareResult.result,c.key))}
                    </div>
                  ))}
                </div>

                <div style={{background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.3)",borderLeft:"3px solid #3b82f6",borderRadius:"12px",padding:"20px"}}>
                  <div style={{fontSize:"13px",fontWeight:"700",color:"#f9fafb",marginBottom:"10px"}}>💡 Final Recommendation</div>
                  <div style={{color:"#d1d5db",fontSize:"14px",lineHeight:"1.7"}}>{parseSection(compareResult.result,"RECOMMENDATION")}</div>
                </div>
                <p style={{textAlign:"center",color:"#374151",fontSize:"12px",marginTop:"24px"}}>LegalLens is an AI tool. Always consult a real lawyer for critical decisions.</p>
              </div>
            )}
          </div>
        )}

        {/* ── RESULT TAB ── */}
        {activeTab==="result" && result && (
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"20px"}}>
              <div style={{background:"rgba(99,102,241,0.1)",border:"1px solid rgba(99,102,241,0.3)",borderRadius:"12px",padding:"16px",display:"flex",alignItems:"center",gap:"12px"}}>
                <div style={{fontSize:"32px"}}>{CONTRACT_ICONS[contractType]||"📄"}</div>
                <div>
                  <div style={{fontSize:"11px",color:"#818cf8",fontWeight:"600",letterSpacing:"1px",marginBottom:"4px"}}>CONTRACT TYPE</div>
                  <div style={{fontSize:"18px",fontWeight:"800",color:"#f9fafb"}}>{contractType||"Unknown"}</div>
                </div>
              </div>
              <div style={{background:`rgba(${riskScore>=7?"239,68,68":riskScore>=4?"249,115,22":"16,185,129"},0.1)`,border:`1px solid rgba(${riskScore>=7?"239,68,68":riskScore>=4?"249,115,22":"16,185,129"},0.3)`,borderRadius:"12px",padding:"16px"}}>
                <div style={{fontSize:"11px",color:getRiskColor(riskScore),fontWeight:"600",letterSpacing:"1px",marginBottom:"8px"}}>OVERALL RISK</div>
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

            <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"12px",padding:"16px",marginBottom:"20px"}}>
              <div style={{fontSize:"11px",color:"#9ca3af",fontWeight:"600",letterSpacing:"1px",marginBottom:"14px"}}>RISK BREAKDOWN BY CATEGORY</div>
              {[
                {label:"Financial Risk",icon:"💸",score:financialRisk,desc:"Hidden fees, penalties, payment terms"},
                {label:"Legal Risk",    icon:"⚖️",score:legalRisk,    desc:"Termination, liability, disputes"},
                {label:"Privacy Risk", icon:"🔐",score:privacyRisk,  desc:"Data, confidentiality, IP ownership"},
              ].map((cat,i) => (
                <div key={i} style={{marginBottom:i<2?"14px":"0"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                      <span style={{fontSize:"16px"}}>{cat.icon}</span>
                      <span style={{fontSize:"13px",color:"#f9fafb",fontWeight:"600"}}>{cat.label}</span>
                      <span style={{fontSize:"11px",color:"#4b5563"}}>{cat.desc}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                      <span style={{fontSize:"12px",fontWeight:"700",color:getRiskColor(cat.score)}}>{getRiskLabel(cat.score)}</span>
                      <span style={{fontSize:"14px",fontWeight:"900",color:getRiskColor(cat.score)}}>{cat.score}/10</span>
                    </div>
                  </div>
                  <div style={{width:"100%",background:"rgba(255,255,255,0.08)",borderRadius:"4px",height:"6px"}}>
                    <div style={{width:`${(cat.score||0)*10}%`,background:getRiskColor(cat.score),borderRadius:"4px",height:"6px",transition:"width 1s ease"}}/>
                  </div>
                </div>
              ))}
            </div>

            <div style={{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"20px"}}>
              <button onClick={handleCopy} style={{padding:"8px 14px",borderRadius:"8px",border:"1px solid #374151",background:copySuccess?"rgba(16,185,129,0.15)":"transparent",color:copySuccess?"#10b981":"#9ca3af",fontSize:"12px",cursor:"pointer",fontWeight:"600",transition:"all 0.2s"}}>
                {copySuccess?"✅ Copied!":"📋 Copy"}
              </button>
              <button onClick={() => window.print()} style={{padding:"8px 14px",borderRadius:"8px",border:"1px solid #374151",background:"transparent",color:"#9ca3af",fontSize:"12px",cursor:"pointer",fontWeight:"600"}}>🖨️ Print</button>
              <button onClick={() => {const b=new Blob([result],{type:"text/plain"});const u=URL.createObjectURL(b);const a=window.document.createElement("a");a.href=u;a.download="LegalLens-Report.txt";a.click();}} style={{padding:"8px 14px",borderRadius:"8px",border:"none",background:"linear-gradient(135deg,#10b981,#059669)",color:"white",fontSize:"12px",cursor:"pointer",fontWeight:"600"}}>⬇️ Download</button>
            </div>

            {sections.map((section,i) => (
              <div key={i} style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderLeft:`3px solid ${section.border}`,borderRadius:"12px",padding:"20px",marginBottom:"12px"}}>
                <div style={{fontWeight:"700",fontSize:"15px",color:"#f9fafb",marginBottom:"12px",display:"flex",alignItems:"center",gap:"8px"}}>
                  <span>{section.icon}</span>{section.title}
                </div>
                <div style={{lineHeight:"1.7"}}>{formatLines(parseSection(result,section.heading))}</div>
              </div>
            ))}

            <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(99,102,241,0.4)",borderLeft:"3px solid #6366f1",borderRadius:"12px",padding:"20px",marginTop:"24px"}}>
              <div style={{fontWeight:"700",fontSize:"15px",color:"#f9fafb",marginBottom:"4px"}}>💬 Chat with this Contract</div>
              <p style={{fontSize:"12px",color:"#6b7280",marginBottom:"16px",marginTop:0}}>Ask any question about this contract and get an instant AI answer.</p>
              {chatMessages.length===0 && (
                <div style={{marginBottom:"16px"}}>
                  <div style={{fontSize:"11px",color:"#6b7280",fontWeight:"600",letterSpacing:"1px",marginBottom:"8px"}}>SUGGESTED QUESTIONS</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
                    {SUGGESTED_QUESTIONS.map((q,i) => (
                      <button key={i} onClick={() => sendChatMessage(q)} style={{padding:"7px 14px",borderRadius:"20px",border:"1px solid #374151",background:"rgba(255,255,255,0.03)",color:"#9ca3af",fontSize:"12px",cursor:"pointer",fontWeight:"500"}}
                        onMouseEnter={(e) => {e.currentTarget.style.borderColor="#6366f1";e.currentTarget.style.color="#a78bfa";}}
                        onMouseLeave={(e) => {e.currentTarget.style.borderColor="#374151";e.currentTarget.style.color="#9ca3af";}}
                      >{q}</button>
                    ))}
                  </div>
                </div>
              )}
              {chatMessages.length>0 && (
                <div style={{maxHeight:"320px",overflowY:"auto",marginBottom:"16px",display:"flex",flexDirection:"column",gap:"12px"}}>
                  {chatMessages.map((msg,i) => (
                    <div key={i} style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start"}}>
                      <div style={{maxWidth:"80%",padding:"10px 14px",borderRadius:msg.role==="user"?"12px 12px 4px 12px":"12px 12px 12px 4px",background:msg.role==="user"?"linear-gradient(135deg,#3b82f6,#6366f1)":"rgba(255,255,255,0.05)",border:msg.role==="assistant"?"1px solid #1f2937":"none",fontSize:"13px",lineHeight:"1.6",color:msg.role==="user"?"white":"#d1d5db"}}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div style={{display:"flex",justifyContent:"flex-start"}}>
                      <div style={{padding:"10px 14px",borderRadius:"12px 12px 12px 4px",background:"rgba(255,255,255,0.05)",border:"1px solid #1f2937",fontSize:"13px",color:"#6b7280"}}>Thinking...</div>
                    </div>
                  )}
                  <div ref={chatEndRef}/>
                </div>
              )}
              <div style={{display:"flex",gap:"8px"}}>
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key==="Enter"&&sendChatMessage()} placeholder="Ask anything about this contract..."
                  style={{flex:1,background:"rgba(0,0,0,0.3)",border:"1px solid #1f2937",borderRadius:"10px",padding:"10px 14px",color:"white",fontSize:"13px",outline:"none",fontFamily:"inherit"}}
                  onFocus={(e) => e.target.style.borderColor="#6366f1"}
                  onBlur={(e) => e.target.style.borderColor="#1f2937"}
                />
                <button onClick={() => sendChatMessage()} disabled={chatLoading||!chatInput.trim()} style={{padding:"10px 20px",borderRadius:"10px",border:"none",background:chatLoading||!chatInput.trim()?"#1f2937":"linear-gradient(135deg,#6366f1,#8b5cf6)",color:chatLoading||!chatInput.trim()?"#6b7280":"white",fontSize:"13px",fontWeight:"700",cursor:chatLoading||!chatInput.trim()?"not-allowed":"pointer"}}>Send</button>
              </div>
            </div>
            <p style={{textAlign:"center",color:"#374151",fontSize:"12px",marginTop:"24px"}}>LegalLens is an AI tool. Always consult a real lawyer for critical decisions.</p>
          </div>
        )}

        {activeTab==="result"&&!result && (
          <div style={{textAlign:"center",padding:"80px 0",color:"#4b5563"}}>
            <div style={{fontSize:"48px",marginBottom:"16px"}}>📄</div>
            <p>No analysis yet. Go to the Analyze tab and paste a document first.</p>
          </div>
        )}

        {/* ── HISTORY TAB ── */}
        {activeTab==="history" && (
          <div>
            {history.length===0 ? (
              <div style={{textAlign:"center",padding:"80px 0",color:"#4b5563"}}>
                <div style={{fontSize:"48px",marginBottom:"16px"}}>🕐</div>
                <p>No history yet. Analyze a document first.</p>
              </div>
            ) : (
              <div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"}}>
                  <span style={{color:"#6b7280",fontSize:"14px"}}>Last {history.length} analyses saved locally</span>
                  <button onClick={clearHistory} style={{padding:"6px 14px",borderRadius:"8px",border:"1px solid rgba(239,68,68,0.4)",background:"rgba(239,68,68,0.1)",color:"#f87171",fontSize:"12px",cursor:"pointer",fontWeight:"600"}}>🗑️ Clear All</button>
                </div>
                {history.map((item) => (
                  <div key={item.id} onClick={() => loadFromHistory(item)} style={{background:"rgba(255,255,255,0.02)",border:"1px solid #1f2937",borderRadius:"12px",padding:"16px",marginBottom:"10px",cursor:"pointer"}}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor="#3b82f6"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor="#1f2937"}
                  >
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"}}>
                          <span style={{fontSize:"20px"}}>{CONTRACT_ICONS[item.contractType]||"📄"}</span>
                          <span style={{fontSize:"13px",fontWeight:"700",color:"#f9fafb"}}>{item.contractType||"Unknown"}</span>
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