"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HistoryPage() {

  const [data, setData] =
    useState<any[]>([]);

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

  return (

    <section className="history-page">

      <h1>
        Riwayat Pembayaran
      </h1>

      {data.length === 0 ? (

        <p>
          Belum ada data pembayaran
        </p>

      ) : (

        <div className="history-list">

          {data.map((item, i) => (

            <div
              key={i}
              className="history-card"
            >

              <h3>
                {item.nama}
              </h3>

              <p>
                {item.jenis_iuran}
              </p>

              <p>
                {item.metode}
              </p>

              <p>
                {item.bulan}
              </p>

              <p>

                Rp{" "}

                {new Intl.NumberFormat(
                  "id-ID"
                ).format(item.nominal)}

              </p>

              {item.catatan && (

                <span>
                  {item.catatan}
                </span>

              )}

            </div>

          ))}

        </div>

      )}

    </section>
  );
}