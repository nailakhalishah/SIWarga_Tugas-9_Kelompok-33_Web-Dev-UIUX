"use client";

import {
  useEffect, useState, useOptimistic, startTransition} from "react";

import { supabase } from "@/lib/supabase";

import { z } from "zod";

import {
  useSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";

const paymentSchema = z.object({
  nama: z.string().min(
    3,
    "Nama minimal 3 karakter"
  ),

  jenis: z.string().min(
    1,
    "Jenis iuran wajib dipilih"
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

  // ================= OPTIMISTIC UI =================

  const [
    optimisticData,
    setOptimisticData,
  ] = useOptimistic(data);

  // ================= URL SEARCH =================

  const searchParams =
    useSearchParams();

  const pathname =
    usePathname();

  const { replace } =
    useRouter();

  const search =
    searchParams.get("search") || "";

  // ================= HANDLE SEARCH =================

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

  // ================= GET DATA =================

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

  // ================= DELETE =================

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

      // optimistic ui
      startTransition(() => {

        setOptimisticData(
          (prev) =>
            prev.filter(
              (item) =>
                item.id !== id
            )
        );

      });

      // delete database
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

      // update state utama
      setData((prev) =>
        prev.filter(
          (item) =>
            item.id !== id
        )
      );
    };

  // ================= SUBMIT =================

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

      const nominal =
        form.nominal.value;

      const metode =
        method;

      const catatan =
        form.catatan.value;

      // VALIDASI ZOD
      const validation =
        paymentSchema.safeParse(
          {
            nama,
            jenis,
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

      // INSERT DATABASE
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

          {/* ================= FORM ================= */}

          <div className="payment-box">

            <h3>
              Form Pembayaran
            </h3>

            <form
              className="payment-form"
              onSubmit={
                handleSubmit
              }
            >

              {/* NAMA */}
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
                    value.length <
                      3
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
                  {
                    namaError
                  }
                </p>
              )}

              {/* JENIS */}
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

              {/* NOMINAL */}
              <input
                name="nominal"
                type="number"
                placeholder="Nominal (Rp)"
                required
              />

              {/* METODE */}
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

              {/* QRIS */}
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

              {/* BANK */}
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

              {/* CATATAN */}
              <textarea
                name="catatan"
                placeholder="Catatan (opsional)"
              />

              {/* BUTTON */}
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

            {/* ERROR */}
            {errorMsg && (

              <p className="error">
                {errorMsg}
              </p>
            )}

            {/* SUCCESS */}
            {success && (

              <p className="success">
                ✅ Pembayaran berhasil dikirim!
              </p>
            )}

          </div>

          {/* ================= HISTORY ================= */}

          <div className="history-box">

            <h3>
              Riwayat Pembayaran
            </h3>

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Cari jenis iuran..."
              defaultValue={
                search
              }
              onChange={(
                e
              ) =>
                handleSearch(
                  e.target
                    .value
                )
              }
              className="search-input"
            />

            {optimisticData.length ===
            0 ? (

              <p>
                Belum ada data
              </p>

            ) : (

              <div className="history-list">

                {optimisticData
                  .filter(
                    (
                      item
                    ) =>
                      item.jenis_iuran
                        .toLowerCase()
                        .includes(
                          search.toLowerCase()
                        )
                  )
                  .map(
                    (
                      item,
                      i
                    ) => (

                      <div
                        key={
                          i
                        }
                        className="history-card"
                      >

                        <h4>
                          {
                            item.nama
                          }
                        </h4>

                        <p>
                          {
                            item.jenis_iuran
                          }
                        </p>

                        <p>
                          {item.metode
                            .toLowerCase()
                            .replace(
                              /\b\w/g,
                              (
                                c: string
                              ) =>
                                c.toUpperCase()
                            )}
                        </p>

                        <p>
                          Rp{" "}

                          {new Intl.NumberFormat(
                            "id-ID"
                          ).format(
                            item.nominal
                          )}

                        </p>

                        {item.catatan && (

                          <p>
                            {
                              item.catatan
                            }
                          </p>
                        )}

                        <span
                          className={`badge ${item.status}`}
                        >
                          {
                            item.status
                          }
                        </span>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              item.id
                            )
                          }
                        >
                          Hapus
                        </button>

                      </div>
                    )
                  )}

              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}