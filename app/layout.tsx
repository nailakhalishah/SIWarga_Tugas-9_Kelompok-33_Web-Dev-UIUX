import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "SIWarga",
  description: "Sistem Iuran Warga Digital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>

        <Navbar />

        <main>
          {children}
        </main>

        <footer>
          <p>© 2026 SIWarga. All rights reserved.</p>
        </footer>

      </body>
    </html>
  );
}