import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api";

function Booking() {
    const [services, setServices] = useState([]);
    const [loadingServices, setLoadingServices] = useState(true);

    const [availableTimes, setAvailableTimes] = useState([]);
    const [loadingTimes, setLoadingTimes] = useState(false);

    const [bookingConfirmation, setBookingConfirmation] =
        useState(null);

    const [formData, setFormData] = useState({
        customerName: "",
        phone: "",
        email: "",
        serviceId: "",
        bookingDate: "",
        bookingTime: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // ==========================================
    // GET TODAY'S DATE
    // ==========================================

    const getTodayDate = () => {
        const today = new Date();

        const year = today.getFullYear();

        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    // ==========================================
    // LOAD SERVICES
    // ==========================================

    useEffect(() => {
        fetchServices();
    }, []);

    // ==========================================
    // LOAD LOGGED-IN CUSTOMER
    // ==========================================

    useEffect(() => {
        const isAuthenticated =
            sessionStorage.getItem("customerAuth");

        const savedCustomer =
            sessionStorage.getItem("customer");

        if (
            isAuthenticated === "true" &&
            savedCustomer
        ) {
            try {
                const customer =
                    JSON.parse(savedCustomer);

                setFormData((previous) => ({
                    ...previous,

                    customerName:
                        customer.fullName || "",

                    phone:
                        customer.phone || "",

                    email:
                        customer.email || "",
                }));
            } catch (err) {
                console.error(
                    "Unable to load customer information:",
                    err
                );
            }
        }
    }, []);

    // ==========================================
    // FETCH SERVICES
    // ==========================================

    const fetchServices = async () => {
        try {
            setLoadingServices(true);
            setError("");

            const response = await fetch(
                `${API_URL}/services`
            );

            if (!response.ok) {
                throw new Error(
                    "Unable to load services"
                );
            }

            const data = await response.json();

            setServices(
                Array.isArray(data)
                    ? data.filter(
                        (service) =>
                            service.available === true
                    )
                    : []
            );
        } catch (err) {
            setError(
                "We couldn't load our services. Please try again."
            );
        } finally {
            setLoadingServices(false);
        }
    };

    // ==========================================
    // FETCH AVAILABLE TIMES
    // ==========================================

    const fetchAvailableTimes = async (
        serviceId,
        date
    ) => {
        if (!serviceId || !date) {
            setAvailableTimes([]);
            return;
        }

        // ==========================================
        // PREVENT PAST DATE REQUEST
        // ==========================================

        const today = getTodayDate();

        if (date < today) {
            setAvailableTimes([]);
            setLoadingTimes(false);

            setError(
                "You cannot select a date that has already passed. Please choose today or a future date."
            );

            return;
        }

        setLoadingTimes(true);
        setAvailableTimes([]);

        setFormData((previous) => ({
            ...previous,
            bookingTime: "",
        }));

        try {
            const response = await fetch(
                `${API_URL}/bookings/available-times?serviceId=${serviceId}&date=${date}`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    data.message ||
                    "Unable to load available times"
                );
            }

            const slots =
                Array.isArray(data.slots)
                    ? data.slots
                    : [];

            setAvailableTimes(slots);

            if (slots.length === 0) {
                setError(
                    "There are no available appointment times for this date. Please choose another date."
                );
            } else {
                setError("");
            }
        } catch (err) {
            setAvailableTimes([]);

            setError(
                err.message ||
                "Unable to load available appointment times."
            );
        } finally {
            setLoadingTimes(false);
        }
    };

    // ==========================================
    // HANDLE FORM CHANGES
    // ==========================================

    const handleChange = (event) => {
        const { name, value } = event.target;

        setMessage("");
        setError("");

        // ==========================================
        // SERVICE CHANGE
        // ==========================================

        if (name === "serviceId") {
            setFormData((previous) => ({
                ...previous,

                serviceId: value,
                bookingDate: "",
                bookingTime: "",
            }));

            setAvailableTimes([]);

            return;
        }

        // ==========================================
        // DATE CHANGE
        // ==========================================

        if (name === "bookingDate") {
            const today = getTodayDate();

            // ------------------------------------------
            // BLOCK ANY PAST DATE
            // ------------------------------------------

            if (value < today) {
                setFormData((previous) => ({
                    ...previous,

                    bookingDate: "",
                    bookingTime: "",
                }));

                setAvailableTimes([]);

                setError(
                    "You cannot select a date that has already passed. Please choose today or a future date."
                );

                return;
            }

            // ------------------------------------------
            // ACCEPT TODAY OR FUTURE DATE
            // ------------------------------------------

            setFormData((previous) => ({
                ...previous,

                bookingDate: value,
                bookingTime: "",
            }));

            fetchAvailableTimes(
                formData.serviceId,
                value
            );

            return;
        }

        // ==========================================
        // OTHER FIELDS
        // ==========================================

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // ==========================================
    // SELECTED SERVICE
    // ==========================================

    const selectedService =
        services.find(
            (service) =>
                Number(service.id) ===
                Number(formData.serviceId)
        );

    // ==========================================
    // HANDLE BOOKING SUBMISSION
    // ==========================================

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSubmitting(true);
        setMessage("");
        setError("");

        try {
            // ==========================================
            // CUSTOMER DETAILS VALIDATION
            // ==========================================

            if (!formData.customerName.trim()) {
                throw new Error(
                    "Please enter your full name."
                );
            }

            if (!formData.phone.trim()) {
                throw new Error(
                    "Please enter your phone number."
                );
            }

            if (!formData.email.trim()) {
                throw new Error(
                    "Please enter your email address."
                );
            }

            // ==========================================
            // SERVICE VALIDATION
            // ==========================================

            if (!formData.serviceId) {
                throw new Error(
                    "Please select a service."
                );
            }

            // ==========================================
            // DATE VALIDATION
            // ==========================================

            if (!formData.bookingDate) {
                throw new Error(
                    "Please select an appointment date."
                );
            }

            const today = getTodayDate();

            if (formData.bookingDate < today) {
                throw new Error(
                    "You cannot book a date that has already passed. Please choose today or a future date."
                );
            }

            // ==========================================
            // TIME VALIDATION
            // ==========================================

            if (!formData.bookingTime) {
                throw new Error(
                    "Please select an appointment time."
                );
            }

            if (
                !availableTimes.includes(
                    formData.bookingTime
                )
            ) {
                throw new Error(
                    "Please select an available appointment time."
                );
            }

            // ==========================================
            // SUBMIT BOOKING
            // ==========================================

            const response = await fetch(
                `${API_URL}/bookings`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        customerName:
                            formData.customerName.trim(),

                        phone:
                            formData.phone.trim(),

                        email:
                            formData.email.trim(),

                        serviceId:
                            Number(
                                formData.serviceId
                            ),

                        bookingDate:
                            formData.bookingDate,

                        bookingTime:
                            formData.bookingTime,
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    data.message ||
                    "Unable to create booking"
                );
            }

            // ==========================================
            // SAVE BOOKING CONFIRMATION
            // ==========================================

            setBookingConfirmation({
                id: data.id,

                customerName:
                    formData.customerName,

                phone:
                    formData.phone,

                email:
                    formData.email,

                service:
                    selectedService,

                bookingDate:
                    formData.bookingDate,

                bookingTime:
                    formData.bookingTime,

                status:
                    data.status ||
                    "PENDING",
            });

            setMessage(
                "Your booking has been submitted successfully!"
            );

            // ==========================================
            // RESET BOOKING SELECTIONS
            //
            // CUSTOMER INFORMATION STAYS FILLED
            // ==========================================

            setFormData((previous) => ({
                ...previous,

                serviceId: "",
                bookingDate: "",
                bookingTime: "",
            }));

            setAvailableTimes([]);
        } catch (err) {
            setError(
                err.message ||
                "Unable to create booking."
            );
        } finally {
            setSubmitting(false);
        }
    };

    // ==========================================
    // FORMAT TIME
    // ==========================================

    const formatTime = (time) => {
        if (!time) return "";

        const [hours, minutes] =
            time.split(":");

        const hour = Number(hours);

        const period =
            hour >= 12
                ? "PM"
                : "AM";

        const displayHour =
            hour % 12 === 0
                ? 12
                : hour % 12;

        return `${displayHour}:${minutes} ${period}`;
    };

    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {
        if (!date) return "";

        const dateObject =
            new Date(
                `${date}T00:00:00`
            );

        return dateObject.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }
        );
    };

    // ==========================================
    // OPEN WHATSAPP WITH BOOKING DETAILS
    // ==========================================

    const openWhatsApp = () => {
        if (!bookingConfirmation) {
            return;
        }

        const whatsappNumber =
            "255651829411";

        const serviceName =
            bookingConfirmation.service?.name ||
            "Beauty Service";

        const price = Number(
            bookingConfirmation.service?.price ||
            0
        ).toLocaleString();

        const duration =
            bookingConfirmation.service
                ?.durationMinutes ||
            "";

        const message = `
Hello Empress Beauty! 👋

I have just submitted an appointment request through the website.

📋 BOOKING DETAILS

🔖 Booking Reference: #${bookingConfirmation.id}

👤 Name: ${bookingConfirmation.customerName}

📞 Phone: ${bookingConfirmation.phone}

💇 Service: ${serviceName}

📅 Date: ${formatDate(
            bookingConfirmation.bookingDate
        )}

🕐 Time: ${formatTime(
            bookingConfirmation.bookingTime
        )}

⏱️ Duration: ${duration} minutes

💰 Price: TZS ${price}

Status: PENDING CONFIRMATION

Please confirm my appointment. Thank you! 💕
`;

        const whatsappUrl =
            `https://wa.me/${whatsappNumber}?text=` +
            encodeURIComponent(
                message.trim()
            );

        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );
    };

    // ==========================================
    // BOOK ANOTHER APPOINTMENT
    // ==========================================

    const handleBookAnother = () => {
        setBookingConfirmation(null);

        setMessage("");

        setError("");

        setAvailableTimes([]);

        const savedCustomer =
            sessionStorage.getItem(
                "customer"
            );

        if (savedCustomer) {
            try {
                const customer =
                    JSON.parse(
                        savedCustomer
                    );

                setFormData({
                    customerName:
                        customer.fullName ||
                        "",

                    phone:
                        customer.phone ||
                        "",

                    email:
                        customer.email ||
                        "",

                    serviceId: "",
                    bookingDate: "",
                    bookingTime: "",
                });
            } catch {
                setFormData({
                    customerName: "",
                    phone: "",
                    email: "",
                    serviceId: "",
                    bookingDate: "",
                    bookingTime: "",
                });
            }
        } else {
            setFormData({
                customerName: "",
                phone: "",
                email: "",
                serviceId: "",
                bookingDate: "",
                bookingTime: "",
            });
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // ==========================================
    // BOOKING CONFIRMATION
    // ==========================================

    if (bookingConfirmation) {
        return (
            <div style={styles.page}>

                <section
                    style={
                        styles.confirmationHero
                    }
                >
                    <div
                        style={
                            styles.confirmationHeroContent
                        }
                    >
                        <div
                            style={
                                styles.successCircle
                            }
                        >
                            ✓
                        </div>

                        <p
                            style={
                                styles.eyebrow
                            }
                        >
                            EMPRESS BEAUTY
                        </p>

                        <h1
                            style={
                                styles.confirmationTitle
                            }
                        >
                            Appointment Submitted
                        </h1>

                        <p
                            style={
                                styles.confirmationHeroText
                            }
                        >
                            Thank you,{" "}
                            <strong>
                                {
                                    bookingConfirmation.customerName
                                }
                            </strong>
                            . Your appointment request
                            has been received successfully.
                        </p>
                    </div>
                </section>

                <section
                    style={
                        styles.confirmationSection
                    }
                >
                    <div
                        style={
                            styles.confirmationContainer
                        }
                    >
                        <div
                            style={
                                styles.confirmationCard
                            }
                        >

                            <div
                                style={
                                    styles.confirmationHeader
                                }
                            >
                                <div>

                                    <p
                                        style={
                                            styles.smallHeading
                                        }
                                    >
                                        BOOKING REFERENCE
                                    </p>

                                    <h2
                                        style={
                                            styles.reference
                                        }
                                    >
                                        #
                                        {
                                            bookingConfirmation.id
                                        }
                                    </h2>

                                </div>

                                <div
                                    style={
                                        styles.pendingBadge
                                    }
                                >
                                    PENDING CONFIRMATION
                                </div>
                            </div>

                            <div
                                style={
                                    styles.confirmationDivider
                                }
                            />

                            <h3
                                style={
                                    styles.detailsTitle
                                }
                            >
                                Appointment Details
                            </h3>

                            <div
                                style={
                                    styles.detailsGrid
                                }
                            >

                                <div
                                    style={
                                        styles.detailItem
                                    }
                                >
                                    <span
                                        style={
                                            styles.detailLabel
                                        }
                                    >
                                        SERVICE
                                    </span>

                                    <strong
                                        style={
                                            styles.detailValue
                                        }
                                    >
                                        {
                                            bookingConfirmation
                                                .service
                                                ?.name
                                        }
                                    </strong>
                                </div>

                                <div
                                    style={
                                        styles.detailItem
                                    }
                                >
                                    <span
                                        style={
                                            styles.detailLabel
                                        }
                                    >
                                        DATE
                                    </span>

                                    <strong
                                        style={
                                            styles.detailValue
                                        }
                                    >
                                        {formatDate(
                                            bookingConfirmation.bookingDate
                                        )}
                                    </strong>
                                </div>

                                <div
                                    style={
                                        styles.detailItem
                                    }
                                >
                                    <span
                                        style={
                                            styles.detailLabel
                                        }
                                    >
                                        TIME
                                    </span>

                                    <strong
                                        style={
                                            styles.detailValue
                                        }
                                    >
                                        {formatTime(
                                            bookingConfirmation.bookingTime
                                        )}
                                    </strong>
                                </div>

                                <div
                                    style={
                                        styles.detailItem
                                    }
                                >
                                    <span
                                        style={
                                            styles.detailLabel
                                        }
                                    >
                                        DURATION
                                    </span>

                                    <strong
                                        style={
                                            styles.detailValue
                                        }
                                    >
                                        {
                                            bookingConfirmation
                                                .service
                                                ?.durationMinutes
                                        }{" "}
                                        minutes
                                    </strong>
                                </div>

                                <div
                                    style={
                                        styles.detailItem
                                    }
                                >
                                    <span
                                        style={
                                            styles.detailLabel
                                        }
                                    >
                                        PRICE
                                    </span>

                                    <strong
                                        style={
                                            styles.detailValue
                                        }
                                    >
                                        TZS{" "}
                                        {Number(
                                            bookingConfirmation
                                                .service
                                                ?.price ||
                                            0
                                        ).toLocaleString()}
                                    </strong>
                                </div>

                                <div
                                    style={
                                        styles.detailItem
                                    }
                                >
                                    <span
                                        style={
                                            styles.detailLabel
                                        }
                                    >
                                        CUSTOMER
                                    </span>

                                    <strong
                                        style={
                                            styles.detailValue
                                        }
                                    >
                                        {
                                            bookingConfirmation.customerName
                                        }
                                    </strong>
                                </div>

                            </div>

                            <div
                                style={
                                    styles.confirmationNotice
                                }
                            >
                                <div
                                    style={
                                        styles.noticeIcon
                                    }
                                >
                                    !
                                </div>

                                <div>

                                    <strong>
                                        Your appointment is
                                        pending confirmation.
                                    </strong>

                                    <p>
                                        Our Empress Beauty
                                        team will review your
                                        request and contact
                                        you using the phone
                                        number or email you
                                        provided.
                                    </p>

                                </div>
                            </div>

                            <div
                                style={
                                    styles.contactBox
                                }
                            >

                                <h3>
                                    Need help?
                                </h3>

                                <p>
                                    Contact Empress Beauty:
                                </p>

                                <div
                                    style={
                                        styles.contactDetails
                                    }
                                >
                                    <span>
                                        📞 +255 741 309 031
                                    </span>

                                    <span>
                                        📞 +255 651 829 411
                                    </span>

                                    <span>
                                        ✉ empress.beauty@gmail.com
                                    </span>

                                    <span>
                                        📍 Masaki, Dar es Salaam,
                                        Tanzania
                                    </span>
                                </div>

                            </div>

                            {/* ==================================
                                CONFIRMATION BUTTONS
                            ================================== */}

                            <div
                                style={
                                    styles.confirmationButtons
                                }
                            >

                                <button
                                    type="button"
                                    onClick={
                                        openWhatsApp
                                    }
                                    style={
                                        styles.whatsappButton
                                    }
                                >
                                    💬 Send Booking to WhatsApp
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        handleBookAnother
                                    }
                                    style={
                                        styles.anotherButton
                                    }
                                >
                                    Book Another Appointment
                                </button>

                            </div>

                        </div>
                    </div>
                </section>

            </div>
        );
    }

    // ==========================================
    // MAIN BOOKING PAGE
    // ==========================================

    return (
        <div style={styles.page}>

            {/* ==================================
                HERO
            ================================== */}

            <section style={styles.hero}>

                <div style={styles.heroContent}>

                    <p style={styles.eyebrow}>
                        EMPRESS BEAUTY
                    </p>

                    <h1 style={styles.heroTitle}>
                        Book Your Appointment
                    </h1>

                    <p style={styles.heroText}>
                        Choose your preferred beauty
                        service, date and available
                        appointment time. We'll take
                        care of the rest.
                    </p>

                </div>

            </section>

            {/* ==================================
                BOOKING AREA
            ================================== */}

            <section
                style={
                    styles.bookingSection
                }
            >

                <div
                    style={
                        styles.container
                    }
                >

                    <div
                        style={
                            styles.bookingGrid
                        }
                    >

                        {/* ==================================
                            INFORMATION
                        ================================== */}

                        <div style={styles.info}>

                            <p
                                style={
                                    styles.smallHeading
                                }
                            >
                                YOUR BEAUTY EXPERIENCE
                            </p>

                            <h2
                                style={
                                    styles.heading
                                }
                            >
                                Let's make you feel beautiful.
                            </h2>

                            <p
                                style={
                                    styles.paragraph
                                }
                            >
                                At Empress Beauty, every
                                appointment is designed
                                around you. Select your
                                preferred service, date and
                                an available appointment time.
                            </p>

                            <div
                                style={
                                    styles.infoBox
                                }
                            >

                                <div
                                    style={
                                        styles.infoItem
                                    }
                                >
                                    <strong>
                                        Opening Hours
                                    </strong>

                                    <span>
                                        Monday – Saturday
                                        <br />
                                        8:00 AM – 8:00 PM
                                    </span>

                                    <span>
                                        Sunday
                                        <br />
                                        9:00 AM – 6:00 PM
                                    </span>
                                </div>

                                <div
                                    style={
                                        styles.infoItem
                                    }
                                >
                                    <strong>
                                        Location
                                    </strong>

                                    <span>
                                        Masaki,
                                        <br />
                                        Dar es Salaam,
                                        Tanzania
                                    </span>
                                </div>

                                <div
                                    style={
                                        styles.infoItem
                                    }
                                >
                                    <strong>
                                        Need Help?
                                    </strong>

                                    <span>
                                        +255 741 309 031
                                    </span>

                                    <span>
                                        +255 651 829 411
                                    </span>
                                </div>

                            </div>

                        </div>

                        {/* ==================================
                            FORM
                        ================================== */}

                        <div
                            style={
                                styles.formCard
                            }
                        >

                            <h2
                                style={
                                    styles.formTitle
                                }
                            >
                                Appointment Details
                            </h2>

                            <p
                                style={
                                    styles.formSubtitle
                                }
                            >
                                Fill in your details below.
                            </p>

                            {/* ==================================
                                LOGGED-IN CUSTOMER NOTICE
                            ================================== */}

                            {sessionStorage.getItem(
                                "customerAuth"
                            ) === "true" && (
                                <div
                                    style={
                                        styles.customerNotice
                                    }
                                >
                                    ✓ Your account details
                                    have been filled in
                                    automatically.
                                </div>
                            )}

                            {message && (
                                <div
                                    style={
                                        styles.success
                                    }
                                >
                                    ✓ {message}
                                </div>
                            )}

                            {error && (
                                <div
                                    style={
                                        styles.error
                                    }
                                >
                                    {error}
                                </div>
                            )}

                            <form
                                onSubmit={
                                    handleSubmit
                                }
                            >

                                {/* ==================================
                                    NAME
                                ================================== */}

                                <div
                                    style={
                                        styles.formGroup
                                    }
                                >

                                    <label
                                        style={
                                            styles.label
                                        }
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="customerName"
                                        value={
                                            formData.customerName
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter your full name"
                                        required
                                        style={
                                            styles.input
                                        }
                                    />

                                </div>

                                {/* ==================================
                                    PHONE
                                ================================== */}

                                <div
                                    style={
                                        styles.formGroup
                                    }
                                >

                                    <label
                                        style={
                                            styles.label
                                        }
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={
                                            formData.phone
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="+255..."
                                        required
                                        style={
                                            styles.input
                                        }
                                    />

                                </div>

                                {/* ==================================
                                    EMAIL
                                ================================== */}

                                <div
                                    style={
                                        styles.formGroup
                                    }
                                >

                                    <label
                                        style={
                                            styles.label
                                        }
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={
                                            formData.email
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="you@example.com"
                                        required
                                        style={
                                            styles.input
                                        }
                                    />

                                </div>

                                {/* ==================================
                                    SERVICE
                                ================================== */}

                                <div
                                    style={
                                        styles.formGroup
                                    }
                                >

                                    <label
                                        style={
                                            styles.label
                                        }
                                    >
                                        Select Service
                                    </label>

                                    {loadingServices ? (

                                        <div
                                            style={
                                                styles.loading
                                            }
                                        >
                                            Loading services...
                                        </div>

                                    ) : services.length === 0 ? (

                                        <div
                                            style={
                                                styles.noServices
                                            }
                                        >
                                            No services are
                                            currently available.
                                        </div>

                                    ) : (

                                        <select
                                            name="serviceId"
                                            value={
                                                formData.serviceId
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                            style={
                                                styles.input
                                            }
                                        >

                                            <option value="">
                                                Choose a service
                                            </option>

                                            {services.map(
                                                (service) => (

                                                    <option
                                                        key={
                                                            service.id
                                                        }
                                                        value={
                                                            service.id
                                                        }
                                                    >
                                                        {
                                                            service.name
                                                        }
                                                        {" — "}
                                                        TZS{" "}
                                                        {Number(
                                                            service.price
                                                        ).toLocaleString()}
                                                    </option>

                                                )
                                            )}

                                        </select>

                                    )}

                                </div>

                                {/* ==================================
                                    SELECTED SERVICE
                                ================================== */}

                                {selectedService && (
                                    <div
                                        style={
                                            styles.selectedService
                                        }
                                    >

                                        <strong>
                                            {
                                                selectedService.name
                                            }
                                        </strong>

                                        <span>
                                            {
                                                selectedService.description
                                            }
                                        </span>

                                        <span>
                                            TZS{" "}
                                            {Number(
                                                selectedService.price
                                            ).toLocaleString()}
                                            {" • "}
                                            {
                                                selectedService.durationMinutes
                                            }
                                            {" minutes"}
                                        </span>

                                    </div>
                                )}

                                {/* ==================================
                                    DATE
                                ================================== */}

                                <div
                                    style={
                                        styles.formGroup
                                    }
                                >

                                    <label
                                        style={
                                            styles.label
                                        }
                                    >
                                        Appointment Date
                                    </label>

                                    <input
                                        type="date"
                                        name="bookingDate"
                                        value={
                                            formData.bookingDate
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        min={getTodayDate()}
                                        required
                                        style={
                                            styles.input
                                        }
                                        disabled={
                                            !formData.serviceId
                                        }
                                    />

                                    {!formData.serviceId && (
                                        <p
                                            style={
                                                styles.helperText
                                            }
                                        >
                                            Please select a
                                            service first.
                                        </p>
                                    )}

                                    {formData.serviceId && (
                                        <p
                                            style={
                                                styles.helperText
                                            }
                                        >
                                            You can book today
                                            or any future date.
                                        </p>
                                    )}

                                </div>

                                {/* ==================================
                                    AVAILABLE TIME
                                ================================== */}

                                <div
                                    style={
                                        styles.formGroup
                                    }
                                >

                                    <label
                                        style={
                                            styles.label
                                        }
                                    >
                                        Available Appointment Time
                                    </label>

                                    {!formData.bookingDate ? (

                                        <div
                                            style={
                                                styles.timeMessage
                                            }
                                        >
                                            Select an appointment
                                            date to see available
                                            times.
                                        </div>

                                    ) : loadingTimes ? (

                                        <div
                                            style={
                                                styles.loading
                                            }
                                        >
                                            Checking available
                                            appointment times...
                                        </div>

                                    ) : availableTimes.length ===
                                      0 ? (

                                        <div
                                            style={
                                                styles.noTimes
                                            }
                                        >
                                            No appointment times
                                            are available for
                                            this date.
                                            <br />
                                            Please choose another
                                            date.
                                        </div>

                                    ) : (

                                        <div
                                            style={
                                                styles.timeGrid
                                            }
                                        >

                                            {availableTimes.map(
                                                (time) => {

                                                    const isSelected =
                                                        formData.bookingTime ===
                                                        time;

                                                    return (
                                                        <button
                                                            type="button"
                                                            key={
                                                                time
                                                            }
                                                            onClick={() => {

                                                                setFormData(
                                                                    (
                                                                        previous
                                                                    ) => ({
                                                                        ...previous,
                                                                        bookingTime:
                                                                            time,
                                                                    })
                                                                );

                                                                setMessage(
                                                                    ""
                                                                );

                                                                setError(
                                                                    ""
                                                                );

                                                            }}
                                                            style={{
                                                                ...styles.timeButton,

                                                                ...(isSelected
                                                                    ? styles.selectedTimeButton
                                                                    : {}),
                                                            }}
                                                        >
                                                            {formatTime(
                                                                time
                                                            )}
                                                        </button>
                                                    );
                                                }
                                            )}

                                        </div>

                                    )}

                                </div>

                                {/* ==================================
                                    SELECTED TIME
                                ================================== */}

                                {formData.bookingTime && (
                                    <div
                                        style={
                                            styles.selectedTime
                                        }
                                    >
                                        ✓ Appointment time selected:
                                        <strong>
                                            {" "}
                                            {formatTime(
                                                formData.bookingTime
                                            )}
                                        </strong>
                                    </div>
                                )}

                                {/* ==================================
                                    SUBMIT
                                ================================== */}

                                <button
                                    type="submit"
                                    disabled={
                                        submitting ||
                                        loadingServices ||
                                        loadingTimes ||
                                        services.length === 0 ||
                                        !formData.serviceId ||
                                        !formData.bookingDate ||
                                        !formData.bookingTime ||
                                        availableTimes.length === 0
                                    }
                                    style={{
                                        ...styles.submitButton,

                                        opacity:
                                            submitting ||
                                            loadingServices ||
                                            loadingTimes ||
                                            services.length === 0 ||
                                            !formData.serviceId ||
                                            !formData.bookingDate ||
                                            !formData.bookingTime ||
                                            availableTimes.length === 0
                                                ? 0.6
                                                : 1,
                                    }}
                                >

                                    {submitting
                                        ? "Submitting..."
                                        : "Book Appointment"}

                                </button>

                                <p
                                    style={
                                        styles.notice
                                    }
                                >
                                    Your appointment will
                                    initially be marked as
                                    pending. Our team will
                                    confirm your booking.
                                </p>

                            </form>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

// ==================================================
// STYLES
// ==================================================

const styles = {

    page: {
        background: "#faf8f6",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        color: "#333",
    },

    hero: {
        background: "#333",
        color: "#fff",
        padding: "90px 20px",
        textAlign: "center",
    },

    heroContent: {
        maxWidth: "750px",
        margin: "0 auto",
    },

    eyebrow: {
        fontSize: "12px",
        letterSpacing: "3px",
        marginBottom: "15px",
        opacity: 0.75,
    },

    heroTitle: {
        fontSize: "46px",
        margin: "0 0 18px",
        fontWeight: "600",
    },

    heroText: {
        fontSize: "17px",
        lineHeight: "1.7",
        maxWidth: "600px",
        margin: "0 auto",
        opacity: 0.85,
    },

    bookingSection: {
        padding: "70px 20px",
    },

    container: {
        maxWidth: "1150px",
        margin: "0 auto",
    },

    bookingGrid: {
        display: "grid",
        gridTemplateColumns:
            "minmax(300px, 0.8fr) minmax(400px, 1.2fr)",
        gap: "55px",
        alignItems: "start",
    },

    info: {
        paddingTop: "20px",
    },

    smallHeading: {
        fontSize: "12px",
        letterSpacing: "2px",
        color: "#999",
        fontWeight: "bold",
    },

    heading: {
        fontSize: "36px",
        lineHeight: "1.2",
        margin: "15px 0 20px",
        fontWeight: "500",
    },

    paragraph: {
        color: "#777",
        lineHeight: "1.8",
        fontSize: "15px",
    },

    infoBox: {
        marginTop: "35px",
        display: "flex",
        flexDirection: "column",
        gap: "22px",
    },

    infoItem: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        borderBottom:
            "1px solid #e8e1dc",
        paddingBottom: "20px",
    },

    formCard: {
        background: "#fff",
        padding: "38px",
        borderRadius: "16px",
        boxShadow:
            "0 10px 35px rgba(0, 0, 0, 0.07)",
        border:
            "1px solid #eee7e2",
    },

    formTitle: {
        margin: 0,
        fontSize: "25px",
    },

    formSubtitle: {
        margin: "7px 0 25px",
        color: "#999",
        fontSize: "14px",
    },

    customerNotice: {
        background: "#f8eef2",
        border:
            "1px solid #ead3dc",
        color: "#8d5365",
        padding: "12px 14px",
        borderRadius: "8px",
        marginBottom: "20px",
        fontSize: "13px",
        lineHeight: "1.5",
    },

    formGroup: {
        marginBottom: "18px",
    },

    label: {
        display: "block",
        marginBottom: "7px",
        fontSize: "13px",
        fontWeight: "bold",
        color: "#555",
    },

    input: {
        width: "100%",
        boxSizing: "border-box",
        padding: "13px",
        border:
            "1px solid #ddd5cf",
        borderRadius: "8px",
        background: "#fff",
        fontSize: "14px",
        outline: "none",
    },

    helperText: {
        margin: "7px 0 0",
        color: "#999",
        fontSize: "12px",
    },

    loading: {
        padding: "13px",
        background: "#f8f5f2",
        borderRadius: "8px",
        color: "#888",
        fontSize: "14px",
    },

    noServices: {
        padding: "13px",
        background: "#fff0f0",
        borderRadius: "8px",
        color: "#a33",
        fontSize: "14px",
    },

    selectedService: {
        background: "#f7f3ef",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        fontSize: "13px",
    },

    timeMessage: {
        padding: "14px",
        background: "#f8f5f2",
        borderRadius: "8px",
        color: "#888",
        fontSize: "13px",
        lineHeight: "1.5",
    },

    noTimes: {
        padding: "14px",
        background: "#fff0f0",
        borderRadius: "8px",
        color: "#a00000",
        fontSize: "13px",
        lineHeight: "1.6",
    },

    timeGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(100px, 1fr))",
        gap: "10px",
    },

    timeButton: {
        padding: "11px 8px",
        border:
            "1px solid #ddd5cf",
        borderRadius: "8px",
        background: "#fff",
        color: "#444",
        fontSize: "13px",
        cursor: "pointer",
        transition: "all 0.2s ease",
    },

    selectedTimeButton: {
        background: "#333",
        color: "#fff",
        border:
            "1px solid #333",
        fontWeight: "bold",
    },

    selectedTime: {
        background: "#e5f6eb",
        color: "#26733d",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "18px",
        fontSize: "13px",
    },

    success: {
        background: "#e5f6eb",
        color: "#26733d",
        padding: "13px",
        borderRadius: "8px",
        marginBottom: "20px",
        fontSize: "13px",
        lineHeight: "1.5",
    },

    error: {
        background: "#ffe5e5",
        color: "#a00000",
        padding: "13px",
        borderRadius: "8px",
        marginBottom: "20px",
        fontSize: "13px",
        lineHeight: "1.5",
    },

    submitButton: {
        width: "100%",
        padding: "14px",
        border: "none",
        borderRadius: "8px",
        background: "#333",
        color: "#fff",
        fontSize: "15px",
        fontWeight: "bold",
        cursor: "pointer",
        marginTop: "5px",
    },

    notice: {
        textAlign: "center",
        color: "#999",
        fontSize: "11px",
        lineHeight: "1.5",
        marginTop: "15px",
    },

    // ==========================================
    // CONFIRMATION STYLES
    // ==========================================

    confirmationHero: {
        background: "#333",
        color: "#fff",
        padding: "75px 20px 85px",
        textAlign: "center",
    },

    confirmationHeroContent: {
        maxWidth: "750px",
        margin: "0 auto",
    },

    successCircle: {
        width: "72px",
        height: "72px",
        borderRadius: "50%",
        background: "#e5f6eb",
        color: "#26733d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "38px",
        fontWeight: "bold",
        margin: "0 auto 25px",
    },

    confirmationTitle: {
        fontSize: "42px",
        margin: "10px 0 18px",
        fontWeight: "600",
    },

    confirmationHeroText: {
        fontSize: "16px",
        lineHeight: "1.7",
        maxWidth: "650px",
        margin: "0 auto",
        opacity: 0.88,
    },

    confirmationSection: {
        padding: "60px 20px 80px",
    },

    confirmationContainer: {
        maxWidth: "850px",
        margin: "0 auto",
    },

    confirmationCard: {
        background: "#fff",
        borderRadius: "18px",
        padding: "40px",
        boxShadow:
            "0 12px 40px rgba(0, 0, 0, 0.08)",
        border:
            "1px solid #eee7e2",
    },

    confirmationHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
    },

    reference: {
        margin: "5px 0 0",
        fontSize: "28px",
        fontWeight: "600",
    },

    pendingBadge: {
        background: "#fff4d6",
        color: "#856404",
        padding: "9px 14px",
        borderRadius: "30px",
        fontSize: "11px",
        fontWeight: "bold",
        letterSpacing: "0.5px",
    },

    confirmationDivider: {
        height: "1px",
        background: "#eee7e2",
        margin: "30px 0",
    },

    detailsTitle: {
        fontSize: "20px",
        margin: "0 0 20px",
    },

    detailsGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
        gap: "20px",
    },

    detailItem: {
        background: "#f8f5f2",
        borderRadius: "10px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "7px",
    },

    detailLabel: {
        fontSize: "10px",
        letterSpacing: "1.5px",
        color: "#999",
        fontWeight: "bold",
    },

    detailValue: {
        fontSize: "14px",
        lineHeight: "1.5",
    },

    confirmationNotice: {
        marginTop: "28px",
        padding: "18px",
        background: "#f7f3ef",
        borderRadius: "12px",
        display: "flex",
        gap: "15px",
        alignItems: "flex-start",
    },

    noticeIcon: {
        minWidth: "28px",
        height: "28px",
        borderRadius: "50%",
        background: "#333",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "14px",
    },

    contactBox: {
        marginTop: "25px",
        padding: "22px",
        border:
            "1px solid #eee7e2",
        borderRadius: "12px",
    },

    contactDetails: {
        display: "flex",
        flexDirection: "column",
        gap: "9px",
        color: "#666",
        fontSize: "13px",
        marginTop: "12px",
    },

    // ==========================================
    // WHATSAPP + OTHER CONFIRMATION BUTTONS
    // ==========================================

    confirmationButtons: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "25px",
    },

    whatsappButton: {
        width: "100%",
        padding: "14px",
        border: "none",
        borderRadius: "8px",
        background: "#25D366",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "bold",
        cursor: "pointer",
    },

    anotherButton: {
        width: "100%",
        padding: "14px",
        border: "none",
        borderRadius: "8px",
        background: "#333",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "bold",
        cursor: "pointer",
    },
};

export default Booking;