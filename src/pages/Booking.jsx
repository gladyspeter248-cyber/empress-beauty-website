import { useState } from "react";
import { Link } from "react-router-dom";
import "./Booking.css";

const serviceCategories = [
  {
    category: "Hair",
    services: [
      {
        name: "Wash & Blow Dry",
        price: "TZS 35,000",
        duration: "45 min",
      },
      {
        name: "Silk Press",
        price: "TZS 60,000",
        duration: "90 min",
      },
      {
        name: "Hair Treatment",
        price: "TZS 50,000",
        duration: "60 min",
      },
      {
        name: "Braids",
        price: "From TZS 80,000",
        duration: "2–5 hrs",
      },
      {
        name: "Wig Installation",
        price: "From TZS 70,000",
        duration: "90 min",
      },
      {
        name: "Wig Styling",
        price: "From TZS 50,000",
        duration: "60 min",
      },
    ],
  },
  {
    category: "Nails",
    services: [
      {
        name: "Classic Manicure",
        price: "TZS 25,000",
        duration: "45 min",
      },
      {
        name: "Gel Manicure",
        price: "TZS 40,000",
        duration: "60 min",
      },
      {
        name: "Classic Pedicure",
        price: "TZS 35,000",
        duration: "60 min",
      },
      {
        name: "Gel Pedicure",
        price: "TZS 50,000",
        duration: "75 min",
      },
      {
        name: "Acrylic Extensions",
        price: "From TZS 70,000",
        duration: "90 min",
      },
      {
        name: "Nail Art",
        price: "From TZS 10,000",
        duration: "15–45 min",
      },
    ],
  },
  {
    category: "Makeup",
    services: [
      {
        name: "Soft Glam",
        price: "TZS 60,000",
        duration: "60 min",
      },
      {
        name: "Full Glam",
        price: "TZS 85,000",
        duration: "90 min",
      },
      {
        name: "Event Makeup",
        price: "TZS 100,000",
        duration: "90 min",
      },
      {
        name: "Bridal Makeup",
        price: "From TZS 180,000",
        duration: "2 hrs",
      },
    ],
  },
  {
    category: "Skincare",
    services: [
      {
        name: "Express Facial",
        price: "TZS 45,000",
        duration: "30 min",
      },
      {
        name: "Deep Cleansing Facial",
        price: "TZS 70,000",
        duration: "60 min",
      },
      {
        name: "Glow Facial",
        price: "TZS 85,000",
        duration: "60 min",
      },
      {
        name: "Hydrating Facial",
        price: "TZS 90,000",
        duration: "60 min",
      },
      {
        name: "Premium Facial",
        price: "TZS 120,000",
        duration: "75 min",
      },
    ],
  },
  {
    category: "Bridal & Events",
    services: [
      {
        name: "Bridal Makeup",
        price: "From TZS 180,000",
        duration: "2 hrs",
      },
      {
        name: "Bridal Hair Styling",
        price: "From TZS 120,000",
        duration: "2 hrs",
      },
      {
        name: "Bridal Beauty Package",
        price: "From TZS 350,000",
        duration: "4–6 hrs",
      },
      {
        name: "Event Beauty Package",
        price: "From TZS 180,000",
        duration: "2–4 hrs",
      },
    ],
  },
  {
    category: "Self-Care",
    services: [
      {
        name: "Back & Shoulder Massage",
        price: "TZS 50,000",
        duration: "45 min",
      },
      {
        name: "Relaxation Massage",
        price: "TZS 80,000",
        duration: "60 min",
      },
      {
        name: "Full Body Massage",
        price: "TZS 100,000",
        duration: "90 min",
      },
      {
        name: "Body Scrub",
        price: "TZS 80,000",
        duration: "60 min",
      },
      {
        name: "Beauty Consultation",
        price: "TZS 30,000",
        duration: "30 min",
      },
    ],
  },
];

const allServices = serviceCategories.flatMap(
  (category) =>
    category.services.map((service) => ({
      ...service,
      category: category.category,
    }))
);

