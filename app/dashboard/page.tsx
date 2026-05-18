"use client";

import { useState } from "react";

export default function DashboardPage() {

  const bulanIndonesia = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];

  const currentDate = new Date();

  const currentMonthIndex =
    currentDate.getMonth();

  const currentYear =
    currentDate.getFullYear();

  const [selectedMonth, setSelectedMonth] =
    useState(currentMonthIndex);

  return (

    <section className="dashboard-page">

      <div className="dashboard-header">

        <div>

          <h2>
            Dashboard SIWarga 👋
          </h2>

          <p>
            Pantau pembayaran iuran warga
            dengan lebih mudah dan cepat.
          </p>

        </div>

        <select
          className="dashboard-select"
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(
              Number(e.target.value)
            )
          }
        >

          {bulanIndonesia.map(
            (bulan, index) => (

              <option
                key={index}
                value={index}
              >
                {bulan} {currentYear}
              </option>

            )
          )}

        </select>

      </div>

      <div className="summary-grid">

        <div className="summary-card">

          <div className="summary-top">

            <span>
              Total Iuran Bulan Ini
            </span>

            <div className="summary-icon">
              💰
            </div>

          </div>

          <h3>
            Rp70.000
          </h3>

          <p>
            Total seluruh pembayaran
            bulan {bulanIndonesia[selectedMonth]}
          </p>

        </div>

        <div className="summary-card">

          <div className="summary-top">

            <span>
              Status Pembayaran
            </span>

            <div className="summary-icon">
              ✅
            </div>

          </div>

          <h3>
            Lunas
          </h3>

          <p>
            Semua iuran sudah dibayar
          </p>

        </div>

        <div className="summary-card">

          <div className="summary-top">

            <span>
              Jumlah Transaksi
            </span>

            <div className="summary-icon">
              📄
            </div>

          </div>

          <h3>
            3
          </h3>

          <p>
            Riwayat pembayaran bulan{" "}
            {bulanIndonesia[selectedMonth]}
          </p>

        </div>

      </div>

      <div className="dashboard-payment">

        <div className="dashboard-title">

          <h3>
            Rincian Pembayaran
          </h3>

        </div>

        <div className="payment-list">

          <div className="payment-item">

            <div className="payment-left">

              <div className="payment-badge green">
                K
              </div>

              <div>

                <h4>
                  Iuran Kebersihan
                </h4>

                <span>
                  Pembayaran bulan{" "}
                  {bulanIndonesia[selectedMonth]}
                </span>

              </div>

            </div>

            <div className="payment-right">

              <h5>
                Rp50.000
              </h5>

              <span className="status success">
                Lunas
              </span>

            </div>

          </div>

          <div className="payment-item">

            <div className="payment-left">

              <div className="payment-badge blue">
                K
              </div>

              <div>

                <h4>
                  Kas Warga
                </h4>

                <span>
                  Pembayaran bulan{" "}
                  {bulanIndonesia[selectedMonth]}
                </span>

              </div>

            </div>

            <div className="payment-right">

              <h5>
                Rp10.000
              </h5>

              <span className="status pending">
                Pending
              </span>

            </div>

          </div>

          <div className="payment-item">

            <div className="payment-left">

              <div className="payment-badge red">
                K
              </div>

              <div>

                <h4>
                  Iuran Kematian
                </h4>

                <span>
                  Pembayaran bulan{" "}
                  {bulanIndonesia[selectedMonth]}
                </span>

              </div>

            </div>

            <div className="payment-right">

              <h5>
                Rp10.000
              </h5>

              <span className="status success">
                Lunas
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}