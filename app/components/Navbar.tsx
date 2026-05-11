"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "active" : "";

  return (
    <header className="navbar">
      <div className="container nav-wrapper">

        <Link href="/" className="logo">
          <img src="/asset/logo.png" alt="SIWarga Logo" />
        </Link>

        <nav>
          <Link href="/" className={isActive("/")}>
            Home
          </Link>

          <Link href="/about" className={isActive("/about")}>
            About
          </Link>

          <Link href="/services" className={isActive("/services")}>
            Services
          </Link>
          
          <Link href="/contact" className={isActive("/contact")}>
            Contact
          </Link>

          <Link href="/users" className={isActive("/users")}>
            Users
          </Link>

        </nav>

      </div>
    </header>
  );
}