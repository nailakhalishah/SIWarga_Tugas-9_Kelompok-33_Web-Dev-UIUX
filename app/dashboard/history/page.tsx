"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HistoryPage() {

  const [data, setData] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const getPayments = async () => {

    const { data, error } =
      await supabase
        .from("payments")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (!error) {

      setData(data || []);

    }
  };

  useEffect(() => {

    getPayments();

  }, []);

  const filteredData =
    data.filter((item) =>
      item.jenis_iuran
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <section className="history-page">

      <div className="history-header">

        <div>

          <h1>
            Riwayat Pembayaran
          </h1>

          <p>
            Daftar seluruh transaksi pembayaran warga
          </p>

        </div>

        <input
          type="text"
          placeholder="Cari jenis iuran..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="history-search"
        />

      </div>

      {filteredData.length === 0 ? (

        <div className="empty-history">

          <h3>
            Data tidak ditemukan
          </h3>

          <p>
            Belum ada riwayat pembayaran
          </p>

        </div>

      ) : (

        <div className="history-list">

          {filteredData.map((item, i) => (

            <div
              key={i}
              className="history-card"
            >

              <div className="history-top">

                <div>

                  <h3>
                    {item.nama}
                  </h3>

                  <span className="history-date">
                    {item.bulan}
                  </span>

                </div>

                <div
                  className={`status ${item.status}`}
                >

                  {item.status || "Success"}

                </div>

              </div>

              <div className="history-detail">

                <div className="detail-row">

                  <span>
                    Jenis Iuran
                  </span>

                  <strong>
                    {item.jenis_iuran}
                  </strong>

                </div>

                <div className="detail-row">

                  <span>
                    Metode
                  </span>

                  <strong>
                    {item.metode}
                  </strong>

                </div>

                <div className="detail-row">

                  <span>
                    Nominal
                  </span>

                  <strong className="price">

                    Rp{" "}

                    {new Intl.NumberFormat(
                      "id-ID"
                    ).format(item.nominal)}

                  </strong>

                </div>

              </div>

              {item.catatan && (

                <div className="history-note">

                  {item.catatan}

                </div>

              )}

            </div>

          ))}

        </div>

      )}

    </section>
  );
}