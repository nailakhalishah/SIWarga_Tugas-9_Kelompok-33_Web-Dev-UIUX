"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [nik, setNik] =
    useState("");

  const [alamat, setAlamat] =
    useState("");

  const [telepon, setTelepon] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async (
    e: any
  ) => {

    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase
        .from("users")
        .insert([
          {
            username,
            nik,
            alamat,
            telepon,
            password,
          },
        ]);

    setLoading(false);

    if (error) {

      console.log(error);

      alert(error.message);

      return;
    }

    alert("Register berhasil ✅");

    router.push("/login");
  };

  return (

    <section className="login-page">

      <div className="login-box">

        <div className="login-left">

          <img
            src="/asset/logo.png"
            alt="SIWarga"
          />

          <h2>
            Bergabung Bersama SIWarga
          </h2>

          <p>
            Daftarkan akun Anda untuk menikmati
            layanan pembayaran iuran warga yang
            lebih praktis, cepat, dan transparan.
          </p>

        </div>

        <div className="login-right">

          <div className="login-title">

            <h2>
              Register
            </h2>

            <span>
              Buat akun baru SIWarga
            </span>

          </div>

          <form onSubmit={handleRegister}>

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
              type="text"
              placeholder="Masukkan NIK / No KK"
              value={nik}
              onChange={(e) =>
                setNik(
                  e.target.value
                )
              }
              required
            />

            <input
              type="text"
              placeholder="Masukkan Alamat"
              value={alamat}
              onChange={(e) =>
                setAlamat(
                  e.target.value
                )
              }
              required
            />

            <input
              type="text"
              placeholder="Masukkan No Telepon"
              value={telepon}
              onChange={(e) =>
                setTelepon(
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
                : "Register"}

            </button>

          </form>

          <p className="switch-auth">

            Sudah punya akun?

            <a href="/login">
              Login
            </a>

          </p>

        </div>

      </div>

    </section>
  );
}