function Booking() {
  const [selectedService, setSelectedService] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    visitType: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const selectedServiceDetails = allServices.find(
    (service) => service.name === selectedService
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="booking-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="booking-hero">

        <div className="container booking-hero-content">

          <span className="section-label">
            Book Your Experience
          </span>

          <h1>
            Your time,
            <br />
            <em>your appointment.</em>
          </h1>

          <p>
            Choose your service, tell us when you'd like
            to visit and let us take care of the details.
          </p>

        </div>

        <div className="booking-hero-number">
          09
        </div>

      </section>

      {/* =========================================
          INTRO
      ========================================= */}

      <section className="booking-intro">

        <div className="container">

          <div className="booking-intro-grid">

            <div>

              <span className="section-label">
                The Empress Experience
              </span>

              <h2>
                Make time
                <br />
                <em>for yourself.</em>
              </h2>

            </div>

            <div>

              <p>
                Your appointment should never feel rushed.
                From the moment you choose your service to
                the moment you leave, every detail is designed
                around you.
              </p>

              <p>
                Complete the form below with your preferred
                service, date and time. Our team will review
                your request and confirm your appointment.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================
          BOOKING STEPS
      ========================================= */}

      <section className="booking-steps">

        <div className="container">

          <div className="booking-steps-grid">

            <div className="booking-step">

              <span className="booking-step-number">
                01
              </span>

              <h3>
                Choose
              </h3>

              <p>
                Select the beauty service that feels right
                for your next Empress moment.
              </p>

            </div>

            <div className="booking-step">

              <span className="booking-step-number">
                02
              </span>

              <h3>
                Request
              </h3>

              <p>
                Tell us your preferred date and time and
                share any details we should know.
              </p>

            </div>

            <div className="booking-step">

              <span className="booking-step-number">
                03
              </span>

              <h3>
                Confirm
              </h3>

              <p>
                Our team will review your request and
                confirm your appointment.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================
          BOOKING FORM
      ========================================= */}

      <section className="booking-main">

        <div className="container">

          <div className="booking-main-grid">

            {/* FORM */}

            <div className="booking-form-wrapper">

              <div className="booking-form-heading">

                <span className="section-label">
                  Appointment Request
                </span>

                <h2>
                  Tell us
                  <br />
                  <em>what you need.</em>
                </h2>

              </div>

              {submitted ? (

                <div className="booking-success">

                  <span className="booking-success-number">
                    ✓
                  </span>

                  <span className="section-label">
                    Request Received
                  </span>

                  <h2>
                    Thank you,
                    <br />
                    <em>{formData.name || "beautiful"}.</em>
                  </h2>

                  <p>
                    Your appointment request has been
                    received. Our team will review your
                    preferred date and time and contact you
                    to confirm your appointment.
                  </p>

                  <div className="booking-success-details">

                    <div>
                      <span>Service</span>
                      <strong>
                        {selectedService || "Not selected"}
                      </strong>
                    </div>

                    <div>
                      <span>Preferred Date</span>
                      <strong>
                        {formData.date || "Not selected"}
                      </strong>
                    </div>

                    <div>
                      <span>Preferred Time</span>
                      <strong>
                        {formData.time || "Not selected"}
                      </strong>
                    </div>

                  </div>

                  <Link
                    to="/"
                    className="btn btn-primary"
                  >
                    Back To Home
                  </Link>

                </div>

              ) : (

                <form
                  className="booking-form"
                  onSubmit={handleSubmit}
                >

                  {/* PERSONAL DETAILS */}

                  <div className="booking-form-section">

                    <div className="booking-section-title">

                      <span>
                        01
                      </span>

                      <h3>
                        Your Details
                      </h3>

                    </div>

                    <div className="booking-form-row">

                      <div className="form-group">

                        <label
                          htmlFor="booking-name"
                          className="form-label"
                        >
                          Full Name
                        </label>

                        <input
                          id="booking-name"
                          name="name"
                          type="text"
                          className="form-input"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />

                      </div>

                      <div className="form-group">

                        <label
                          htmlFor="booking-phone"
                          className="form-label"
                        >
                          Phone Number
                        </label>

                        <input
                          id="booking-phone"
                          name="phone"
                          type="tel"
                          className="form-input"
                          placeholder="+255..."
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />

                      </div>

                    </div>

                    <div className="form-group">

                      <label
                        htmlFor="booking-email"
                        className="form-label"
                      >
                        Email Address
                      </label>

                      <input
                        id="booking-email"
                        name="email"
                        type="email"
                        className="form-input"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  {/* SERVICE */}

                  <div className="booking-form-section">

                    <div className="booking-section-title">

                      <span>
                        02
                      </span>

                      <h3>
                        Choose Your Service
                      </h3>

                    </div>

                    <div className="form-group">

                      <label
                        htmlFor="booking-service"
                        className="form-label"
                      >
                        Beauty Service
                      </label>

                      <select
                        id="booking-service"
                        className="form-select"
                        value={selectedService}
                        onChange={(event) =>
                          setSelectedService(event.target.value)
                        }
                        required
                      >

                        <option value="" disabled>
                          Select a service
                        </option>

                        {serviceCategories.map(
                          (category) => (
                            <optgroup
                              key={category.category}
                              label={category.category}
                            >

                              {category.services.map(
                                (service) => (
                                  <option
                                    key={service.name}
                                    value={service.name}
                                  >
                                    {service.name} —{" "}
                                    {service.price}
                                  </option>
                                )
                              )}

                            </optgroup>
                          )
                        )}

                      </select>

                    </div>

                    {selectedServiceDetails && (

                      <div className="booking-service-preview">

                        <div>

                          <span>
                            Selected Service
                          </span>

                          <strong>
                            {selectedServiceDetails.name}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Duration
                          </span>

                          <strong>
                            {selectedServiceDetails.duration}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Price
                          </span>

                          <strong>
                            {selectedServiceDetails.price}
                          </strong>

                        </div>

                      </div>

                    )}

                  </div>

                  {/* DATE AND TIME */}

                  <div className="booking-form-section">

                    <div className="booking-section-title">

                      <span>
                        03
                      </span>

                      <h3>
                        Preferred Date & Time
                      </h3>

                    </div>

                    <div className="booking-form-row">

                      <div className="form-group">

                        <label
                          htmlFor="booking-date"
                          className="form-label"
                        >
                          Preferred Date
                        </label>

                        <input
                          id="booking-date"
                          name="date"
                          type="date"
                          className="form-input"
                          value={formData.date}
                          onChange={handleChange}
                          required
                        />

                      </div>

                      <div className="form-group">

                        <label
                          htmlFor="booking-time"
                          className="form-label"
                        >
                          Preferred Time
                        </label>

                        <select
                          id="booking-time"
                          name="time"
                          className="form-select"
                          value={formData.time}
                          onChange={handleChange}
                          required
                        >

                          <option value="" disabled>
                            Select a time
                          </option>

                          <option value="8:00 AM">
                            8:00 AM
                          </option>

                          <option value="9:00 AM">
                            9:00 AM
                          </option>

                          <option value="10:00 AM">
                            10:00 AM
                          </option>

                          <option value="11:00 AM">
                            11:00 AM
                          </option>

                          <option value="12:00 PM">
                            12:00 PM
                          </option>

                          <option value="1:00 PM">
                            1:00 PM
                          </option>

                          <option value="2:00 PM">
                            2:00 PM
                          </option>

                          <option value="3:00 PM">
                            3:00 PM
                          </option>

                          <option value="4:00 PM">
                            4:00 PM
                          </option>

                          <option value="5:00 PM">
                            5:00 PM
                          </option>

                          <option value="6:00 PM">
                            6:00 PM
                          </option>

                          <option value="7:00 PM">
                            7:00 PM
                          </option>

                        </select>

                      </div>

                    </div>

                    <p className="booking-availability-note">
                      Your selected time is a preferred
                      time request. Final availability will
                      be confirmed by our team.
                    </p>

                  </div>

                  {/* VISIT TYPE */}

                  <div className="booking-form-section">

                    <div className="booking-section-title">

                      <span>
                        04
                      </span>

                      <h3>
                        Tell Us About Your Visit
                      </h3>

                    </div>

                    <div className="booking-visit-options">

                      <label className="booking-radio-card">

                        <input
                          type="radio"
                          name="visitType"
                          value="First Visit"
                          checked={
                            formData.visitType ===
                            "First Visit"
                          }
                          onChange={handleChange}
                          required
                        />

                        <span className="booking-radio-content">

                          <strong>
                            First Visit
                          </strong>

                          <small>
                            It's my first Empress experience.
                          </small>

                        </span>

                      </label>

                      <label className="booking-radio-card">

                        <input
                          type="radio"
                          name="visitType"
                          value="Returning Client"
                          checked={
                            formData.visitType ===
                            "Returning Client"
                          }
                          onChange={handleChange}
                        />

                        <span className="booking-radio-content">

                          <strong>
                            Returning Client
                          </strong>

                          <small>
                            I've visited Empress Beauty before.
                          </small>

                        </span>

                      </label>

                    </div>

                  </div>

                  {/* NOTES */}

                  <div className="booking-form-section">

                    <div className="booking-section-title">

                      <span>
                        05
                      </span>

                      <h3>
                        Additional Notes
                      </h3>

                    </div>

                    <div className="form-group">

                      <label
                        htmlFor="booking-notes"
                        className="form-label"
                      >
                        Anything We'd Like To Know?
                      </label>

                      <textarea
                        id="booking-notes"
                        name="notes"
                        className="form-textarea"
                        placeholder="Tell us about your preferences, occasion, inspiration or anything else we should know..."
                        value={formData.notes}
                        onChange={handleChange}
                      ></textarea>

                    </div>

                  </div>

                  <button
                    type="submit"
                    className="btn btn-gold booking-submit"
                  >
                    Request Appointment
                    <span>↗</span>
                  </button>

                  <p className="booking-form-note">
                    By submitting this form, you are
                    requesting an appointment. Your booking
                    is not confirmed until our team contacts
                    you.
                  </p>

                </form>

              )}

            </div>

            {/* SIDEBAR */}

            <aside className="booking-sidebar">

              <div className="booking-sidebar-image">

                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85"
                  alt="Elegant beauty salon interior"
                />

              </div>

              <div className="booking-sidebar-content">

                <span className="section-label">
                  Empress Beauty
                </span>

                <h3>
                  Your beauty
                  <br />
                  <em>moment awaits.</em>
                </h3>

                <p>
                  Visit us in Masaki, Dar es Salaam for
                  an experience designed around you.
                </p>

                <div className="booking-sidebar-details">

                  <div>

                    <span>
                      Location
                    </span>

                    <strong>
                      Masaki, Dar es Salaam
                    </strong>

                  </div>

                  <div>

                    <span>
                      Monday – Saturday
                    </span>

                    <strong>
                      8:00 AM – 8:00 PM
                    </strong>

                  </div>

                  <div>

                    <span>
                      Sunday
                    </span>

                    <strong>
                      9:00 AM – 6:00 PM
                    </strong>

                  </div>

                  <div>

                    <span>
                      Call
                    </span>

                    <strong>
                      +255 741 309 031
                    </strong>

                  </div>

                </div>

                <Link
                  to="/contact"
                  className="booking-sidebar-link"
                >
                  Have a question?
                  <span>→</span>
                </Link>

              </div>

            </aside>

          </div>

        </div>

      </section>

      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="booking-cta">

        <div className="container">

          <div className="booking-cta-inner">

            <span className="section-label">
              Empress Beauty
            </span>

            <h2>
              Take a moment
              <br />
              <em>for yourself.</em>
            </h2>

            <p>
              We'll take care of the rest.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Booking;