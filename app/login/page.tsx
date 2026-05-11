"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: any
  ) => {

    e.preventDefault();

    setLoading(true);

    const {
      data,
      error,
    } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();

    setLoading(false);

    if (error || !data) {

      alert(
        "Username atau Password salah ❌"
      );

      return;
    }

    alert("Login berhasil ✅");

    router.push("/payments");
  };

  return (

    <section className="login-page">

      <div className="login-box">

        <div className="login-header">

          <div className="login-logo">
            <img
              src="/asset/logo.png"
              alt="SIWarga"
            />
          </div>

          <div className="login-title">

            <h2>Login</h2>

            <span>
              Masuk untuk mengelola
              pembayaran iuran warga
              dengan mudah dan cepat.
            </span>

          </div>

        </div>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Masukkan Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <button type="submit">

            {loading
              ? "Loading..."
              : "Login"}

          </button>

        </form>

        <p className="switch-auth">

          Belum punya akun?

          <a href="/register">
            Register
          </a>

        </p>

      </div>

    </section>
  );
}