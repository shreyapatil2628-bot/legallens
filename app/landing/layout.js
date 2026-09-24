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
  title: "About · LegalLens",
  description: "LegalLens reads Indian contracts in plain language and flags the risks before you sign.",
};

export default function LandingLayout({ children }) {
  return <div className={`${display.variable} ${sans.variable}`}>{children}</div>;
}
