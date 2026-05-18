export default function Loading() {
  return (
    <section className="payment-page">
      <div className="container">

        <div className="payment-grid">

          <div className="payment-box skeleton-box">

            <div className="skeleton skeleton-title"></div>

            <div className="skeleton skeleton-input"></div>
            <div className="skeleton skeleton-input"></div>
            <div className="skeleton skeleton-input"></div>
            <div className="skeleton skeleton-input"></div>

            <div className="skeleton skeleton-button"></div>

          </div>

          <div className="history-box skeleton-box">

            <div className="skeleton skeleton-title"></div>

            {[1,2,3].map((item) => (
              <div
                key={item}
                className="skeleton-card"
              >
                <div className="skeleton skeleton-text"></div>

                <div className="skeleton skeleton-small"></div>

                <div className="skeleton skeleton-small"></div>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}