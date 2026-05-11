export default function Services() {
  return (
    <section className="services-modern">

      <div className="service-blur one"></div>
      <div className="service-blur two"></div>

      <div className="container">

        <div className="services-heading">
          <span>Layanan Kami</span>

          <h2>
            Kelola Iuran Warga
            <br />
            Lebih Mudah & Transparan
          </h2>

          <p>
            SIWarga menghadirkan layanan pembayaran digital
            untuk berbagai kebutuhan iuran warga.
          </p>
        </div>


        <div className="services-grid">

          <div className="service-box">


            <div className="service-image">
              <img src="/asset/kebersihan.png" alt="" />
            </div>

            <span className="mini-badge">
              Populer
            </span>

            <h3>Iuran Kebersihan</h3>

            <p>
              Pembayaran rutin kebersihan
              lebih mudah dan tercatat otomatis.
            </p>
          </div>



          <div className="service-box middle">

            <div className="service-image">
              <img src="/asset/kematian.png" alt="" />
            </div>

            <span className="mini-badge">
              Transparan
            </span>

            <h3>Iuran Kematian</h3>

            <p>
              Dana sosial tercatat rapi
              dan mudah dipantau warga.
            </p>
          </div>

          <div className="service-box">

            <div className="service-image">
              <img src="/asset/kas.png" alt="" />
            </div>

            <span className="mini-badge">
              Real-time
            </span>

            <h3>Kas Warga</h3>

            <p>
              Monitoring keuangan RT
              dengan laporan langsung.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}