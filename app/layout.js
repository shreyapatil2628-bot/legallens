import "./globals.css";

export const metadata = {
  title: "LegalLens ⚖️ — AI Contract Analyzer",
  description: "Analyze legal contracts instantly in English, Hindi and Marathi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}