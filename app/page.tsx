export default function Home() {
  return (
    <main>

      <section className="hero">
        <div className="blur-circle one"></div>
        <div className="blur-circle two"></div>

        <div className="container hero-container">

          <div className="hero-image">
            <img src="/asset/hero.png" alt="hero" />
          </div>

          <div className="hero-text">
            <h2>
              Kelola Iuran Warga <br />
              <span>Lebih Mudah</span>
            </h2>

            <p>
              Solusi digital untuk pembayaran iuran yang cepat,
              transparan, dan tanpa ribet.
            </p>

            <div className="hero-btn">
              <a href="/services" className="btn-primary">
                Mulai Sekarang
              </a>
              <a href="/about" className="btn-secondary">
                Pelajari
              </a>
            </div>
          </div>

        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Fitur Unggulan</h2>

          <div className="feature-container">

            <div className="card">
              <div className="icon">
                <img src="/asset/kebersihan.png" alt="kebersihan" />
              </div>
              <h3>Kebersihan</h3>
              <p>Iuran kebersihan lebih praktis dan otomatis tercatat.</p>
            </div>

            <div className="card">
              <div className="icon">
                <img src="/asset/kematian.png" alt="kematian" />
              </div>
              <h3>Kematian</h3>
              <p>Pengelolaan iuran transparan dan mudah dilacak.</p>
            </div>

            <div className="card">
              <div className="icon">
                <img src="/asset/kas.png" alt="kas" />
              </div>
              <h3>Kas Warga</h3>
              <p>Kelola kas warga dengan sistem digital yang rapi.</p>
            </div>

          </div>
        </div>
      </section>

      <section className="testimonial">
        <div className="container">

          <h2 className="section-title">Apa Kata Pengguna?</h2>

          <div className="testi-container">

            <div className="testi">
              <div className="user">
                <img src="https://i.pravatar.cc/60?img=1" alt="User 1" />
                <div>
                  <h4>Andi</h4>
                  <span>Warga</span>
                </div>
              </div>
              <p>"Sekarang bayar iuran gak perlu nunggu bendahara."</p>
            </div>

            <div className="testi">
              <div className="user">
                <img src="https://i.pravatar.cc/60?img=2" alt="User 2" />
                <div>
                  <h4>Pak RT</h4>
                  <span>Ketua RT</span>
                </div>
              </div>
              <p>"Semua jadi transparan dan tercatat rapi."</p>
            </div>

          </div>

        </div>
      </section>

      <section className="about">
        <div className="container">
          <h2 className="section-title">Tentang SIWarga</h2>
          <p>
            SIWarga adalah sebuah website yang dirancang untuk memudahkan warga dalam melakukan 
            pembayaran iuran RT secara online dengan cepat, praktis, dan aman.
            Pengguna dapat membayar berbagai iuran tanpa harus bertemu secara offline. 
            Semua transaksi tercatat secara otomatis sehingga lebih tranparan dan mudah dipantau.
          </p>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>
            Siap beralih ke sistem iuran digital yang lebih modern?
          </h2>
          <a href="#" className="btn-primary">
            Daftar Sekarang
          </a>
        </div>
      </section>

    </main>
  );
}