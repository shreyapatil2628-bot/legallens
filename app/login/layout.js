import { Fraunces, Outfit } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Sign in · LegalLens",
  description: "Sign in to LegalLens, the AI contract analyzer.",
};

export default function LoginLayout({ children }) {
  return <div className={`${display.variable} ${sans.variable}`}>{children}</div>;
}
