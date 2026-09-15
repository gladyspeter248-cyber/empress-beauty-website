import { useState } from "react";
import "./Gallery.css";

function Gallery() {
    const [activeCategory, setActiveCategory] =
        useState("All");

    const [selectedImage, setSelectedImage] =
        useState(null);

    const galleryItems = [
        {
            id: 1,
            category: "Hair",
            title: "Elegant Hair Styling",
            image:
                "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 2,
            category: "Hair",
            title: "Professional Hair Care",
            image:
                "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 3,
            category: "Hair",
            title: "Beautiful Hair Transformation",
            image:
                "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 4,
            category: "Nails",
            title: "Luxury Nail Design",
            image:
                "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 5,
            category: "Nails",
            title: "Elegant Manicure",
            image:
                "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 6,
            category: "Nails",
            title: "Beautiful Nail Art",
            image:
                "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 7,
            category: "Makeup",
            title: "Professional Makeup",
            image:
                "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 8,
            category: "Makeup",
            title: "Glamorous Beauty Look",
            image:
                "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 9,
            category: "Makeup",
            title: "Natural Makeup",
            image:
                "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 10,
            category: "Skin",
            title: "Luxury Skin Treatment",
            image:
                "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 11,
            category: "Skin",
            title: "Relaxing Facial",
            image:
                "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 12,
            category: "Skin",
            title: "Healthy Glowing Skin",
            image:
                "https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 13,
            category: "Bridal",
            title: "Bridal Beauty",
            image:
                "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 14,
            category: "Bridal",
            title: "Bridal Makeup",
            image:
                "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 15,
            category: "Bridal",
            title: "Bridal Hair Styling",
            image:
                "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 16,
            category: "Self-Care",
            title: "Relaxation & Wellness",
            image:
                "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 17,
            category: "Self-Care",
            title: "Luxury Spa Experience",
            image:
                "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 18,
            category: "Self-Care",
            title: "Beauty & Relaxation",
            image:
                "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=85",
        },
    ];

    const categories = [
        "All",
        "Hair",
        "Nails",
        "Makeup",
        "Skin",
        "Bridal",
        "Self-Care",
    ];

    const filteredItems =
        activeCategory === "All"
            ? galleryItems
            : galleryItems.filter(
                  (item) =>
                      item.category ===
                      activeCategory
              );

    return (
        <main className="gallery-page">

            {/* ==========================================
                HERO
            ========================================== */}

            <section className="gallery-hero">

                <div className="gallery-hero-overlay">

                    <p className="gallery-eyebrow">
                        EMpress Beauty
                    </p>

                    <h1>
                        Our Beauty Gallery
                    </h1>

                    <p>
                        Discover our beauty work,
                        transformations, and
                        unforgettable Empress
                        experiences.
                    </p>

                </div>

            </section>

            {/* ==========================================
                INTRO
            ========================================== */}

            <section className="gallery-intro">

                <p className="gallery-small-title">
                    BEAUTY • CONFIDENCE • EXPERIENCE
                </p>

                <h2>
                    A Glimpse Into Empress Beauty
                </h2>

                <p className="gallery-description">
                    Explore some of the beauty
                    experiences we create at
                    Empress Beauty in Masaki,
                    Dar es Salaam. From elegant
                    hairstyles and beautiful nails
                    to professional makeup,
                    skincare and bridal beauty,
                    every detail is designed to
                    make you feel confident,
                    beautiful and cared for.
                </p>

            </section>

            {/* ==========================================
                CATEGORY FILTER
            ========================================== */}

            <section className="gallery-section">

                <div className="gallery-filters">

                    {categories.map(
                        (category) => (
                            <button
                                key={category}
                                type="button"
                                className={
                                    activeCategory ===
                                    category
                                        ? "gallery-filter active"
                                        : "gallery-filter"
                                }
                                onClick={() =>
                                    setActiveCategory(
                                        category
                                    )
                                }
                            >
                                {category}
                            </button>
                        )
                    )}

                </div>

                {/* ======================================
                    GALLERY GRID
                ====================================== */}

                <div className="gallery-grid">

                    {filteredItems.map(
                        (item) => (
                            <article
                                key={item.id}
                                className="gallery-card"
                                onClick={() =>
                                    setSelectedImage(
                                        item
                                    )
                                }
                            >

                                <div className="gallery-image-wrapper">

                                    <img
                                        src={item.image}
                                        alt={
                                            item.title
                                        }
                                        loading="lazy"
                                    />

                                    <div className="gallery-card-overlay">

                                        <div>
                                            <span>
                                                {
                                                    item.category
                                                }
                                            </span>

                                            <h3>
                                                {
                                                    item.title
                                                }
                                            </h3>
                                        </div>

                                        <div className="gallery-view-icon">
                                            +
                                        </div>

                                    </div>

                                </div>

                            </article>
                        )
                    )}

                </div>

            </section>

            {/* ==========================================
                CTA
            ========================================== */}

            <section className="gallery-cta">

                <div>

                    <p className="gallery-small-title">
                        YOUR BEAUTY. YOUR MOMENT.
                    </p>

                    <h2>
                        Ready for Your Own
                        Transformation?
                    </h2>

                    <p>
                        Let our beauty professionals
                        create a look that makes you
                        feel confident and beautiful.
                    </p>

                    <div className="gallery-cta-buttons">

                        <a
                            href="/booking"
                            className="gallery-primary-button"
                        >
                            Book an Appointment
                        </a>

                        <a
                            href="/services"
                            className="gallery-secondary-button"
                        >
                            Explore Our Services
                        </a>

                    </div>

                </div>

            </section>

            {/* ==========================================
                LIGHTBOX
            ========================================== */}

            {selectedImage && (
                <div
                    className="gallery-lightbox"
                    onClick={() =>
                        setSelectedImage(null)
                    }
                >

                    <button
                        type="button"
                        className="gallery-close"
                        onClick={() =>
                            setSelectedImage(null)
                        }
                        aria-label="Close image"
                    >
                        ×
                    </button>

                    <div
                        className="gallery-lightbox-content"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <img
                            src={
                                selectedImage.image
                            }
                            alt={
                                selectedImage.title
                            }
                        />

                        <div className="gallery-lightbox-info">

                            <span>
                                {
                                    selectedImage.category
                                }
                            </span>

                            <h3>
                                {
                                    selectedImage.title
                                }
                            </h3>

                        </div>

                    </div>

                </div>
            )}

        </main>
    );
}

export default Gallery;