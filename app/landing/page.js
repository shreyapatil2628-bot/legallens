import styles from "./landing.module.css";

const points = [
  {
    title: "Plain-language analysis",
    text: "Paste a rental agreement, offer letter, NDA, or loan, and get the clauses, risks, and what to negotiate.",
  },
  {
    title: "Compare two contracts",
    text: "Put two versions side by side. LegalLens scores which one is safer and where they differ.",
  },
  {
    title: "Ask follow-up questions",
    text: "After an analysis, ask about notice periods, penalties, or hidden charges in English, Hindi, or Marathi.",
  },
  {
    title: "PDF and photo upload",
    text: "Upload a text PDF or a clear photo. The words are read on this machine before the analysis starts.",
  },
  {
    title: "Reports you can keep",
    text: "Copy, print, or download the result. Email opens a draft in your mail app when automatic sending is not set up.",
  },
  {
    title: "Private to this browser",
    text: "Your account and the last analyses stay on this device. They are not stored on a LegalLens server.",
  },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.top}>
          <a className={styles.brand} href="/">
            <span className={styles.mark}>⚖️</span>
            <span>
              <div className={styles.brandName}>LegalLens</div>
              <div className={styles.brandSub}>India Edition</div>
            </span>
          </a>
          <a className={styles.back} href="/">Open the analyzer</a>
        </div>

        <div className={styles.eyebrow}>About</div>
        <h1 className={styles.title}>Don&apos;t sign a contract you only half understand.</h1>
        <p className={styles.lede}>
          LegalLens is an AI reading aid for everyday Indian contracts. It turns dense clauses into a short summary, a risk score, and practical questions to ask before you sign.
        </p>

        <div className={styles.grid}>
          {points.map((point) => (
            <article className={styles.card} key={point.title}>
              <h2>{point.title}</h2>
              <p>{point.text}</p>
            </article>
          ))}
        </div>

        <p className={styles.note}>
          LegalLens is an AI tool, not a lawyer. Use it to prepare, then get advice from a qualified person for decisions that matter.
        </p>
      </div>
    </main>
  );
}
