"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {

  const [username, setUsername] =
    useState("");

  const [telepon, setTelepon] =
    useState("");

  const [alamat, setAlamat] =
    useState("");

  const [nik, setNik] =
    useState("");

  useEffect(() => {

    const getUser = async () => {

      const savedUsername =
        localStorage.getItem("username");

      if (!savedUsername) return;

      const { data, error } =
        await supabase
          .from("users")
          .select("*")
          .eq("username", savedUsername)
          .single();

      if (!error && data) {

        setUsername(data.username);

        setTelepon(data.telepon);

        setAlamat(data.alamat);

        setNik(data.nik);

      }
    };

    getUser();

  }, []);

  const handleUpdate = async (
    e: any
  ) => {

    e.preventDefault();

    const savedUsername =
      localStorage.getItem("username");

    const { error } = await supabase
      .from("users")
      .update({
        username,
        telepon,
        alamat,
        nik,
      })
      .eq("username", savedUsername);

    if (error) {

      alert("Gagal update ❌");

      return;
    }

    localStorage.setItem(
      "username",
      username
    );

    alert(
      "Profile berhasil diupdate ✅"
    );
  };

  return (

    <section className="admin-profile">

      <div className="profile-left">

        <div className="left-card">

          <div className="profile-avatar">

            {username.charAt(0)}

          </div>

          <h2>{username}</h2>

          <span>Administrator</span>

          <div className="profile-list">

            <div className="list-item">

              <h4>Username</h4>

              <p>{username}</p>

            </div>

            <div className="list-item">

              <h4>No Telepon</h4>

              <p>{telepon}</p>

            </div>

            <div className="list-item">

              <h4>Alamat</h4>

              <p>{alamat}</p>

            </div>

            <div className="list-item">

              <h4>NIK / No.KK</h4>

              <p>{nik}</p>

            </div>

          </div>

        </div>

      </div>

      <div className="profile-right">

        <div className="right-card">

          <h2>Edit Profile</h2>

          <form
            onSubmit={handleUpdate}
            className="profile-form"
          >

            <div className="input-group">

              <label>Username</label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="input-group">

              <label>No Telepon</label>

              <input
                type="text"
                value={telepon}
                onChange={(e) =>
                  setTelepon(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="input-group">

              <label>Alamat</label>

              <input
                type="text"
                value={alamat}
                onChange={(e) =>
                  setAlamat(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="input-group">

              <label>NIK / No.KK</label>

              <input
                type="text"
                value={nik}
                onChange={(e) =>
                  setNik(
                    e.target.value
                  )
                }
              />

            </div>

            <button type="submit">

              Simpan Perubahan

            </button>

          </form>

        </div>

      </div>

    </section>
  );
}