import { Link } from "react-router-dom";
import "./Team.css";

const teamMembers = [
  {
    id: "01",
    name: "Amara James",
    role: "Creative Director & Hair Artist",
    specialty: "Hair",
    description:
      "Known for polished finishes, effortless movement and styles that feel distinctly personal.",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "02",
    name: "Zara Bennett",
    role: "Makeup Artist",
    specialty: "Makeup",
    description:
      "Creates luminous, sophisticated makeup looks that enhance natural features without overpowering them.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "03",
    name: "Nia Collins",
    role: "Nail Artist",
    specialty: "Nails",
    description:
      "Brings precision, creativity and understated luxury to every manicure, extension and nail detail.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "04",
    name: "Maya Laurent",
    role: "Skincare Specialist",
    specialty: "Skincare",
    description:
      "Creates calming facial experiences focused on healthy-looking, refreshed and radiant skin.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85",
  },
];

const specialties = [
  {
    number: "01",
    title: "Hair",
    description:
      "From everyday polish to transformative styling, our hair artists create looks designed around your personality.",
  },
  {
    number: "02",
    title: "Makeup",
    description:
      "Soft glam, full glam and occasion makeup created to make you feel confident in every room.",
  },
  {
    number: "03",
    title: "Nails",
    description:
      "Thoughtful nail artistry where precision, shape and beautiful finishing details come together.",
  },
  {
    number: "04",
    title: "Skincare",
    description:
      "Relaxing facial experiences designed to refresh your skin and give you a moment to slow down.",
  },
];

function Team() {
  return (
    <main className="team-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="team-hero">

        <div className="container team-hero-content">

          <span className="section-label">
            The Empress Team
          </span>

          <h1>
            Meet the artists
            <br />
            <em>behind the beauty.</em>
          </h1>

          <p>
            Talented hands, thoughtful service and a shared
            passion for making every Empress Beauty experience
            feel extraordinary.
          </p>

        </div>

        <div className="team-hero-number">
          05
        </div>

      </section>


      {/* =========================================
          INTRODUCTION
      ========================================= */}

      <section className="team-intro">

        <div className="container">

          <div className="team-intro-grid">

            <div>

              <span className="section-label">
                More Than Artists
              </span>

              <h2>
                Beauty begins
                <br />
                <em>with connection.</em>
              </h2>

            </div>

            <div>

              <p>
                At Empress Beauty, our team believes that
                exceptional beauty experiences are about more
                than the final result.
              </p>

              <p>
                We take the time to understand you, your style
                and what makes you feel beautiful. Every artist
                brings their own perspective, skill and creativity
                while sharing the same commitment to thoughtful,
                elevated service.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          TEAM MEMBERS
      ========================================= */}

      <section className="team-members">

        <div className="container">

          <div className="team-section-heading">

            <span className="section-label">
              Our Artists
            </span>

            <h2>
              The people who
              <br />
              <em>make it happen.</em>
            </h2>

          </div>


          <div className="team-grid">

            {teamMembers.map((member) => (

              <article
                className="team-card"
                key={member.id}
              >

                <div className="team-image-wrapper">

                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="team-image"
                  />

                  <div className="team-image-overlay">

                    <span>
                      {member.specialty}
                    </span>

                    <span className="team-image-arrow">
                      ↗
                    </span>

                  </div>

                </div>


                <div className="team-card-content">

                  <div className="team-card-heading">

                    <div>

                      <span className="team-member-number">
                        {member.id}
                      </span>

                      <h3>
                        {member.name}
                      </h3>

                    </div>

                    <span className="team-specialty">
                      {member.specialty}
                    </span>

                  </div>


                  <p className="team-role">
                    {member.role}
                  </p>

                  <p className="team-description">
                    {member.description}
                  </p>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================
          SPECIALTIES
      ========================================= */}

      <section className="team-specialties">

        <div className="container">

          <div className="team-specialties-heading">

            <div>

              <span className="section-label">
                Our Expertise
              </span>

              <h2>
                Different talents.
                <br />
                <em>One vision.</em>
              </h2>

            </div>

            <p>
              Every member of our team brings a distinct
              speciality, allowing us to create complete beauty
              experiences while maintaining the Empress standard
              of care.
            </p>

          </div>


          <div className="specialties-grid">

            {specialties.map((specialty) => (

              <div
                className="specialty-card"
                key={specialty.number}
              >

                <span className="specialty-number">
                  {specialty.number}
                </span>

                <h3>
                  {specialty.title}
                </h3>

                <p>
                  {specialty.description}
                </p>

                <span className="specialty-line"></span>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================
          TEAM PHILOSOPHY
      ========================================= */}

      <section className="team-philosophy">

        <div className="container">

          <div className="team-philosophy-inner">

            <div className="team-philosophy-number">
              06
            </div>

            <div className="team-philosophy-content">

              <span className="section-label">
                The Empress Standard
              </span>

              <h2>
                Skilled hands.
                <br />
                <em>Beautiful intentions.</em>
              </h2>

              <p>
                We believe the best beauty experiences happen
                when expertise meets genuine care. That's why
                every detail matters — from the consultation to
                the final mirror moment.
              </p>

              <p>
                Our artists are here not only to create a look,
                but to help you leave feeling more confident,
                refreshed and completely yourself.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="team-cta">

        <div className="container">

          <div className="team-cta-inner">

            <span className="section-label">
              Your Beauty Team Awaits
            </span>

            <h2>
              Let's create your
              <br />
              <em>next look.</em>
            </h2>

            <p>
              Choose your service and let our artists take
              care of the details.
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

export default Team;