"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {

  const pathname =
    usePathname();

  const [username, setUsername] =
    useState("");

  useEffect(() => {

    const user =
      localStorage.getItem(
        "username"
      );

    if (user) {

      setUsername(user);

    }

  }, []);

  const isActive = (
    path: string
  ) =>
    pathname === path
      ? "active"
      : "";

  const hideNavbar =
    pathname.startsWith(
      "/dashboard"
    );

  if (hideNavbar) {

    return null;

  }

  return (

    <header className="navbar">

      <div className="container nav-wrapper">

        <Link
          href="/"
          className="logo"
        >

          <img
            src="/asset/logo.png"
            alt="SIWarga Logo"
          />

        </Link>

        <nav>

          <Link
            href="/"
            className={isActive("/")}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={isActive("/about")}
          >
            About
          </Link>

          <Link
            href="/services"
            className={isActive("/services")}
          >
            Services
          </Link>

          <Link
            href="/contact"
            className={isActive("/contact")}
          >
            Contact
          </Link>

        </nav>

        <div className="nav-profile">

          {username ? (

            <Link
              href="/dashboard/profile"
              className="profile-user"
            >

              <div className="profile-circle">

                {username.charAt(0)}

              </div>

            </Link>

          ) : (

            <div className="nav-auth">

              <Link
                href="/login"
                className="login-nav"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="signup-nav"
              >
                Sign Up
              </Link>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}