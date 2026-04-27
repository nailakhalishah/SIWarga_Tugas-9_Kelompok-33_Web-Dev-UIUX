"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="users-page">
      <div className="container">

        <h1>Data Warga (API)</h1>

        {/* search */}
        <input
          type="text"
          placeholder="Cari nama warga..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        {loading && <p>Loading...</p>}

        <div className="users-container">
          {filteredUsers.map((user) => (
            <Link
              href={`/users/${user.id}`}
              key={user.id}
              className="user-card"
            >
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>{user.address.city}</p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}