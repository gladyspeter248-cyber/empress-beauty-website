import { useEffect, useState } from "react";
import "./LeaveReview.css";

const API_URL = "http://localhost:8080/api";

function LeaveReview() {
    const [customer, setCustomer] = useState(null);

    const [services, setServices] = useState([]);

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const [comment, setComment] = useState("");
    const [serviceName, setServiceName] = useState("");

    const [loadingServices, setLoadingServices] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ==========================================
    // LOAD CUSTOMER FROM SESSION
    // ==========================================

    useEffect(() => {
        const storedCustomer =
            sessionStorage.getItem("customer");

        if (storedCustomer) {
            try {
                const parsedCustomer =
                    JSON.parse(storedCustomer);

                setCustomer(parsedCustomer);
            } catch (error) {
                console.error(
                    "Unable to read customer information:",
                    error
                );
            }
        }
    }, []);

    // ==========================================
    // LOAD SERVICES
    // ==========================================

    useEffect(() => {
        fetch(`${API_URL}/services`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Failed to load services."
                    );
                }

                return response.json();
            })
            .then((data) => {
                const availableServices = data.filter(
                    (service) =>
                        service.available === true
                );

                setServices(availableServices);
                setLoadingServices(false);
            })
            .catch((error) => {
                console.error(
                    "Services error:",
                    error
                );

                setError(
                    "Unable to load services. Please try again."
                );

                setLoadingServices(false);
            });
    }, []);

    // ==========================================
    // SUBMIT REVIEW
    // ==========================================

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        // Check login
        if (!customer) {
            setError(
                "Please log in to your customer account before leaving a review."
            );

            return;
        }

        // Check rating
        if (rating === 0) {
            setError(
                "Please select a rating from 1 to 5 stars."
            );

            return;
        }

        // Check service
        if (!serviceName) {
            setError(
                "Please select the service you received."
            );

            return;
        }

        // Check comment
        if (!comment.trim()) {
            setError(
                "Please write a review before submitting."
            );

            return;
        }

        if (comment.trim().length < 10) {
            setError(
                "Your review should be at least 10 characters long."
            );

            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch(
                `${API_URL}/testimonials`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        customerName:
                            customer.fullName ||
                            customer.name ||
                            "Empress Beauty Client",

                        rating: rating,

                        comment: comment.trim(),

                        serviceName: serviceName,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                        "Unable to submit your review."
                );
            }

            // ==========================================
            // SUCCESS
            // ==========================================

            setSuccess(
                "Thank you for sharing your experience! Your review has been submitted and is awaiting approval."
            );

            // Reset form
            setRating(0);
            setHoverRating(0);
            setComment("");
            setServiceName("");
        } catch (error) {
            console.error(
                "Review submission error:",
                error
            );

            setError(
                error.message ||
                    "Unable to submit your review. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    // ==========================================
    // NOT LOGGED IN
    // ==========================================

    if (!customer) {
        return (
            <section
                className="leave-review-section"
                id="leave-review"
            >
                <div className="leave-review-container">

                    <div className="leave-review-heading">
                        <span className="section-label">
                            SHARE YOUR EXPERIENCE
                        </span>

                        <h2>
                            We would love to
                            <br />
                            hear from <em>you.</em>
                        </h2>

                        <p>
                            Have you visited Empress Beauty?
                            Sign in to your customer account
                            to share your experience.
                        </p>
                    </div>

                    <div className="leave-review-login-message">
                        <p>
                            Please log in to leave a review.
                        </p>
                    </div>

                </div>
            </section>
        );
    }

    // ==========================================
    // REVIEW FORM
    // ==========================================

    return (
        <section
            className="leave-review-section"
            id="leave-review"
        >
            <div className="leave-review-container">

                {/* HEADING */}

                <div className="leave-review-heading">
                    <span className="section-label">
                        SHARE YOUR EXPERIENCE
                    </span>

                    <h2>
                        How was your
                        <br />
                        <em>Empress</em> experience?
                    </h2>

                    <p>
                        Your feedback means a lot to us.
                        Tell us about your experience at
                        Empress Beauty.
                    </p>
                </div>

                {/* FORM */}

                <form
                    className="leave-review-form"
                    onSubmit={handleSubmit}
                >

                    {/* CUSTOMER */}

                    <div className="review-customer">
                        <div className="review-customer-avatar">
                            {(
                                customer.fullName ||
                                customer.name ||
                                "C"
                            )
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div>
                            <span>
                                Reviewing as
                            </span>

                            <strong>
                                {customer.fullName ||
                                    customer.name ||
                                    "Empress Beauty Client"}
                            </strong>
                        </div>
                    </div>

                    {/* RATING */}

                    <div className="review-field">

                        <label>
                            Your Rating
                        </label>

                        <div
                            className="review-stars"
                            onMouseLeave={() =>
                                setHoverRating(0)
                            }
                        >
                            {[1, 2, 3, 4, 5].map(
                                (star) => (
                                    <button
                                        type="button"
                                        key={star}
                                        className={
                                            star <=
                                                (hoverRating ||
                                                    rating)
                                                ? "review-star active"
                                                : "review-star"
                                        }
                                        onClick={() =>
                                            setRating(
                                                star
                                            )
                                        }
                                        onMouseEnter={() =>
                                            setHoverRating(
                                                star
                                            )
                                        }
                                        aria-label={`${star} star${
                                            star > 1
                                                ? "s"
                                                : ""
                                        }`}
                                    >
                                        ★
                                    </button>
                                )
                            )}
                        </div>

                        <span className="rating-hint">
                            {rating === 0
                                ? "Select a rating"
                                : `${rating} out of 5 stars`}
                        </span>

                    </div>

                    {/* SERVICE */}

                    <div className="review-field">

                        <label htmlFor="review-service">
                            Service
                        </label>

                        <select
                            id="review-service"
                            value={serviceName}
                            onChange={(event) =>
                                setServiceName(
                                    event.target.value
                                )
                            }
                            disabled={
                                loadingServices ||
                                submitting
                            }
                        >
                            <option value="">
                                {loadingServices
                                    ? "Loading services..."
                                    : "Select the service you received"}
                            </option>

                            {services.map(
                                (service) => (
                                    <option
                                        key={service.id}
                                        value={service.name}
                                    >
                                        {service.name}
                                    </option>
                                )
                            )}
                        </select>

                    </div>

                    {/* COMMENT */}

                    <div className="review-field">

                        <label htmlFor="review-comment">
                            Your Review
                        </label>

                        <textarea
                            id="review-comment"
                            value={comment}
                            onChange={(event) =>
                                setComment(
                                    event.target.value
                                )
                            }
                            placeholder="Tell us about your Empress Beauty experience..."
                            rows="6"
                            maxLength="1000"
                            disabled={submitting}
                        />

                        <div className="character-count">
                            {comment.length}/1000
                        </div>

                    </div>

                    {/* ERROR */}

                    {error && (
                        <div className="review-error">
                            {error}
                        </div>
                    )}

                    {/* SUCCESS */}

                    {success && (
                        <div className="review-success">
                            {success}
                        </div>
                    )}

                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="review-submit-button"
                        disabled={submitting}
                    >
                        {submitting
                            ? "Submitting Review..."
                            : "Submit Review"}
                    </button>

                    <p className="review-note">
                        Your review will be reviewed by
                        the Empress Beauty team before it
                        appears publicly.
                    </p>

                </form>

            </div>
        </section>
    );
}

export default LeaveReview;