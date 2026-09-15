import { useState } from "react";
import "./Blog.css";

function Blog() {
    const [activeCategory, setActiveCategory] =
        useState("All");

    const [selectedArticle, setSelectedArticle] =
        useState(null);

    const articles = [
        {
            id: 1,
            category: "Hair",
            title: "How to Keep Your Hair Healthy and Beautiful",
            date: "September 5, 2026",
            image:
                "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
            excerpt:
                "Healthy hair starts with the right routine. Discover simple habits that can help your hair stay strong, soft and beautiful.",
            content: [
                "Beautiful hair is not only about styling. Healthy hair begins with understanding what your hair needs and giving it consistent care.",
                "Start by keeping your scalp clean and moisturised. Choose products that are suitable for your hair type and avoid excessive use of heat whenever possible.",
                "Regular treatments can also help maintain the strength and appearance of your hair. A professional hair consultation can help you understand which treatments and styles are best for you.",
                "At Empress Beauty, we believe that beautiful styling should always go together with healthy hair care."
            ]
        },
        {
            id: 2,
            category: "Skincare",
            title: "Simple Steps for Glowing Skin",
            date: "August 28, 2026",
            image:
                "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85",
            excerpt:
                "Your skin deserves consistent care. Learn the everyday steps that can help you maintain a fresh and healthy-looking glow.",
            content: [
                "Great skin does not have to mean having a complicated routine. Consistency is one of the most important parts of good skincare.",
                "Begin with gentle cleansing to remove dirt, excess oil and daily buildup. Follow with a suitable moisturiser to help maintain your skin's natural barrier.",
                "Sun protection is also an important part of your daytime routine. Protecting your skin from excessive sun exposure can help maintain its appearance over time.",
                "Professional facials and skincare treatments can complement your home routine and give your skin some extra care."
            ]
        },
        {
            id: 3,
            category: "Makeup",
            title: "Natural Makeup: Less Can Be More",
            date: "August 20, 2026",
            image:
                "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=85",
            excerpt:
                "A natural makeup look can enhance your features while keeping your appearance fresh, elegant and effortless.",
            content: [
                "Natural makeup is all about enhancing your existing features rather than hiding them.",
                "Start with a good skincare routine and a lightweight base. Choose shades that complement your natural complexion and use makeup strategically rather than applying heavy layers.",
                "Soft definition around the eyes, naturally shaped brows and a subtle lip colour can create an elegant everyday appearance.",
                "For special occasions, our professional makeup artists can customise your look to suit your outfit, event and personal style."
            ]
        },
        {
            id: 4,
            category: "Bridal",
            title: "Your Bridal Beauty Preparation Guide",
            date: "August 12, 2026",
            image:
                "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1000&q=85",
            excerpt:
                "Planning your wedding beauty look? Here are some important things to consider before your big day.",
            content: [
                "Your wedding day is one of those moments where every detail matters. Planning your beauty services early can help make the experience relaxed and enjoyable.",
                "Think about your hairstyle, makeup, nails and skincare well in advance. If you have a specific look in mind, share your inspiration with your beauty professional.",
                "A trial appointment is also a great way to test your preferred hairstyle and makeup before the wedding day.",
                "Most importantly, choose a look that makes you feel like yourself. Your bridal beauty should reflect your personality while making you feel confident and beautiful."
            ]
        },
        {
            id: 5,
            category: "Nails",
            title: "How to Make Your Manicure Last Longer",
            date: "August 4, 2026",
            image:
                "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=85",
            excerpt:
                "A beautiful manicure deserves to last. Follow these simple habits to help keep your nails looking fresh.",
            content: [
                "A fresh manicure can instantly make you feel polished and put together. With a little care, you can help maintain that look for longer.",
                "Avoid using your nails as tools when opening containers or handling objects. Excessive exposure to harsh chemicals can also affect your manicure.",
                "Keep your hands and cuticles moisturised regularly. This can help your hands maintain a neat and healthy appearance.",
                "When your nails need professional attention, visit Empress Beauty for a manicure designed around your personal style."
            ]
        },
        {
            id: 6,
            category: "Self-Care",
            title: "Why Making Time for Yourself Matters",
            date: "July 27, 2026",
            image:
                "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85",
            excerpt:
                "Self-care is more than looking good. It is about creating moments to relax, recharge and feel your best.",
            content: [
                "Life can become busy very quickly, and it is easy to put yourself last. Taking time for yourself can be a simple but meaningful way to reset.",
                "A beauty appointment can be more than a service. It can be an opportunity to slow down, relax and enjoy a moment dedicated entirely to you.",
                "Whether it is a fresh hairstyle, manicure, facial or another beauty treatment, choose something that makes you feel cared for.",
                "At Empress Beauty, our goal is to make every visit an experience where beauty and self-care come together."
            ]
        }
    ];

    const categories = [
        "All",
        "Hair",
        "Skincare",
        "Makeup",
        "Bridal",
        "Nails",
        "Self-Care"
    ];

    const filteredArticles =
        activeCategory === "All"
            ? articles
            : articles.filter(
                  (article) =>
                      article.category ===
                      activeCategory
              );

    const closeArticle = () => {
        setSelectedArticle(null);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <main className="blog-page">

            {/* ==========================================
                HERO
            ========================================== */}

            <section className="blog-hero">

                <div className="blog-hero-content">

                    <p className="blog-eyebrow">
                        EMPRESS BEAUTY
                    </p>

                    <h1>
                        Beauty Journal
                    </h1>

                    <p>
                        Beauty tips, inspiration and
                        self-care ideas to help you
                        look and feel your best.
                    </p>

                </div>

            </section>

            {/* ==========================================
                INTRO
            ========================================== */}

            <section className="blog-intro">

                <p className="blog-small-title">
                    BEAUTY • CONFIDENCE • EXPERIENCE
                </p>

                <h2>
                    Inspiration for Your Beauty Journey
                </h2>

                <p>
                    Welcome to the Empress Beauty
                    Journal. Explore practical beauty
                    advice, inspiration and simple
                    self-care ideas from our world of
                    beauty.
                </p>

            </section>

            {/* ==========================================
                CATEGORIES
            ========================================== */}

            <section className="blog-content">

                <div className="blog-categories">

                    {categories.map(
                        (category) => (
                            <button
                                key={category}
                                type="button"
                                className={
                                    activeCategory ===
                                    category
                                        ? "blog-category active"
                                        : "blog-category"
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
                    ARTICLES
                ====================================== */}

                <div className="blog-grid">

                    {filteredArticles.map(
                        (article) => (
                            <article
                                key={article.id}
                                className="blog-card"
                            >

                                <div className="blog-card-image">

                                    <img
                                        src={article.image}
                                        alt={
                                            article.title
                                        }
                                        loading="lazy"
                                    />

                                    <span>
                                        {
                                            article.category
                                        }
                                    </span>

                                </div>

                                <div className="blog-card-body">

                                    <p className="blog-date">
                                        {article.date}
                                    </p>

                                    <h3>
                                        {
                                            article.title
                                        }
                                    </h3>

                                    <p>
                                        {
                                            article.excerpt
                                        }
                                    </p>

                                    <button
                                        type="button"
                                        className="read-more"
                                        onClick={() =>
                                            setSelectedArticle(
                                                article
                                            )
                                        }
                                    >
                                        Read Article
                                        <span>→</span>
                                    </button>

                                </div>

                            </article>
                        )
                    )}

                </div>

            </section>

            {/* ==========================================
                NEWSLETTER / CTA
            ========================================== */}

            <section className="blog-cta">

                <div className="blog-cta-content">

                    <p className="blog-small-title">
                        YOUR BEAUTY. YOUR MOMENT.
                    </p>

                    <h2>
                        Make Time for Yourself
                    </h2>

                    <p>
                        Whether you need a fresh new
                        look, a relaxing treatment or
                        beauty preparation for a special
                        occasion, we are here for you.
                    </p>

                    <div className="blog-cta-buttons">

                        <a
                            href="/booking"
                            className="blog-primary-button"
                        >
                            Book an Appointment
                        </a>

                        <a
                            href="/services"
                            className="blog-secondary-button"
                        >
                            Explore Services
                        </a>

                    </div>

                </div>

            </section>

            {/* ==========================================
                FULL ARTICLE MODAL
            ========================================== */}

            {selectedArticle && (
                <div
                    className="blog-modal"
                    onClick={closeArticle}
                >

                    <div
                        className="blog-modal-content"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <button
                            type="button"
                            className="blog-modal-close"
                            onClick={closeArticle}
                            aria-label="Close article"
                        >
                            ×
                        </button>

                        <img
                            src={
                                selectedArticle.image
                            }
                            alt={
                                selectedArticle.title
                            }
                            className="blog-modal-image"
                        />

                        <div className="blog-modal-body">

                            <p className="blog-modal-category">
                                {
                                    selectedArticle.category
                                }
                            </p>

                            <p className="blog-date">
                                {
                                    selectedArticle.date
                                }
                            </p>

                            <h2>
                                {
                                    selectedArticle.title
                                }
                            </h2>

                            {selectedArticle.content.map(
                                (paragraph, index) => (
                                    <p key={index}>
                                        {paragraph}
                                    </p>
                                )
                            )}

                            <div className="blog-modal-booking">

                                <p>
                                    Ready to experience
                                    Empress Beauty?
                                </p>

                                <a
                                    href="/booking"
                                    className="blog-primary-button"
                                    onClick={
                                        closeArticle
                                    }
                                >
                                    Book an Appointment
                                </a>

                            </div>

                        </div>

                    </div>

                </div>
            )}

        </main>
    );
}

export default Blog;