import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">

      {/* =========================================
          FOOTER MAIN
      ========================================= */}

      <div className="footer-main">

        <div className="container">

          <div className="footer-grid">

            {/* BRAND */}

            <div className="footer-brand">

              <Link
                to="/"
                className="footer-logo"
              >
                <span className="footer-logo-main">
                  EMPRESS
                </span>

                <span className="footer-logo-sub">
                  BEAUTY
                </span>
              </Link>

              <p className="footer-brand-description">
                A modern beauty destination in Masaki,
                Dar es Salaam, created for beautiful
                moments, thoughtful care and confidence.
              </p>

              <Link
                to="/booking"
                className="footer-book-link"
              >
                Book Your Appointment
                <span>↗</span>
              </Link>

            </div>


            {/* EXPLORE */}

            <div className="footer-column">

              <span className="footer-column-title">
                Explore
              </span>

              <nav className="footer-links">

                <Link to="/">
                  Home
                </Link>

                <Link to="/services">
                  Services
                </Link>

                <Link to="/gallery">
                  Gallery
                </Link>

                <Link to="/team">
                  Our Team
                </Link>

                <Link to="/about">
                  About Us
                </Link>

              </nav>

            </div>


            {/* DISCOVER */}

            <div className="footer-column">

              <span className="footer-column-title">
                Discover
              </span>

              <nav className="footer-links">

                <Link to="/blog">
                  The Journal
                </Link>

                <Link to="/contact">
                  Contact
                </Link>

                <Link to="/booking">
                  Book an Appointment
                </Link>

              </nav>

            </div>


            {/* CONTACT */}

            <div className="footer-column footer-contact">

              <span className="footer-column-title">
                Visit Us
              </span>

              <div className="footer-contact-block">

                <span className="footer-contact-label">
                  Location
                </span>

                <p>
                  Masaki
                  <br />
                  Dar es Salaam
                  <br />
                  Tanzania
                </p>

              </div>


              <div className="footer-contact-block">

                <span className="footer-contact-label">
                  Phone
                </span>

                <a href="tel:+255741309031">
                  +255 741 309 031
                </a>

                <a href="tel:+255651829411">
                  +255 651 829 411
                </a>

              </div>


              <div className="footer-contact-block">

                <span className="footer-contact-label">
                  Email
                </span>

                <a href="mailto:empress.beauty@gmail.com">
                  empress.beauty@gmail.com
                </a>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          FOOTER MIDDLE
      ========================================= */}

      <div className="footer-middle">

        <div className="container">

          <div className="footer-middle-grid">

            <div>

              <span className="footer-hours-title">
                Opening Hours
              </span>

              <p>
                Monday – Saturday
                <strong>
                  8:00 AM – 8:00 PM
                </strong>
              </p>

              <p>
                Sunday
                <strong>
                  9:00 AM – 6:00 PM
                </strong>
              </p>

            </div>


            <div className="footer-social">

              <span className="footer-hours-title">
                Follow Along
              </span>

              <div className="footer-social-links">

                <a
                  href="https://instagram.com/empress_beauty"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                  <span>↗</span>
                </a>

                <a
                  href="https://tiktok.com/@Empress_beauty"
                  target="_blank"
                  rel="noreferrer"
                >
                  TikTok
                  <span>↗</span>
                </a>

              </div>

            </div>


            <div className="footer-po-box">

              <span>
                P.O. BOX
              </span>

              <strong>
                2985
              </strong>

            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          FOOTER BOTTOM
      ========================================= */}

      <div className="footer-bottom">

        <div className="container">

          <div className="footer-bottom-inner">

            <p>
              © {new Date().getFullYear()} Empress Beauty.
              All rights reserved.
            </p>

            <div className="footer-bottom-links">

              <span>
                Masaki · Dar es Salaam
              </span>

              <Link to="/contact">
                Contact
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;