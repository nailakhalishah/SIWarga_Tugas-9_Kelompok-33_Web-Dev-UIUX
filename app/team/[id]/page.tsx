type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function TeamDetail({ params }: Props) {
  const { id } = await params

  const teamData = [
    {
      id: "1",
      name: "Naila Khalishah Mahendra",
      role: "Frontend Developer",
      image: "https://i.pravatar.cc/150?img=5"
    },
    {
      id: "2",
      name: "Faiz",
      role: "UI/UX Designer",
      image: "https://i.pravatar.cc/150?img=8"
    },
    {
      id: "3",
      name: "Yunus Alfarizi",
      role: "Backend Developer",
      image: "https://i.pravatar.cc/150?img=3"
    },
  ];

  const member = teamData.find((t) => t.id === id);

  if (!member) {
    return <h1 style={{ textAlign: "center", marginTop: "120px" }}>Member tidak ditemukan</h1>
  }

  return (
    <section className="team-detail-page">
      <div className="team-card">

        <img src={member.image} alt={member.name} className="team-avatar" />

        <h1>{member.name}</h1>

        <span className="team-role">{member.role}</span>

        <p>
          Member dari tim SIWarga yang berkontribusi dalam pengembangan sistem digital
          untuk mempermudah pengelolaan iuran warga.
        </p>

        <a href="/team" className="btn-primary">
          Kembali
        </a>

      </div>
    </section>
  );
}