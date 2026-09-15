
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeaveReview from "../components/LeaveReview";

const API_URL = "http://localhost:8080/api";

function Account() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [bookings, setBookings] = useState([]);

  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [servicesLoading, setServicesLoading] = useState(true);

  const [error, setError] = useState("");
  const [cancelMessage, setCancelMessage] = useState("");

  const [cancellingId, setCancellingId] = useState(null);

  // ==========================================
  // RESCHEDULE STATES
  // ==========================================

  const [reschedulingId, setReschedulingId] =
    useState(null);

  const [rescheduleServiceId, setRescheduleServiceId] =
    useState("");

  const [rescheduleDate, setRescheduleDate] =
    useState("");

  const [rescheduleTime, setRescheduleTime] =
    useState("");

  const [availableTimes, setAvailableTimes] =
    useState([]);

  const [timesLoading, setTimesLoading] =
    useState(false);

  const [rescheduleLoading, setRescheduleLoading] =
    useState(false);

  const [rescheduleError, setRescheduleError] =
    useState("");

  const [rescheduleMessage, setRescheduleMessage] =
    useState("");

  // ==========================================
  // LOAD CUSTOMER
  // ==========================================

  useEffect(() => {
    const auth =
      sessionStorage.getItem("customerAuth");

    const savedCustomer =
      sessionStorage.getItem("customer");

    if (
      auth !== "true" ||
      !savedCustomer
    ) {
      navigate("/login");
      return;
    }

    try {
      const parsedCustomer =
        JSON.parse(savedCustomer);

      setCustomer(parsedCustomer);

      fetchBookings(parsedCustomer);
      fetchServices();

    } catch (err) {
      console.error(
        "Error reading customer information:",
        err
      );

      sessionStorage.removeItem(
        "customerAuth"
      );

      sessionStorage.removeItem(
        "customer"
      );

      navigate("/login");
    }
  }, [navigate]);

  // ==========================================
  // FETCH CUSTOMER BOOKINGS
  // ==========================================

  const fetchBookings = async (
    customerData
  ) => {
    try {
      setLoading(true);
      setError("");

      if (
        !customerData ||
        !customerData.email
      ) {
        setBookings([]);
        setLoading(false);
        return;
      }

      const email =
        encodeURIComponent(
          customerData.email.trim()
        );

      const response =
        await fetch(
          `${API_URL}/bookings/customer?email=${email}`
        );

      if (!response.ok) {
        throw new Error(
          "Failed to load customer bookings."
        );
      }

      const data =
        await response.json();

      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        setBookings([]);
      }

    } catch (err) {

      console.error(
        "Error fetching customer bookings:",
        err
      );

      setError(
        "We could not load your bookings right now. Please try again."
      );

    } finally {

      setLoading(false);
    }
  };

  // ==========================================
  // FETCH SERVICES
  // ==========================================

  const fetchServices = async () => {
    try {

      setServicesLoading(true);

      const response =
        await fetch(
          `${API_URL}/services`
        );

      if (!response.ok) {
        throw new Error(
          "Failed to load services."
        );
      }

      const data =
        await response.json();

      if (Array.isArray(data)) {

        setServices(
          data.filter(
            (service) =>
              service.available === true
          )
        );

      } else {

        setServices([]);

      }

    } catch (err) {

      console.error(
        "Error fetching services:",
        err
      );

    } finally {

      setServicesLoading(false);
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {

    if (!date) {
      return "—";
    }

    try {

      return new Date(
        `${date}T00:00:00`
      ).toLocaleDateString(
        "en-TZ",
        {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      );

    } catch {

      return date;
    }
  };

  // ==========================================
  // FORMAT TIME
  // ==========================================

  const formatTime = (time) => {

    if (!time) {
      return "—";
    }

    try {

      const [
        hours,
        minutes
      ] = time.split(":");

      const date =
        new Date();

      date.setHours(
        Number(hours),
        Number(minutes),
        0,
        0
      );

      return date.toLocaleTimeString(
        "en-TZ",
        {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }
      );

    } catch {

      return time;
    }
  };

  // ==========================================
  // GET SERVICE NAME
  // ==========================================

  const getServiceName = (
    booking
  ) => {

    if (booking.serviceName) {
      return booking.serviceName;
    }

    if (
      booking.service &&
      booking.service.name
    ) {
      return booking.service.name;
    }

    const service =
      services.find(
        (item) =>
          Number(item.id) ===
          Number(
            booking.serviceId
          )
      );

    if (service) {
      return service.name;
    }

    return `Service #${
      booking.serviceId || "—"
    }`;
  };

  // ==========================================
  // GET SERVICE PRICE
  // ==========================================

  const getServicePrice = (
    booking
  ) => {

    if (
      booking.price !==
        undefined &&
      booking.price !== null
    ) {
      return booking.price;
    }

    if (
      booking.service &&
      booking.service.price !==
        undefined &&
      booking.service.price !==
        null
    ) {
      return booking.service.price;
    }

    const service =
      services.find(
        (item) =>
          Number(item.id) ===
          Number(
            booking.serviceId
          )
      );

    if (service) {
      return service.price;
    }

    return null;
  };

  // ==========================================
  // FORMAT PRICE
  // ==========================================

  const formatPrice = (
    price
  ) => {

    if (
      price === null ||
      price === undefined
    ) {
      return "Price unavailable";
    }

    return `TZS ${Number(
      price
    ).toLocaleString("en-TZ")}`;
  };

  // ==========================================
  // STATUS STYLE
  // ==========================================

  const getStatusStyle = (
    status
  ) => {

    const normalizedStatus =
      (
        status ||
        "PENDING"
      ).toUpperCase();

    if (
      normalizedStatus ===
      "CONFIRMED"
    ) {

      return {
        background: "#e8f7ed",
        color: "#218739",
      };
    }

    if (
      normalizedStatus ===
      "CANCELLED"
    ) {

      return {
        background: "#fdecec",
        color: "#c62828",
      };
    }

    return {
      background: "#fff5df",
      color: "#a66a00",
    };
  };

  // ==========================================
  // GET MINIMUM DATE
  // ==========================================

  const getTodayDate = () => {

    const today =
      new Date();

    const year =
      today.getFullYear();

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        today.getDate()
      ).padStart(2, "0");

    return `${year}-${month}-${day}`;
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

    try {

      setTimesLoading(true);
      setRescheduleError("");
      setRescheduleTime("");

      const response =
        await fetch(
          `${API_URL}/bookings/available-times?serviceId=${serviceId}&date=${date}`
        );

      if (!response.ok) {

        throw new Error(
          "Could not load available times."
        );
      }

      const data =
        await response.json();

      if (
        Array.isArray(data.slots)
      ) {

        setAvailableTimes(
          data.slots
        );

      } else {

        setAvailableTimes([]);
      }

    } catch (err) {

      console.error(
        "Error fetching available times:",
        err
      );

      setAvailableTimes([]);

      setRescheduleError(
        "We could not load available times. Please try again."
      );

    } finally {

      setTimesLoading(false);
    }
  };

  // ==========================================
  // START RESCHEDULING
  // ==========================================

  const handleStartReschedule = (
    booking
  ) => {

    const status =
      (
        booking.status ||
        "PENDING"
      ).toUpperCase();

    if (
      status !== "PENDING" &&
      status !== "CONFIRMED"
    ) {

      alert(
        "This booking cannot be rescheduled."
      );

      return;
    }

    setReschedulingId(
      booking.id
    );

    setRescheduleServiceId(
      String(
        booking.serviceId || ""
      )
    );

    setRescheduleDate(
      booking.bookingDate || ""
    );

    setRescheduleTime(
      ""
    );

    setAvailableTimes([]);

    setRescheduleError("");

    setRescheduleMessage("");

    if (
      booking.serviceId &&
      booking.bookingDate
    ) {

      fetchAvailableTimes(
        booking.serviceId,
        booking.bookingDate
      );
    }

    setTimeout(() => {

      const element =
        document.getElementById(
          `booking-${booking.id}`
        );

      if (element) {

        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

    }, 100);
  };

  // ==========================================
  // CLOSE RESCHEDULE
  // ==========================================

  const handleCloseReschedule = () => {

    setReschedulingId(null);

    setRescheduleServiceId("");

    setRescheduleDate("");

    setRescheduleTime("");

    setAvailableTimes([]);

    setRescheduleError("");

    setRescheduleMessage("");
  };

  // ==========================================
  // SERVICE CHANGED
  // ==========================================

  const handleRescheduleServiceChange = (
    event
  ) => {

    const serviceId =
      event.target.value;

    setRescheduleServiceId(
      serviceId
    );

    setRescheduleTime("");

    setAvailableTimes([]);

    setRescheduleError("");

    if (
      serviceId &&
      rescheduleDate
    ) {

      fetchAvailableTimes(
        serviceId,
        rescheduleDate
      );
    }
  };

  // ==========================================
  // DATE CHANGED
  // ==========================================

  const handleRescheduleDateChange = (
    event
  ) => {

    const date =
      event.target.value;

    setRescheduleDate(date);

    setRescheduleTime("");

    setAvailableTimes([]);

    setRescheduleError("");

    if (
      rescheduleServiceId &&
      date
    ) {

      fetchAvailableTimes(
        rescheduleServiceId,
        date
      );
    }
  };

  // ==========================================
  // SAVE RESCHEDULE
  // ==========================================

  const handleSaveReschedule = async (
    booking
  ) => {

    if (!customer) {
      return;
    }

    if (!rescheduleServiceId) {

      setRescheduleError(
        "Please select a service."
      );

      return;
    }

    if (!rescheduleDate) {

      setRescheduleError(
        "Please select a date."
      );

      return;
    }

    if (!rescheduleTime) {

      setRescheduleError(
        "Please select an available time."
      );

      return;
    }

    try {

      setRescheduleLoading(true);

      setRescheduleError("");

      setRescheduleMessage("");

      const email =
        encodeURIComponent(
          customer.email.trim()
        );

      const response =
        await fetch(
          `${API_URL}/bookings/${booking.id}/customer-reschedule?email=${email}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              serviceId:
                Number(
                  rescheduleServiceId
                ),

              bookingDate:
                rescheduleDate,

              bookingTime:
                rescheduleTime,
            }),
          }
        );

      if (!response.ok) {

        let message =
          "We could not reschedule your appointment.";

        try {

          const errorData =
            await response.json();

          if (
            errorData.message
          ) {

            message =
              errorData.message;
          }

        } catch {

          // Keep default message
        }

        throw new Error(
          message
        );
      }

      const updatedBooking =
        await response.json();

      setBookings(
        (currentBookings) =>
          currentBookings.map(
            (item) =>
              item.id ===
              updatedBooking.id
                ? updatedBooking
                : item
          )
      );

      setRescheduleMessage(
        "Your appointment has been rescheduled successfully. It is now pending confirmation from Empress Beauty."
      );

      setAvailableTimes([]);

      setRescheduleTime("");

      setTimeout(() => {

        setReschedulingId(null);

        setRescheduleServiceId("");

        setRescheduleDate("");

        setRescheduleTime("");

        setRescheduleMessage("");

      }, 3500);

    } catch (err) {

      console.error(
        "Error rescheduling booking:",
        err
      );

      setRescheduleError(
        err.message ||
          "We could not reschedule your appointment. Please try again."
      );

    } finally {

      setRescheduleLoading(
        false
      );
    }
  };

  // ==========================================
  // CANCEL BOOKING
  // ==========================================

  const handleCancelBooking = async (
    booking
  ) => {

    if (
      !customer ||
      !customer.email
    ) {
      return;
    }

    const status =
      (
        booking.status ||
        "PENDING"
      ).toUpperCase();

    if (
      status === "CANCELLED"
    ) {
      return;
    }

    if (
      status !== "PENDING" &&
      status !== "CONFIRMED"
    ) {

      alert(
        "This booking cannot be cancelled."
      );

      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to cancel your appointment for ${formatDate(
          booking.bookingDate
        )} at ${formatTime(
          booking.bookingTime
        )}?`
      );

    if (!confirmed) {
      return;
    }

    try {

      setCancellingId(
        booking.id
      );

      setCancelMessage("");

      setError("");

      const email =
        encodeURIComponent(
          customer.email.trim()
        );

      const response =
        await fetch(
          `${API_URL}/bookings/${booking.id}/customer-cancel?email=${email}`,
          {
            method: "PUT",
          }
        );

      if (!response.ok) {

        let message =
          "We could not cancel this booking.";

        try {

          const errorData =
            await response.json();

          if (
            errorData.message
          ) {

            message =
              errorData.message;
          }

        } catch {

          // Keep default message
        }

        throw new Error(
          message
        );
      }

      const updatedBooking =
        await response.json();

      setBookings(
        (currentBookings) =>
          currentBookings.map(
            (item) =>
              item.id ===
              updatedBooking.id
                ? updatedBooking
                : item
          )
      );

      setCancelMessage(
        "Your appointment has been cancelled successfully."
      );

      setTimeout(() => {

        setCancelMessage("");

      }, 5000);

    } catch (err) {

      console.error(
        "Error cancelling booking:",
        err
      );

      setError(
        err.message ||
          "We could not cancel this booking. Please try again."
      );

    } finally {

      setCancellingId(
        null
      );
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    sessionStorage.removeItem(
      "customerAuth"
    );

    sessionStorage.removeItem(
      "customer"
    );

    window.dispatchEvent(
      new Event(
        "customerAuthChanged"
      )
    );

    navigate("/");
  };

  // ==========================================
  // BOOK NOW
  // ==========================================

  const handleBookNow = () => {

    navigate("/booking");
  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (!customer) {

    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
          fontFamily:
            "Arial, sans-serif",
          color: "#555",
        }}
      >
        Loading your account...
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#faf8f6",
        padding:
          "50px 20px 80px",
        fontFamily:
          "Arial, sans-serif",
      }}
    >

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >

        {/* =====================================
            PAGE HEADER
        ===================================== */}

        <div
          style={{
            marginBottom: "35px",
          }}
        >

          <p
            style={{
              margin:
                "0 0 8px",
              color: "#b88972",
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing:
                "2px",
              textTransform:
                "uppercase",
            }}
          >
            My Account
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "38px",
              color: "#2f2723",
              fontWeight: "700",
            }}
          >
            Welcome,{" "}
            {customer.fullName}
          </h1>

          <p
            style={{
              marginTop:
                "12px",
              color: "#777",
              fontSize: "16px",
            }}
          >
            Manage your Empress Beauty
            appointments and account
            details.
          </p>

        </div>

        {/* =====================================
            PERSONAL INFORMATION
        ===================================== */}

        <section
          style={{
            background:
              "#ffffff",
            borderRadius:
              "18px",
            padding: "30px",
            marginBottom:
              "35px",
            boxShadow:
              "0 5px 25px rgba(0,0,0,0.06)",
            border:
              "1px solid #eee6e1",
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              gap: "20px",
              flexWrap:
                "wrap",
              marginBottom:
                "25px",
            }}
          >

            <div>

              <h2
                style={{
                  margin: 0,
                  color: "#332b27",
                  fontSize: "24px",
                }}
              >
                Personal Information
              </h2>

              <p
                style={{
                  margin:
                    "7px 0 0",
                  color: "#888",
                  fontSize: "14px",
                }}
              >
                Your Empress Beauty
                account details
              </p>

            </div>

            <div
              style={{
                width: "55px",
                height: "55px",
                borderRadius:
                  "50%",
                background:
                  "#f3e5df",
                display: "flex",
                justifyContent:
                  "center",
                alignItems:
                  "center",
                fontSize:
                  "25px",
              }}
            >
              👤
            </div>

          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >

            {/* NAME */}

            <div
              style={{
                padding:
                  "18px",
                background:
                  "#faf7f5",
                borderRadius:
                  "12px",
              }}
            >

              <div
                style={{
                  color: "#999",
                  fontSize: "12px",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    "1px",
                  marginBottom:
                    "7px",
                }}
              >
                Full Name
              </div>

              <div
                style={{
                  color:
                    "#332b27",
                  fontWeight:
                    "600",
                  fontSize:
                    "16px",
                }}
              >
                {customer.fullName ||
                  "—"}
              </div>

            </div>

            {/* PHONE */}

            <div
              style={{
                padding:
                  "18px",
                background:
                  "#faf7f5",
                borderRadius:
                  "12px",
              }}
            >

              <div
                style={{
                  color: "#999",
                  fontSize: "12px",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    "1px",
                  marginBottom:
                    "7px",
                }}
              >
                Phone
              </div>

              <div
                style={{
                  color:
                    "#332b27",
                  fontWeight:
                    "600",
                  fontSize:
                    "16px",
                }}
              >
                {customer.phone ||
                  "—"}
              </div>

            </div>

            {/* EMAIL */}

            <div
              style={{
                padding:
                  "18px",
                background:
                  "#faf7f5",
                borderRadius:
                  "12px",
              }}
            >

              <div
                style={{
                  color: "#999",
                  fontSize: "12px",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    "1px",
                  marginBottom:
                    "7px",
                }}
              >
                Email
              </div>

              <div
                style={{
                  color:
                    "#332b27",
                  fontWeight:
                    "600",
                  fontSize:
                    "16px",
                  wordBreak:
                    "break-word",
                }}
              >
                {customer.email ||
                  "—"}
              </div>

            </div>

          </div>

        </section>

        {/* =====================================
            BOOKINGS
        ===================================== */}

        <section>

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              gap: "15px",
              flexWrap:
                "wrap",
              marginBottom:
                "20px",
            }}
          >

            <div>

              <h2
                style={{
                  margin: 0,
                  color: "#332b27",
                  fontSize: "27px",
                }}
              >
                My Bookings
              </h2>

              <p
                style={{
                  margin:
                    "7px 0 0",
                  color: "#888",
                  fontSize: "14px",
                }}
              >
                Your Empress Beauty
                appointments
              </p>

            </div>

            <button
              onClick={
                handleBookNow
              }
              style={{
                border: "none",
                background:
                  "#b88972",
                color: "#fff",
                padding:
                  "12px 22px",
                borderRadius:
                  "9px",
                cursor:
                  "pointer",
                fontWeight:
                  "600",
                fontSize:
                  "14px",
              }}
            >
              + Book New Appointment
            </button>

          </div>

          {/* ===================================
              SUCCESS MESSAGES
          =================================== */}

          {cancelMessage && (

            <div
              style={{
                background:
                  "#e8f7ed",
                color:
                  "#218739",
                border:
                  "1px solid #c7e8d0",
                borderRadius:
                  "12px",
                padding:
                  "15px 18px",
                marginBottom:
                  "20px",
                fontWeight:
                  "600",
              }}
            >
              ✓ {cancelMessage}
            </div>

          )}

          {/* ===================================
              GENERAL ERROR
          =================================== */}

          {!loading &&
            error && (

            <div
              style={{
                background:
                  "#fff",
                padding:
                  "30px",
                borderRadius:
                  "16px",
                textAlign:
                  "center",
                color:
                  "#c62828",
                border:
                  "1px solid #f0d1d1",
                marginBottom:
                  "20px",
              }}
            >

              {error}

              <br />

              <button
                onClick={() =>
                  fetchBookings(
                    customer
                  )
                }
                style={{
                  marginTop:
                    "15px",
                  border: "none",
                  background:
                    "#b88972",
                  color: "#fff",
                  padding:
                    "10px 20px",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer",
                }}
              >
                Try Again
              </button>

            </div>

          )}

          {/* ===================================
              LOADING
          =================================== */}

          {loading && (

            <div
              style={{
                background:
                  "#fff",
                padding:
                  "50px 20px",
                borderRadius:
                  "16px",
                textAlign:
                  "center",
                color:
                  "#777",
              }}
            >
              Loading your bookings...
            </div>

          )}

          {/* ===================================
              NO BOOKINGS
          =================================== */}

          {!loading &&
            !error &&
            bookings.length ===
              0 && (

            <div
              style={{
                background:
                  "#fff",
                padding:
                  "55px 25px",
                borderRadius:
                  "18px",
                textAlign:
                  "center",
                boxShadow:
                  "0 5px 20px rgba(0,0,0,0.04)",
              }}
            >

              <div
                style={{
                  fontSize:
                    "50px",
                  marginBottom:
                    "15px",
                }}
              >
                📅
              </div>

              <h3
                style={{
                  margin:
                    "0 0 10px",
                  color:
                    "#332b27",
                  fontSize:
                    "22px",
                }}
              >
                No bookings yet
              </h3>

              <p
                style={{
                  color:
                    "#888",
                  margin:
                    "0 auto 22px",
                  maxWidth:
                    "450px",
                  lineHeight:
                    "1.6",
                }}
              >
                You haven't made an
                appointment yet.
                Book your first
                Empress Beauty
                experience today.
              </p>

              <button
                onClick={
                  handleBookNow
                }
                style={{
                  border: "none",
                  background:
                    "#b88972",
                  color: "#fff",
                  padding:
                    "13px 25px",
                  borderRadius:
                    "9px",
                  cursor:
                    "pointer",
                    fontWeight:
                      "600",
                }}
              >
                Book an Appointment
              </button>

            </div>

          )}

          {/* ===================================
              BOOKING CARDS
          =================================== */}

          {!loading &&
            !error &&
            bookings.length >
              0 &&
            bookings.map(
              (booking) => {

                const status =
                  (
                    booking.status ||
                    "PENDING"
                  ).toUpperCase();

                const statusStyle =
                  getStatusStyle(
                    status
                  );

                const price =
                  getServicePrice(
                    booking
                  );

                const canCancel =
                  status ===
                    "PENDING" ||
                  status ===
                    "CONFIRMED";

                const canReschedule =
                  status ===
                    "PENDING" ||
                  status ===
                    "CONFIRMED";

                const isCancelling =
                  cancellingId ===
                  booking.id;

                const isRescheduling =
                  reschedulingId ===
                  booking.id;

                return (

                  <div
                    key={
                      booking.id
                    }
                    id={`booking-${booking.id}`}
                    style={{
                      background:
                        "#fff",
                      borderRadius:
                        "16px",
                      padding:
                        "25px",
                      marginBottom:
                        "18px",
                      boxShadow:
                        "0 5px 20px rgba(0,0,0,0.05)",
                      border:
                        "1px solid #eee7e3",
                    }}
                  >

                    {/* =========================
                        BOOKING HEADER
                    ========================= */}

                    <div
                      style={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "flex-start",
                        gap:
                          "15px",
                        flexWrap:
                          "wrap",
                        marginBottom:
                          "20px",
                      }}
                    >

                      <div>

                        <p
                          style={{
                            margin:
                              "0 0 7px",
                            color:
                              "#999",
                            fontSize:
                              "12px",
                            textTransform:
                              "uppercase",
                            letterSpacing:
                              "1px",
                          }}
                        >
                          Appointment
                        </p>

                        <h3
                          style={{
                            margin:
                              0,
                            color:
                              "#332b27",
                            fontSize:
                              "21px",
                          }}
                        >
                          {getServiceName(
                            booking
                          )}
                        </h3>

                      </div>

                      <span
                        style={{
                          ...statusStyle,
                          padding:
                            "7px 13px",
                          borderRadius:
                            "20px",
                          fontSize:
                            "12px",
                          fontWeight:
                            "700",
                          letterSpacing:
                            "0.5px",
                        }}
                      >
                        {status}
                      </span>

                    </div>

                    {/* =========================
                        BOOKING DETAILS
                    ========================= */}

                    <div
                      style={{
                        display:
                          "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(160px, 1fr))",
                        gap:
                          "15px",
                      }}
                    >

                      <div>

                        <div
                          style={{
                            color:
                              "#999",
                            fontSize:
                              "12px",
                            marginBottom:
                              "5px",
                          }}
                        >
                          DATE
                        </div>

                        <div
                          style={{
                            color:
                              "#332b27",
                            fontWeight:
                              "600",
                          }}
                        >
                          📅{" "}
                          {formatDate(
                            booking.bookingDate
                          )}
                        </div>

                      </div>

                      <div>

                        <div
                          style={{
                            color:
                              "#999",
                            fontSize:
                              "12px",
                            marginBottom:
                              "5px",
                          }}
                        >
                          TIME
                        </div>

                        <div
                          style={{
                            color:
                              "#332b27",
                            fontWeight:
                              "600",
                          }}
                        >
                          🕐{" "}
                          {formatTime(
                            booking.bookingTime
                          )}
                        </div>

                      </div>

                      <div>

                        <div
                          style={{
                            color:
                              "#999",
                            fontSize:
                              "12px",
                            marginBottom:
                              "5px",
                          }}
                        >
                          PRICE
                        </div>

                        <div
                          style={{
                            color:
                              "#332b27",
                            fontWeight:
                              "600",
                          }}
                        >
                          {formatPrice(
                            price
                          )}
                        </div>

                      </div>

                    </div>

                    {/* =========================
                        BOOKING REFERENCE
                    ========================= */}

                    {booking.id && (

                      <div
                        style={{
                          marginTop:
                            "20px",
                          paddingTop:
                            "15px",
                          borderTop:
                            "1px solid #eee",
                          color:
                            "#999",
                          fontSize:
                            "13px",
                        }}
                      >
                        Booking Reference:{" "}
                        <strong
                          style={{
                            color:
                              "#555",
                          }}
                        >
                          #{booking.id}
                        </strong>
                      </div>

                    )}

                    {/* =========================
                        ACTION BUTTONS
                    ========================= */}

                    {(canReschedule ||
                      canCancel) && (

                      <div
                        style={{
                          marginTop:
                            "20px",
                          paddingTop:
                            "18px",
                          borderTop:
                            "1px solid #eee",
                          display:
                            "flex",
                          justifyContent:
                            "flex-end",
                          gap:
                            "10px",
                          flexWrap:
                            "wrap",
                        }}
                      >

                        {canReschedule && (

                          <button
                            onClick={() =>
                              isRescheduling
                                ? handleCloseReschedule()
                                : handleStartReschedule(
                                    booking
                                  )
                            }
                            style={{
                              background:
                                isRescheduling
                                  ? "#f3e5df"
                                  : "#b88972",
                              color:
                                isRescheduling
                                  ? "#6e5c53"
                                  : "#fff",
                              border:
                                "none",
                              padding:
                                "10px 18px",
                              borderRadius:
                                "8px",
                              cursor:
                                "pointer",
                              fontWeight:
                                "600",
                              fontSize:
                                "13px",
                            }}
                          >
                            {isRescheduling
                              ? "Close Reschedule"
                              : "Reschedule Booking"}
                          </button>

                        )}

                        {canCancel && (

                          <button
                            onClick={() =>
                              handleCancelBooking(
                                booking
                              )
                            }
                            disabled={
                              isCancelling
                            }
                            style={{
                              background:
                                isCancelling
                                  ? "#d8c9c2"
                                  : "#fff",
                              color:
                                isCancelling
                                  ? "#777"
                                  : "#c62828",
                              border:
                                "1px solid #e0b8b8",
                              padding:
                                "10px 18px",
                              borderRadius:
                                "8px",
                              cursor:
                                isCancelling
                                  ? "not-allowed"
                                  : "pointer",
                              fontWeight:
                                "600",
                              fontSize:
                                "13px",
                            }}
                          >
                            {isCancelling
                              ? "Cancelling..."
                              : "Cancel Booking"}
                          </button>

                        )}

                      </div>

                    )}

                    {/* =========================
                        RESCHEDULE FORM
                    ========================= */}

                    {isRescheduling && (

                      <div
                        style={{
                          marginTop:
                            "25px",
                          padding:
                            "25px",
                          background:
                            "#faf7f5",
                          borderRadius:
                            "14px",
                          border:
                            "1px solid #eee2dc",
                        }}
                      >

                        <div
                          style={{
                            marginBottom:
                              "20px",
                          }}
                        >

                          <p
                            style={{
                              margin:
                                "0 0 5px",
                              color:
                                "#b88972",
                              fontSize:
                                "12px",
                              fontWeight:
                                "700",
                              letterSpacing:
                                "1.5px",
                              textTransform:
                                "uppercase",
                            }}
                          >
                            Reschedule Appointment
                          </p>

                          <h3
                            style={{
                              margin:
                                0,
                              color:
                                "#332b27",
                              fontSize:
                                "22px",
                            }}
                          >
                            Choose your new appointment
                          </h3>

                          <p
                            style={{
                              margin:
                                "8px 0 0",
                              color:
                                "#777",
                              fontSize:
                                "14px",
                              lineHeight:
                                "1.5",
                            }}
                          >
                            Select a service, date and
                            available time. Your new
                            appointment will require
                            confirmation from Empress Beauty.
                          </p>

                        </div>

                        {/* RESCHEDULE ERROR */}

                        {rescheduleError && (

                          <div
                            style={{
                              background:
                                "#fdecec",
                              color:
                                "#c62828",
                              border:
                                "1px solid #f0cccc",
                              padding:
                                "13px 15px",
                              borderRadius:
                                "9px",
                              marginBottom:
                                "18px",
                              fontSize:
                                "14px",
                              fontWeight:
                                "600",
                            }}
                          >
                            {rescheduleError}
                          </div>

                        )}

                        {/* RESCHEDULE SUCCESS */}

                        {rescheduleMessage && (

                          <div
                            style={{
                              background:
                                "#e8f7ed",
                              color:
                                "#218739",
                              border:
                                "1px solid #c7e8d0",
                              padding:
                                "15px 17px",
                              borderRadius:
                                "9px",
                              marginBottom:
                                "18px",
                              fontSize:
                                "14px",
                              fontWeight:
                                "600",
                              lineHeight:
                                "1.5",
                            }}
                          >
                            ✓{" "}
                            {rescheduleMessage}
                          </div>

                        )}

                        {/* =======================
                            FORM GRID
                        ======================= */}

                        <div
                          style={{
                            display:
                              "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(220px, 1fr))",
                            gap:
                              "18px",
                          }}
                        >

                          {/* SERVICE */}

                          <div>

                            <label
                              style={{
                                display:
                                  "block",
                                color:
                                  "#555",
                                fontSize:
                                  "13px",
                                fontWeight:
                                  "600",
                                marginBottom:
                                  "8px",
                              }}
                            >
                              Service
                            </label>

                            <select
                              value={
                                rescheduleServiceId
                              }
                              onChange={
                                handleRescheduleServiceChange
                              }
                              disabled={
                                servicesLoading ||
                                rescheduleLoading
                              }
                              style={{
                                width:
                                  "100%",
                                padding:
                                  "12px 13px",
                                border:
                                  "1px solid #d9ccc5",
                                borderRadius:
                                  "8px",
                                background:
                                  "#fff",
                                color:
                                  "#332b27",
                                fontSize:
                                  "14px",
                                outline:
                                  "none",
                              }}
                            >

                              <option value="">
                                Select a service
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
                                    {service.name}
                                    {service.price !==
                                      undefined &&
                                      service.price !==
                                        null
                                      ? ` — ${formatPrice(
                                          service.price
                                        )}`
                                      : ""}
                                  </option>

                                )
                              )}

                            </select>

                          </div>

                          {/* DATE */}

                          <div>

                            <label
                              style={{
                                display:
                                  "block",
                                color:
                                  "#555",
                                fontSize:
                                  "13px",
                                fontWeight:
                                  "600",
                                marginBottom:
                                  "8px",
                              }}
                            >
                              New Date
                            </label>

                            <input
                              type="date"
                              value={
                                rescheduleDate
                              }
                              min={
                                getTodayDate()
                              }
                              onChange={
                                handleRescheduleDateChange
                              }
                              disabled={
                                rescheduleLoading
                              }
                              style={{
                                width:
                                  "100%",
                                boxSizing:
                                  "border-box",
                                padding:
                                  "12px 13px",
                                border:
                                  "1px solid #d9ccc5",
                                borderRadius:
                                  "8px",
                                background:
                                  "#fff",
                                color:
                                  "#332b27",
                                fontSize:
                                  "14px",
                                outline:
                                  "none",
                              }}
                            />

                          </div>

                        </div>

                        {/* =======================
                            AVAILABLE TIMES
                        ======================= */}

                        <div
                          style={{
                            marginTop:
                              "20px",
                          }}
                        >

                          <label
                            style={{
                              display:
                                "block",
                              color:
                                "#555",
                              fontSize:
                                "13px",
                              fontWeight:
                                "600",
                              marginBottom:
                                "10px",
                            }}
                          >
                            Available Time
                          </label>

                          {timesLoading && (

                            <div
                              style={{
                                padding:
                                  "18px",
                                background:
                                  "#fff",
                                borderRadius:
                                  "9px",
                                color:
                                  "#777",
                                fontSize:
                                  "14px",
                              }}
                            >
                              Checking available times...
                            </div>

                          )}

                          {!timesLoading &&
                            rescheduleServiceId &&
                            rescheduleDate &&
                            availableTimes.length ===
                              0 && (

                            <div
                              style={{
                                padding:
                                  "18px",
                                background:
                                  "#fff",
                                borderRadius:
                                  "9px",
                                color:
                                  "#a66a00",
                                fontSize:
                                  "14px",
                                border:
                                  "1px solid #eee0bd",
                              }}
                            >
                              No available times for this
                              service and date. Please choose
                              another date.
                            </div>

                          )}

                          {!timesLoading &&
                            availableTimes.length >
                              0 && (

                            <div
                              style={{
                                display:
                                  "grid",
                                gridTemplateColumns:
                                  "repeat(auto-fill, minmax(115px, 1fr))",
                                gap:
                                  "10px",
                              }}
                            >

                              {availableTimes.map(
                                (time) => {

                                  const selected =
                                    rescheduleTime ===
                                    time;

                                  return (

                                    <button
                                      key={
                                        time
                                      }
                                      type="button"
                                      onClick={() =>
                                        setRescheduleTime(
                                          time
                                        )
                                      }
                                      style={{
                                        padding:
                                          "11px 8px",
                                        border:
                                          selected
                                            ? "2px solid #b88972"
                                            : "1px solid #d9ccc5",
                                        background:
                                          selected
                                            ? "#f3e5df"
                                            : "#fff",
                                        color:
                                          selected
                                            ? "#7c5949"
                                            : "#444",
                                        borderRadius:
                                          "8px",
                                        cursor:
                                          "pointer",
                                        fontWeight:
                                          selected
                                            ? "700"
                                            : "500",
                                        fontSize:
                                          "13px",
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

                        {/* =======================
                            FORM ACTIONS
                        ======================= */}

                        <div
                          style={{
                            display:
                              "flex",
                            justifyContent:
                              "flex-end",
                            gap:
                              "10px",
                            flexWrap:
                              "wrap",
                            marginTop:
                              "25px",
                            paddingTop:
                              "20px",
                            borderTop:
                              "1px solid #e8ddd7",
                          }}
                        >

                          <button
                            type="button"
                            onClick={
                              handleCloseReschedule
                            }
                            disabled={
                              rescheduleLoading
                            }
                            style={{
                              background:
                                "#fff",
                              color:
                                "#6e5c53",
                              border:
                                "1px solid #c9bbb4",
                              padding:
                                "11px 20px",
                              borderRadius:
                                "8px",
                              cursor:
                                rescheduleLoading
                                  ? "not-allowed"
                                  : "pointer",
                              fontWeight:
                                "600",
                            }}
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleSaveReschedule(
                                booking
                              )
                            }
                            disabled={
                              rescheduleLoading ||
                              !rescheduleTime
                            }
                            style={{
                              background:
                                rescheduleLoading ||
                                !rescheduleTime
                                  ? "#d8c9c2"
                                  : "#b88972",
                              color:
                                "#fff",
                              border:
                                "none",
                              padding:
                                "11px 22px",
                              borderRadius:
                                "8px",
                              cursor:
                                rescheduleLoading ||
                                !rescheduleTime
                                  ? "not-allowed"
                                  : "pointer",
                              fontWeight:
                                "600",
                            }}
                          >
                            {rescheduleLoading
                              ? "Saving Changes..."
                              : "Save Changes"}
                          </button>

                        </div>

                      </div>

                    )}

                    {/* =========================
                        CANCELLED MESSAGE
                    ========================= */}

                    {status ===
                      "CANCELLED" && (

                      <div
                        style={{
                          marginTop:
                            "18px",
                          padding:
                            "12px 15px",
                          background:
                            "#faf5f5",
                          borderRadius:
                            "8px",
                          color:
                            "#9a6a6a",
                          fontSize:
                            "13px",
                        }}
                      >
                        This appointment
                        has been cancelled.
                      </div>

                    )}

                  </div>
                );
              }
            )}

        </section>

        {/* =====================================
            LEAVE A REVIEW
        ===================================== */}

        <div
          style={{
            marginTop: "70px",
            marginBottom: "20px",
          }}
        >
          <LeaveReview />
        </div>

        {/* =====================================
            FOOTER ACTIONS
        ===================================== */}

        <div
          style={{
            marginTop:
              "40px",
            paddingTop:
              "25px",
            borderTop:
              "1px solid #e6dfdb",
            display:
              "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            gap:
              "15px",
            flexWrap:
              "wrap",
          }}
        >

          <p
            style={{
              margin: 0,
              color:
                "#888",
              fontSize:
                "14px",
            }}
          >
            Need another appointment?
            We're ready to welcome you.
          </p>

          <button
            onClick={
              handleLogout
            }
            style={{
              background:
                "transparent",
              border:
                "1px solid #c9bbb4",
              color:
                "#6e5c53",
              padding:
                "11px 20px",
              borderRadius:
                "8px",
              cursor:
                "pointer",
              fontWeight:
                "600",
            }}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Account;

