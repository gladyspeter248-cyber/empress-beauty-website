import { Link } from "react-router-dom";
import "./About.css";

const values = [
  {
    number: "01",
    title: "Individuality",
    description:
      "Your beauty should feel like you. We listen, understand your style and create experiences around what makes you unique.",
  },
  {
    number: "02",
    title: "Excellence",
    description:
      "From the smallest detail to the finished look, we believe exceptional results come from care, precision and consistency.",
  },
  {
    number: "03",
    title: "Confidence",
    description:
      "Beauty is powerful when it makes you feel good in your own skin. Every appointment is designed to leave you feeling confident.",
  },
  {
    number: "04",
    title: "Connection",
    description:
      "We want Empress Beauty to feel welcoming, personal and memorable — a place where you can slow down and feel cared for.",
  },
];

const experienceSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We begin by understanding what you want, what inspires you and how you want to feel when you leave.",
  },
  {
    number: "02",
    title: "Personalize",
    description:
      "Your service is adapted to your features, preferences, occasion and individual beauty goals.",
  },
  {
    number: "03",
    title: "Create",
    description:
      "Our artists combine technical skill with creativity to bring your chosen look to life.",
  },
  {
    number: "04",
    title: "Empress Moment",
    description:
      "The final result is more than a beauty service. It is your moment to look in the mirror and feel completely yourself.",
  },
];

function About() {
  return (
    <main className="about-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="about-hero">

        <div className="container about-hero-content">

          <span className="section-label">
            About Empress Beauty
          </span>

          <h1>
            Beauty with
            <br />
            <em>intention.</em>
          </h1>

          <p>
            A modern beauty destination in Masaki, Dar es Salaam,
            created for women who believe beauty is more than
            appearance — it is how you feel.
          </p>

        </div>

        <div className="about-hero-number">
          06
        </div>

      </section>


      {/* =========================================
          OUR STORY
      ========================================= */}

      <section className="about-story">

        <div className="container">

          <div className="about-story-grid">

            <div className="about-story-heading">

              <span className="section-label">
                Our Story
              </span>

              <h2>
                A place to feel
                <br />
                <em>beautifully yourself.</em>
              </h2>

            </div>

            <div className="about-story-content">

              <p className="about-lead">
                Empress Beauty was created around a simple idea:
                beauty appointments should feel personal,
                elevated and worth remembering.
              </p>

              <p>
                We believe there is something powerful about
                taking time for yourself. Whether you are preparing
                for an important occasion, refreshing your everyday
                look or simply giving yourself permission to slow
                down, your experience should feel intentional.
              </p>

              <p>
                Our approach brings together beauty expertise,
                thoughtful service and a refined atmosphere to
                create moments where you can relax, express
                yourself and leave feeling renewed.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          VISUAL STORY
      ========================================= */}

      <section className="about-visual">

        <div className="container">

          <div className="about-visual-grid">

            <div className="about-visual-image large-image">

              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85"
                alt="Elegant beauty styling"
              />

              <span className="about-image-caption">
                Beauty, thoughtfully created.
              </span>

            </div>

            <div className="about-visual-side">

              <div className="about-visual-image small-image">

                <img
                  src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=85"
                  alt="Luxury beauty experience"
                />

              </div>

              <div className="about-visual-quote">

                <span className="quote-mark">
                  “
                </span>

                <p>
                  The most beautiful version of you
                  is the one that feels completely
                  comfortable being herself.
                </p>

                <span className="quote-line"></span>

                <span className="quote-author">
                  Empress Beauty
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          PHILOSOPHY
      ========================================= */}

      <section className="about-philosophy">

        <div className="container">

          <div className="about-philosophy-heading">

            <span className="section-label">
              Our Philosophy
            </span>

            <h2>
              Beauty should feel
              <br />
              <em>personal.</em>
            </h2>

            <p>
              We don't believe in one definition of beauty.
              We believe in creating space for yours.
            </p>

          </div>


          <div className="about-values-grid">

            {values.map((value) => (

              <article
                className="about-value"
                key={value.number}
              >

                <span className="about-value-number">
                  {value.number}
                </span>

                <h3>
                  {value.title}
                </h3>

                <p>
                  {value.description}
                </p>

                <span className="about-value-line"></span>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================
          THE EMPRESS EXPERIENCE
      ========================================= */}

      <section className="about-experience">

        <div className="container">

          <div className="about-experience-heading">

            <div>

              <span className="section-label">
                The Empress Experience
              </span>

              <h2>
                From the first
                <br />
                <em>hello to the mirror.</em>
              </h2>

            </div>

            <p>
              Every part of your journey matters. That's why
              we've designed the Empress experience around
              thoughtful moments rather than rushed appointments.
            </p>

          </div>


          <div className="experience-list">

            {experienceSteps.map((step) => (

              <article
                className="experience-step"
                key={step.number}
              >

                <span className="experience-number">
                  {step.number}
                </span>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.description}
                </p>

                <span className="experience-arrow">
                  ↗
                </span>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================
          LOCATION
      ========================================= */}

      <section className="about-location">

        <div className="container">

          <div className="about-location-grid">

            <div>

              <span className="section-label">
                Find Us
              </span>

              <h2>
                Your beauty
                <br />
                <em>destination.</em>
              </h2>

            </div>

            <div className="about-location-content">

              <p className="location-name">
                EMPRESS BEAUTY
              </p>

              <p>
                Masaki,
                <br />
                Dar es Salaam,
                <br />
                Tanzania
              </p>

              <div className="location-details">

                <div>
                  <span>Phone</span>

                  <p>
                    +255 741 309 031
                    <br />
                    +255 651 829 411
                  </p>
                </div>

                <div>
                  <span>Email</span>

                  <p>
                    empress.beauty@gmail.com
                  </p>
                </div>

                <div>
                  <span>Opening Hours</span>

                  <p>
                    Mon – Sat: 8:00 AM – 8:00 PM
                    <br />
                    Sun: 9:00 AM – 6:00 PM
                  </p>
                </div>

              </div>

              <Link
                to="/contact"
                className="about-location-link"
              >
                Contact Empress Beauty
                <span>→</span>
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="about-cta">

        <div className="container">

          <div className="about-cta-inner">

            <span className="section-label">
              Your Story
            </span>

            <h2>
              Make your next
              <br />
              <em>moment beautiful.</em>
            </h2>

            <p>
              Your time, your style, your Empress moment.
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

export default About;