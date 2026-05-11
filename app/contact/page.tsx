"use client";

import { useState } from "react";

export default function Contact() {
  const [open, setOpen] = useState<number | null>(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setStatus("Mengirim...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setStatus(data.message);
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      setStatus(err.message);
    }
  };

  return (
    <section className="contact-section">
      <div className="container">

        <div className="contact-heading">
          <h2>Hubungi Kami</h2>
        </div>

        <div className="contact-form-box">

          <h3>Kirim Pesan</h3>

          <form className="contact-form" onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />

            <textarea
              rows={5}
              placeholder="Tulis pesan anda..."
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              required
            ></textarea>

            <button type="submit" className="btn-primary">
              Kirim Pesan
            </button>

            {status && <p style={{ marginTop: 10 }}>{status}</p>}

          </form>

        </div>

      </div>
    </section>
  );
}