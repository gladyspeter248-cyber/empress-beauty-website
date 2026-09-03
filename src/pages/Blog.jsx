
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Booking.css";

const serviceCategories = [
  {
    category: "Hair",
    services: [
      {
        name: "Wash & Blow Dry",
        price: 35000,
        duration: "45 min",
      },
      {
        name: "Silk Press",
        price: 60000,
        duration: "90 min",
      },
      {
        name: "Hair Treatment",
        price: 50000,
        duration: "60 min",
      },
      {
        name: "Braids",
        price: 80000,
        duration: "2–5 hrs",
        from: true,
      },
      {
        name: "Wig Installation",
        price: 70000,
        duration: "90 min",
        from: true,
      },
      {
        name: "Wig Styling",
        price: 50000,
        duration: "60 min",
        from: true,
      },
    ],
  },
  {
    category: "Nails",
    services: [
      {
        name: "Classic Manicure",
        price: 25000,
        duration: "45 min",
      },
      {
        name: "Gel Manicure",
        price: 40000,
        duration: "60 min",
      },
      {
        name: "Classic Pedicure",
        price: 35000,
        duration: "60 min",
      },
      {
        name: "Gel Pedicure",
        price: 50000,
        duration: "75 min",
      },
      {
        name: "Acrylic Extensions",
        price: 70000,
        duration: "90 min",
        from: true,
      },
      {
        name: "Nail Art",
        price: 10000,
        duration: "15–45 min",
        from: true,
      },
    ],
  },
  {
    category: "Makeup",
    services: [
      {
        name: "Soft Glam",
        price: 60000,
        duration: "60 min",
      },
      {
        name: "Full Glam",
        price: 85000,
        duration: "90 min",
      },
      {
        name: "Event Makeup",
        price: 100000,
        duration: "90 min",
      },
      {
        name: "Bridal Makeup",
        price: 180000,
        duration: "2 hrs",
        from: true,
      },
    ],
  },
  {
    category: "Skincare",
    services: [
      {
        name: "Express Facial",
        price: 45000,
        duration: "30 min",
      },
      {
        name: "Deep Cleansing Facial",
        price: 70000,
        duration: "60 min",
      },
      {
        name: "Glow Facial",
        price: 85000,
        duration: "60 min",
      },
      {
        name: "Hydrating Facial",
        price: 90000,
        duration: "60 min",
      },
      {
        name: "Premium Facial",
        price: 120000,
        duration: "75 min",
      },
    ],
  },
  {
    category: "Bridal & Events",
    services: [
      {
        name: "Bridal Makeup",
        price: 180000,
        duration: "2 hrs",
        from: true,
      },
      {
        name: "Bridal Hair Styling",
        price: 120000,
        duration: "2 hrs",
        from: true,
      },
      {
        name: "Bridal Beauty Package",
        price: 350000,
        duration: "4–6 hrs",
        from: true,
      },
      {
        name: "Event Beauty Package",
        price: 180000,
        duration: "2–4 hrs",
        from: true,
      },
    ],
  },
  {
    category: "Self-Care",
    services: [
      {
        name: "Back & Shoulder Massage",
        price: 50000,
        duration: "45 min",
      },
      {
        name: "Relaxation Massage",
        price: 80000,
        duration: "60 min",
      },
      {
        name: "Full Body Massage",
        price: 100000,
        duration: "90 min",
      },
      {
        name: "Body Scrub",
        price: 80000,
        duration: "60 min",
      },
      {
        name: "Beauty Consultation",
        price: 30000,
        duration: "30 min",
      },
    ],
  },
];

const allServices = serviceCategories.flatMap((category) =>
  category.services.map((service) => ({
    ...service,
    category: category.category,
  }))
);

