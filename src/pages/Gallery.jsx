import { useState } from "react";
import { Link } from "react-router-dom";
import "./Gallery.css";

const galleryCategories = [
  "All",
  "Hair",
  "Nails",
  "Makeup",
  "Skincare",
  "Bridal",
];

const galleryItems = [
  {
    id: 1,
    category: "Hair",
    title: "Silk & Shine",
    description: "Smooth, polished hair styling with a refined finish.",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    category: "Makeup",
    title: "Soft Glam",
    description: "Luminous skin, soft definition and effortless elegance.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    category: "Nails",
    title: "Quiet Luxury",
    description: "Clean, sophisticated nails with delicate detailing.",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    category: "Bridal",
    title: "The Bridal Edit",
    description: "Timeless beauty created for unforgettable moments.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    category: "Skincare",
    title: "The Glow Ritual",
    description: "Fresh, radiant skin inspired by thoughtful self-care.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    category: "Hair",
    title: "Defined Beauty",
    description: "Beautiful texture, movement and confident finishing.",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    category: "Makeup",
    title: "After Dark",
    description: "Elevated evening beauty with bold, polished definition.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    category: "Nails",
    title: "Golden Detail",
    description: "Elegant nail artistry with subtle statement details.",
    image:
      "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=85",
  },
];

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter(
          (item) => item.category === activeCategory
        );

  return (
    <main className="gallery-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="gallery-hero">

        <div className="container gallery-hero-content">

          <span className="section-label">
            The Empress Lookbook
          </span>

          <h1>
            Beauty worth
            <br />
            <em>remembering.</em>
          </h1>

          <p>
            Explore our beauty inspiration — from polished
            everyday looks to unforgettable bridal moments.
            Every detail is created with intention.
          </p>

        </div>

        <div className="gallery-hero-number">
          04
        </div>

      </section>


      {/* =========================================
          INTRO
      ========================================= */}

      <section className="gallery-intro">

        <div className="container">

          <div className="gallery-intro-grid">

            <div>

              <span className="section-label">
                Our Lookbook
              </span>

              <h2>
                Every look tells
                <br />
                <em>a story.</em>
              </h2>

            </div>

            <div>

              <p>
                Beauty is personal. Your style, your features,
                your occasion and your confidence all come
                together to create something uniquely yours.
              </p>

              <p>
                Browse our lookbook for inspiration and discover
                the possibilities waiting for your next Empress
                Beauty experience.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          FILTER NAVIGATION
      ========================================= */}

      <section className="gallery-filter-section">

        <div className="container">

          <div className="gallery-filters">

            {galleryCategories.map((category) => (

              <button
                key={category}
                className={
                  activeCategory === category
                    ? "gallery-filter active"
                    : "gallery-filter"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================
          GALLERY GRID
      ========================================= */}

      <section className="gallery-grid-section">

        <div className="container">

          <div className="gallery-grid">

            {filteredItems.map((item) => (

              <article
                className="gallery-item"
                key={item.id}
              >

                <div className="gallery-image-wrapper">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-image"
                  />

                  <div className="gallery-overlay">

                    <span>
                      View Look
                    </span>

                    <span className="gallery-overlay-arrow">
                      ↗
                    </span>

                  </div>

                </div>


                <div className="gallery-item-content">

                  <div>

                    <span className="gallery-item-category">
                      {item.category}
                    </span>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                  </div>

                  <span className="gallery-item-number">
                    0{item.id}
                  </span>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================
          INSPIRATION CTA
      ========================================= */}

      <section className="gallery-inspiration">

        <div className="container">

          <div className="gallery-inspiration-inner">

            <div className="gallery-inspiration-number">
              05
            </div>

            <div className="gallery-inspiration-content">

              <span className="section-label">
                Your Look
              </span>

              <h2>
                See something
                <br />
                <em>you love?</em>
              </h2>

              <p>
                Bring your inspiration to Empress Beauty and
                let our team create a look that feels completely
                your own.
              </p>

              <Link
                to="/booking"
                className="btn btn-gold"
              >
                Book Your Appointment
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="gallery-cta">

        <div className="container">

          <div className="gallery-cta-inner">

            <span className="section-label">
              Empress Beauty
            </span>

            <h2>
              Your next look
              <br />
              <em>starts here.</em>
            </h2>

            <p>
              Discover your signature beauty experience
              in Masaki, Dar es Salaam.
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

export default Gallery;