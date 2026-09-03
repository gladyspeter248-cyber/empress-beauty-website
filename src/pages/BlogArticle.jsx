import { Link, useParams } from "react-router-dom";
import "./BlogArticle.css";

const articles = [
  {
    id: "01",
    category: "Beauty",
    title: "The Art of Effortless Beauty",
    date: "September 2, 2026",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=85",
    content: [
      "Beauty does not have to feel complicated. At Empress Beauty, we believe the most memorable looks are often the ones that feel effortless, considered and completely personal.",
      "The right beauty routine begins with understanding what makes you feel confident. From luminous skin and softly defined features to polished hair and beautifully finished nails, every detail should work together rather than compete for attention.",
      "A thoughtful approach also means choosing techniques and products that complement your natural features. Instead of following every trend, focus on discovering the styles that make you feel most like yourself.",
      "Your beauty experience should be more than simply getting ready. It should be a moment to slow down, reconnect with yourself and leave feeling confident."
    ],
  },
  {
    id: "02",
    category: "Hair",
    title: "How to Keep Your Hair Looking Salon Fresh",
    date: "August 28, 2026",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1400&q=85",
    content: [
      "Beautiful hair begins with consistent care. Between salon visits, a simple routine can help maintain softness, shine and manageability.",
      "Avoid excessive heat whenever possible and always use appropriate heat protection before styling. Gentle handling is equally important, especially when detangling or preparing your hair for sleep.",
      "Regular treatments can also help your hair maintain its healthy appearance. A professional consultation can help identify the right approach for your hair type and styling goals.",
      "The goal is not perfection every day. It is creating a routine that makes beautiful hair easier to maintain."
    ],
  },
  {
    id: "03",
    category: "Makeup",
    title: "Soft Glam: The Look That Never Goes Out of Style",
    date: "August 24, 2026",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=85",
    content: [
      "Soft glam is all about balance. It enhances your features while keeping the overall result elegant and wearable.",
      "Luminous skin, softly defined eyes, natural-looking dimension and carefully chosen lip tones can create a polished result without making the makeup feel heavy.",
      "The best soft-glam look is adapted to the individual. Your complexion, features, outfit and occasion should all influence the final result.",
      "Whether you are preparing for dinner, an event or simply want to feel beautifully put together, soft glam remains a timeless choice."
    ],
  },
  {
    id: "04",
    category: "Skincare",
    title: "Your Guide to a Healthy-Looking Glow",
    date: "August 20, 2026",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=85",
    content: [
      "A beautiful glow starts with thoughtful skincare rather than simply adding more makeup.",
      "Cleansing, hydration and sun protection are simple foundations that can support the appearance of healthy-looking skin.",
      "Professional facials can complement your home routine by giving your skin focused attention and allowing you to receive personalised guidance.",
      "Consistency matters more than having an elaborate routine. Choose products and treatments that suit your skin and make them part of a routine you can realistically maintain."
    ],
  },
  {
    id: "05",
    category: "Bridal",
    title: "Preparing for Your Bridal Beauty Experience",
    date: "August 16, 2026",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
    content: [
      "Your wedding beauty experience should feel calm, organised and completely personal.",
      "Starting your planning early gives you time to discuss your preferred hair and makeup styles, understand the timeline and make adjustments before the big day.",
      "A bridal trial can also be useful for exploring the overall look and making sure it works beautifully with your dress, accessories and personal style.",
      "Most importantly, your wedding-day beauty should still feel like you. Timeless, comfortable and confident is always a beautiful direction."
    ],
  },
  {
    id: "06",
    category: "Beauty",
    title: "Small Beauty Rituals That Make a Difference",
    date: "August 12, 2026",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1400&q=85",
    content: [
      "Self-care does not always need to be elaborate. Small rituals can create meaningful moments throughout your week.",
      "Taking a little extra time with your skincare, keeping your nails beautifully maintained or giving your hair a thoughtful treatment can change how you feel.",
      "These moments are not about perfection. They are about making time for yourself.",
      "At Empress Beauty, we believe beauty and self-care belong together."
    ],
  },
];

function BlogArticle() {
  const { id } = useParams();

  const article = articles.find((item) => item.id === id);

  if (!article) {
    return (
      <main className="blog-article-page">
        <section className="blog-article-not-found">
          <div className="container">
            <span className="section-label">Empress Beauty</span>

            <h1>
              Article not
              <br />
              <em>found.</em>
            </h1>

            <p>
              The article you are looking for could not be found.
            </p>

            <Link to="/blog" className="btn btn-primary">
              Back to Journal
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="blog-article-page">

      {/* HERO */}

      <section className="blog-article-hero">

        <div className="blog-article-hero-image">
          <img src={article.image} alt={article.title} />
        </div>

        <div className="blog-article-hero-overlay"></div>

        <div className="container blog-article-hero-content">

          <span className="section-label">
            {article.category}
          </span>

          <h1>
            {article.title}
          </h1>

          <div className="blog-article-meta">
            <span>{article.date}</span>
            <span>Empress Beauty Journal</span>
          </div>

        </div>

      </section>

      {/* ARTICLE */}

      <section className="blog-article-content-section">

        <div className="container">

          <div className="blog-article-layout">

            <aside className="blog-article-sidebar">

              <span className="blog-article-sidebar-label">
                In this story
              </span>

              <span className="blog-article-sidebar-line"></span>

              <span>
                {article.category}
              </span>

            </aside>

            <article className="blog-article-content">

              <p className="blog-article-introduction">
                {article.content[0]}
              </p>

              {article.content.slice(1).map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}

              <div className="blog-article-end">

                <span className="section-label">
                  Empress Beauty
                </span>

                <p>
                  Beauty, thoughtfully created around you.
                </p>

              </div>

            </article>

          </div>

        </div>

      </section>

      {/* BACK TO BLOG */}

      <section className="blog-article-navigation">

        <div className="container">

          <Link to="/blog" className="blog-back-link">
            <span>←</span>
            Back to The Journal
          </Link>

        </div>

      </section>

      {/* CTA */}

      <section className="blog-article-cta">

        <div className="container">

          <div className="blog-article-cta-inner">

            <span className="section-label">
              Your Beauty Experience
            </span>

            <h2>
              Ready for your
              <br />
              <em>next look?</em>
            </h2>

            <p>
              Bring your inspiration to Empress Beauty
              in Masaki, Dar es Salaam.
            </p>

            <Link to="/booking" className="btn btn-gold">
              Book an Appointment
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default BlogArticle;