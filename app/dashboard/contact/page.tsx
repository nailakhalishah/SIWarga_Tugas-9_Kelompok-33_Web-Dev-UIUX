"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: any
  ) => {

    e.preventDefault();

    setError("");

    const form = e.target;

    const nama =
      form.nama.value;

    const email =
      form.email.value;

    const pesan =
      form.pesan.value;

    setLoading(true);

    const { error } =
      await supabase
        .from("contacts")
        .insert([
          {
            nama,
            email,
            pesan,
          },
        ]);

    if (error) {

      console.error(error);

      setError(
        "Gagal mengirim pesan ❌"
      );

      setLoading(false);

      return;
    }

    setSuccess(true);

    setLoading(false);

    form.reset();

    setTimeout(() => {

      setSuccess(false);

    }, 3000);
  };

  return (

    <section className="dashboard-contact">

      <div className="contact-header">

        <h1>
          Hubungi Kami
        </h1>

        <p>
          Jika memiliki pertanyaan,
          kendala pembayaran,
          atau membutuhkan bantuan
          terkait layanan SIWarga,
          silakan hubungi kami melalui
          informasi berikut.
        </p>

      </div>

      <div className="contact-container">

        <div className="contact-card">

          <div className="contact-icon">
            📞
          </div>

          <h3>
            Telepon
          </h3>

          <p>
            +62 812 3456 7890
          </p>

        </div>

        <div className="contact-card">

          <div className="contact-icon">
            ✉️
          </div>

          <h3>
            Email
          </h3>

          <p>
            siwarga@gmail.com
          </p>

        </div>

        <div className="contact-card">

          <div className="contact-icon">
            📍
          </div>

          <h3>
            Alamat
          </h3>

          <p>
            RT 05 / RW 02
            <br />
            Surabaya, Jawa Timur
          </p>

        </div>

      </div>

      <div className="contact-form-box">

        <h2>
          Kirim Pesan
        </h2>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <input
            name="nama"
            type="text"
            placeholder="Nama Lengkap"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
          />

          <textarea
            name="pesan"
            placeholder="Tulis pesan..."
            required
          />

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Mengirim..."
              : "Kirim Pesan"}

          </button>

        </form>

        {success && (

          <p className="success">
            ✅ Pesan berhasil dikirim
          </p>
        )}

        {error && (

          <p className="error">
            {error}
          </p>
        )}

      </div>

    </section>
  );
}