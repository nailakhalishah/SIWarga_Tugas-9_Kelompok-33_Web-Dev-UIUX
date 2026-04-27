import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserDetail({ params }: any) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`
  );

  if (!res.ok) return notFound();

  const user = await res.json();

  return (
    <section className="user-detail">
      <div className="container">

        <Link href="/users" className="btn-secondary">
          ← Kembali
        </Link>

        <div className="detail-card">
          <h1>{user.name}</h1>

          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Telepon:</strong> {user.phone}</p>
          <p><strong>Kota:</strong> {user.address.city}</p>
          <p><strong>Perusahaan:</strong> {user.company.name}</p>
        </div>

      </div>
    </section>
  );
}