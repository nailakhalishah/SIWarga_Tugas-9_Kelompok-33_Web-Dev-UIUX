"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  const router = useRouter();

  const handleLogout = () => {

    localStorage.removeItem(
      "username"
    );

    router.push("/login");
  };

  const isActive = (path: string) =>
    pathname === path
      ? "sidebar-active"
      : "";

  return (

    <div className="dashboard-layout">

      <aside className="dashboard-sidebar">

        <div className="sidebar-logo">

          <img
            src="/asset/logo.png"
            alt="SIWarga"
          />

        </div>

        <nav className="sidebar-menu">

        <Link
            href="/dashboard"
            className={isActive("/dashboard")}
        >
            Dashboard
        </Link>

        <Link
            href="/dashboard/payments"
            className={isActive("/dashboard/payments")}
        >
            Payments
        </Link>

        <Link
            href="/dashboard/history"
            className={isActive("/dashboard/history")}
        >
            Riwayat
        </Link>

        <Link
            href="/dashboard/profile"
            className={isActive("/dashboard/profile")}
        >
            Profile
        </Link>

        <Link
            href="/dashboard/services"
            className={isActive("/dashboard/services")}
        >
            Services
        </Link>

        <Link
            href="/dashboard/contact"
            className={isActive("/dashboard/contact")}
        >
            Contact
        </Link>

        </nav>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>

      <main className="dashboard-content">

        {children}

      </main>

    </div>
  );
}