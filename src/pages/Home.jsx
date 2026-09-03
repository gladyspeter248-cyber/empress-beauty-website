import { Link } from "react-router-dom";
import "./Home.css";

const services = [
  {
    number: "01",
    title: "Hair",
    description:
      "From polished everyday styling to transformative looks, discover hair artistry created around you.",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1400&q=85",
    link: "/services",
  },
  {
    number: "02",
    title: "Nails",
    description:
      "Refined manicures, pedicures and detailed nail artistry designed to complete your look.",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1400&q=85",
    link: "/services",
  },
  {
    number: "03",
    title: "Makeup",
    description:
      "Soft glam, full glam and occasion makeup created to enhance your natural beauty.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=85",
    link: "/services",
  },
  {
    number: "04",
    title: "Skincare",
    description:
      "Thoughtful facial experiences focused on healthy-looking, refreshed and radiant skin.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=85",
    link: "/services",
  },
];

const lookbookImages = [
  {
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
    title: "Soft Definition",
    category: "Makeup",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
    title: "The Hair Edit",
    category: "Hair",
  },
  {
    image:
      "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1200&q=85",
    title: "Polished Details",
    category: "Nails",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    title: "For Your Moment",
    category: "Bridal",
  },
];

function Home() {
  return (
    <main className="home-page">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="home-hero">
        <div className="home-hero-image">
          <img
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=2000&q=90"
            alt="Elegant beauty editorial portrait"
          />
        </div>

        <div className="home-hero-overlay"></div>

        <div className="container home-hero-content">
          <div className="home-hero-copy">
            <span className="section-label">Empress Beauty · Masaki</span>

            <h1>
              Beauty,
              <br />
              <em>elevated.</em>
            </h1>

            <p>
              A refined beauty experience created around you —
              from hair and makeup to nails, skincare and
              unforgettable moments.
            </p>

            <div className="home-hero-actions">
              <Link to="/booking" className="btn btn-gold">
                Book an Appointment
              </Link>

              <Link to="/services" className="home-text-link">
                Explore Services
                <span>↗</span>
              </Link>
            </div>
          </div>

          <div className="home-hero-side">
            <span>01</span>
            <div></div>
            <p>Beauty with intention.</p>
          </div>
        </div>

        <div className="home-scroll">
          <span>Scroll to explore</span>
          <div></div>
        </div>
      </section>


      {/* =====================================================
          INTRODUCTION
      ====================================================== */}
      <section className="home-intro">
        <div className="container">
          <div className="home-intro-grid">

            <div className="home-intro-image-wrap">
              <div className="home-intro-image">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=85"
                  alt="Elegant hair styling"
                />
              </div>

              <span className="home-image-caption">
                The Empress Experience
              </span>
            </div>

            <div className="home-intro-content">
              <span className="section-label">Welcome to Empress</span>

              <h2>
                Where beauty
                <br />
                becomes <em>an experience.</em>
              </h2>

              <p className="home-lead">
                Empress Beauty is a modern beauty destination in
                Masaki, Dar es Salaam, created for women who
                appreciate beautiful details, thoughtful service
                and a moment that feels entirely their own.
              </p>

              <p>
                From the moment you arrive to the moment you
                leave feeling renewed, every detail is designed
                to make your beauty experience feel effortless,
                personal and elevated.
              </p>

              <Link to="/about" className="home-outline-link">
                Discover Our Story
                <span>↗</span>
              </Link>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          SERVICES VISUAL SECTION
      ====================================================== */}
      <section className="home-services">
        <div className="container">

          <div className="home-section-heading">
            <div>
              <span className="section-label">What We Do</span>

              <h2>
                Beauty,
                <br />
                <em>curated.</em>
              </h2>
            </div>

            <div className="home-heading-copy">
              <p>
                Discover a considered collection of beauty
                services, created to complement your individual
                style and make every visit feel special.
              </p>

              <Link to="/services" className="home-text-link dark">
                View All Services
                <span>↗</span>
              </Link>
            </div>
          </div>


          <div className="home-service-grid">

            {services.map((service) => (
              <Link
                to={service.link}
                className="home-service-card"
                key={service.number}
              >
                <div className="home-service-image">
                  <img src={service.image} alt={service.title} />

                  <span className="home-service-number">
                    {service.number}
                  </span>

                  <div className="home-service-arrow">
                    ↗
                  </div>
                </div>

                <div className="home-service-content">
                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <span className="home-card-link">
                    Explore {service.title}
                    <span>↗</span>
                  </span>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>


      {/* =====================================================
          EXPERIENCE IMAGE BANNER
      ====================================================== */}
      <section className="home-experience">
        <div className="home-experience-image">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=90"
            alt="Elegant bridal beauty moment"
          />
        </div>

        <div className="home-experience-overlay"></div>

        <div className="container home-experience-content">
          <span className="section-label">The Empress Experience</span>

          <h2>
            You deserve
            <br />
            <em>your moment.</em>
          </h2>

          <p>
            Whether it is your wedding day, a special celebration
            or simply a day when you want to feel your absolute
            best, we believe beauty should feel personal.
          </p>

          <Link to="/booking" className="btn btn-gold">
            Reserve Your Experience
          </Link>
        </div>
      </section>


      {/* =====================================================
          PHILOSOPHY
      ====================================================== */}
      <section className="home-philosophy">
        <div className="container">

          <div className="home-philosophy-top">
            <span className="section-label">Our Philosophy</span>

            <h2>
              Less about following
              <br />
              trends. More about <em>you.</em>
            </h2>
          </div>

          <div className="home-philosophy-grid">

            <div className="home-philosophy-item">
              <span>01</span>
              <h3>Personal</h3>
              <p>
                Every beauty experience begins with understanding
                what makes you feel confident and comfortable.
              </p>
            </div>

            <div className="home-philosophy-item">
              <span>02</span>
              <h3>Intentional</h3>
              <p>
                Thoughtful details, careful techniques and a
                considered approach to every service.
              </p>
            </div>

            <div className="home-philosophy-item">
              <span>03</span>
              <h3>Elevated</h3>
              <p>
                A polished environment and refined beauty
                experience designed to leave you feeling renewed.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          LOOKBOOK
      ====================================================== */}
      <section className="home-lookbook">
        <div className="container">

          <div className="home-section-heading lookbook-heading">
            <div>
              <span className="section-label">The Lookbook</span>

              <h2>
                A little
                <br />
                <em>inspiration.</em>
              </h2>
            </div>

            <div className="home-heading-copy">
              <p>
                Explore the beauty, details and moments that
                inspire the Empress aesthetic.
              </p>

              <Link to="/gallery" className="home-text-link dark">
                View Full Gallery
                <span>↗</span>
              </Link>
            </div>
          </div>


          <div className="home-lookbook-grid">

            {lookbookImages.map((item, index) => (
              <Link
                to="/gallery"
                className={`home-lookbook-item lookbook-${index + 1}`}
                key={item.title}
              >
                <div className="home-lookbook-image">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="home-lookbook-meta">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                </div>
              </Link>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          BEAUTY MOMENT
      ====================================================== */}
      <section className="home-moment">
        <div className="container">

          <div className="home-moment-grid">

            <div className="home-moment-content">
              <span className="section-label">
                Your Beauty Ritual
              </span>

              <h2>
                Make time
                <br />
                for <em>yourself.</em>
              </h2>

              <p>
                Beauty is not simply about how you look. It is
                about how you feel when you walk out the door.
              </p>

              <p>
                Take a moment. Slow down. Let us take care of
                the details.
              </p>

              <Link to="/booking" className="home-outline-link">
                Begin Your Experience
                <span>↗</span>
              </Link>
            </div>

            <div className="home-moment-image">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=85"
                alt="Relaxing skincare experience"
              />
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          LOCATION
      ====================================================== */}
      <section className="home-location">
        <div className="container">

          <div className="home-location-grid">

            <div className="home-location-image">
              <img
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1400&q=85"
                alt="Luxury beauty environment"
              />
            </div>

            <div className="home-location-content">
              <span className="section-label">Visit Empress</span>

              <h2>
                Your beauty
                <br />
                destination in <em>Masaki.</em>
              </h2>

              <p>
                Find us in Masaki, Dar es Salaam, for a beauty
                experience created around you.
              </p>

              <div className="home-contact-details">

                <div>
                  <span>Location</span>
                  <p>Masaki, Dar es Salaam, Tanzania</p>
                </div>

                <div>
                  <span>Phone</span>
                  <p>
                    +255 741 309 031
                    <br />
                    +255 651 829 411
                  </p>
                </div>

                <div>
                  <span>Opening Hours</span>
                  <p>
                    Monday – Saturday · 8:00 AM – 8:00 PM
                    <br />
                    Sunday · 9:00 AM – 6:00 PM
                  </p>
                </div>

              </div>

              <Link to="/contact" className="home-outline-link">
                Contact Empress
                <span>↗</span>
              </Link>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="home-final-cta">
        <div className="container">

          <div className="home-final-inner">

            <div className="home-final-number">
              08
            </div>

            <div>
              <span className="section-label">
                Empress Beauty
              </span>

              <h2>
                Your beauty
                <br />
                story starts <em>here.</em>
              </h2>

              <p>
                Ready for your next beauty experience?
                We would love to welcome you.
              </p>

              <Link to="/booking" className="btn btn-gold">
                Book an Appointment
              </Link>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Home;