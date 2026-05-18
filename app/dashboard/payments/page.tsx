"use client";

import { useEffect, useState, useOptimistic, startTransition } from "react";
import { supabase } from "@/lib/supabase";
import { z } from "zod";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const paymentSchema = z.object({
  nama: z.string().min(
    3,
    "Nama minimal 3 karakter"
  ),

  jenis: z.string().min(
    1,
    "Jenis iuran wajib dipilih"
  ),

  bulan: z.string().min(
    1,
    "Bulan pembayaran wajib dipilih"
  ),

  nominal: z
    .number()
    .min(
      1000,
      "Minimal pembayaran Rp1000"
    ),

  metode: z.string().min(
    1,
    "Metode pembayaran wajib dipilih"
  ),
});

export default function Payments() {

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [method, setMethod] =
    useState("");

  const [data, setData] =
    useState<any[]>([]);

  const [errorMsg, setErrorMsg] =
    useState("");

  const [namaError, setNamaError] =
    useState("");

  const [
    optimisticData,
    setOptimisticData,
  ] = useOptimistic(data);

  const searchParams =
    useSearchParams();

  const pathname =
    usePathname();

  const { replace } =
    useRouter();

  const search =
    searchParams.get("search") || "";

  const handleSearch = (
    term: string
  ) => {

    const params =
      new URLSearchParams(
        searchParams
      );

    if (term) {

      params.set(
        "search",
        term
      );

    } else {

      params.delete(
        "search"
      );
    }

    replace(
      `${pathname}?${params.toString()}`
    );
  };

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

  const handleDelete =
    async (
      id: number
    ) => {

      const confirmDelete =
        confirm(
          "Yakin ingin menghapus pembayaran ini?"
        );

      if (!confirmDelete)
        return;

      startTransition(() => {

        setOptimisticData(
          (prev) =>
            prev.filter(
              (item) =>
                item.id !== id
            )
        );

      });

      const { error } =
        await supabase
          .from("payments")
          .delete()
          .eq("id", id);

      if (error) {

        console.error(error);

        alert(
          "Gagal menghapus data"
        );

        getPayments();

        return;
      }

      setData((prev) =>
        prev.filter(
          (item) =>
            item.id !== id
        )
      );
    };

  const handleSubmit =
    async (
      e: any
    ) => {

      e.preventDefault();

      setErrorMsg("");

      const form =
        e.target;

      const nama =
        form.nama.value;

      const jenis =
        form.jenis.value;

      const bulan =
        form.bulan.value;

      const nominal =
        form.nominal.value;

      const metode =
        method;

      const catatan =
        form.catatan.value;

      const validation =
        paymentSchema.safeParse(
          {
            nama,
            jenis,
            bulan,
            nominal:
              Number(
                nominal
              ),
            metode,
          }
        );

      if (
        !validation.success
      ) {

        setErrorMsg(
          validation.error
            .issues[0]
            .message
        );

        return;
      }

      setLoading(true);

      const { error } =
        await supabase
          .from(
            "payments"
          )
          .insert([
            {
              nama,
              jenis_iuran:
                jenis,
              bulan,
              nominal:
                Number(
                  nominal
                ),
              metode,
              catatan,
              status:
                "pending",
            },
          ]);

      if (error) {

        console.error(
          error
        );

        setErrorMsg(
          "Gagal mengirim data ❌"
        );

        setLoading(
          false
        );

        return;
      }

      setLoading(false);

      setSuccess(true);

      form.reset();

      setMethod("");

      getPayments();

      setTimeout(() => {

        setSuccess(
          false
        );

      }, 3000);
    };

  return (

    <section className="payment-page">

      <div className="container">

        <h2 className="section-title">
          Pembayaran Iuran
        </h2>

        <div className="payment-grid">

          <div className="payment-box">

            <form
              className="payment-form"
              onSubmit={
                handleSubmit
              }
            >

              <input
                name="nama"
                type="text"
                placeholder="Nama Lengkap"
                onChange={(
                  e
                ) => {

                  const value =
                    e.target
                      .value;

                  if (
                    value.length >
                      0 &&
                    value.length < 3
                  ) {

                    setNamaError(
                      "Nama minimal 3 huruf"
                    );

                  } else {

                    setNamaError(
                      ""
                    );
                  }
                }}
                required
              />

              {namaError && (

                <p className="input-error">
                  {namaError}
                </p>

              )}

              <select
                name="jenis"
                required
              >

                <option value="">
                  Pilih Jenis Iuran
                </option>

                <option value="Kebersihan">
                  Kebersihan
                </option>

                <option value="Kematian">
                  Kematian
                </option>

                <option value="Kas Warga">
                  Kas Warga
                </option>

              </select>

              <select
                name="bulan"
                required
              >

                <option value="">
                  Pilih Bulan Pembayaran
                </option>

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

              <input
                name="nominal"
                type="number"
                placeholder="Nominal (Rp)"
                required
              />

              <select
                required
                value={method}
                onChange={(
                  e
                ) =>
                  setMethod(
                    e.target
                      .value
                  )
                }
              >

                <option value="">
                  Pilih Metode Pembayaran
                </option>

                <option value="Qris">
                  Qris
                </option>

                <option value="Transfer Bank">
                  Transfer Bank
                </option>

              </select>

              {method ===
                "Qris" && (

                <div className="payment-info qris">

                  <h4>
                    QRIS Payment
                  </h4>

                  <img
                    src="/asset/Qris.png"
                    alt="QRIS"
                  />

                  <p>
                    Scan QR untuk melakukan pembayaran
                  </p>

                </div>

              )}

              {method ===
                "Transfer Bank" && (

                <div className="payment-info bank">

                  <h4>
                    Transfer Bank
                  </h4>

                  <div className="bank-item">

                    <span>
                      No Rek
                    </span>

                    <strong>
                      1234567890
                    </strong>

                  </div>

                  <div className="bank-item">

                    <span>
                      Bank
                    </span>

                    <strong>
                      BCA
                    </strong>

                  </div>

                  <div className="bank-item">

                    <span>
                      Atas Nama
                    </span>

                    <strong>
                      Bendahara RT 05
                    </strong>

                  </div>

                </div>

              )}

              <textarea
                name="catatan"
                placeholder="Catatan (opsional)"
              />

              <button
                type="submit"
                disabled={
                  loading
                }
              >

                {loading
                  ? "Mengirim..."
                  : "Bayar Sekarang"}

              </button>

            </form>

            {errorMsg && (

              <p className="error">
                {errorMsg}
              </p>

            )}

            {success && (

              <p className="success">
                ✅ Pembayaran berhasil dikirim!
              </p>

            )}

          </div>

        </div>

      </div>

    </section>
  );
}