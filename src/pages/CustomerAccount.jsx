
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LeaveReview from "../components/LeaveReview";

const API_URL = "http://localhost:8080/api";

export default function CustomerAccount() {
    const navigate = useNavigate();

    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    // ==========================================
    // LOAD CUSTOMER
    // ==========================================

    useEffect(() => {
        const auth =
            sessionStorage.getItem("customerAuth");

        const storedCustomer =
            sessionStorage.getItem("customer");

        if (
            auth !== "true" ||
            !storedCustomer
        ) {
            navigate("/login");
            return;
        }

        try {
            const parsedCustomer =
                JSON.parse(storedCustomer);

            setCustomer(parsedCustomer);
        } catch (error) {
            console.error(
                "Unable to load customer:",
                error
            );

            sessionStorage.removeItem("customer");
            sessionStorage.removeItem("customerAuth");

            navigate("/login");
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {
        sessionStorage.removeItem("customerAuth");
        sessionStorage.removeItem("customer");

        window.dispatchEvent(
            new Event("customerAuthChanged")
        );

        navigate("/");
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div style={styles.loadingPage}>
                <div style={styles.loadingText}>
                    Loading your account...
                </div>
            </div>
        );
    }

    // ==========================================
    // SAFETY CHECK
    // ==========================================

    if (!customer) {
        return null;
    }

    const customerName =
        customer.fullName ||
        customer.name ||
        "Empress Beauty Client";

    const customerEmail =
        customer.email || "Email not available";

    const customerPhone =
        customer.phone || "Phone not available";

    return (
        <main style={styles.page}>

            {/* ==================================
                ACCOUNT HEADER
            ================================== */}

            <section style={styles.hero}>

                <div style={styles.heroInner}>

                    <div style={styles.heroText}>

                        <span style={styles.label}>
                            MY ACCOUNT
                        </span>

                        <h1 style={styles.heroTitle}>
                            Welcome,
                            <br />
                            <em>{customerName}</em>
                        </h1>

                        <p style={styles.heroDescription}>
                            Manage your Empress Beauty
                            experience and share your
                            thoughts with us.
                        </p>

                    </div>

                    <div style={styles.avatar}>
                        {customerName
                            .charAt(0)
                            .toUpperCase()}
                    </div>

                </div>

            </section>


            {/* ==================================
                ACCOUNT CONTENT
            ================================== */}

            <section style={styles.content}>

                <div style={styles.container}>

                    {/* ==================================
                        ACCOUNT INFORMATION
                    ================================== */}

                    <div style={styles.infoCard}>

                        <div style={styles.cardHeader}>

                            <div>
                                <span style={styles.smallLabel}>
                                    ACCOUNT
                                </span>

                                <h2 style={styles.cardTitle}>
                                    Your Information
                                </h2>
                            </div>

                            <button
                                onClick={handleLogout}
                                style={styles.logoutButton}
                            >
                                Log Out
                            </button>

                        </div>


                        <div style={styles.infoGrid}>

                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>
                                    Full Name
                                </span>

                                <strong style={styles.infoValue}>
                                    {customerName}
                                </strong>
                            </div>


                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>
                                    Email
                                </span>

                                <strong style={styles.infoValue}>
                                    {customerEmail}
                                </strong>
                            </div>


                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>
                                    Phone
                                </span>

                                <strong style={styles.infoValue}>
                                    {customerPhone}
                                </strong>
                            </div>

                        </div>

                    </div>


                    {/* ==================================
                        QUICK ACTIONS
                    ================================== */}

                    <div style={styles.actionsGrid}>

                        <Link
                            to="/booking"
                            style={styles.actionCard}
                        >
                            <span style={styles.actionNumber}>
                                01
                            </span>

                            <div>
                                <h3 style={styles.actionTitle}>
                                    Book an Appointment
                                </h3>

                                <p style={styles.actionText}>
                                    Reserve your next
                                    beauty experience.
                                </p>
                            </div>

                            <span style={styles.actionArrow}>
                                ↗
                            </span>
                        </Link>


                        <Link
                            to="/"
                            style={styles.actionCard}
                        >
                            <span style={styles.actionNumber}>
                                02
                            </span>

                            <div>
                                <h3 style={styles.actionTitle}>
                                    Explore Empress
                                </h3>

                                <p style={styles.actionText}>
                                    Discover our services
                                    and latest beauty inspiration.
                                </p>
                            </div>

                            <span style={styles.actionArrow}>
                                ↗
                            </span>
                        </Link>

                    </div>


                    {/* ==================================
                        LEAVE REVIEW
                    ================================== */}

                    <div style={styles.reviewWrapper}>

                        <LeaveReview />

                    </div>


                    {/* ==================================
                        BACK HOME
                    ================================== */}

                    <div style={styles.backHome}>
                        <Link
                            to="/"
                            style={styles.backHomeLink}
                        >
                            ← Back to Empress Beauty
                        </Link>
                    </div>

                </div>

            </section>

        </main>
    );
}


// ==================================================
// STYLES
// ==================================================

const styles = {

    page: {
        minHeight: "100vh",
        background: "#fffaf8",
        color: "#2d2523"
    },

    loadingPage: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fffaf8"
    },

    loadingText: {
        fontSize: "15px",
        color: "#746966"
    },


    // ==========================================
    // HERO
    // ==========================================

    hero: {
        width: "100%",
        padding: "110px 20px 90px",
        background:
            "linear-gradient(135deg, #fff8f9 0%, #f7ecef 100%)",
        boxSizing: "border-box"
    },

    heroInner: {
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "50px"
    },

    heroText: {
        maxWidth: "720px"
    },

    label: {
        display: "inline-block",
        marginBottom: "16px",
        fontSize: "13px",
        fontWeight: "700",
        letterSpacing: "3px",
        textTransform: "uppercase",
        color: "#b47b72"
    },

    heroTitle: {
        margin: "0 0 20px",
        fontFamily:
            'Georgia, "Times New Roman", serif',
        fontSize: "clamp(42px, 6vw, 70px)",
        lineHeight: "1.08",
        fontWeight: "500",
        color: "#2d2523"
    },

    heroDescription: {
        maxWidth: "600px",
        margin: "0",
        fontSize: "16px",
        lineHeight: "1.8",
        color: "#746966"
    },

    avatar: {
        width: "110px",
        height: "110px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: "#ead2cc",
        color: "#674b45",
        fontSize: "42px",
        fontWeight: "600",
        boxShadow:
            "0 12px 30px rgba(80, 50, 45, 0.10)"
    },


    // ==========================================
    // CONTENT
    // ==========================================

    content: {
        width: "100%",
        padding: "70px 20px 100px",
        boxSizing: "border-box"
    },

    container: {
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto"
    },


    // ==========================================
    // INFORMATION CARD
    // ==========================================

    infoCard: {
        padding: "35px",
        background: "#ffffff",
        border: "1px solid #eee2df",
        boxShadow:
            "0 12px 35px rgba(80, 50, 45, 0.05)",
        boxSizing: "border-box"
    },

    cardHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        paddingBottom: "25px",
        marginBottom: "25px",
        borderBottom: "1px solid #eee5e2"
    },

    smallLabel: {
        display: "block",
        marginBottom: "7px",
        fontSize: "11px",
        fontWeight: "700",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#b47b72"
    },

    cardTitle: {
        margin: "0",
        fontFamily:
            'Georgia, "Times New Roman", serif',
        fontSize: "30px",
        fontWeight: "500",
        color: "#2d2523"
    },

    logoutButton: {
        padding: "11px 20px",
        border: "1px solid #d8c8c4",
        background: "#ffffff",
        color: "#493e3a",
        fontSize: "12px",
        fontWeight: "700",
        letterSpacing: "1px",
        textTransform: "uppercase",
        cursor: "pointer"
    },

    infoGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
        gap: "25px"
    },

    infoItem: {
        display: "flex",
        flexDirection: "column",
        gap: "7px"
    },

    infoLabel: {
        fontSize: "12px",
        color: "#8a7974",
        textTransform: "uppercase",
        letterSpacing: "1px"
    },

    infoValue: {
        fontSize: "15px",
        color: "#2d2523",
        wordBreak: "break-word"
    },


    // ==========================================
    // ACTIONS
    // ==========================================

    actionsGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
        gap: "20px",
        marginTop: "25px"
    },

    actionCard: {
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        gap: "18px",
        padding: "28px",
        background: "#ffffff",
        border: "1px solid #eee2df",
        textDecoration: "none",
        color: "#2d2523",
        boxSizing: "border-box",
        transition:
            "transform 0.25s ease, box-shadow 0.25s ease"
    },

    actionNumber: {
        fontSize: "12px",
        fontWeight: "700",
        color: "#b47b72"
    },

    actionTitle: {
        margin: "0 0 7px",
        fontFamily:
            'Georgia, "Times New Roman", serif',
        fontSize: "22px",
        fontWeight: "500"
    },

    actionText: {
        margin: "0",
        fontSize: "14px",
        lineHeight: "1.6",
        color: "#746966"
    },

    actionArrow: {
        position: "absolute",
        top: "25px",
        right: "25px",
        fontSize: "20px",
        color: "#b47b72"
    },


    // ==========================================
    // REVIEW
    // ==========================================

    reviewWrapper: {
        marginTop: "70px"
    },


    // ==========================================
    // BACK HOME
    // ==========================================

    backHome: {
        textAlign: "center",
        marginTop: "50px"
    },

    backHomeLink: {
        color: "#746966",
        fontSize: "13px",
        textDecoration: "none"
    }
};

