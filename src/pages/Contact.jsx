import { Link } from "react-router-dom";
import "./Contact.css";

function Contact() {
  return (
    <main className="contact-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="contact-hero">

        <div className="container contact-hero-content">

          <span className="section-label">
            Get In Touch
          </span>

          <h1>
            Let's make
            <br />
            <em>time for you.</em>
          </h1>

          <p>
            Whether you have a question, need help choosing
            a service or you're ready to book your next
            beauty experience, we're here for you.
          </p>

        </div>

        <div className="contact-hero-number">
          08
        </div>

      </section>


      {/* =========================================
          CONTACT INTRO
      ========================================= */}

      <section className="contact-intro">

        <div className="container">

          <div className="contact-intro-grid">

            <div>

              <span className="section-label">
                Empress Beauty
              </span>

              <h2>
                We'd love to
                <br />
                <em>hear from you.</em>
              </h2>

            </div>

            <div>

              <p>
                Have a question about a service? Planning
                something special? Or simply want to know
                more about Empress Beauty?
              </p>

              <p>
                Reach out to us using the details below or
                send us a message. Our team will be happy
                to help you.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CONTACT DETAILS + FORM
      ========================================= */}

      <section className="contact-main">

        <div className="container">

          <div className="contact-main-grid">


            {/* CONTACT DETAILS */}

            <div className="contact-details">

              <div className="contact-detail-block">

                <span className="contact-detail-label">
                  Visit Us
                </span>

                <h3>
                  Masaki
                </h3>

                <p>
                  Dar es Salaam,
                  <br />
                  Tanzania
                </p>

              </div>


              <div className="contact-detail-block">

                <span className="contact-detail-label">
                  Call Us
                </span>

                <h3>
                  +255 741 309 031
                </h3>

                <p>
                  +255 651 829 411
                </p>

              </div>


              <div className="contact-detail-block">

                <span className="contact-detail-label">
                  Email Us
                </span>

                <h3>
                  empress.beauty@gmail.com
                </h3>

              </div>


              <div className="contact-detail-block">

                <span className="contact-detail-label">
                  Opening Hours
                </span>

                <p>
                  Monday – Saturday
                  <br />
                  8:00 AM – 8:00 PM
                </p>

                <p>
                  Sunday
                  <br />
                  9:00 AM – 6:00 PM
                </p>

              </div>


              <div className="contact-socials">

                <span className="contact-detail-label">
                  Follow Along
                </span>

                <div className="contact-social-links">

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

            </div>


            {/* CONTACT FORM */}

            <div className="contact-form-wrapper">

              <div className="contact-form-heading">

                <span className="section-label">
                  Send A Message
                </span>

                <h2>
                  How can we
                  <br />
                  <em>help you?</em>
                </h2>

              </div>


              <form className="contact-form">

                <div className="contact-form-row">

                  <div className="form-group">

                    <label
                      htmlFor="name"
                      className="form-label"
                    >
                      Your Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      className="form-input"
                      placeholder="Enter your name"
                    />

                  </div>


                  <div className="form-group">

                    <label
                      htmlFor="email"
                      className="form-label"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      className="form-input"
                      placeholder="Enter your email"
                    />

                  </div>

                </div>


                <div className="contact-form-row">

                  <div className="form-group">

                    <label
                      htmlFor="phone"
                      className="form-label"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      className="form-input"
                      placeholder="+255..."
                    />

                  </div>


                  <div className="form-group">

                    <label
                      htmlFor="subject"
                      className="form-label"
                    >
                      Subject
                    </label>

                    <select
                      id="subject"
                      className="form-select"
                      defaultValue=""
                    >

                      <option
                        value=""
                        disabled
                      >
                        Select a subject
                      </option>

                      <option value="booking">
                        Booking Question
                      </option>

                      <option value="services">
                        Services
                      </option>

                      <option value="bridal">
                        Bridal & Events
                      </option>

                      <option value="general">
                        General Enquiry
                      </option>

                    </select>

                  </div>

                </div>


                <div className="form-group">

                  <label
                    htmlFor="message"
                    className="form-label"
                  >
                    Your Message
                  </label>

                  <textarea
                    id="message"
                    className="form-textarea"
                    placeholder="Tell us how we can help..."
                  ></textarea>

                </div>


                <button
                  type="submit"
                  className="btn btn-primary contact-submit"
                >
                  Send Message
                  <span>↗</span>
                </button>

                <p className="contact-form-note">
                  We'll get back to you as soon as possible.
                </p>

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          VISUAL LOCATION
      ========================================= */}

      <section className="contact-location">

        <div className="container">

          <div className="contact-location-grid">

            <div className="contact-location-image">

              <img
                src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1200&q=85"
                alt="Elegant beauty studio interior"
              />

            </div>


            <div className="contact-location-content">

              <span className="section-label">
                Come See Us
              </span>

              <h2>
                Your next
                <br />
                <em>Empress moment.</em>
              </h2>

              <p>
                Step into a space designed to help you
                slow down, feel comfortable and enjoy
                being taken care of.
              </p>

              <div className="contact-address">

                <span>
                  EMPRESS BEAUTY
                </span>

                <p>
                  Masaki
                  <br />
                  Dar es Salaam
                  <br />
                  Tanzania
                </p>

              </div>

              <Link
                to="/booking"
                className="btn btn-gold"
              >
                Book Your Visit
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          FAQ MINI SECTION
      ========================================= */}

      <section className="contact-faq">

        <div className="container">

          <div className="contact-faq-heading">

            <span className="section-label">
              Before You Visit
            </span>

            <h2>
              Have a quick
              <br />
              <em>question?</em>
            </h2>

            <Link
              to="/booking"
              className="contact-faq-link"
            >
              View Booking
              <span>→</span>
            </Link>

          </div>


          <div className="contact-faq-list">

            <details>

              <summary>
                Do I need an appointment?
                <span>+</span>
              </summary>

              <p>
                Appointments are recommended so we can give
                you the time and attention your beauty experience
                deserves. You can request an appointment through
                our booking page.
              </p>

            </details>


            <details>

              <summary>
                How early should I arrive?
                <span>+</span>
              </summary>

              <p>
                We recommend arriving around 10 minutes before
                your appointment so you can settle in comfortably
                before your service begins.
              </p>

            </details>


            <details>

              <summary>
                Can I ask about a service before booking?
                <span>+</span>
              </summary>

              <p>
                Absolutely. Send us a message through the form
                above and our team can help you choose the
                service that best fits your needs.
              </p>

            </details>


            <details>

              <summary>
                Do you offer bridal services?
                <span>+</span>
              </summary>

              <p>
                Yes. Our bridal and event services are designed
                for special occasions and can be tailored around
                your beauty plans.
              </p>

            </details>

          </div>

        </div>

      </section>


      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="contact-cta">

        <div className="container">

          <div className="contact-cta-inner">

            <span className="section-label">
              Empress Beauty
            </span>

            <h2>
              Your beauty
              <br />
              <em>starts with a moment.</em>
            </h2>

            <p>
              Make that moment yours.
            </p>

            <Link
              to="/booking"
              className="btn btn-gold"
            >
              Book an Appointment
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Contact;