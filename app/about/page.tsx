export default function About() {
  return (
    <section className="about-page">

      <div className="about-blob blob1"></div>
      <div className="about-blob blob2"></div>

      <div className="container">
        <div className="about-grid">

          {/* Left */}
          <div className="about-content">

            <span className="about-badge">
              Tentang Kami
            </span>

            <h1>
              Solusi Digital untuk
              <span> Pembayaran Iuran RT</span>
            </h1>

            <p>
              SIWarga memudahkan warga membayar iuran secara online
              dengan proses yang lebih cepat, aman dan transparan.
            </p>

            <p>
              Semua transaksi tercatat otomatis sehingga pengelolaan
              keuangan RT menjadi lebih praktis dan modern.
            </p>

            <div className="about-stats">

              <div className="stat-box">
                <h3>100%</h3>
                <span>Aman</span>
              </div>

              <div className="stat-box">
                <h3>24/7</h3>
                <span>Akses</span>
              </div>

              <div className="stat-box">
                <h3>Real-time</h3>
                <span>Laporan</span>
              </div>

            </div>

          </div>


          {/* Right */}
          <div className="about-card-wrap">

            <div className="about-card">
              <h2>Mengapa Memilih SIWarga?</h2>

              <div className="benefit">
                <span>⚡</span>
                Pembayaran lebih cepat
              </div>

              <div className="benefit">
                <span>🔒</span>
                Transaksi aman dan tercatat
              </div>

              <div className="benefit">
                <span>📊</span>
                Laporan transparan real-time
              </div>

              <div className="benefit">
                <span>🌐</span>
                Akses kapan saja
              </div>
            </div>


            <div className="floating floating-top">
              Aman Terjamin
            </div>

            <div className="floating floating-bottom">
              Monitoring Real-time
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}