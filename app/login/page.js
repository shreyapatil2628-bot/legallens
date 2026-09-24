"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, signIn, signUp } from "../lib/auth";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (getSession()) router.replace("/");
  }, [router]);

  const switchMode = () => {
    setMode((current) => (current === "signin" ? "signup" : "signin"));
    setError("");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "signup") await signUp(name, email, password);
      else await signIn(email, password);
      router.replace("/");
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setSubmitting(false);
    }
  };

  const signingIn = mode === "signin";

  return (
    <main className={styles.page}>
      <section className={styles.showcase}>
        <a className={styles.brand} href="/login">
          <span className={styles.mark}>⚖️</span>
          <span>
            <div className={styles.brandName}>LegalLens</div>
            <div className={styles.brandSub}>India Edition</div>
          </span>
        </a>

        <div className={styles.copy}>
          <div className={styles.eyebrow}>Before you sign</div>
          <h1 className={styles.headline}>
            Read the clause
            <br />
            <em>before it reads you.</em>
          </h1>
          <p className={styles.lede}>
            LegalLens turns rental agreements, offer letters, and NDAs into plain language, risk scores, and negotiation points.
          </p>
        </div>

        <div className={styles.preview}>
          <div className={styles.previewTop}>
            <span className={styles.previewLabel}>Sample analysis</span>
            <span className={styles.score}>7/10</span>
          </div>
          <div className={styles.bar}><span /></div>
          <div className={styles.clause}>
            <span className={`${styles.tag} ${styles.high}`}>HIGH</span>
            <span>Leaving early forfeits the entire security deposit.</span>
          </div>
          <div className={styles.clause}>
            <span className={`${styles.tag} ${styles.med}`}>MED</span>
            <span>Late rent adds Rs. 500 for every day past the due date.</span>
          </div>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.card}>
          <div className={styles.mobileBrand}>
            <span className={styles.mark}>⚖️</span>
            <span>
              <div className={styles.brandName}>LegalLens</div>
              <div className={styles.brandSub}>India Edition</div>
            </span>
          </div>

          <p className={styles.kicker}>{signingIn ? "Welcome back" : "Get started"}</p>
          <h2 className={styles.title}>{signingIn ? "Sign in" : "Create account"}</h2>
          <p className={styles.subtitle}>
            {signingIn
              ? "Open your workspace and keep reading contracts with a clearer head."
              : "Create an account on this browser, then start an analysis."}
          </p>

          <form className={styles.form} onSubmit={onSubmit}>
            {!signingIn && (
              <div className={styles.field}>
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Amit Kumar"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            )}

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordWrap}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={signingIn ? "current-password" : "new-password"}
                  placeholder={signingIn ? "Your password" : "At least 6 characters"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={signingIn ? undefined : 6}
                />
                <button
                  className={styles.toggle}
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button className={styles.submit} type="submit" disabled={submitting}>
              {submitting ? "Please wait..." : signingIn ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className={styles.switch}>
            {signingIn ? "New to LegalLens?" : "Already have an account?"}{" "}
            <button type="button" onClick={switchMode}>
              {signingIn ? "Create an account" : "Sign in"}
            </button>
          </p>
          <p className={styles.note}>
            Accounts stay on this device. LegalLens is an AI tool, not a lawyer.
          </p>
        </div>
      </section>
    </main>
  );
}