function Booking() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    clientType: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const selectedService = allServices.find(
    (service) => service.name === formData.service
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Please enter your first name.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Please enter your last name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[+0-9\s()-]{7,20}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.service) {
      newErrors.service = "Please choose a service.";
    }

    if (!formData.date) {
      newErrors.date = "Please choose your preferred date.";
    }

    if (formData.date && formData.date < today) {
      newErrors.date = "Please choose a future date.";
    }

    if (!formData.time) {
      newErrors.time = "Please choose your preferred time.";
    }

    if (!formData.clientType) {
      newErrors.clientType =
        "Please tell us whether this is your first visit.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 800);
  };

  if (submitted) {
    return (
      <main className="booking-page">

        <section className="booking-success">

          <div className="container">

            <div className="booking-success-inner">

              <span className="section-label">
                Empress Beauty
              </span>

              <div className="booking-success-icon">
                ✓
              </div>

              <h1>
                Thank you,
                <br />
                <em>{formData.firstName}.</em>
              </h1>

              <p>
                Your appointment request has been received.
                Our team will contact you to confirm your
                appointment details.
              </p>

              <div className="booking-success-details">

                <div>
                  <span>Service</span>
                  <strong>{formData.service}</strong>
                </div>

                <div>
                  <span>Date</span>
                  <strong>{formData.date}</strong>
                </div>

                <div>
                  <span>Preferred Time</span>
                  <strong>{formData.time}</strong>
                </div>

              </div>

              <div className="booking-success-actions">

                <Link
                  to="/"
                  className="btn btn-primary"
                >
                  Back Home
                </Link>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      phone: "",
                      email: "",
                      service: "",
                      date: "",
                      time: "",
                      clientType: "",
                      notes: "",
                    });
                    setErrors({});
                  }}
                >
                  Make Another Booking
                </button>

              </div>

            </div>

          </div>

        </section>

      </main>
    );
  }

  return (
    <main className="booking-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="booking-hero">

        <div className="container booking-hero-content">

          <span className="section-label">
            Appointments
          </span>

          <h1>
            Your time,
            <br />
            <em>your appointment.</em>
          </h1>

          <p>
            Tell us how we can make your next beauty
            experience unforgettable.
          </p>

        </div>

        <div className="booking-hero-number">
          08
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
                Let's Begin
              </span>

              <h2>
                Your beauty
                <br />
                <em>moment awaits.</em>
              </h2>

            </div>

            <div>

              <p>
                Complete the form below and tell us about
                the experience you're looking for.
              </p>

              <p>
                Our team will review your request and contact
                you to confirm the appointment.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          BOOKING AREA
      ========================================= */}

      <section className="booking-form-section">

        <div className="container">

          <div className="booking-layout">

            {/* FORM */}

            <form
              className="booking-form"
              onSubmit={handleSubmit}
              noValidate
            >

              {/* YOUR DETAILS */}

              <div className="booking-form-block">

                <div className="booking-form-heading">

                  <span className="booking-step">
                    01
                  </span>

                  <div>
                    <span className="section-label">
                      Your Details
                    </span>

                    <h2>
                      Tell us about you.
                    </h2>
                  </div>

                </div>

                <div className="booking-fields-grid">

                  <div className="form-group">

                    <label
                      className="form-label"
                      htmlFor="firstName"
                    >
                      First Name *
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="form-input"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Your first name"
                    />

                    {errors.firstName && (
                      <span className="booking-error">
                        {errors.firstName}
                      </span>
                    )}

                  </div>


                  <div className="form-group">

                    <label
                      className="form-label"
                      htmlFor="lastName"
                    >
                      Last Name *
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="form-input"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Your last name"
                    />

                    {errors.lastName && (
                      <span className="booking-error">
                        {errors.lastName}
                      </span>
                    )}

                  </div>


                  <div className="form-group">

                    <label
                      className="form-label"
                      htmlFor="phone"
                    >
                      Phone Number *
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+255 7XX XXX XXX"
                    />

                    {errors.phone && (
                      <span className="booking-error">
                        {errors.phone}
                      </span>
                    )}

                  </div>


                  <div className="form-group">

                    <label
                      className="form-label"
                      htmlFor="email"
                    >
                      Email Address *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />

                    {errors.email && (
                      <span className="booking-error">
                        {errors.email}
                      </span>
                    )}

                  </div>

                </div>

              </div>


              {/* SERVICE */}

              <div className="booking-form-block">

                <div className="booking-form-heading">

                  <span className="booking-step">
                    02
                  </span>

                  <div>
                    <span className="section-label">
                      Your Experience
                    </span>

                    <h2>
                      Choose your service.
                    </h2>
                  </div>

                </div>

                <div className="form-group">

                  <label
                    className="form-label"
                    htmlFor="service"
                  >
                    Select a Service *
                  </label>

                  <select
                    id="service"
                    name="service"
                    className="form-select"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">
                      Choose your service
                    </option>

                    {serviceCategories.map((category) => (

                      <optgroup
                        label={category.category}
                        key={category.category}
                      >

                        {category.services.map((service) => (

                          <option
                            value={service.name}
                            key={service.name}
                          >
                            {service.name} —{" "}
                            {service.from ? "From " : ""}
                            TZS{" "}
                            {service.price.toLocaleString()}
                          </option>

                        ))}

                      </optgroup>

                    ))}

                  </select>

                  {errors.service && (
                    <span className="booking-error">
                      {errors.service}
                    </span>
                  )}

                </div>


                {selectedService && (

                  <div className="selected-service-preview">

                    <div>

                      <span>
                        Selected Service
                      </span>

                      <strong>
                        {selectedService.name}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Duration
                      </span>

                      <strong>
                        {selectedService.duration}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Price
                      </span>

                      <strong>
                        {selectedService.from
                          ? "From "
                          : ""}
                        TZS{" "}
                        {selectedService.price.toLocaleString()}
                      </strong>

                    </div>

                  </div>

                )}

              </div>


              {/* DATE & TIME */}

              <div className="booking-form-block">

                <div className="booking-form-heading">

                  <span className="booking-step">
                    03
                  </span>

                  <div>
                    <span className="section-label">
                      Date & Time
                    </span>

                    <h2>
                      When would you like to visit?
                    </h2>
                  </div>

                </div>

                <div className="booking-fields-grid">

                  <div className="form-group">

                    <label
                      className="form-label"
                      htmlFor="date"
                    >
                      Preferred Date *
                    </label>

                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={today}
                      className="form-input"
                      value={formData.date}
                      onChange={handleChange}
                    />

                    {errors.date && (
                      <span className="booking-error">
                        {errors.date}
                      </span>
                    )}

                  </div>


                  <div className="form-group">

                    <label
                      className="form-label"
                      htmlFor="time"
                    >
                      Preferred Time *
                    </label>

                    <select
                      id="time"
                      name="time"
                      className="form-select"
                      value={formData.time}
                      onChange={handleChange}
                    >

                      <option value="">
                        Choose a time
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

                    {errors.time && (
                      <span className="booking-error">
                        {errors.time}
                      </span>
                    )}

                  </div>

                </div>

              </div>


              {/* CLIENT TYPE */}

              <div className="booking-form-block">

                <div className="booking-form-heading">

                  <span className="booking-step">
                    04
                  </span>

                  <div>
                    <span className="section-label">
                      Your Visit
                    </span>

                    <h2>
                      Is this your first visit?
                    </h2>
                  </div>

                </div>

                <div className="booking-choice-grid">

                  <label
                    className={
                      formData.clientType === "First visit"
                        ? "booking-choice selected"
                        : "booking-choice"
                    }
                  >

                    <input
                      type="radio"
                      name="clientType"
                      value="First visit"
                      checked={
                        formData.clientType === "First visit"
                      }
                      onChange={handleChange}
                    />

                    <span>
                      First Visit
                    </span>

                  </label>


                  <label
                    className={
                      formData.clientType ===
                      "Returning client"
                        ? "booking-choice selected"
                        : "booking-choice"
                    }
                  >

                    <input
                      type="radio"
                      name="clientType"
                      value="Returning client"
                      checked={
                        formData.clientType ===
                        "Returning client"
                      }
                      onChange={handleChange}
                    />

                    <span>
                      Returning Client
                    </span>

                  </label>

                </div>

                {errors.clientType && (
                  <span className="booking-error">
                    {errors.clientType}
                  </span>
                )}

              </div>


              {/* NOTES */}

              <div className="booking-form-block">

                <div className="booking-form-heading">

                  <span className="booking-step">
                    05
                  </span>

                  <div>
                    <span className="section-label">
                      Additional Details
                    </span>

                    <h2>
                      Tell us about your visit.
                    </h2>
                  </div>

                </div>

                <div className="form-group">

                  <label
                    className="form-label"
                    htmlFor="notes"
                  >
                    Additional Notes
                  </label>

                  <textarea
                    id="notes"
                    name="notes"
                    className="form-textarea"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Tell us anything you'd like our team to know..."
                  />

                </div>

              </div>


              {/* SUBMIT */}

              <div className="booking-submit-area">

                <p>
                  By submitting this form, you are requesting
                  an appointment. Our team will contact you
                  to confirm availability.
                </p>

                <button
                  type="submit"
                  className="btn btn-gold booking-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Sending Request..."
                    : "Request Appointment"}
                </button>

              </div>

            </form>


            {/* SIDEBAR */}

            <aside className="booking-sidebar">

              <div className="booking-sidebar-image">

                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=85"
                  alt="Empress Beauty salon"
                />

              </div>


              <div className="booking-sidebar-content">

                <span className="section-label">
                  Empress Beauty
                </span>

                <h3>
                  Your beauty
                  <br />
                  <em>moment.</em>
                </h3>

                <p>
                  Visit us in Masaki, Dar es Salaam for
                  thoughtful beauty experiences created around
                  you.
                </p>


                <div className="booking-sidebar-detail">

                  <span>
                    Location
                  </span>

                  <p>
                    Masaki
                    <br />
                    Dar es Salaam
                    <br />
                    Tanzania
                  </p>

                </div>


                <div className="booking-sidebar-detail">

                  <span>
                    Opening Hours
                  </span>

                  <p>
                    Monday – Saturday
                    <br />
                    8:00 AM – 8:00 PM
                    <br />
                    <br />
                    Sunday
                    <br />
                    9:00 AM – 6:00 PM
                  </p>

                </div>


                <div className="booking-sidebar-detail">

                  <span>
                    Contact
                  </span>

                  <a href="tel:+255741309031">
                    +255 741 309 031
                  </a>

                  <a href="tel:+255651829411">
                    +255 651 829 411
                  </a>

                  <a href="mailto:empress.beauty@gmail.com">
                    empress.beauty@gmail.com
                  </a>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </section>


      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="booking-final-cta">

        <div className="container">

          <div className="booking-final-cta-inner">

            <span className="section-label">
              Empress Beauty
            </span>

            <h2>
              Come as you are.
              <br />
              <em>Leave feeling beautiful.</em>
            </h2>

            <Link
              to="/contact"
              className="btn btn-secondary"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Booking;

