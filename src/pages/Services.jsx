import { Link } from "react-router-dom";
import "./Services.css";

const serviceCategories = [
  {
    id: "hair",
    number: "01",
    name: "Hair",
    description:
      "Refined styling, treatments and protective looks designed around your hair and your personal style.",
    services: [
      {
        name: "Wash & Blow Dry",
        description:
          "A refreshing wash followed by a polished blow-dry finish.",
        duration: "45 min",
        price: "TZS 35,000",
        image:
          "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Silk Press",
        description:
          "A smooth, sleek finish that leaves natural hair beautifully polished and full of movement.",
        duration: "90 min",
        price: "TZS 60,000",
        image:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Hair Treatment",
        description:
          "A nourishing treatment designed to restore softness, moisture and healthy-looking hair.",
        duration: "60 min",
        price: "TZS 50,000",
        image:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Braids",
        description:
          "Beautiful protective braiding styles tailored to your preferred length and finish.",
        duration: "2–5 hrs",
        price: "From TZS 80,000",
        image:
          "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Wig Installation",
        description:
          "Professional wig installation for a secure, natural-looking and elegant finish.",
        duration: "90 min",
        price: "From TZS 70,000",
        image:
          "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Wig Styling",
        description:
          "Custom styling and finishing to give your wig a polished, wearable appearance.",
        duration: "60 min",
        price: "From TZS 50,000",
        image:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },

  {
    id: "nails",
    number: "02",
    name: "Nails",
    description:
      "Precision manicures, pedicures and extensions finished with the clean, polished detail Empress Beauty is known for.",
    services: [
      {
        name: "Classic Manicure",
        description:
          "Essential nail care, shaping, cuticle care and a polished finish.",
        duration: "45 min",
        price: "TZS 25,000",
        image:
          "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Gel Manicure",
        description:
          "A glossy gel finish designed for longer-lasting everyday elegance.",
        duration: "60 min",
        price: "TZS 40,000",
        image:
          "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Classic Pedicure",
        description:
          "Relaxing foot care, shaping and polishing for beautifully maintained feet.",
        duration: "60 min",
        price: "TZS 35,000",
        image:
          "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Gel Pedicure",
        description:
          "A complete pedicure finished with durable, high-shine gel polish.",
        duration: "75 min",
        price: "TZS 50,000",
        image:
          "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Acrylic Extensions",
        description:
          "Elegant, durable extensions shaped and finished to complement your hands.",
        duration: "90 min",
        price: "From TZS 70,000",
        image:
          "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Nail Art",
        description:
          "Personalized nail detailing ranging from subtle accents to statement designs.",
        duration: "15–45 min",
        price: "From TZS 10,000",
        image:
          "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },

  {
    id: "makeup",
    number: "03",
    name: "Makeup",
    description:
      "From effortless beauty to full glam, every look is created to complement your features and occasion.",
    services: [
      {
        name: "Soft Glam",
        description:
          "A refined, luminous makeup look with soft definition and an elegant finish.",
        duration: "60 min",
        price: "TZS 60,000",
        image:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Full Glam",
        description:
          "A statement makeup look with elevated definition, complexion and finishing details.",
        duration: "90 min",
        price: "TZS 85,000",
        image:
          "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Event Makeup",
        description:
          "Camera-ready makeup designed for celebrations, dinners, parties and special occasions.",
        duration: "90 min",
        price: "TZS 100,000",
        image:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Bridal Makeup",
        description:
          "A carefully designed bridal look created to photograph beautifully and last throughout your celebration.",
        duration: "2 hrs",
        price: "From TZS 180,000",
        image:
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },

  {
    id: "skincare",
    number: "04",
    name: "Skincare",
    description:
      "Thoughtful facial treatments designed to cleanse, hydrate, refresh and restore your skin's natural glow.",
    services: [
      {
        name: "Express Facial",
        description:
          "A quick refreshing facial for when your skin needs a clean, polished boost.",
        duration: "30 min",
        price: "TZS 45,000",
        image:
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Deep Cleansing Facial",
        description:
          "A deeper cleansing treatment focused on refreshing the skin and improving its overall appearance.",
        duration: "60 min",
        price: "TZS 70,000",
        image:
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Glow Facial",
        description:
          "A radiance-focused facial designed to leave your complexion looking fresh and luminous.",
        duration: "60 min",
        price: "TZS 85,000",
        image:
          "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Hydrating Facial",
        description:
          "A moisture-focused treatment for skin that needs softness, comfort and a healthy-looking glow.",
        duration: "60 min",
        price: "TZS 90,000",
        image:
          "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Premium Facial",
        description:
          "An elevated facial experience customized around your skin's needs and desired finish.",
        duration: "75 min",
        price: "TZS 120,000",
        image:
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },

  {
    id: "bridal",
    number: "05",
    name: "Bridal & Events",
    description:
      "Beautifully coordinated beauty experiences for weddings, celebrations, photographs and unforgettable occasions.",
    services: [
      {
        name: "Bridal Makeup",
        description:
          "A personalized bridal makeup experience created around your features, dress and wedding aesthetic.",
        duration: "2 hrs",
        price: "From TZS 180,000",
        image:
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Bridal Hair Styling",
        description:
          "Elegant bridal hairstyling tailored to your desired look, dress and overall wedding vision.",
        duration: "2 hrs",
        price: "From TZS 120,000",
        image:
          "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Bridal Beauty Package",
        description:
          "A curated combination of bridal beauty services for a complete wedding-day experience.",
        duration: "4–6 hrs",
        price: "From TZS 350,000",
        image:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Event Beauty Package",
        description:
          "A coordinated beauty package designed for birthdays, celebrations, photoshoots and special events.",
        duration: "2–4 hrs",
        price: "From TZS 180,000",
        image:
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },

  {
    id: "self-care",
    number: "06",
    name: "Self-Care",
    description:
      "Slow down, reset and give yourself time to breathe with relaxing body treatments and wellness rituals.",
    services: [
      {
        name: "Back & Shoulder Massage",
        description:
          "Focused massage designed to help release everyday tension across the back and shoulders.",
        duration: "45 min",
        price: "TZS 50,000",
        image:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Relaxation Massage",
        description:
          "A calming massage experience designed to encourage relaxation and wellbeing.",
        duration: "60 min",
        price: "TZS 80,000",
        image:
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Full Body Massage",
        description:
          "A full-body relaxation experience designed to help you unwind from head to toe.",
        duration: "90 min",
        price: "TZS 100,000",
        image:
          "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Body Scrub",
        description:
          "A refreshing body treatment that exfoliates and leaves the skin feeling smooth and renewed.",
        duration: "60 min",
        price: "TZS 80,000",
        image:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Beauty Consultation",
        description:
          "A personal consultation to help identify the services and beauty routine best suited to your goals.",
        duration: "30 min",
        price: "TZS 30,000",
        image:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },
];

function Services() {
  return (
    <main className="services-page">

      {/* SERVICES HERO */}
      <section className="services-hero">
        <div className="container services-hero-content">

          <span className="section-label">
            The Empress Beauty Menu
          </span>

          <h1>
            Beauty, curated
            <br />
            <em>for you.</em>
          </h1>

          <p>
            Discover our collection of beauty and self-care
            experiences, thoughtfully designed to leave you
            feeling confident, polished and completely yourself.
          </p>

          <a href="#service-menu" className="btn btn-gold">
            Explore Services
          </a>

        </div>

        <div className="services-hero-number">
          06
        </div>
      </section>


      {/* INTRODUCTION */}
      <section className="services-intro">
        <div className="container">

          <div className="services-intro-grid">

            <div>
              <span className="section-label">
                Our Approach
              </span>

              <h2>
                More than a service.
                <br />
                <em>An experience.</em>
              </h2>
            </div>

            <div>
              <p>
                At Empress Beauty, every appointment is
                designed around you. From your first consultation
                to the final detail, our goal is simple:
                beautiful results, thoughtful service and a
                moment that feels entirely yours.
              </p>

              <p>
                Explore our menu below and choose the experience
                that feels right for you.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* CATEGORY NAVIGATION */}
      <section className="service-navigation">
        <div className="container">

          <div className="service-navigation-inner">

            {serviceCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
              >
                <span>
                  {category.number}
                </span>

                {category.name}
              </a>
            ))}

          </div>

        </div>
      </section>


      {/* SERVICE MENU */}
      <section
        className="service-menu"
        id="service-menu"
      >

        <div className="container">

          {serviceCategories.map((category) => (

            <section
              className="service-category"
              id={category.id}
              key={category.id}
            >

              <div className="service-category-heading">

                <div className="service-category-number">
                  {category.number}
                </div>

                <div>

                  <span className="section-label">
                    Empress Beauty
                  </span>

                  <h2>
                    {category.name}
                  </h2>

                  <p>
                    {category.description}
                  </p>

                </div>

              </div>


              <div className="service-grid">

                {category.services.map((service) => (

                  <article
                    className="service-card"
                    key={service.name}
                  >

                    {/* SERVICE IMAGE */}
                    <div className="service-card-image">

                      <img
                        src={service.image}
                        alt={`${service.name} at Empress Beauty`}
                        loading="lazy"
                      />

                      <div className="service-image-overlay">
                        <span>
                          {category.name}
                        </span>
                      </div>

                    </div>


                    {/* SERVICE CONTENT */}
                    <div className="service-card-content">

                      <div className="service-card-top">

                        <div>

                          <span className="service-category-name">
                            {category.name}
                          </span>

                          <h3>
                            {service.name}
                          </h3>

                        </div>

                        <span className="service-arrow">
                          ↗
                        </span>

                      </div>


                      <p className="service-description">
                        {service.description}
                      </p>


                      <div className="service-card-bottom">

                        <div className="service-details">

                          <span>
                            {service.duration}
                          </span>

                          <span>
                            {service.price}
                          </span>

                        </div>


                        <Link
                          to="/booking"
                          className="service-book"
                        >
                          Book This Service

                          <span>
                            →
                          </span>
                        </Link>

                      </div>

                    </div>

                  </article>

                ))}

              </div>

            </section>

          ))}

        </div>

      </section>


      {/* PRICING NOTE */}
      <section className="pricing-note">

        <div className="container">

          <div className="pricing-note-inner">

            <span className="section-label">
              Please Note
            </span>

            <h2>
              Beautifully transparent.
            </h2>

            <p>
              Prices marked "From" may vary depending on
              hair length, complexity, selected products,
              desired style or treatment requirements.
              Our team will confirm your final price before
              your appointment.
            </p>

          </div>

        </div>

      </section>


      {/* FINAL CTA */}
      <section className="services-cta">

        <div className="container">

          <div className="services-cta-inner">

            <span className="section-label">
              Your Time Starts Here
            </span>

            <h2>
              Ready for your
              <br />
              <em>Empress moment?</em>
            </h2>

            <p>
              Choose your service and let us take care
              of the rest.
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

export default Services;
