import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api";

function AdminDashboard() {
    const navigate = useNavigate();

    /* ==========================================
       STATE
    ========================================== */

    const [bookings, setBookings] = useState([]);
    const [services, setServices] = useState([]);
    const [contactMessages, setContactMessages] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [selectedBooking, setSelectedBooking] =
        useState(null);

    const [selectedMessage, setSelectedMessage] =
        useState(null);

    /* ==========================================
       NOTIFICATION STATE
    ========================================== */

    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] =
        useState(false);

    const adminAuth =
        sessionStorage.getItem("adminAuth");

    /* ==========================================
       AUTHENTICATION
    ========================================== */

    useEffect(() => {
        if (!adminAuth) {
            navigate("/admin/login");
            return;
        }

        fetchDashboardData(true);

        const interval = setInterval(() => {
            fetchDashboardData(false);
        }, 10000);

        return () => clearInterval(interval);
    }, [adminAuth, navigate]);

    /* ==========================================
       FETCH DASHBOARD DATA
    ========================================== */

    const fetchDashboardData = async (
        initialLoad = false
    ) => {
        try {
            if (initialLoad) {
                setLoading(true);
            }

            setError("");

            const authHeader = {
                Authorization: `Basic ${adminAuth}`,
                "Content-Type": "application/json",
            };

            const [
                bookingsResponse,
                servicesResponse,
                notificationsResponse,
                contactMessagesResponse,
            ] = await Promise.all([
                fetch(`${API_URL}/bookings`, {
                    headers: authHeader,
                }),

                fetch(`${API_URL}/services`),

                fetch(`${API_URL}/notifications`, {
                    headers: authHeader,
                }),

                fetch(`${API_URL}/contact-messages`, {
                    headers: authHeader,
                }),
            ]);

            if (!bookingsResponse.ok) {
                throw new Error(
                    "Failed to load bookings."
                );
            }

            if (!servicesResponse.ok) {
                throw new Error(
                    "Failed to load services."
                );
            }

            if (!notificationsResponse.ok) {
                throw new Error(
                    "Failed to load notifications."
                );
            }

            if (!contactMessagesResponse.ok) {
                throw new Error(
                    "Failed to load contact messages."
                );
            }

            const bookingsData =
                await bookingsResponse.json();

            const servicesData =
                await servicesResponse.json();

            const notificationsData =
                await notificationsResponse.json();

            const contactMessagesData =
                await contactMessagesResponse.json();

            setBookings(
                Array.isArray(bookingsData)
                    ? bookingsData
                    : []
            );

            setServices(
                Array.isArray(servicesData)
                    ? servicesData
                    : []
            );

            setNotifications(
                Array.isArray(notificationsData)
                    ? notificationsData
                    : []
            );

            setContactMessages(
                Array.isArray(contactMessagesData)
                    ? contactMessagesData
                    : []
            );
        } catch (err) {
            console.error(err);

            setError(
                err.message ||
                    "Something went wrong while loading dashboard data."
            );
        } finally {
            if (initialLoad) {
                setLoading(false);
            }
        }
    };

    /* ==========================================
       SERVICE HELPER
    ========================================== */

    const getService = (serviceId) => {
        return services.find(
            (service) =>
                Number(service.id) ===
                Number(serviceId)
        );
    };

    /* ==========================================
       BOOKING STATUS
    ========================================== */

    const updateBookingStatus = async (
        bookingId,
        status
    ) => {
        try {
            setError("");

            const response = await fetch(
                `${API_URL}/bookings/${bookingId}/status`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Basic ${adminAuth}`,
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        status,
                    }),
                }
            );

            if (!response.ok) {
                const message =
                    await response.text();

                throw new Error(
                    message ||
                        "Failed to update booking status."
                );
            }

            await fetchDashboardData(false);
        } catch (err) {
            console.error(err);

            setError(
                err.message ||
                    "Failed to update booking status."
            );
        }
    };

    /* ==========================================
       LOGOUT
    ========================================== */

    const logout = () => {
        sessionStorage.removeItem("adminAuth");
        sessionStorage.removeItem("adminEmail");

        navigate("/admin/login");
    };

    /* ==========================================
       NOTIFICATIONS
    ========================================== */

    const markAllNotificationsRead = async () => {
        try {
            setError("");

            const response = await fetch(
                `${API_URL}/notifications/read-all`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Basic ${adminAuth}`,
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            if (!response.ok) {
                const message =
                    await response.text();

                throw new Error(
                    message ||
                        "Failed to mark all notifications as read."
                );
            }

            setNotifications(
                (previous) =>
                    previous.map(
                        (notification) => ({
                            ...notification,
                            read: true,
                        })
                    )
            );
        } catch (err) {
            console.error(err);

            setError(
                err.message ||
                    "Failed to mark notifications as read."
            );
        }
    };

    const clearNotifications = async () => {
        try {
            setError("");

            const response = await fetch(
                `${API_URL}/notifications`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Basic ${adminAuth}`,
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            if (!response.ok) {
                const message =
                    await response.text();

                throw new Error(
                    message ||
                        "Failed to clear notifications."
                );
            }

            setNotifications([]);
        } catch (err) {
            console.error(err);

            setError(
                err.message ||
                    "Failed to clear notifications."
            );
        }
    };

    const openNotificationBooking = async (
        notification
    ) => {
        try {
            setError("");

            if (!notification.read) {
                const response = await fetch(
                    `${API_URL}/notifications/${notification.id}/read`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: `Basic ${adminAuth}`,
                            "Content-Type":
                                "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    const message =
                        await response.text();

                    throw new Error(
                        message ||
                            "Failed to mark notification as read."
                    );
                }

                setNotifications(
                    (previous) =>
                        previous.map(
                            (item) =>
                                Number(item.id) ===
                                Number(
                                    notification.id
                                )
                                    ? {
                                          ...item,
                                          read: true,
                                      }
                                    : item
                        )
                );
            }

            const booking =
                bookings.find(
                    (item) =>
                        Number(item.id) ===
                        Number(
                            notification.bookingId
                        )
                );

            if (booking) {
                setSelectedBooking(booking);
                setShowNotifications(false);
            }
        } catch (err) {
            console.error(err);

            setError(
                err.message ||
                    "Failed to open notification."
            );
        }
    };

    const unreadNotifications =
        notifications.filter(
            (notification) =>
                !notification.read
        ).length;

    /* ==========================================
       CONTACT MESSAGES
    ========================================== */

    const unreadContactMessages =
        contactMessages.filter(
            (message) =>
                message.status?.toUpperCase() ===
                "UNREAD"
        ).length;

    const markMessageAsRead = async (
        messageId
    ) => {
        try {
            setError("");

            const response = await fetch(
                `${API_URL}/contact-messages/${messageId}/read`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Basic ${adminAuth}`,
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            if (!response.ok) {
                const message =
                    await response.text();

                throw new Error(
                    message ||
                        "Failed to mark message as read."
                );
            }

            setContactMessages(
                (previousMessages) =>
                    previousMessages.map(
                        (message) =>
                            Number(message.id) ===
                            Number(messageId)
                                ? {
                                      ...message,
                                      status: "READ",
                                  }
                                : message
                    )
            );

            setSelectedMessage(
                (previousMessage) =>
                    previousMessage &&
                    Number(previousMessage.id) ===
                        Number(messageId)
                        ? {
                              ...previousMessage,
                              status: "READ",
                          }
                        : previousMessage
            );
        } catch (err) {
            console.error(err);

            setError(
                err.message ||
                    "Unable to mark the contact message as read."
            );
        }
    };

    const deleteContactMessage = async (
        messageId
    ) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this contact message?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            const response = await fetch(
                `${API_URL}/contact-messages/${messageId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Basic ${adminAuth}`,
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            if (!response.ok) {
                const message =
                    await response.text();

                throw new Error(
                    message ||
                        "Failed to delete contact message."
                );
            }

            setContactMessages(
                (previousMessages) =>
                    previousMessages.filter(
                        (message) =>
                            Number(message.id) !==
                            Number(messageId)
                    )
            );

            if (
                selectedMessage &&
                Number(selectedMessage.id) ===
                    Number(messageId)
            ) {
                setSelectedMessage(null);
            }
        } catch (err) {
            console.error(err);

            setError(
                err.message ||
                    "Unable to delete the contact message."
            );
        }
    };

    const openContactMessage = async (
        message
    ) => {
        setSelectedMessage(message);

        if (
            message.status?.toUpperCase() ===
            "UNREAD"
        ) {
            await markMessageAsRead(message.id);
        }
    };

    /* ==========================================
       BASIC STATISTICS
    ========================================== */

    const totalBookings =
        bookings.length;

    const pendingBookings =
        bookings.filter(
            (booking) =>
                booking.status?.toUpperCase() ===
                "PENDING"
        ).length;

    const confirmedBookings =
        bookings.filter(
            (booking) =>
                booking.status?.toUpperCase() ===
                "CONFIRMED"
        ).length;

    const cancelledBookings =
        bookings.filter(
            (booking) =>
                booking.status?.toUpperCase() ===
                "CANCELLED"
        ).length;

    /* ==========================================
       DATE HELPERS
    ========================================== */

    const getTodayString = () => {
        const date = new Date();

        const year =
            date.getFullYear();

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            date.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const getBookingDate = (
        booking
    ) => {
        if (!booking?.bookingDate) {
            return null;
        }

        const parts =
            String(
                booking.bookingDate
            ).split("-");

        if (parts.length !== 3) {
            return null;
        }

        return new Date(
            Number(parts[0]),
            Number(parts[1]) - 1,
            Number(parts[2])
        );
    };

    const todayString =
        getTodayString();

    const todayDate = new Date(
        todayString + "T00:00:00"
    );

    const getWeekStart = () => {
        const date =
            new Date(todayDate);

        const day =
            date.getDay();

        const difference =
            day === 0
                ? -6
                : 1 - day;

        date.setDate(
            date.getDate() +
                difference
        );

        return date;
    };

    const getWeekEnd = () => {
        const date =
            new Date(
                getWeekStart()
            );

        date.setDate(
            date.getDate() + 6
        );

        return date;
    };

    const weekStart =
        getWeekStart();

    const weekEnd =
        getWeekEnd();

    const monthStart =
        new Date(
            todayDate.getFullYear(),
            todayDate.getMonth(),
            1
        );

    const monthEnd =
        new Date(
            todayDate.getFullYear(),
            todayDate.getMonth() + 1,
            0
        );

    /* ==========================================
       DATE RANGE CHECK
    ========================================== */

    const isDateBetween = (
        date,
        start,
        end
    ) => {
        if (!date) {
            return false;
        }

        const checkDate =
            new Date(date);

        checkDate.setHours(
            0,
            0,
            0,
            0
        );

        const startDate =
            new Date(start);

        startDate.setHours(
            0,
            0,
            0,
            0
        );

        const endDate =
            new Date(end);

        endDate.setHours(
            23,
            59,
            59,
            999
        );

        return (
            checkDate >=
                startDate &&
            checkDate <=
                endDate
        );
    };

    /* ==========================================
       BOOKING COUNTS
    ========================================== */

    const bookingsToday =
        bookings.filter(
            (booking) => {
                const date =
                    getBookingDate(
                        booking
                    );

                return (
                    date &&
                    date.getTime() ===
                        todayDate.getTime()
                );
            }
        ).length;

    const bookingsThisWeek =
        bookings.filter(
            (booking) =>
                isDateBetween(
                    getBookingDate(
                        booking
                    ),
                    weekStart,
                    weekEnd
                )
        ).length;

    const bookingsThisMonth =
        bookings.filter(
            (booking) =>
                isDateBetween(
                    getBookingDate(
                        booking
                    ),
                    monthStart,
                    monthEnd
                )
        ).length;

    /* ==========================================
       CUSTOMERS
    ========================================== */

    const customerKeys =
        new Set();

    bookings.forEach(
        (booking) => {
            const key =
                booking.email ||
                booking.phone ||
                booking.customerName;

            if (key) {
                customerKeys.add(
                    String(key)
                        .trim()
                        .toLowerCase()
                );
            }
        }
    );

    const totalCustomers =
        customerKeys.size;

    /* ==========================================
       REVENUE
    ========================================== */

    const getBookingRevenue = (
        booking
    ) => {
        if (
            booking.status?.toUpperCase() !==
            "CONFIRMED"
        ) {
            return 0;
        }

        const service =
            getService(
                booking.serviceId
            );

        return Number(
            service?.price || 0
        );
    };

    const totalRevenue =
        bookings.reduce(
            (total, booking) =>
                total +
                getBookingRevenue(
                    booking
                ),
            0
        );

    const revenueThisWeek =
        bookings
            .filter((booking) =>
                isDateBetween(
                    getBookingDate(
                        booking
                    ),
                    weekStart,
                    weekEnd
                )
            )
            .reduce(
                (total, booking) =>
                    total +
                    getBookingRevenue(
                        booking
                    ),
                0
            );

    const revenueThisMonth =
        bookings
            .filter((booking) =>
                isDateBetween(
                    getBookingDate(
                        booking
                    ),
                    monthStart,
                    monthEnd
                )
            )
            .reduce(
                (total, booking) =>
                    total +
                    getBookingRevenue(
                        booking
                    ),
                0
            );

    /* ==========================================
       SERVICE POPULARITY
    ========================================== */

    const serviceBookingCounts =
        {};

    bookings.forEach(
        (booking) => {
            const id =
                Number(
                    booking.serviceId
                );

            if (
                !serviceBookingCounts[id]
            ) {
                serviceBookingCounts[
                    id
                ] = 0;
            }

            serviceBookingCounts[id]++;
        }
    );

    const popularServices =
        services
            .map((service) => ({
                ...service,
                bookingCount:
                    serviceBookingCounts[
                        Number(
                            service.id
                        )
                    ] || 0,
            }))
            .sort(
                (a, b) =>
                    b.bookingCount -
                    a.bookingCount
            );

    const mostPopularService =
        popularServices[0];

    /* ==========================================
       SERVICE PERFORMANCE
    ========================================== */

    const servicePerformance =
        services
            .map((service) => {
                const serviceBookings =
                    bookings.filter(
                        (booking) =>
                            Number(
                                booking.serviceId
                            ) ===
                            Number(
                                service.id
                            )
                    );

                const confirmed =
                    serviceBookings.filter(
                        (booking) =>
                            booking.status?.toUpperCase() ===
                            "CONFIRMED"
                    );

                const revenue =
                    confirmed.reduce(
                        (total) =>
                            total +
                            Number(
                                service.price ||
                                    0
                            ),
                        0
                    );

                return {
                    ...service,
                    totalBookings:
                        serviceBookings.length,
                    confirmedBookings:
                        confirmed.length,
                    revenue,
                };
            })
            .sort(
                (a, b) =>
                    b.totalBookings -
                    a.totalBookings
            );

    /* ==========================================
       CURRENT WEEK CHART DATA
    ========================================== */

    const weekDays = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
    ];

    const chartWeekDates =
        weekDays.map(
            (_, index) => {
                const date =
                    new Date(
                        weekStart
                    );

                date.setDate(
                    date.getDate() +
                        index
                );

                return date;
            }
        );

    const bookingTrendData =
        chartWeekDates.map(
            (date, index) => {
                const dateString =
                    `${date.getFullYear()}-${String(
                        date.getMonth() + 1
                    ).padStart(
                        2,
                        "0"
                    )}-${String(
                        date.getDate()
                    ).padStart(
                        2,
                        "0"
                    )}`;

                const dayBookings =
                    bookings.filter(
                        (booking) =>
                            booking.bookingDate ===
                            dateString
                    );

                return {
                    label:
                        weekDays[index],
                    bookings:
                        dayBookings.length,
                };
            }
        );

    const revenueTrendData =
        chartWeekDates.map(
            (date, index) => {
                const dateString =
                    `${date.getFullYear()}-${String(
                        date.getMonth() + 1
                    ).padStart(
                        2,
                        "0"
                    )}-${String(
                        date.getDate()
                    ).padStart(
                        2,
                        "0"
                    )}`;

                const revenue =
                    bookings
                        .filter(
                            (booking) =>
                                booking.bookingDate ===
                                    dateString &&
                                booking.status?.toUpperCase() ===
                                    "CONFIRMED"
                        )
                        .reduce(
                            (
                                total,
                                booking
                            ) =>
                                total +
                                getBookingRevenue(
                                    booking
                                ),
                            0
                        );

                return {
                    label:
                        weekDays[index],
                    revenue,
                };
            }
        );

    const maxBookingTrend =
        Math.max(
            ...bookingTrendData.map(
                (item) =>
                    item.bookings
            ),
            1
        );

    const maxRevenueTrend =
        Math.max(
            ...revenueTrendData.map(
                (item) =>
                    item.revenue
            ),
            1
        );

    const chartServices =
        popularServices
            .filter(
                (service) =>
                    service.bookingCount >
                    0
            )
            .slice(0, 6);

    const maxServiceBookings =
        Math.max(
            ...chartServices.map(
                (service) =>
                    service.bookingCount
            ),
            1
        );

    const statusChartData = [
        {
            label: "Pending",
            value: pendingBookings,
            color: "#e0b63f",
        },
        {
            label: "Confirmed",
            value: confirmedBookings,
            color: "#63a976",
        },
        {
            label: "Cancelled",
            value: cancelledBookings,
            color: "#d87878",
        },
    ];

    /* ==========================================
       APPOINTMENTS
    ========================================== */

    const todayAppointments =
        bookings
            .filter(
                (booking) =>
                    booking.bookingDate ===
                        todayString &&
                    booking.status?.toUpperCase() !==
                        "CANCELLED"
            )
            .sort((a, b) =>
                String(
                    a.bookingTime
                ).localeCompare(
                    String(
                        b.bookingTime
                    )
                )
            );

    const upcomingAppointments =
        bookings
            .filter((booking) => {
                const date =
                    getBookingDate(
                        booking
                    );

                return (
                    date &&
                    date >
                        todayDate &&
                    booking.status?.toUpperCase() !==
                        "CANCELLED"
                );
            })
            .sort((a, b) => {
                const dateA =
                    getBookingDate(a);

                const dateB =
                    getBookingDate(b);

                if (
                    dateA &&
                    dateB &&
                    dateA.getTime() !==
                        dateB.getTime()
                ) {
                    return (
                        dateA.getTime() -
                        dateB.getTime()
                    );
                }

                return String(
                    a.bookingTime
                ).localeCompare(
                    String(
                        b.bookingTime
                    )
                );
            })
            .slice(0, 8);

    /* ==========================================
       SEARCH + FILTER
    ========================================== */

    const filteredBookings =
        bookings
            .filter((booking) => {
                const search =
                    searchTerm
                        .trim()
                        .toLowerCase();

                if (!search) {
                    return true;
                }

                return (
                    String(
                        booking.customerName ||
                            ""
                    )
                        .toLowerCase()
                        .includes(search) ||
                    String(
                        booking.phone ||
                            ""
                    )
                        .toLowerCase()
                        .includes(search) ||
                    String(
                        booking.email ||
                            ""
                    )
                        .toLowerCase()
                        .includes(search)
                );
            })
            .filter((booking) => {
                if (
                    statusFilter ===
                    "ALL"
                ) {
                    return true;
                }

                return (
                    booking.status?.toUpperCase() ===
                    statusFilter
                );
            })
            .sort((a, b) =>
                Number(b.id) -
                Number(a.id)
            );

    /* ==========================================
       FORMATTING
    ========================================== */

    const formatDate = (
        dateString
    ) => {
        if (!dateString) {
            return "N/A";
        }

        const date =
            getBookingDate({
                bookingDate:
                    dateString,
            });

        if (!date) {
            return String(
                dateString
            );
        }

        return date.toLocaleDateString(
            "en-US",
            {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );
    };

    const formatTime = (
        timeString
    ) => {
        if (!timeString) {
            return "N/A";
        }

        const parts =
            String(
                timeString
            ).split(":");

        if (
            parts.length < 2
        ) {
            return String(
                timeString
            );
        }

        let hours =
            Number(parts[0]);

        const minutes =
            parts[1];

        const suffix =
            hours >= 12
                ? "PM"
                : "AM";

        hours =
            hours % 12 || 12;

        return `${hours}:${minutes} ${suffix}`;
    };

    const formatMessageDate = (
        dateString
    ) => {
        if (!dateString) {
            return "N/A";
        }

        const date =
            new Date(dateString);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return String(
                dateString
            );
        }

        return date.toLocaleString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };

    /* ==========================================
       STATUS STYLE
    ========================================== */

    const getStatusStyle = (
        status
    ) => {
        const normalized =
            status?.toUpperCase();

        if (
            normalized ===
            "PENDING"
        ) {
            return {
                ...styles.status,
                ...styles.pending,
            };
        }

        if (
            normalized ===
            "CONFIRMED"
        ) {
            return {
                ...styles.status,
                ...styles.confirmed,
            };
        }

        if (
            normalized ===
            "CANCELLED"
        ) {
            return {
                ...styles.status,
                ...styles.cancelled,
            };
        }

        return styles.status;
    };

    /* ==========================================
       LOADING
    ========================================== */

    if (loading) {
        return (
            <div
                style={
                    styles.loadingPage
                }
            >
                <div
                    style={
                        styles.loadingSpinner
                    }
                />

                <strong>
                    Loading Empress Beauty
                    Dashboard...
                </strong>

                <p
                    style={{
                        marginTop:
                            "7px",
                        color:
                            "#8b7d82",
                        fontSize:
                            "12px",
                    }}
                >
                    Please wait...
                </p>
            </div>
        );
    }

    /* ==========================================
       DASHBOARD
    ========================================== */

    return (
        <div
            style={styles.page}
            className="admin-page"
        >

            {/* ==================================
                SIDEBAR
            ================================== */}

            <aside
                style={styles.sidebar}
                className="admin-sidebar"
            >

                <div
                    style={styles.brand}
                >

                    <div
                        style={styles.logo}
                    >
                        EB
                    </div>

                    <div>
                        <h2
                            style={
                                styles.brandName
                            }
                        >
                            Empress Beauty
                        </h2>

                        <span
                            style={
                                styles.brandSubtitle
                            }
                        >
                            Admin Dashboard
                        </span>
                    </div>

                </div>

                <nav
                    style={
                        styles.navigation
                    }
                >

                    <button
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            })
                        }
                        style={{
                            ...styles.navItem,
                            ...styles.activeNavItem,
                        }}
                    >
                        <span
                            style={styles.navIcon}
                        >&#127968;</span>
                        Dashboard
                    </button>

                    <button
                        onClick={() =>
                            document.getElementById(
                                "bookings-section"
                            )?.scrollIntoView({
                                behavior: "smooth",
                            })
                        }
                        style={styles.navItem}
                    >
                        <span
                            style={styles.navIcon}
                        >&#128197;</span>
                        Bookings
                    </button>

                    <button
                        onClick={() =>
                            document.getElementById(
                                "messages-section"
                            )?.scrollIntoView({
                                behavior: "smooth",
                            })
                        }
                        style={styles.navItem}
                    >
                        <span
                            style={styles.navIcon}
                        >&#128172;</span>
                        Messages
                        {unreadContactMessages > 0 && (
                            <span
                                style={
                                    styles.sidebarMessageBadge
                                }
                            >
                                {unreadContactMessages}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() =>
                            navigate("/admin/services")
                        }
                        style={styles.navItem}
                    >
                        <span
                            style={styles.navIcon}
                        >&#128142;</span>
                        Services
                    </button>

                    <button
                        onClick={() =>
                            navigate("/admin/testimonials")
                        }
                        style={styles.navItem}
                    >
                        <span
                            style={styles.navIcon}
                        >&#11088;</span>
                        Testimonials
                    </button>

                    <button
                        onClick={() =>
                            navigate("/")
                        }
                        style={styles.navItem}
                    >
                        <span
                            style={styles.navIcon}
                        >&#127760;</span>
                        View Website
                    </button>

                </nav>

                <div
                    style={
                        styles.sidebarBottom
                    }
                >

                    <div
                        style={
                            styles.adminInfo
                        }
                    >

                        <div
                            style={
                                styles.avatar
                            }
                        >
                            A
                        </div>

                        <div
                            style={
                                styles.adminDetails
                            }
                        >

                            <strong
                                style={{
                                    fontSize:
                                        "12px",
                                    overflow:
                                        "hidden",
                                    textOverflow:
                                        "ellipsis",
                                    whiteSpace:
                                        "nowrap",
                                }}
                            >
                                Admin
                            </strong>

                            <span
                                style={{
                                    fontSize:
                                        "10px",
                                    color:
                                        "#8b7d82",
                                    overflow:
                                        "hidden",
                                    textOverflow:
                                        "ellipsis",
                                    whiteSpace:
                                        "nowrap",
                                }}
                            >
                                {
                                    sessionStorage.getItem(
                                        "adminEmail"
                                    )
                                }
                            </span>

                        </div>

                    </div>

                    <button
                        onClick={
                            logout
                        }
                        style={
                            styles.logoutButton
                        }
                    >
                        &#128682; Logout
                    </button>

                </div>

            </aside>

            {/* ==================================
                MAIN
            ================================== */}

            <main
                style={styles.main}
                className="admin-main"
            >

                {/* HEADER */}

                <div
                    style={styles.header}
                    className="admin-header"
                >

                    <div>
                        <h1
                            style={
                                styles.pageTitle
                            }
                        >
                            Dashboard
                        </h1>

                        <p
                            style={
                                styles.pageSubtitle
                            }
                        >
                            Welcome back. Here is
                            what is happening at
                            Empress Beauty.
                        </p>
                    </div>

                    <div
                        style={
                            styles.headerActions
                        }
                        className="header-actions"
                    >

                        {/* NOTIFICATION BELL */}

                        <div
                            style={
                                styles.notificationWrapper
                            }
                            className="notification-wrapper"
                        >

                            <button
                                onClick={() =>
                                    setShowNotifications(
                                        !showNotifications
                                    )
                                }
                                style={
                                    styles.notificationButton
                                }
                                aria-label="Notifications"
                            >
                                &#128276;

                                {unreadNotifications >
                                    0 && (
                                    <span
                                        style={
                                            styles.notificationBadge
                                        }
                                    >
                                        {
                                            unreadNotifications
                                        }
                                    </span>
                                )}
                            </button>

                            {showNotifications && (
                                <div
                                    style={
                                        styles.notificationPanel
                                    }
                                    className="notification-panel"
                                >

                                    <div
                                        style={
                                            styles.notificationPanelHeader
                                        }
                                    >

                                        <div
                                            style={
                                                styles.notificationHeaderTitle
                                            }
                                        >
                                            <strong>
                                                Notifications
                                            </strong>

                                            <span
                                                style={{
                                                    color:
                                                        "#8b7d82",
                                                    fontSize:
                                                        "10px",
                                                }}
                                            >
                                                {
                                                    unreadNotifications
                                                }{" "}
                                                unread
                                            </span>
                                        </div>

                                        {unreadNotifications >
                                            0 && (
                                            <button
                                                onClick={
                                                    markAllNotificationsRead
                                                }
                                                style={
                                                    styles.markReadButton
                                                }
                                            >
                                                Mark all read
                                            </button>
                                        )}

                                    </div>

                                    <div
                                        style={
                                            styles.notificationList
                                        }
                                    >

                                        {notifications.length ===
                                        0 ? (

                                            <div
                                                style={
                                                    styles.noNotifications
                                                }
                                            >
                                                &#128276;
                                                <div
                                                    style={{
                                                        marginTop:
                                                            "8px",
                                                    }}
                                                >
                                                    No notifications
                                                </div>
                                            </div>

                                        ) : (

                                            notifications
                                                .slice()
                                                .sort(
                                                    (
                                                        a,
                                                        b
                                                    ) =>
                                                        Number(
                                                            b.id
                                                        ) -
                                                        Number(
                                                            a.id
                                                        )
                                                )
                                                .map(
                                                    (
                                                        notification
                                                    ) => (
                                                        <button
                                                            key={
                                                                notification.id
                                                            }
                                                            onClick={() =>
                                                                openNotificationBooking(
                                                                    notification
                                                                )
                                                            }
                                                            style={{
                                                                ...styles.notificationItem,
                                                                ...(notification.read
                                                                    ? styles.readNotification
                                                                    : {}),
                                                                width: "100%",
                                                                border: "none",
                                                                textAlign:
                                                                    "left",
                                                                cursor:
                                                                    "pointer",
                                                            }}
                                                        >

                                                            <div
                                                                style={
                                                                    styles.notificationIcon
                                                                }
                                                            >
                                                                {notification.type ===
                                                                "BOOKING"
                                                                    ? "&#128197;"
                                                                    : "&#128276;"}
                                                            </div>

                                                            <div
                                                                style={
                                                                    styles.notificationContent
                                                                }
                                                            >

                                                                <strong
                                                                    style={{
                                                                        fontSize:
                                                                            "12px",
                                                                    }}
                                                                >
                                                                    {
                                                                        notification.title
                                                                    }
                                                                </strong>

                                                                <span
                                                                    style={{
                                                                        fontSize:
                                                                            "11px",
                                                                        color:
                                                                            "#7d7076",
                                                                    }}
                                                                >
                                                                    {
                                                                        notification.message
                                                                    }
                                                                </span>

                                                                {notification.createdAt && (
                                                                    <span
                                                                        style={{
                                                                            fontSize:
                                                                                "9px",
                                                                            color:
                                                                                "#a0959a",
                                                                        }}
                                                                    >
                                                                        {formatMessageDate(
                                                                            notification.createdAt
                                                                        )}
                                                                    </span>
                                                                )}

                                                            </div>

                                                            {!notification.read && (
                                                                <span
                                                                    style={
                                                                        styles.unreadDot
                                                                    }
                                                                />
                                                            )}

                                                        </button>
                                                    )
                                                )

                                        )}

                                    </div>

                                    {notifications.length >
                                        0 && (
                                        <button
                                            onClick={
                                                clearNotifications
                                            }
                                            style={
                                                styles.clearNotificationsButton
                                            }
                                        >
                                            Clear all notifications
                                        </button>
                                    )}

                                </div>
                            )}

                        </div>

                        <button
                            onClick={() =>
                                fetchDashboardData(
                                    false
                                )
                            }
                            style={
                                styles.refreshButton
                            }
                        >
                            &#8635; Refresh
                        </button>

                    </div>

                </div>

                {/* ERROR */}

                {error && (
                    <div
                        style={
                            styles.error
                        }
                    >
                        {error}
                    </div>
                )}

                {/* ==================================
                    STATISTICS
                ================================== */}

                <div
                    style={
                        styles.statsGrid
                    }
                    className="admin-stats-grid"
                >

                    <div
                        style={
                            styles.statCard
                        }
                    >
                        <div
                            style={{
                                ...styles.statIcon,
                                background:
                                    "#f4e6ec",
                            }}
                        >
                            &#128176;
                        </div>

                        <div>
                            <span
                                style={
                                    styles.statLabel
                                }
                            >
                                Confirmed Revenue
                            </span>

                            <strong
                                style={
                                    styles.statValue
                                }
                            >
                                TSh{" "}
                                {totalRevenue.toLocaleString()}
                            </strong>
                        </div>
                    </div>

                    <div
                        style={
                            styles.statCard
                        }
                    >
                        <div
                            style={{
                                ...styles.statIcon,
                                background:
                                    "#e9f1f7",
                            }}
                        >
                            &#128197;
                        </div>

                        <div>
                            <span
                                style={
                                    styles.statLabel
                                }
                            >
                                Today's Bookings
                            </span>

                            <strong
                                style={
                                    styles.statValue
                                }
                            >
                                {
                                    bookingsToday
                                }
                            </strong>
                        </div>
                    </div>

                    <div
                        style={
                            styles.statCard
                        }
                    >
                        <div
                            style={{
                                ...styles.statIcon,
                                background:
                                    "#eef3e9",
                            }}
                        >
                            &#128200;
                        </div>

                        <div>
                            <span
                                style={
                                    styles.statLabel
                                }
                            >
                                This Week
                            </span>

                            <strong
                                style={
                                    styles.statValue
                                }
                            >
                                {
                                    bookingsThisWeek
                                }
                            </strong>
                        </div>
                    </div>

                    <div
                        style={
                            styles.statCard
                        }
                    >
                        <div
                            style={{
                                ...styles.statIcon,
                                background:
                                    "#f6efe4",
                            }}
                        >
                            &#128467;
                        </div>

                        <div>
                            <span
                                style={
                                    styles.statLabel
                                }
                            >
                                This Month
                            </span>

                            <strong
                                style={
                                    styles.statValue
                                }
                            >
                                {
                                    bookingsThisMonth
                                }
                            </strong>
                        </div>
                    </div>

                    <div
                        style={
                            styles.statCard
                        }
                    >
                        <div
                            style={{
                                ...styles.statIcon,
                                background:
                                    "#eee9f5",
                            }}
                        >
                            &#128101;
                        </div>

                        <div>
                            <span
                                style={
                                    styles.statLabel
                                }
                            >
                                Total Customers
                            </span>

                            <strong
                                style={
                                    styles.statValue
                                }
                            >
                                {
                                    totalCustomers
                                }
                            </strong>
                        </div>
                    </div>

                    <div
                        style={
                            styles.statCard
                        }
                    >
                        <div
                            style={{
                                ...styles.statIcon,
                                background:
                                    "#fff4d9",
                            }}
                        >
                            &#9203;
                        </div>

                        <div>
                            <span
                                style={
                                    styles.statLabel
                                }
                            >
                                Pending
                         </span>

                            <strong
                                style={
                                    styles.statValue
                                }
                            >
                                {
                                    pendingBookings
                                }
                            </strong>
                        </div>
                    </div>

                    <div
                        style={
                            styles.statCard
                        }
                    >
                        <div
                            style={{
                                ...styles.statIcon,
                                background:
                                    "#e3f6ea",
                            }}
                        >
                            &#10003;
                        </div>

                        <div>
                            <span
                                style={
                                    styles.statLabel
                                }
                            >
                                Confirmed
                            </span>

                            <strong
                                style={
                                    styles.statValue
                                }
                            >
                                {
                                    confirmedBookings
                                }
                            </strong>
                        </div>
                    </div>

                    <div
                        style={
                            styles.statCard
                        }
                    >
                        <div
                            style={{
                                ...styles.statIcon,
                                background:
                                    "#fde7e7",
                            }}
                        >
                            &#10005;
                        </div>

                        <div>
                            <span
                                style={
                                    styles.statLabel
                                }
                            >
                                Cancelled
                            </span>

                            <strong
                                style={
                                    styles.statValue
                                }
                            >
                                {
                                    cancelledBookings
                                }
                            </strong>
                        </div>
                    </div>

                    <div
                        style={
                            styles.statCard
                        }
                    >
                        <div
                            style={{
                                ...styles.statIcon,
                                background:
                                    "#f4e6ec",
                            }}
                        >
                            &#128232;
                        </div>

                        <div>
                            <span
                                style={
                                    styles.statLabel
                                }
                            >
                                Unread Messages
                            </span>

                            <strong
                                style={
                                    styles.statValue
                                }
                            >
                                {
                                    unreadContactMessages
                                }
                            </strong>
                        </div>
                    </div>

                </div>

                {/* ==================================
                    REVENUE + POPULAR SERVICE
                ================================== */}

                <div
                    style={
                        styles.analyticsGrid
                    }
                    className="analytics-grid"
                >

                    <section
                        style={
                            styles.analyticsCard
                        }
                        className="analytics-card"
                    >

                        <div
                            style={
                                styles.analyticsHeader
                            }
                        >

                            <div>
                                <h2
                                    style={
                                        styles.sectionTitle
                                    }
                                >
                                    Revenue Overview
                                </h2>

                                <p
                                    style={
                                        styles.sectionSubtitle
                                    }
                                >
                                    Confirmed booking
                                    revenue.
                                </p>
                            </div>

                            <div
                                style={
                                    styles.analyticsEmoji
                                }
                            >
                                &#128176;
                            </div>

                        </div>

                        <div
                            style={
                                styles.revenueMain
                            }
                        >

                            <span
                                style={
                                    styles.revenueAmount
                                }
                            >
                                TSh{" "}
                                {totalRevenue.toLocaleString()}
                            </span>

                            <span
                                style={{
                                    color:
                                        "#8b7d82",
                                    fontSize:
                                        "11px",
                                }}
                            >
                                Total confirmed
                                revenue
                            </span>

                        </div>

                        <div
                            style={
                                styles.revenueBreakdown
                            }
                            className="revenueBreakdown"
                        >

                            <div
                                style={
                                    styles.revenueBox
                                }
                            >
                                <span
                                    style={
                                        styles.statLabel
                                    }
                                >
                                    This Week
                                </span>

                                <strong>
                                    TSh{" "}
                                    {revenueThisWeek.toLocaleString()}
                                </strong>
                            </div>

                            <div
                                style={
                                    styles.revenueBox
                                }
                            >
                                <span
                                    style={
                                        styles.statLabel
                                    }
                                >
                                    This Month
                                </span>

                                <strong>
                                    TSh{" "}
                                    {revenueThisMonth.toLocaleString()}
                                </strong>
                            </div>

                        </div>

                    </section>

                    <section
                        style={
                            styles.analyticsCard
                        }
                        className="analytics-card"
                    >

                        <div
                            style={
                                styles.analyticsHeader
                            }
                        >

                            <div>
                                <h2
                                    style={
                                        styles.sectionTitle
                                    }
                                >
                                    Most Popular Service
                                </h2>

                                <p
                                    style={
                                        styles.sectionSubtitle
                                    }
                                >
                                    Based on total
                                    booking requests.
                                </p>
                            </div>

                            <div
                                style={
                                    styles.analyticsEmoji
                                }
                            >
                                &#11088;
                            </div>

                        </div>

                        {mostPopularService &&
                        mostPopularService.bookingCount >
                            0 ? (

                            <div
                                style={
                                    styles.popularService
                                }
                            >

                                <div
                                    style={
                                        styles.popularServiceIcon
                                    }
                                >
                                    &#128167;
                                </div>

                                <div
                                    style={
                                        styles.popularServiceInfo
                                    }
                                >

                                    <strong
                                        style={{
                                            fontSize:
                                                "17px",
                                        }}
                                    >
                                        {
                                            mostPopularService.name
                                        }
                                    </strong>

                                    <span
                                        style={{
                                            color:
                                                "#8b7d82",
                                            fontSize:
                                                "11px",
                                        }}
                                    >
                                        {
                                            mostPopularService.category ||
                                            "Beauty Service"
                                        }
                                    </span>

                                    <strong
                                        style={{
                                            color:
                                                "#8f5a70",
                                            fontSize:
                                                "12px",
                                        }}
                                    >
                                        {
                                            mostPopularService.bookingCount
                                        }{" "}
                                        bookings
                                    </strong>

                                </div>

                            </div>

                        ) : (

                            <div
                                style={
                                    styles.noAnalyticsData
                                }
                            >
                                No booking data
                                available yet.
                            </div>

                        )}

                    </section>

                </div>

                {/* ==================================
                    SERVICE PERFORMANCE
                ================================== */}

                <section
                    style={
                        styles.servicePerformanceSection
                    }
                >

                    <div
                        style={
                            styles.sectionHeader
                        }
                    >

                        <div>
                            <h2
                                style={
                                    styles.sectionTitle
                                }
                            >
                                Service Performance
                            </h2>

                            <p
                                style={
                                    styles.sectionSubtitle
                                }
                            >
                                See which services are
                                performing best.
                            </p>
                        </div>

                    </div>

                    {servicePerformance.length ===
                    0 ? (

                        <div
                            style={
                                styles.noAnalyticsData
                            }
                        >
                            No services available.
                        </div>

                    ) : (

                        <div
                            style={
                                styles.servicePerformanceList
                            }
                        >

                            {servicePerformance
                                .slice(0, 5)
                                .map(
                                    (
                                        service,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                service.id
                                            }
                                            style={
                                                styles.performanceRow
                                            }
                                            className="performanceRow"
                                        >

                                            <div
                                                style={
                                                    styles.performanceRank
                                                }
                                            >
                                                {
                                                    index +
                                                    1
                                                }
                                            </div>

                                            <div
                                                style={
                                                    styles.performanceInfo
                                                }
                                            >

                                                <strong>
                                                    {
                                                        service.name
                                                    }
                                                </strong>

                                                <span
                                                    style={{
                                                        color:
                                                            "#8b7d82",
                                                        fontSize:
                                                            "11px",
                                                    }}
                                                >
                                                    {
                                                        service.category ||
                                                        "Beauty Service"
                                                    }
                                                </span>

                                            </div>

                                            <div
                                                style={
                                                    styles.performanceStats
                                                }
                                                className="performanceStats"
                                            >

                                                <span>
                                                    {
                                                        service.totalBookings
                                                    }{" "}
                                                    bookings
                                                </span>

                                                <span>
                                                    {
                                                        service.confirmedBookings
                                                    }{" "}
                                                    confirmed
                                                </span>

                                                <strong
                                                    style={{
                                                        color:
                                                            "#8f5a70",
                                                    }}
                                                >
                                                    TSh{" "}
                                                    {service.revenue.toLocaleString()}
                                                </strong>

                                            </div>

                                        </div>
                                    )
                                )}

                        </div>

                    )}

                </section>

                {/* ==================================
                    VISUAL ANALYTICS
                ================================== */}

                <section
                    style={
                        styles.visualAnalyticsSection
                    }
                    className="visual-analytics-section"
                >

                    <div
                        style={
                            styles.sectionHeader
                        }
                    >

                        <div>

                            <h2
                                style={
                                    styles.sectionTitle
                                }
                            >
                                Visual Analytics
                            </h2>

                            <p
                                style={
                                    styles.sectionSubtitle
                                }
                            >
                                A visual overview of
                                bookings, revenue,
                                services and statuses.
                            </p>

                        </div>

                        <div
                            style={
                                styles.analyticsEmoji
                            }
                        >
                            &#128200;
                        </div>

                    </div>

                    <div
                        style={
                            styles.chartGrid
                        }
                        className="chart-grid"
                    >

                        {/* BOOKING TRENDS */}

                        <div
                            style={
                                styles.chartCard
                            }
                            className="chart-card"
                        >

                            <div
                                style={
                                    styles.chartHeader
                                }
                            >

                                <div>
                                    <h3
                                        style={
                                            styles.chartTitle
                                        }
                                    >
                                        Booking Trends
                                    </h3>

                                    <p
                                        style={
                                            styles.chartSubtitle
                                        }
                                    >
                                        Current week
                                    </p>
                                </div>

                                <div
                                    style={
                                        styles.chartEmoji
                                    }
                                >
                                    &#128197;
                                </div>

                            </div>

                            <div
                                style={
                                    styles.barChart
                                }
                            >

                                {bookingTrendData.map(
                                    (
                                        item
                                    ) => (
                                        <div
                                            key={
                                                item.label
                                            }
                                            style={
                                                styles.barColumn
                                            }
                                        >

                                            <span
                                                style={
                                                    styles.barValue
                                                }
                                            >
                                                {
                                                    item.bookings
                                                }
                                            </span>

                                            <div
                                                style={
                                                    styles.barTrack
                                                }
                                            >

                                                <div
                                                    style={{
                                                        ...styles.bookingBar,
                                                        height: `${
                                                            (item.bookings /
                                                                maxBookingTrend) *
                                                            100
                                                        }%`,
                                                    }}
                                                />

                                            </div>

                                            <span
                                                style={
                                                    styles.barLabel
                                                }
                                            >
                                                {
                                                    item.label
                                                }
                                            </span>

                                        </div>
                                    )
                                )}

                            </div>

                            <div
                                style={
                                    styles.chartLegend
                                }
                            >
                                Number of bookings
                            </div>

                        </div>

                        {/* REVENUE TRENDS */}

                        <div
                            style={
                                styles.chartCard
                            }
                            className="chart-card"
                        >

                            <div
                                style={
                                    styles.chartHeader
                                }
                            >

                                <div>
                                    <h3
                                        style={
                                            styles.chartTitle
                                        }
                                    >
                                        Revenue Trends
                                    </h3>

                                    <p
                                        style={
                                            styles.chartSubtitle
                                        }
                                    >
                                        Confirmed revenue
                                        this week
                                    </p>
                                </div>

                                <div
                                    style={
                                        styles.chartEmoji
                                    }
                                >
                                    &#128176;
                                </div>

                            </div>

                            <div
                                style={
                                    styles.barChart
                                }
                            >

                                {revenueTrendData.map(
                                    (
                                        item
                                    ) => (
                                        <div
                                            key={
                                                item.label
                                            }
                                            style={
                                                styles.barColumn
                                            }
                                        >

                                            <span
                                                style={
                                                    styles.barValue
                                                }
                                            >
                                                {item.revenue >
                                                0
                                                    ? `${(
                                                          item.revenue /
                                                          1000
                                                      ).toFixed(
                                                          0
                                                      )}k`
                                                    : "0"}
                                            </span>

                                            <div
                                                style={
                                                    styles.barTrack
                                                }
                                            >

                                                <div
                                                    style={{
                                                        ...styles.revenueBar,
                                                        height: `${
                                                            (item.revenue /
                                                                maxRevenueTrend) *
                                                            100
                                                        }%`,
                                                    }}
                                                />

                                            </div>

                                            <span
                                                style={
                                                    styles.barLabel
                                                }
                                            >
                                                {
                                                    item.label
                                                }
                                            </span>

                                        </div>
                                    )
                                )}

                            </div>

                            <div
                                style={
                                    styles.chartLegend
                                }
                            >
                                Revenue in thousands
                                of TSh
                            </div>

                        </div>

                        {/* SERVICE POPULARITY */}

                        <div
                            style={
                                styles.chartCard
                            }
                            className="chart-card"
                        >

                            <div
                                style={
                                    styles.chartHeader
                                }
                            >

                                <div>
                                    <h3
                                        style={
                                            styles.chartTitle
                                        }
                                    >
                                        Service Popularity
                                    </h3>

                                    <p
                                        style={
                                            styles.chartSubtitle
                                        }
                                    >
                                        Most requested
                                        services
                                    </p>
                                </div>

                                <div
                                    style={
                                        styles.chartEmoji
                                    }
                                >
                                    &#11088;
                                </div>

                            </div>

                            {chartServices.length ===
                            0 ? (

                                <div
                                    style={
                                        styles.noChartData
                                    }
                                >
                                    No booking data
                                    available yet.
                                </div>

                            ) : (

                                <div
                                    style={
                                        styles.horizontalChartList
                                    }
                                >

                                    {chartServices.map(
                                        (
                                            service,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    service.id
                                                }
                                                style={
                                                    styles.horizontalChartRow
                                                }
                                            >

                                                <div
                                                    style={
                                                        styles.horizontalChartLabel
                                                    }
                                                >

                                                    <span
                                                        style={
                                                            styles.horizontalRank
                                                        }
                                                    >
                                                        {
                                                            index +
                                                            1
                                                        }
                                                    </span>

                                                    <span
                                                        style={
                                                            styles.horizontalServiceName
                                                        }
                                                    >
                                                        {
                                                            service.name
                                                        }
                                                    </span>

                                                    <span
                                                        style={
                                                            styles.horizontalServiceCount
                                                        }
                                                    >
                                                        {
                                                            service.bookingCount
                                                        }
                                                    </span>

                                                </div>

                                                <div
                                                    style={
                                                        styles.horizontalBarTrack
                                                    }
                                                >

                                                    <div
                                                        style={{
                                                            ...styles.horizontalBarFill,
                                                            width: `${
                                                                (service.bookingCount /
                                                                    maxServiceBookings) *
                                                                100
                                                            }%`,
                                                        }}
                                                    />

                                                </div>

                                            </div>
                                        )
                                    )}

                                </div>

                            )}

                        </div>

                        {/* STATUS DISTRIBUTION */}

                        <div
                            style={
                                styles.chartCard
                            }
                            className="chart-card"
                        >

                            <div
                                style={
                                    styles.chartHeader
                                }
                            >

                                <div>
                                    <h3
                                        style={
                                            styles.chartTitle
                                        }
                                    >
                                        Status Distribution
                                    </h3>

                                    <p
                                        style={
                                            styles.chartSubtitle
                                        }
                                    >
                                        Current booking
                                        statuses
                                    </p>
                                </div>

                                <div
                                    style={
                                        styles.chartEmoji
                                    }
                                >
                                    &#128202;
                                </div>

                            </div>

                            <div
                                style={
                                    styles.statusChart
                                }
                            >

                                {statusChartData.map(
                                    (
                                        item
                                    ) => {

                                        const percentage =
                                            totalBookings >
                                            0
                                                ? (item.value /
                                                      totalBookings) *
                                                  100
                                                : 0;

                                        return (
                                            <div
                                                key={
                                                    item.label
                                                }
                                                style={
                                                    styles.statusChartRow
                                                }
                                            >

                                                <div
                                                    style={
                                                        styles.statusChartLabel
                                                    }
                                                >
                                                    <span>
                                                        {
                                                            item.label
                                                        }
                                                    </span>

                                                    <strong>
                                                        {
                                                            item.value
                                                        }
                                                    </strong>
                                                </div>

                                                <div
                                                    style={
                                                        styles.statusTrack
                                                    }
                                                >

                                                    <div
                                                        style={{
                                                            ...styles.statusFill,
                                                            width: `${percentage}%`,
                                                            background:
                                                                item.color,
                                                        }}
                                                    />

                                                </div>

                                            </div>
                                        );
                                    }
                                )}

                            </div>

                            <div
                                style={
                                    styles.statusSummary
                                }
                            >

                                <span>
                                    Total bookings
                                </span>

                                <strong
                                    style={{
                                        color:
                                            "#33272d",
                                    }}
                                >
                                    {
                                        totalBookings
                                    }
                                </strong>

                            </div>

                        </div>

                    </div>

                </section>

                {/* ==================================
                    TODAY + UPCOMING
                ================================== */}

                <div
                    style={
                        styles.appointmentGrid
                    }
                    className="appointment-grid"
                >

                    {/* TODAY */}

                    <section
                        style={
                            styles.appointmentSection
                        }
                        className="appointment-section"
                    >

                        <div
                            style={
                                styles.appointmentHeader
                            }
                        >

                            <div>
                                <h2
                                    style={
                                        styles.sectionTitle
                                    }
                                >
                                    Today's Appointments
                                </h2>

                                <p
                                    style={
                                        styles.sectionSubtitle
                                    }
                                >
                                    Appointments scheduled
                                    for today.
                                </p>
                            </div>

                            <div
                                style={
                                    styles.appointmentCount
                                }
                            >
                                {
                                    todayAppointments.length
                                }
                            </div>

                        </div>

                        {todayAppointments.length ===
                        0 ? (

                            <div
                                style={
                                    styles.emptyAppointment
                                }
                            >

                                <div
                                    style={
                                        styles.emptyAppointmentIcon
                                    }
                                >
                                    &#127800;
                                </div>

                                <strong>
                                    No appointments today
                                </strong>

                                <span
                                    style={{
                                        marginTop:
                                            "5px",
                                        fontSize:
                                            "11px",
                                    }}
                                >
                                    Your schedule is
                                    clear.
                                </span>

                            </div>

                        ) : (

                            <div
                                style={
                                    styles.appointmentList
                                }
                            >

                                {todayAppointments.map(
                                    (
                                        booking
                                    ) => {

                                        const service =
                                            getService(
                                                booking.serviceId
                                            );

                                        return (
                                            <div
                                                key={
                                                    booking.id
                                                }
                                                style={
                                                    styles.appointmentCard
                                                }
                                                className="appointment-card"
                                            >

                                                <div
                                                    style={
                                                        styles.appointmentTime
                                                    }
                                                >
                                                    {
                                                        formatTime(
                                                            booking.bookingTime
                                                        )
                                                    }
                                                </div>

                                                <div
                                                    style={
                                                        styles.appointmentDetails
                                                    }
                                                >

                                                    <strong>
                                                        {
                                                            booking.customerName
                                                        }
                                                    </strong>

                                                    <span
                                                        style={{
                                                            color:
                                                                "#8b7d82",
                                                            fontSize:
                                                                "11px",
                                                        }}
                                                    >
                                                        {
                                                            service?.name ||
                                                            "Unknown Service"
                                                        }
                                                    </span>

                                                    <span
                                                        style={{
                                                            color:
                                                                "#8f5a70",
                                                            fontSize:
                                                                "10px",
                                                        }}
                                                    >
                                                        {
                                                            booking.phone
                                                        }
                                                    </span>

                                                </div>

                                                <span
                                                    style={getStatusStyle(
                                                        booking.status
                                                    )}
                                                >
                                                    {
                                                        booking.status
                                                    }
                                                </span>

                                            </div>
                                        );
                                    }
                                )}

                            </div>

                        )}

                    </section>

                    {/* UPCOMING */}

                    <section
                        style={
                            styles.appointmentSection
                        }
                        className="appointment-section"
                    >

                        <div
                            style={
                                styles.appointmentHeader
                            }
                        >

                            <div>
                                <h2
                                    style={
                                        styles.sectionTitle
                                    }
                                >
                                    Upcoming Appointments
                                </h2>

                                <p
                                    style={
                                        styles.sectionSubtitle
                                    }
                                >
                                    Your next scheduled
                                    appointments.
                                </p>
                            </div>

                            <div
                                style={
                                    styles.appointmentCount
                                }
                            >
                                {
                                    upcomingAppointments.length
                                }
                            </div>

                        </div>

                        {upcomingAppointments.length ===
                        0 ? (

                            <div
                                style={
                                    styles.emptyAppointment
                                }
                            >

                                <div
                                    style={
                                        styles.emptyAppointmentIcon
                                    }
                                >
                                    &#128233;
                                </div>

                                <strong>
                                    No upcoming
                                    appointments
                                </strong>

                                <span
                                    style={{
                                        marginTop:
                                            "5px",
                                        fontSize:
                                            "11px",
                                    }}
                                >
                                    New bookings will
                                    appear here.
                                </span>

                            </div>

                        ) : (

                            <div
                                style={
                                    styles.appointmentList
                                }
                            >

                                {upcomingAppointments.map(
                                    (
                                        booking
                                    ) => {

                                        const service =
                                            getService(
                                                booking.serviceId
                                            );

                                        return (
                                            <div
                                                key={
                                                    booking.id
                                                }
                                                style={
                                                    styles.appointmentCard
                                                }
                                                className="appointment-card"
                                            >

                                                <div
                                                    style={
                                                        styles.upcomingDate
                                                    }
                                                >

                                                    <strong>
                                                        {
                                                            formatDate(
                                                                booking.bookingDate
                                                            )
                                                        }
                                                    </strong>

                                                    <span>
                                                        {
                                                            formatTime(
                                                                booking.bookingTime
                                                            )
                                                        }
                                                    </span>

                                                </div>

                                                <div
                                                    style={
                                                        styles.appointmentDetails
                                                    }
                                                >

                                                    <strong>
                                                        {
                                                            booking.customerName
                                                        }
                                                    </strong>

                                                    <span
                                                        style={{
                                                            color:
                                                                "#8b7d82",
                                                            fontSize:
                                                                "11px",
                                                        }}
                                                    >
                                                        {
                                                            service?.name ||
                                                            "Unknown Service"
                                                        }
                                                    </span>

                                                </div>

                                                <span
                                                    style={getStatusStyle(
                                                        booking.status
                                                    )}
                                                >
                                                    {
                                                        booking.status
                                                    }
                                                </span>

                                            </div>
                                        );
                                    }
                                )}

                            </div>

                        )}

                    </section>

                </div>

                {/* ==================================
                    RECENT BOOKINGS
                ================================== */}

                <section
                    id="bookings-section"
                    style={
                        styles.bookingSection
                    }
                    className="booking-section"
                >

                    <div
                        style={
                            styles.sectionHeader
                        }
                    >

                        <div>

                            <h2
                                style={
                                    styles.sectionTitle
                                }
                            >
                                Recent Bookings
                            </h2>

                            <p
                                style={
                                    styles.sectionSubtitle
                                }
                            >
                                Manage customer
                                appointments and
                                booking requests.
                            </p>

                        </div>

                    </div>

                    {/* SEARCH */}

                    <div
                        style={
                            styles.bookingTools
                        }
                        className="booking-tools"
                    >

                        <div
                            style={
                                styles.searchBox
                            }
                            className="search-box"
                        >

                            <span
                                style={
                                    styles.searchIcon
                                }
                            >
                                &#128269;
                            </span>

                            <input
                                type="text"
                                placeholder="Search by customer, phone or email..."
                                value={
                                    searchTerm
                                }
                                onChange={(
                                    event
                                ) =>
                                    setSearchTerm(
                                        event.target
                                            .value
                                    )
                                }
                                style={
                                    styles.searchInput
                                }
                            />

                            {searchTerm && (
                                <button
                                    onClick={() =>
                                        setSearchTerm(
                                            ""
                                        )
                                    }
                                    style={
                                        styles.clearSearch
                                    }
                                >
                                    &#10005;
                                </button>
                            )}

                        </div>

                        <div
                            style={
                                styles.bookingCount
                            }
                        >
                            Showing{" "}
                            <strong>
                                {
                                    filteredBookings.length
                                }
                            </strong>{" "}
                            of{" "}
                            <strong>
                                {
                                    bookings.length
                                }
                            </strong>{" "}
                            bookings
                        </div>

                    </div>

                    {/* STATUS FILTERS */}

                    <div
                        style={
                            styles.filterBar
                        }
                        className="filter-bar"
                    >

                        <button
                            onClick={() =>
                                setStatusFilter(
                                    "ALL"
                                )
                            }
                            style={{
                                ...styles.filterButton,
                                ...(statusFilter ===
                                "ALL"
                                    ? styles.activeFilter
                                    : {}),
                            }}
                        >
                            All

                            <span
                                style={
                                    styles.filterCount
                                }
                            >
                                {
                                    totalBookings
                                }
                            </span>

                        </button>

                        <button
                            onClick={() =>
                                setStatusFilter(
                                    "PENDING"
                                )
                            }
                            style={{
                                ...styles.filterButton,
                                ...(statusFilter ===
                                "PENDING"
                                    ? styles.activeFilter
                                    : {}),
                            }}
                        >
                            Pending

                            <span
                                style={
                                    styles.filterCount
                                }
                            >
                                {
                                    pendingBookings
                                }
                            </span>

                        </button>

                        <button
                            onClick={() =>
                                setStatusFilter(
                                    "CONFIRMED"
                                )
                            }
                            style={{
                                ...styles.filterButton,
                                ...(statusFilter ===
                                "CONFIRMED"
                                    ? styles.activeFilter
                                    : {}),
                            }}
                        >
                            Confirmed

                            <span
                                style={
                                    styles.filterCount
                                }
                            >
                                {
                                    confirmedBookings
                                }
                            </span>

                        </button>

                        <button
                            onClick={() =>
                                setStatusFilter(
                                    "CANCELLED"
                                )
                            }
                            style={{
                                ...styles.filterButton,
                                ...(statusFilter ===
                                "CANCELLED"
                                    ? styles.activeFilter
                                    : {}),
                            }}
                        >
                            Cancelled

                            <span
                                style={
                                    styles.filterCount
                                }
                            >
                                {
                                    cancelledBookings
                                }
                            </span>

                        </button>

                    </div>

                    {/* BOOKINGS TABLE */}

                    {filteredBookings.length ===
                    0 ? (

                        <div
                            style={
                                styles.emptyState
                            }
                        >

                            <div
                                style={
                                    styles.emptyIcon
                                }
                            >
                                &#128233;
                            </div>

                            <h3>
                                No bookings found
                            </h3>

                            <p>
                                Try changing your
                                search or status
                                filter.
                            </p>

                        </div>

                    ) : (

                        <div
                            style={
                                styles.tableWrapper
                            }
                            className="table-wrapper"
                        >

                            <table
                                style={
                                    styles.table
                                }
                            >

                                <thead>

                                    <tr>

                                        <th
                                            style={
                                                styles.th
                                            }
                                        >
                                            Customer
                                        </th>

                                        <th
                                            style={
                                                styles.th
                                            }
                                        >
                                            Service
                                        </th>

                                        <th
                                            style={
                                                styles.th
                                            }
                                        >
                                            Date
                                        </th>
 <th
                                            style={
                                                styles.th
                                            }
                                        >
                                            Time
                                        </th>

                                        <th
                                            style={
                                                styles.th
                                            }
                                        >
                                            Contact
                                        </th>

                                        <th
                                            style={
                                                styles.th
                                            }
                                        >
                                            Status
                                        </th>

                                        <th
                                            style={
                                                styles.th
                                            }
                                        >
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredBookings.map(
                                        (
                                            booking
                                        ) => {

                                            const service =
                                                getService(
                                                    booking.serviceId
                                                );

                                            return (
                                                <tr
                                                    key={
                                                        booking.id
                                                    }
                                                >

                                                    <td
                                                        style={
                                                            styles.td
                                                        }
                                                    >

                                                        <div
                                                            style={
                                                                styles.customerCell
                                                            }
                                                        >

                                                            <div
                                                                style={
                                                                    styles.customerAvatar
                                                                }
                                                            >
                                                                {booking.customerName
                                                                    ?.charAt(
                                                                        0
                                                                    )
                                                                    .toUpperCase()}
                                                            </div>

                                                            <div
                                                                style={
                                                                    styles.customerInfo
                                                                }
                                                            >

                                                                <strong>
                                                                    {
                                                                        booking.customerName
                                                                    }
                                                                </strong>

                                                                <span>
                                                                    Booking #
                                                                    {
                                                                        booking.id
                                                                    }
                                                                </span>

                                                            </div>

                                                        </div>

                                                    </td>

                                                    <td
                                                        style={
                                                            styles.td
                                                        }
                                                    >

                                                        <div
                                                            style={
                                                                styles.serviceInfo
                                                            }
                                                        >

                                                            <strong>
                                                                {service?.name ||
                                                                    "Unknown Service"}
                                                            </strong>

                                                            {service && (
                                                                <span
                                                                    style={
                                                                        styles.servicePrice
                                                                    }
                                                                >
                                                                    TSh{" "}
                                                                    {Number(
                                                                        service.price
                                                                    ).toLocaleString()}
                                                                </span>
                                                            )}

                                                        </div>

                                                    </td>

                                                    <td
                                                        style={
                                                            styles.td
                                                        }
                                                    >
                                                        {formatDate(
                                                            booking.bookingDate
                                                        )}
                                                    </td>

                                                    <td
                                                        style={
                                                            styles.td
                                                        }
                                                    >
                                                        <strong>
                                                            {formatTime(
                                                                booking.bookingTime
                                                            )}
                                                        </strong>
                                                    </td>

                                                    <td
                                                        style={
                                                            styles.td
                                                        }
                                                    >

                                                        <div
                                                            style={
                                                                styles.contactInfo
                                                            }
                                                        >

                                                            <span>
                                                                &#128222;{" "}
                                                                {
                                                                    booking.phone
                                                                }
                                                            </span>

                                                            <span
                                                                style={
                                                                    styles.email
                                                                }
                                                            >
                                                                &#9993;ï¸{" "}
                                                                {
                                                                    booking.email
                                                                }
                                                            </span>

                                                        </div>

                                                    </td>

                                                    <td
                                                        style={
                                                            styles.td
                                                        }
                                                    >

                                                        <span
                                                            style={getStatusStyle(
                                                                booking.status
                                                            )}
                                                        >
                                                            {
                                                                booking.status
                                                            }
                                                        </span>

                                                    </td>

                                                    <td
                                                        style={
                                                            styles.td
                                                        }
                                                    >

                                                        <div
                                                            style={{
                                                                ...styles.actionButtons,
                                                                flexWrap:
                                                                    "wrap",
                                                            }}
                                                        >

                                                            <button
                                                                onClick={() =>
                                                                    setSelectedBooking(
                                                                        booking
                                                                    )
                                                                }
                                                                style={
                                                                    styles.viewButton
                                                                }
                                                            >
                                                                View
                                                            </button>

                                                            {booking.status?.toUpperCase() ===
                                                            "PENDING" ? (

                                                                <>
                                                                    <button
                                                                        onClick={() =>
                                                                            updateBookingStatus(
                                                                                booking.id,
                                                                                "CONFIRMED"
                                                                            )
                                                                        }
                                                                        style={
                                                                            styles.confirmButton
                                                                        }
                                                                    >
                                                                        Confirm
                                                                    </button>

                                                                    <button
                                                                        onClick={() =>
                                                                            updateBookingStatus(
                                                                                booking.id,
                                                                                "CANCELLED"
                                                                            )
                                                                        }
                                                                        style={
                                                                            styles.cancelButton
                                                                        }
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </>

                                                            ) : booking.status?.toUpperCase() ===
                                                              "CONFIRMED" ? (

                                                                <button
                                                                    onClick={() =>
                                                                        updateBookingStatus(
                                                                            booking.id,
                                                                            "CANCELLED"
                                                                        )
                                                                    }
                                                                    style={
                                                                        styles.cancelButton
                                                                    }
                                                                >
                                                                    Cancel
                                                                </button>

                                                            ) : (

                                                                <span
                                                                    style={
                                                                        styles.noAction
                                                                    }
                                                                >
                                                                    No action
                                                                </span>

                                                            )}

                                                        </div>

                                                    </td>

                                                </tr>
                                            );
                                        }
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </section>

                {/* ==================================
                    CONTACT MESSAGES
                ================================== */}

                <section
                    id="messages-section"
                    style={
                        styles.messagesSection
                    }
                    className="messages-section"
                >

                    <div
                        style={
                            styles.sectionHeader
                        }
                    >

                        <div>

                            <h2
                                style={
                                    styles.sectionTitle
                                }
                            >
                                Contact Messages
                            </h2>

                            <p
                                style={
                                    styles.sectionSubtitle
                                }
                            >
                                Messages sent by
                                customers through the
                                contact form.
                            </p>

                        </div>

                        <div
                            style={
                                styles.messageCountBadge
                            }
                        >
                            {
                                unreadContactMessages
                            }{" "}
                            unread
                        </div>

                    </div>

                    {contactMessages.length ===
                    0 ? (

                        <div
                            style={
                                styles.emptyMessages
                            }
                        >

                            <div
                                style={
                                    styles.emptyMessagesIcon
                                }
                            >
                                &#128156;
                            </div>

                            <strong>
                                No contact messages
                            </strong>

                            <span
                                style={{
                                    marginTop:
                                        "5px",
                                    fontSize:
                                        "11px",
                                }}
                            >
                                Customer messages will
                                appear here when they
                                contact Empress Beauty.
                            </span>

                        </div>

                    ) : (

                        <div
                            style={
                                styles.messagesList
                            }
                        >

                            {contactMessages.map(
                                (
                                    message
                                ) => {

                                    const isUnread =
                                        message.status?.toUpperCase() ===
                                        "UNREAD";

                                    return (
                                        <div
                                            key={
                                                message.id
                                            }
                                            style={{
                                                ...styles.messageCard,
                                                ...(isUnread
                                                    ? styles.unreadMessageCard
                                                    : {}),
                                            }}
                                        >

                                            <div
                                                style={
                                                    styles.messageAvatar
                                                }
                                            >
                                                {message.name
                                                    ?.charAt(
                                                        0
                                                    )
                                                    .toUpperCase()}
                                            </div>

                                            <div
                                                style={
                                                    styles.messageMain
                                                }
                                            >

                                                <div
                                                    style={
                                                        styles.messageTop
                                                    }
                                                >

                                                    <div
                                                        style={
                                                            styles.messageSender
                                                        }
                                                    >

                                                        <strong>
                                                            {message.name ||
                                                                "Unknown Customer"}
                                                        </strong>

                                                        {isUnread && (
                                                            <span
                                                                style={
                                                                    styles.unreadMessageBadge
                                                                }
                                                            >
                                                                NEW
                                                            </span>
                                                        )}

                                                    </div>

                                                    <span
                                                        style={
                                                            styles.messageDate
                                                        }
                                                    >
                                                        {formatMessageDate(
                                                            message.createdAt
                                                        )}
                                                    </span>

                                                </div>

                                                <strong
                                                    style={
                                                        styles.messageSubject
                                                    }
                                                >
                                                    {
                                                        message.subject
                                                    }
                                                </strong>

                                                <p
                                                    style={
                                                        styles.messagePreview
                                                    }
                                                >
                                                    {
                                                        message.message
                                                    }
                                                </p>

                                                <div
                                                    style={
                                                        styles.messageContact
                                                    }
                                                >

                                                    <span>
                                                        &#9993;ï¸{" "}
                                                        {
                                                            message.email
                                                        }
                                                    </span>

                                                    {message.phone && (
                                                        <span>
                                                            &#128222;{" "}
                                                            {
                                                                message.phone
                                                            }
                                                        </span>
                                                    )}

                                                </div>

                                            </div>

                                            <div
                                                style={
                                                    styles.messageActions
                                                }
                                            >

                                                <button
                                                    onClick={() =>
                                                        openContactMessage(
                                                            message
                                                        )
                                                    }
                                                    style={
                                                        styles.viewMessageButton
                                                    }
                                                >
                                                    View
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        deleteContactMessage(
                                                            message.id
                                                        )
                                                    }
                                                    style={
                                                        styles.deleteMessageButton
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </div>
                                    );
                                }
                            )}

                        </div>

                    )}

                </section>

            </main>

            {/* ==================================
                BOOKING DETAILS MODAL
            ================================== */}

            {selectedBooking && (

                <div
                    style={
                        styles.modalOverlay
                    }
                    onClick={() =>
                        setSelectedBooking(
                            null
                        )
                    }
                >

                    <div
                        style={
                            styles.bookingModal
                        }
                        className="booking-modal"
                        onClick={(
                            event
                        ) =>
                            event.stopPropagation()
                        }
                    >

                        <div
                            style={
                                styles.modalHeader
                            }
                        >

                            <div>

                                <h2
                                    style={
                                        styles.modalTitle
                                    }
                                >
                                    Booking Details
                                </h2>

                                <p
                                    style={
                                        styles.modalSubtitle
                                    }
                                >
                                    Booking #
                                    {
                                        selectedBooking.id
                                    }
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    setSelectedBooking(
                                        null
                                    )
                                }
                                style={
                                    styles.closeButton
                                }
                                aria-label="Close booking details"
                            >
                                &#215;
                            </button>

                        </div>

                        <div
                            style={
                                styles.bookingDetailsGrid
                            }
                            className="booking-details-grid"
                        >

                            <div
                                style={
                                    styles.detailBox
                                }
                            >
                                <span
                                    style={
                                        styles.detailLabel
                                    }
                                >
                                    Customer
                                </span>

                                <strong>
                                    {
                                        selectedBooking.customerName ||
                                        "N/A"
                                    }
                                </strong>
                            </div>

                            <div
                                style={
                                    styles.detailBox
                                }
                            >
                                <span
                                    style={
                                        styles.detailLabel
                                    }
                                >
                                    Phone
                                </span>

                                <strong>
                                    {
                                        selectedBooking.phone ||
                                        "N/A"
                                    }
                                </strong>
                            </div>

                            <div
                                style={
                                    styles.detailBox
                                }
                            >
                                <span
                                    style={
                                        styles.detailLabel
                                    }
                                >
                                    Email
                                </span>

                                <strong
                                    style={{
                                        wordBreak:
                                            "break-word",
                                    }}
                                >
                                    {
                                        selectedBooking.email ||
                                        "N/A"
                                    }
                                </strong>
                            </div>

                            <div
                                style={
                                    styles.detailBox
                                }
                            >
                                <span
                                    style={
                                        styles.detailLabel
                                    }
                                >
                                    Service
                                </span>

                                <strong>
                                    {
                                        getService(
                                            selectedBooking.serviceId
                                        )?.name ||
                                        "Unknown Service"
                                    }
                                </strong>
                            </div>

                            <div
                                style={
                                    styles.detailBox
                                }
                            >
                                <span
                                    style={
                                        styles.detailLabel
                                    }
                                >
                                    Date
                                </span>

                                <strong>
                                    {
                                        formatDate(
                                            selectedBooking.bookingDate
                                        )
                                    }
                                </strong>
                            </div>

                            <div
                                style={
                                    styles.detailBox
                                }
                            >
                                <span
                                    style={
                                        styles.detailLabel
                                    }
                                >
                                    Time
                                </span>

                                <strong>
                                    {
                                        formatTime(
                                            selectedBooking.bookingTime
                                        )
                                    }
                                </strong>
                            </div>

                            <div
                                style={
                                    styles.detailBox
                                }
                            >
                                <span
                                    style={
                                        styles.detailLabel
                                    }
                                >
                                    Duration
                                </span>

                                <strong>
                                    {
                                        getService(
                                            selectedBooking.serviceId
                                        )
                                            ?.durationMinutes ||
                                        0
                                    }{" "}
                                    minutes
                                </strong>
                            </div>

                            <div
                                style={
                                    styles.detailBox
                                }
                            >
                                <span
                                    style={
                                        styles.detailLabel
                                    }
                                >
                                    Price
                                </span>

                                <strong>
                                    TSh{" "}
                                    {Number(
                                        getService(
                                            selectedBooking.serviceId
                                        )?.price ||
                                            0
                                    ).toLocaleString()}
                                </strong>
                            </div>

                            <div
                                style={
                                    styles.detailBox
                                }
                            >
                                <span
                                    style={
                                        styles.detailLabel
                                    }
                                >
                                    Status
                                </span>

                                <span
                                    style={getStatusStyle(
                                        selectedBooking.status
                                    )}
                                >
                                    {
                                        selectedBooking.status
                                    }
                                </span>
                            </div>

                        </div>

                        <div
                            style={
                                styles.modalActions
                            }
                            className="modal-actions"
                        >

                            {selectedBooking.status?.toUpperCase() ===
                                "PENDING" && (
                                <>
                                    <button
                                        onClick={() => {
                                            updateBookingStatus(
                                                selectedBooking.id,
                                                "CONFIRMED"
                                            );

                                            setSelectedBooking(
                                                null
                                            );
                                        }}
                                        style={
                                            styles.modalConfirmButton
                                        }
                                    >
                                        &#10003; Confirm Booking
                                    </button>

                                    <button
                                        onClick={() => {
                                            updateBookingStatus(
                                                selectedBooking.id,
                                                "CANCELLED"
                                            );

                                            setSelectedBooking(
                                                null
                                            );
                                        }}
                                        style={
                                            styles.modalCancelButton
                                        }
                                    >
                                        &#215; Cancel Booking
                                    </button>
                                </>
                            )}

                            {selectedBooking.status?.toUpperCase() ===
                                "CONFIRMED" && (
                                <button
                                    onClick={() => {
                                        updateBookingStatus(
                                            selectedBooking.id,
                                            "CANCELLED"
                                        );

                                        setSelectedBooking(
                                            null
                                        );
                                    }}
                                    style={
                                        styles.modalCancelButton
                                    }
                                >
                                    &#215; Cancel Booking
                                </button>
                            )}

                            <button
                                onClick={() =>
                                    setSelectedBooking(
                                        null
                                    )
                                }
                                style={
                                    styles.closeModalButton
                                }
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* ==================================
                CONTACT MESSAGE MODAL
            ================================== */}

            {selectedMessage && (

                <div
                    style={
                        styles.modalOverlay
                    }
                    onClick={() =>
                        setSelectedMessage(
                            null
                        )
                    }
                >

                    <div
                        style={
                            styles.messageModal
                        }
                        className="message-modal"
                        onClick={(
                            event
                        ) =>
                            event.stopPropagation()
                        }
                    >

                        <div
                            style={
                                styles.modalHeader
                            }
                        >

                            <div>

                                <h2
                                    style={
                                        styles.modalTitle
                                    }
                                >
                                    Contact Message
                                </h2>

                                <p
                                    style={
                                        styles.modalSubtitle
                                    }
                                >
                                    Message #
                                    {
                                        selectedMessage.id
                                    }
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    setSelectedMessage(
                                        null
                                    )
                                }
                                style={
                                    styles.closeButton
                                }
                                aria-label="Close message"
                            >
                                &#215;
                            </button>

                        </div>

                        <div
                            style={
                                styles.messageDetails
                            }
                            className="message-details"
                        >

                            <div
                                style={
                                    styles.messageDetailBox
                                }
                            >
                                <span
                                    style={
                                        styles.detailLabel
                                    }
                                >
                                    Customer
                                </span>

                                <strong>
                                    {
                                        selectedMessage.name ||
                                        "N/A"
                                    }
                                </strong>
                            </div>

                            <div
                                style={
                                    styles.messageDetailBox
                                }
                            >
                                <span
                                    style={
                                        styles.detailLabel
                                    }
                                >
                                    Email
                                </span>

                                <strong
                                    style={{
                                        wordBreak:
                                            "break-word",
                                    }}
                                >
                                    {
                                        selectedMessage.email ||
                                        "N/A"
                                    }
                                </strong>
                            </div>

                            <div
                                style={
                                    styles.messageDetailBox
                                }
                            >
                                <span
                                    style={
                                        styles.detailLabel
                                    }
                                >
                                    Phone
                                </span>

                                <strong>
                                    {
                                        selectedMessage.phone ||
                                        "Not provided"
                                    }
                                </strong>
                            </div>

                            <div
                                style={
                                    styles.messageDetailBox
                                }
                            >
                                <span
                                    style={
                                        styles.detailLabel
                                    }
                                >
                                    Status
                                </span>

                                <span
                                    style={{
                                        ...styles.messageStatus,
                                        ...(selectedMessage.status?.toUpperCase() ===
                                        "UNREAD"
                                            ? styles.unreadStatus
                                            : styles.readStatus),
                                    }}
                                >
                                    {
                                        selectedMessage.status
                                    }
                                </span>
                            </div>

                            <div
                                style={{
                                    ...styles.messageDetailBox,
                                    gridColumn:
                                        "1 / -1",
                                }}
                            >

                                <span
                                    style={
                                        styles.detailLabel
                                    }
                                >
                                    Subject
                                </span>

                                <strong>
                                    {
                                        selectedMessage.subject ||
                                        "N/A"
                                    }
                                </strong>

                            </div>

                            <div
                                style={{
                                    ...styles.messageDetailBox,
                                    gridColumn:
                                        "1 / -1",
                                }}
                            >

                                <span
                                    style={
                                        styles.detailLabel
                                    }
                                >
                                    Message
                                </span>

                                <p
                                    style={
                                        styles.fullMessage
                                    }
                                >
                                    {
                                        selectedMessage.message ||
                                        "No message content."
                                    }
                                </p>

                            </div>

                            <div
                                style={{
                                    ...styles.messageDetailBox,
                                    gridColumn:
                                        "1 / -1",
                                }}
                            >

                                <span
                                    style={
                                        styles.detailLabel
                                    }
                                >
                                    Received
                                </span>

                                <strong>
                                    {formatMessageDate(
                                        selectedMessage.createdAt
                                    )}
                                </strong>

                            </div>

                        </div>

                        <div
                            style={
                                styles.modalActions
                            }
                            className="modal-actions"
                        >

                            {selectedMessage.status?.toUpperCase() ===
                                "UNREAD" && (
                                <button
                                    onClick={() =>
                                        markMessageAsRead(
                                            selectedMessage.id
                                        )
                                    }
                                    style={
                                        styles.markMessageButton
                                    }
                                >
                                    &#10003; Mark as Read
                                </button>
                            )}

                            <button
                                onClick={() =>
                                    deleteContactMessage(
                                        selectedMessage.id
                                    )
                                }
                                style={
                                    styles.modalDeleteMessageButton
                                }
                            >
                                &#128465; Delete Message
                            </button>

                            <button
                                onClick={() =>
                                    setSelectedMessage(
                                        null
                                    )
                                }
                                style={
                                    styles.closeModalButton
                                }
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* ==================================
                RESPONSIVE CSS
            ================================== */}

            <style>
                {`
                    @keyframes spin {
                        from {
                            transform: rotate(0deg);
                        }

                        to {
                            transform: rotate(360deg);
                        }
                    }

                    @media (max-width: 1200px) {

                        .admin-stats-grid {
                            grid-template-columns:
                                repeat(2, 1fr) !important;
                        }

                        .analytics-grid {
                            grid-template-columns:
                                1fr !important;
                        }

                        .chart-grid {
                            grid-template-columns:
                                1fr !important;
                        }

                        .appointment-grid {
                            grid-template-columns:
                                1fr !important;
                        }

                    }

                    @media (max-width: 900px) {

                        .admin-sidebar {
                            width: 220px !important;
                        }

                        .admin-main {
                            margin-left: 220px !important;
                        }

                        .appointment-card {
                            flex-wrap: wrap !important;
                        }

                    }

                    @media (max-width: 700px) {

                        .admin-page {
                            display: block !important;
                        }

                        .admin-sidebar {
                            position: relative !important;
                            width: 100% !important;
                            height: auto !important;
                            min-height: auto !important;
                        }

                        .admin-main {
                            margin-left: 0 !important;
                            width: 100% !important;
                            padding: 18px !important;
                        }

                        .admin-stats-grid {
                            grid-template-columns:
                                1fr !important;
                        }

                        .admin-header {
                            flex-direction: column !important;
                            align-items: flex-start !important;
                            gap: 16px !important;
                        }

                        .header-actions {
                            width: 100% !important;
                            justify-content: space-between !important;
                        }

                        .booking-tools {
                            flex-direction: column !important;
                            align-items: stretch !important;
                        }

                        .search-box {
                            width: 100% !important;
                        }

                        .filter-bar {
                            overflow-x: auto !important;
                            flex-wrap: nowrap !important;
                        }

                        .booking-section {
                            padding: 16px !important;
                        }

                        .appointment-section {
                            padding: 18px !important;
                        }

                        .analytics-card {
                            width: 100% !important;
                        }

                        .revenueBreakdown {
                            grid-template-columns:
                                1fr !important;
                        }

                        .performanceRow {
                            flex-wrap: wrap !important;
                        }

                        .performanceStats {
                            width: 100% !important;
                            align-items: flex-start !important;
                        }

                        .notification-panel {
                            right: auto !important;
                            left: 0 !important;
                            max-width:
                                calc(100vw - 36px) !important;
                        }

                        .chart-card {
                            padding: 16px !important;
                        }

                        .barChart {
                            gap: 5px !important;
                        }

                        .booking-details-grid {
                            grid-template-columns:
                                1fr !important;
                        }

                        .booking-modal {
                            padding: 18px !important;
                            max-height: 92vh !important;
                        }

                        .message-details {
                            grid-template-columns:
                                1fr !important;
                        }

                        .message-detail-box {
                            grid-column: 1 / -1 !important;
                        }

                        .message-modal {
                            padding: 18px !important;
                            max-height: 92vh !important;
                        }

                        .messages-section {
                            padding: 16px !important;
                        }

                        .message-card {
                            flex-wrap: wrap !important;
                        }

                        .message-main {
                            width:
                                calc(100% - 56px) !important;
                        }

                        .message-actions {
                            width: 100% !important;
                            flex-direction: row !important;
                            margin-left: 56px !important;
                        }

                        .message-actions button {
                            flex: 1 !important;
                        }

                        .messageTop {
                            flex-direction: column !important;
                            gap: 5px !important;
                        }

                        .messageDate {
                            white-space:
                                normal !important;
                        }

                        .modal-actions {
                            flex-direction: column !important;
                        }

                        .modal-actions button {
                            width: 100% !important;
                        }

                    }
                `}
            </style>

        </div>
    );
}

/* ==========================================
   STYLES
========================================== */

const styles = {

    /* PAGE */

    page: {
        minHeight: "100vh",
        background: "#f8f6f7",
        color: "#2d2529",
        display: "flex",
        fontFamily:
            "'Inter', 'Segoe UI', Arial, sans-serif",
    },

    /* SIDEBAR */

    sidebar: {
        width: "260px",
        minHeight: "100vh",
        background: "#ffffff",
        borderRight:
            "1px solid #eee7ea",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 10,
    },

    brand: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "28px 22px",
        borderBottom:
            "1px solid #f0eaed",
    },

    logo: {
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        background: "#8f5a70",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "800",
        fontSize: "16px",
    },

    brandName: {
        margin: 0,
        fontSize: "16px",
        fontWeight: "700",
    },

    brandSubtitle: {
        display: "block",
        marginTop: "3px",
        fontSize: "11px",
        color: "#8b7c82",
    },

    navigation: {
        display: "flex",
        flexDirection: "column",
        padding: "22px 14px",
        gap: "6px",
    },

    navItem: {
        width: "100%",
        border: "none",
        background: "transparent",
        padding: "13px 14px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontSize: "14px",
        color: "#6e6267",
        cursor: "pointer",
        textAlign: "left",
    },

    activeNavItem: {
        background: "#f4e9ee",
        color: "#8f5a70",
        fontWeight: "700",
    },

    navIcon: {
        width: "22px",
        textAlign: "center",
        fontSize: "17px",
    },

    sidebarMessageBadge: {
        minWidth: "20px",
        height: "20px",
        padding: "0 5px",
        borderRadius: "20px",
        background: "#a33e3e",
        color: "#ffffff",
        fontSize: "10px",
        fontWeight: "700",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
    },

    sidebarBottom: {
        marginTop: "auto",
        padding: "18px",
        borderTop:
            "1px solid #f0eaed",
    },

    adminInfo: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "16px",
    },

    avatar: {
        width: "38px",
        height: "38px",
        borderRadius: "50%",
        background: "#eadbe2",
        color: "#8f5a70",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
    },

    adminDetails: {
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
    },

    logoutButton: {
        width: "100%",
        padding: "11px",
        border:
            "1px solid #eadfe3",
        background: "#ffffff",
        borderRadius: "9px",
        cursor: "pointer",
        color: "#7b5967",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
    },

    /* MAIN */

    main: {
        marginLeft: "260px",
        width: "calc(100% - 260px)",
        padding: "30px",
        boxSizing: "border-box",
    },

    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "28px",
    },

    headerActions: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },

    pageTitle: {
        margin: 0,
        fontSize: "28px",
        fontWeight: "800",
        letterSpacing: "-0.5px",
    },

    pageSubtitle: {
        margin: "7px 0 0",
        color: "#85777d",
        fontSize: "14px",
    },

    refreshButton: {
        border: "none",
        background: "#8f5a70",
        color: "#ffffff",
        borderRadius: "9px",
        padding: "11px 18px",
        cursor: "pointer",
        fontWeight: "600",
    },

    error: {
        background: "#fff0f0",
        border:
            "1px solid #f2caca",
        color: "#a33a3a",
        padding: "13px 16px",
        borderRadius: "10px",
        marginBottom: "20px",
    },

    /* NOTIFICATIONS */

    notificationWrapper: {
        position: "relative",
    },

    notificationButton: {
        width: "42px",
        height: "42px",
        borderRadius: "10px",
        border:
            "1px solid #eadfe3",
        background: "#ffffff",
        cursor: "pointer",
        fontSize: "18px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    notificationBadge: {
        position: "absolute",
        top: "-5px",
        right: "-5px",
        minWidth: "19px",
        height: "19px",
        borderRadius: "50%",
        background: "#a33e3e",
        color: "#ffffff",
        fontSize: "10px",
        fontWeight: "700",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 4px",
        boxSizing: "border-box",
    },

    notificationPanel: {
        position: "absolute",
        top: "52px",
        right: 0,
        width: "360px",
        maxWidth:
            "calc(100vw - 40px)",
        background: "#ffffff",
        border:
            "1px solid #eee5e9",
        borderRadius: "14px",
        boxShadow:
            "0 12px 35px rgba(60, 35, 45, 0.15)",
        zIndex: 100,
        overflow: "hidden",
    },

    notificationPanelHeader: {
        padding: "16px",
        borderBottom:
            "1px solid #eee7ea",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
    },

    notificationHeaderTitle: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },

    markReadButton: {
        border: "none",
        background: "transparent",
        color: "#8f5a70",
        cursor: "pointer",
        fontSize: "11px",
        fontWeight: "600",
    },

    notificationList: {
        maxHeight: "360px",
        overflowY: "auto",
    },

    notificationItem: {
        display: "flex",
        alignItems: "flex-start",
        gap: "11px",
        padding: "15px",
        borderBottom:
            "1px solid #f1ebee",
        background: "#fffafc",
        position: "relative",
    },

    readNotification: {
        background: "#ffffff",
        opacity: 0.75,
    },

    notificationIcon: {
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        background: "#f4e6ec",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },

    notificationContent: {
        display: "flex",
        flexDirection: "column",
        gap: "3px",
        minWidth: 0,
        flex: 1,
    },

    unreadDot: {
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: "#8f5a70",
        flexShrink: 0,
        marginTop: "5px",
    },

    noNotifications: {
        padding: "35px 20px",
        textAlign: "center",
        color: "#8b7d82",
    },

    clearNotificationsButton: {
        width: "100%",
        border: "none",
        borderTop:
            "1px solid #eee7ea",
        background: "#faf7f8",
        color: "#8f5a70",
        padding: "12px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "12px",
    },

    /* STATISTICS */

    statsGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
        gap: "18px",
        marginBottom: "24px",
    },

    statCard: {
        background: "#ffffff",
        borderRadius: "15px",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        gap: "15px",
        boxShadow:
            "0 4px 20px rgba(60, 35, 45, 0.05)",
    },

    statIcon: {
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "21px",
        flexShrink: 0,
    },

    statLabel: {
        display: "block",
        color: "#85777d",
        fontSize: "12px",
        marginBottom: "5px",
    },

    statValue: {
        display: "block",
        fontSize: "24px",
        fontWeight: "800",
    },

    /* ANALYTICS */

    analyticsGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
        gap: "24px",
        marginBottom: "24px",
    },

    analyticsCard: {
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow:
            "0 4px 20px rgba(60, 35, 45, 0.05)",
    },

    analyticsHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "20px",
    },

    analyticsEmoji: {
        width: "42px",
        height: "42px",
        borderRadius: "12px",
        background: "#f5e6ec",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
    },

    revenueMain: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        marginBottom: "22px",
    },

    revenueAmount: {
        fontSize: "30px",
        fontWeight: "800",
        color: "#8f5a70",
    },

    revenueBreakdown: {
        display: "grid",
        gridTemplateColumns:
            "repeat(2, 1fr)",
        gap: "12px",
    },

    revenueBox: {
        padding: "14px",
        background: "#faf7f8",
        borderRadius: "10px",
        border:
            "1px solid #eee5e9",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },

    popularService: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        padding: "16px",
        borderRadius: "12px",
        background: "#faf7f8",
        border:
            "1px solid #eee5e9",
    },

    popularServiceIcon: {
        width: "50px",
        height: "50px",
        borderRadius: "14px",
        background: "#f4e6ec",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "22px",
        flexShrink: 0,
    },

    popularServiceInfo: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },

    noAnalyticsData: {
        minHeight: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#8b7d82",
        fontSize: "13px",
        textAlign: "center",
    },

    /* SERVICE PERFORMANCE */

    servicePerformanceSection: {
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "24px",
        boxShadow:
            "0 4px 20px rgba(60, 35, 45, 0.05)",
    },

    servicePerformanceList: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },

    performanceRow: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "14px",
        borderRadius: "12px",
        background: "#fafafa",
        border:
            "1px solid #eeeeee",
    },

    performanceRank: {
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        background: "#f1e5ea",
        color: "#8f5a70",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "800",
        flexShrink: 0,
    },

    performanceInfo: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        minWidth: 0,
    },

    performanceStats: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "4px",
        fontSize: "11px",
        color: "#85777d",
    },

    /* VISUAL ANALYTICS */

    visualAnalyticsSection: {
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "24px",
        boxShadow:
            "0 4px 20px rgba(60, 35, 45, 0.05)",
    },

    chartGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
        gap: "20px",
    },

    chartCard: {
        background: "#fafafa",
        border:
            "1px solid #eee7ea",
        borderRadius: "14px",
        padding: "20px",
        minHeight: "300px",
        boxSizing: "border-box",
    },

    chartHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "22px",
    },

    chartTitle: {
        margin: 0,
        fontSize: "15px",
        fontWeight: "750",
    },

    chartSubtitle: {
        margin: "5px 0 0",
        color: "#8b7d82",
        fontSize: "11px",
    },

    chartEmoji: {
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        background: "#f4e6ec",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    barChart: {
        height: "210px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: "8px",
        paddingTop: "10px",
    },

    barColumn: {
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "7px",
        minWidth: 0,
    },

    barValue: {
        fontSize: "10px",
        fontWeight: "700",
        color: "#8f5a70",
        minHeight: "12px",
        whiteSpace: "nowrap",
    },

    barTrack: {
        width: "100%",
        maxWidth: "38px",
        height: "160px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        background: "#f2ebee",
        borderRadius: "8px",
        overflow: "hidden",
    },

    bookingBar: {
        width: "100%",
        background: "#8f5a70",
        borderRadius:
            "8px 8px 0 0",
        minHeight: 0,
        transition:
            "height 0.3s ease",
    },

    revenueBar: {
        width: "100%",
        background: "#b27d98",
        borderRadius:
            "8px 8px 0 0",
        minHeight: 0,
        transition:
            "height 0.3s ease",
    },

    barLabel: {
        fontSize: "10px",
        color: "#7f7278",
        fontWeight: "600",
    },

    chartLegend: {
        marginTop: "12px",
        color: "#8b7d82",
        fontSize: "11px",
        textAlign: "center",
    },

    horizontalChartList: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginTop: "8px",
    },

    horizontalChartRow: {
        display: "flex",
        flexDirection: "column",
        gap: "7px",
    },

    horizontalChartLabel: {
        display: "grid",
        gridTemplateColumns:
            "24px minmax(0, 1fr) auto",
        alignItems: "center",
        gap: "8px",
        fontSize: "12px",
    },

    horizontalRank: {
        width: "24px",
        height: "24px",
        borderRadius: "7px",
        background: "#f1e5ea",
        color: "#8f5a70",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "10px",
        fontWeight: "800",
    },

    horizontalServiceName: {
        fontWeight: "700",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },

    horizontalServiceCount: {
        fontSize: "10px",
        color: "#8b7d82",
        whiteSpace: "nowrap",
    },

    horizontalBarTrack: {
        width: "100%",
        height: "9px",
        background: "#eee7ea",
        borderRadius: "20px",
        overflow: "hidden",
    },

    horizontalBarFill: {
        height: "100%",
        background: "#8f5a70",
        borderRadius: "20px",
        transition:
            "width 0.3s ease",
    },

    noChartData: {
        minHeight: "190px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#8b7d82",
        fontSize: "13px",
    },

    statusChart: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "20px",
    },

    statusChartRow: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },

    statusChartLabel: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "12px",
        fontWeight: "600",
    },

    statusTrack: {
        width: "100%",
        height: "12px",
        background: "#eee7ea",
        borderRadius: "20px",
        overflow: "hidden",
    },

    statusFill: {
        height: "100%",
        borderRadius: "20px",
        transition:
            "width 0.3s ease",
    },

    statusSummary: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "22px",
        paddingTop: "15px",
        borderTop:
            "1px solid #eee7ea",
        color: "#8b7d82",
        fontSize: "11px",
    },

    /* APPOINTMENTS */

    appointmentGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
        gap: "24px",
        marginBottom: "24px",
    },

    appointmentSection: {
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow:
            "0 4px 20px rgba(60, 35, 45, 0.05)",
    },

    appointmentHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "20px",
    },

    appointmentCount: {
        minWidth: "38px",
        height: "38px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5e6ec",
        color: "#8f5a70",
        fontWeight: "700",
        fontSize: "15px",
    },

    appointmentList: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxHeight: "430px",
        overflowY: "auto",
    },

    appointmentCard: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "14px",
        borderRadius: "12px",
        background: "#fafafa",
        border:
            "1px solid #eeeeee",
    },

    appointmentTime: {
        minWidth: "70px",
        fontSize: "14px",
        fontWeight: "700",
        color: "#8f5a70",
    },

    upcomingDate: {
        minWidth: "105px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        fontSize: "12px",
        color: "#6f6268",
    },

    appointmentDetails: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "3px",
        minWidth: 0,
    },

    emptyAppointment: {
        minHeight: "180px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#777777",
    },

    emptyAppointmentIcon: {
        fontSize: "34px",
        marginBottom: "10px",
    },

    /* BOOKINGS */

    bookingSection: {
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow:
            "0 4px 20px rgba(60, 35, 45, 0.05)",
    },

    sectionHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },

    sectionTitle: {
        margin: 0,
        fontSize: "19px",
        fontWeight: "750",
    },

    sectionSubtitle: {
        margin: "6px 0 0",
        fontSize: "12px",
        color: "#8b7d82",
    },

    bookingTools: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "15px",
        marginBottom: "15px",
    },

    searchBox: {
        display: "flex",
        alignItems: "center",
        width: "min(520px, 100%)",
        border:
            "1px solid #e5dce0",
        borderRadius: "10px",
        background: "#ffffff",
        overflow: "hidden",
    },

    searchIcon: {
        paddingLeft: "13px",
        fontSize: "15px",
    },

    searchInput: {
        flex: 1,
        border: "none",
        outline: "none",
        padding: "12px 10px",
        fontSize: "13px",
        background: "transparent",
    },

    clearSearch: {
        border: "none",
        background: "transparent",
        color: "#9b8b92",
        cursor: "pointer",
        padding: "0 13px",
        fontSize: "14px",
    },

    bookingCount: {
        color: "#84767c",
        fontSize: "12px",
        whiteSpace: "nowrap",
    },

    filterBar: {
        display: "flex",
        gap: "8px",
        marginBottom: "20px",
        flexWrap: "wrap",
    },

    filterButton: {
        border:
            "1px solid #e7dfe3",
        background: "#ffffff",
        color: "#70636a",
        borderRadius: "20px",
        padding: "8px 13px",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        gap: "7px",
    },

    activeFilter: {
        background: "#8f5a70",
        borderColor: "#8f5a70",
        color: "#ffffff",
    },

    filterCount: {
        fontSize: "11px",
        opacity: 0.8,
    },

    /* TABLE */

    tableWrapper: {
        width: "100%",
        overflowX: "auto",
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "1050px",
    },

    th: {
        textAlign: "left",
        padding: "13px 12px",
        background: "#faf8f9",
        color: "#776970",
        fontSize: "11px",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.4px",
        borderBottom:
            "1px solid #eee7ea",
    },

    td: {
        padding: "15px 12px",
        borderBottom:
            "1px solid #f0ebed",
        fontSize: "13px",
        verticalAlign: "middle",
    },

    /* CUSTOMER */

    customerCell: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },

    customerAvatar: {
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        background: "#f1e5ea",
        color: "#8f5a70",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        fontSize: "13px",
        flexShrink: 0,
    },

    customerInfo: {
        display: "flex",
        flexDirection: "column",
        gap: "3px",
    },

    /* SERVICE */

    serviceInfo: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },

    servicePrice: {
        color: "#8f5a70",
        fontSize: "11px",
        fontWeight: "600",
    },

    /* CONTACT */

    contactInfo: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        fontSize: "11px",
    },

    email: {
        color: "#7f7278",
    },

    /* STATUS */

    status: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px 10px",
        borderRadius: "20px",
        fontSize: "10px",
        fontWeight: "700",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
    },

    pending: {
        background: "#fff4d9",
        color: "#9b6b00",
    },

    confirmed: {
        background: "#e3f6ea",
        color: "#287844",
    },

    cancelled: {
        background: "#fde7e7",
        color: "#a33e3e",
    },

    /* ACTIONS */

    actionButtons: {
        display: "flex",
        gap: "6px",
    },

    viewButton: {
        border: "none",
        background: "#f1e5ea",
        color: "#8f5a70",
        borderRadius: "7px",
        padding: "7px 10px",
        cursor: "pointer",
        fontSize: "11px",
        fontWeight: "700",
    },

    confirmButton: {
        border: "none",
        background: "#e3f6ea",
        color: "#287844",
        borderRadius: "7px",
        padding: "7px 10px",
        cursor: "pointer",
        fontSize: "11px",
        fontWeight: "700",
    },

    cancelButton: {
        border: "none",
        background: "#fde7e7",
        color: "#a33e3e",
        borderRadius: "7px",
        padding: "7px 10px",
        cursor: "pointer",
        fontSize: "11px",
        fontWeight: "700",
    },

    noAction: {
        color: "#a59a9f",
        fontSize: "11px",
    },

    /* EMPTY */

    emptyState: {
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#85777d",
    },

    emptyIcon: {
        fontSize: "45px",
        marginBottom: "12px",
    },

    /* BOOKING DETAILS MODAL */

    modalOverlay: {
        position: "fixed",
        inset: 0,
        background:
            "rgba(30, 20, 25, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 9999,
    },

    bookingModal: {
        width: "100%",
        maxWidth: "700px",
        maxHeight: "90vh",
        overflowY: "auto",
        background: "#ffffff",
        borderRadius: "18px",
        padding: "26px",
        boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.2)",
        boxSizing: "border-box",
    },

    modalHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "24px",
        paddingBottom: "18px",
        borderBottom:
            "1px solid #eee7ea",
    },

    modalTitle: {
        margin: 0,
        fontSize: "21px",
        fontWeight: "800",
        color: "#33272d",
    },

    modalSubtitle: {
        margin: "5px 0 0",
        color: "#8b7d82",
        fontSize: "12px",
    },

    closeButton: {
        width: "34px",
        height: "34px",
        border: "none",
        borderRadius: "50%",
        background: "#f4eef1",
        color: "#6f6268",
        fontSize: "23px",
        cursor: "pointer",
        lineHeight: "1",
        flexShrink: 0,
    },

    bookingDetailsGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
        gap: "14px",
    },

    detailBox: {
        background: "#faf7f8",
        border:
            "1px solid #eee7ea",
        borderRadius: "10px",
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        minWidth: 0,
    },

    detailLabel: {
        fontSize: "10px",
        color: "#95878d",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        fontWeight: "700",
    },

    modalActions: {
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        gap: "10px",
        marginTop: "24px",
        paddingTop: "18px",
        borderTop:
            "1px solid #eee7ea",
    },

    modalConfirmButton: {
        border: "none",
        background: "#63b27a",
        color: "#ffffff",
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "12px",
    },

    modalCancelButton: {
        border: "none",
        background: "#d87878",
        color: "#ffffff",
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "12px",
    },

    closeModalButton: {
        border:
            "1px solid #ddd2d7",
        background: "#ffffff",
        color: "#6f6268",
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "12px",
    },

    /* ==========================================
       CONTACT MESSAGES
    ========================================== */

    messagesSection: {
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        marginTop: "24px",
        boxShadow:
            "0 4px 20px rgba(60, 35, 45, 0.05)",
    },

    messageCountBadge: {
        padding: "8px 13px",
        borderRadius: "20px",
        background: "#f4e6ec",
        color: "#8f5a70",
        fontSize: "11px",
        fontWeight: "700",
    },

    messagesList: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },

    messageCard: {
        display: "flex",
        alignItems: "flex-start",
        gap: "14px",
        padding: "16px",
        borderRadius: "12px",
        background: "#fafafa",
        border:
            "1px solid #eeeeee",
    },

    unreadMessageCard: {
        background: "#fff9fb",
        border:
            "1px solid #ead5de",
    },

    messageAvatar: {
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        background: "#f1e5ea",
        color: "#8f5a70",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "800",
        fontSize: "15px",
        flexShrink: 0,
    },

    messageMain: {
        flex: 1,
        minWidth: 0,
    },

    messageTop: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "15px",
        marginBottom: "6px",
    },

    messageSender: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        minWidth: 0,
    },

    unreadMessageBadge: {
        background: "#a33e3e",
        color: "#ffffff",
        borderRadius: "20px",
        padding: "3px 7px",
        fontSize: "8px",
        fontWeight: "800",
    },

    messageDate: {
        color: "#95878d",
        fontSize: "10px",
        whiteSpace: "nowrap",
    },

    messageSubject: {
        display: "block",
        fontSize: "13px",
        color: "#33272d",
        marginBottom: "5px",
    },

    messagePreview: {
        margin: 0,
        color: "#7b6d73",
        fontSize: "12px",
        lineHeight: "1.5",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    },

    messageContact: {
        display: "flex",
        flexWrap: "wrap",
        gap: "14px",
        marginTop: "9px",
        color: "#8f5a70",
        fontSize: "10px",
    },

    messageActions: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        flexShrink: 0,
    },

    viewMessageButton: {
        border: "none",
        background: "#f1e5ea",
        color: "#8f5a70",
        borderRadius: "7px",
        padding: "8px 12px",
        cursor: "pointer",
        fontSize: "10px",
        fontWeight: "700",
    },

    deleteMessageButton: {
        border: "none",
        background: "#fde7e7",
        color: "#a33e3e",
        borderRadius: "7px",
        padding: "8px 12px",
        cursor: "pointer",
        fontSize: "10px",
        fontWeight: "700",
    },

    emptyMessages: {
        minHeight: "220px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#85777d",
    },

    emptyMessagesIcon: {
        fontSize: "42px",
        marginBottom: "12px",
    },

    /* MESSAGE MODAL */

    messageModal: {
        width: "100%",
        maxWidth: "720px",
        maxHeight: "90vh",
        overflowY: "auto",
        background: "#ffffff",
        borderRadius: "18px",
        padding: "26px",
        boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.2)",
        boxSizing: "border-box",
    },

    messageDetails: {
        display: "grid",
        gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
        gap: "14px",
    },

    messageDetailBox: {
        background: "#faf7f8",
        border:
            "1px solid #eee7ea",
        borderRadius: "10px",
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        gap: "7px",
        minWidth: 0,
    },

    messageStatus: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "fit-content",
        padding: "6px 10px",
        borderRadius: "20px",
        fontSize: "10px",
        fontWeight: "700",
    },

    unreadStatus: {
        background: "#fff4d9",
        color: "#9b6b00",
    },

    readStatus: {
        background: "#e3f6ea",
        color: "#287844",
    },

    fullMessage: {
        margin: 0,
        whiteSpace: "pre-wrap",
        lineHeight: "1.7",
        color: "#51454b",
        fontSize: "13px",
    },

    markMessageButton: {
        border: "none",
        background: "#63b27a",
        color: "#ffffff",
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "12px",
    },

    modalDeleteMessageButton: {
        border: "none",
        background: "#d87878",
        color: "#ffffff",
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "12px",
    },

    /* LOADING */

    loadingPage: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f6f7",
        color: "#8f5a70",
    },

    loadingSpinner: {
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        border:
            "4px solid #eadfe4",
        borderTop:
            "4px solid #8f5a70",
        animation:
            "spin 1s linear infinite",
        marginBottom: "12px",
    },
};

export default AdminDashboard;






                                  