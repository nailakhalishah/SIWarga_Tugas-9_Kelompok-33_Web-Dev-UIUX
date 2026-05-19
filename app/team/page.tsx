export default function TeamPage() {
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

  return (
    <section className="team-page">
      <h1>Tim Kami</h1>

      <div className="team-grid">
        {teamData.map((member) => (
          <a key={member.id} href={`/team/${member.id}`} className="team-item">
            
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>

          </a>
        ))}
      </div>
    </section>
  );
}