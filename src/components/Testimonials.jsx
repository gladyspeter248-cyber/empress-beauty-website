import { useEffect, useState } from "react";
import "./Testimonials.css";

const API_URL = "http://localhost:8080/api";

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/testimonials/approved`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load testimonials.");
                }

                return response.json();
            })
            .then((data) => {
                setTestimonials(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Testimonials error:", err);
                setError("Unable to load testimonials.");
                setLoading(false);
            });
    }, []);

    // ==============================
    // LOADING
    // ==============================

    if (loading) {
        return (
            <section className="testimonials-section">
                <div className="testimonials-container">
                    <div className="testimonials-heading">
                        <span className="section-label">
                            CLIENT LOVE
                        </span>

                        <h2>
                            What Our Clients Say
                        </h2>

                        <p>
                            Discover why our clients love
                            their Empress Beauty experience.
                        </p>
                    </div>

                    <div className="testimonials-loading">
                        Loading testimonials...
                    </div>
                </div>
            </section>
        );
    }


    // ==============================
    // ERROR
    // ==============================

    if (error) {
        return (
            <section className="testimonials-section">
                <div className="testimonials-container">
                    <div className="testimonials-heading">
                        <span className="section-label">
                            CLIENT LOVE
                        </span>

                        <h2>
                            What Our Clients Say
                        </h2>

                        <p>
                            Discover why our clients love
                            their Empress Beauty experience.
                        </p>
                    </div>

                    <div className="testimonials-message">
                        {error}
                    </div>
                </div>
            </section>
        );
    }


    // ==============================
    // NO TESTIMONIALS
    // ==============================

    if (testimonials.length === 0) {
        return (
            <section className="testimonials-section">
                <div className="testimonials-container">

                    <div className="testimonials-heading">
                        <span className="section-label">
                            CLIENT LOVE
                        </span>

                        <h2>
                            What Our Clients Say
                        </h2>

                        <p>
                            Discover why our clients love
                            their Empress Beauty experience.
                        </p>
                    </div>

                    <div className="testimonials-message">
                        Be the first to share your
                        Empress Beauty experience.
                    </div>

                </div>
            </section>
        );
    }


    // ==============================
    // STAR RATING
    // ==============================

    const renderStars = (rating) => {

        return (
            <div
                className="testimonial-stars"
                aria-label={`${rating} out of 5 stars`}
            >
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={
                            star <= rating
                                ? "star active"
                                : "star"
                        }
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };


    // ==============================
    // DISPLAY TESTIMONIALS
    // ==============================

    return (
        <section
            className="testimonials-section"
            id="testimonials"
        >

            <div className="testimonials-container">

                {/* ==============================
                    SECTION HEADING
                ============================== */}

                <div className="testimonials-heading">

                    <span className="section-label">
                        CLIENT LOVE
                    </span>

                    <h2>
                        What Our Clients Say
                    </h2>

                    <p>
                        Real experiences from clients
                        who have visited Empress Beauty.
                    </p>

                </div>


                {/* ==============================
                    TESTIMONIAL CARDS
                ============================== */}

                <div className="testimonials-grid">

                    {testimonials.map((testimonial) => (

                        <article
                            className="testimonial-card"
                            key={testimonial.id}
                        >

                            <div className="testimonial-card-top">

                                {renderStars(
                                    testimonial.rating
                                )}

                                <span className="quote-mark">
                                    “
                                </span>

                            </div>


                            <p className="testimonial-comment">
                                {testimonial.comment}
                            </p>


                            <div className="testimonial-client">

                                <div className="client-avatar">
                                    {testimonial.customerName
                                        ?.charAt(0)
                                        ?.toUpperCase()}
                                </div>

                                <div className="client-details">

                                    <h3>
                                        {testimonial.customerName}
                                    </h3>

                                    {testimonial.serviceName && (
                                        <span>
                                            {testimonial.serviceName}
                                        </span>
                                    )}

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default Testimonials;