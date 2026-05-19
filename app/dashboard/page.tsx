"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {

  const [data, setData] =
    useState<any[]>([]);

  const [selectedMonth, setSelectedMonth] =
    useState("Mei 2026");

  const getPayments =
    async () => {

      const {
        data,
        error,
      } = await supabase
        .from("payments")
        .select("*")
        .order(
          "created_at",
          {
            ascending:
              false,
          }
        );

      if (!error) {

        setData(data || []);

      }
    };

  useEffect(() => {

    getPayments();

  }, []);

  const filteredPayments =
    data.filter(
      (item) =>
        item.bulan ===
        selectedMonth
    );

  const totalPayment =
    filteredPayments.reduce(
      (acc, item) =>
        acc + item.nominal,
      0
    );

  const totalTransaction =
    filteredPayments.length;

  return (

    <section className="dashboard-page">

      <div className="dashboard-header">

        <div>

          <h1>
            Dashboard SIWarga 👋
          </h1>

          <p>
            Pantau pembayaran
            iuran warga dengan
            lebih mudah dan cepat.
          </p>

        </div>

        <select
          value={
            selectedMonth
          }
          onChange={(e) =>
            setSelectedMonth(
              e.target.value
            )
          }
          className="month-filter"
        >

          <option value="Januari 2026">
            Januari 2026
          </option>

          <option value="Februari 2026">
            Februari 2026
          </option>

          <option value="Maret 2026">
            Maret 2026
          </option>

          <option value="April 2026">
            April 2026
          </option>

          <option value="Mei 2026">
            Mei 2026
          </option>

          <option value="Juni 2026">
            Juni 2026
          </option>

          <option value="Juli 2026">
            Juli 2026
          </option>

          <option value="Agustus 2026">
            Agustus 2026
          </option>

          <option value="September 2026">
            September 2026
          </option>

          <option value="Oktober 2026">
            Oktober 2026
          </option>

          <option value="November 2026">
            November 2026
          </option>

          <option value="Desember 2026">
            Desember 2026
          </option>

        </select>

      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <h4>
            Total Iuran Bulan Ini
          </h4>

          <h2>

            Rp{" "}

            {new Intl.NumberFormat(
              "id-ID"
            ).format(
              totalPayment
            )}

          </h2>

          <p>
            Total pembayaran
            bulan {
              selectedMonth
            }
          </p>

        </div>

        <div className="dashboard-card">

          <h4>
            Status Pembayaran
          </h4>

          <h2>

            {filteredPayments.length >
            0
              ? "Lunas"
              : "Belum Bayar"}

          </h2>

          <p>

            {filteredPayments.length >
            0
              ? "Pembayaran berhasil dilakukan"
              : "Belum ada pembayaran"}

          </p>

        </div>

        <div className="dashboard-card">

          <h4>
            Jumlah Transaksi
          </h4>

          <h2>
            {
              totalTransaction
            }
          </h2>

          <p>
            Riwayat pembayaran
            bulan {
              selectedMonth
            }
          </p>

        </div>

      </div>

      <div className="dashboard-payment-list">

        <div className="dashboard-section-title">

          <h3>
            Rincian Pembayaran
          </h3>

          <span>
            {
              selectedMonth
            }
          </span>

        </div>

        {filteredPayments.length ===
        0 ? (

          <div className="empty-payment">

            <p>
              Belum ada
              pembayaran
              di bulan ini
            </p>

          </div>

        ) : (

          filteredPayments.map(
            (
              item,
              index
            ) => (

              <div
                className="payment-item"
                key={index}
              >

                <div className="payment-left">

                  <div
                    className={`payment-badge ${
                      item.jenis_iuran ===
                      "Kebersihan"
                        ? "green"
                        : item.jenis_iuran ===
                          "Kas Warga"
                        ? "blue"
                        : "red"
                    }`}
                  >

                    {item.jenis_iuran.charAt(
                      0
                    )}

                  </div>

                  <div>

                    <h4>
                      Iuran{" "}
                      {
                        item.jenis_iuran
                      }
                    </h4>

                    <span>
                      Dibayar oleh{" "}
                      {
                        item.nama
                      }
                    </span>

                  </div>

                </div>

                <div className="payment-right">

                  <h5>

                    Rp{" "}

                    {new Intl.NumberFormat(
                      "id-ID"
                    ).format(
                      item.nominal
                    )}

                  </h5>

                  <div className="status success">

                    Lunas

                  </div>

                </div>

              </div>
            )
          )

        )}

      </div>

    </section>
  );
}