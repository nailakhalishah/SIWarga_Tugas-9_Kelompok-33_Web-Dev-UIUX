export default function ServicesPage() {

  return (

    <section className="dashboard-services">

      <div className="dashboard-title">

        <h1>
          Layanan SIWarga
        </h1>

        <p>
          Berbagai layanan digital untuk membantu warga
          melakukan pembayaran iuran dengan lebih mudah,
          cepat, dan transparan.
        </p>

      </div>

      <div className="services-grid">

        <div className="service-card">

            <div className="service-icon">

                <img
                src="/asset/kebersihan.png"
                alt="Kebersihan"
                />

            </div>

            <h3>
                Iuran Kebersihan
            </h3>

            <h4 className="service-price">
                Rp 50.000 / bulan
            </h4>

            <p>
                Pembayaran iuran kebersihan menjadi lebih praktis
                tanpa harus datang langsung ke bendahara RT.
            </p>

            </div>

        <div className="service-card">

            <div className="service-icon">

                <img
                src="/asset/kematian.png"
                alt="Kematian"
                />

            </div>

            <h3>
                Iuran Kematian
            </h3>

            <h4 className="service-price">
                Rp 10.000 / bulan
            </h4>

            <p>
                Membantu pengelolaan dana sosial warga dengan
                pencatatan yang lebih transparan dan rapi.
            </p>

            </div>

        <div className="service-card">

            <div className="service-icon">

                <img
                src="/asset/kas.png"
                alt="Kas Warga"
                />

            </div>

            <h3>
                Kas Warga
            </h3>

            <h4 className="service-price">
                Rp 10.000 / bulan
            </h4>

            <p>
                Kelola kas warga secara digital agar semua data
                pembayaran tersimpan otomatis dan aman.
            </p>

            </div>

      </div>

    </section>
  );
}

