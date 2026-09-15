import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // ==========================================
    // HANDLE INPUT CHANGES
    // ==========================================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // ==========================================
    // HANDLE LOGIN
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/customers/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Invalid email or password."
                );
            }

            // ==========================================
            // SAVE CUSTOMER LOGIN INFORMATION
            // ==========================================

            sessionStorage.setItem(
                "customerAuth",
                "true"
            );

            sessionStorage.setItem(
                "customer",
                JSON.stringify(data.customer)
            );

            // ==========================================
            // NOTIFY NAVBAR THAT CUSTOMER LOGGED IN
            // ==========================================

            window.dispatchEvent(
                new Event("customerAuthChanged")
            );

            // ==========================================
            // SUCCESS MESSAGE
            // ==========================================

            setSuccess(
                "Login successful! Welcome to Empress Beauty."
            );

            // ==========================================
            // REDIRECT TO HOME
            // ==========================================

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {
            setError(
                error.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>

            {/* ==================================
                LOGIN CARD
            ================================== */}

            <div style={styles.card}>

                {/* ==================================
                    HEADER
                ================================== */}

                <div style={styles.header}>

                    <div style={styles.logo}>
                        EMPRESS
                    </div>

                    <div style={styles.logoSub}>
                        BEAUTY
                    </div>

                    <h1 style={styles.title}>
                        Welcome Back
                    </h1>

                    <p style={styles.subtitle}>
                        Log in to your Empress Beauty account
                        and continue your beauty journey.
                    </p>

                </div>


                {/* ==================================
                    ERROR MESSAGE
                ================================== */}

                {error && (
                    <div style={styles.error}>
                        {error}
                    </div>
                )}


                {/* ==================================
                    SUCCESS MESSAGE
                ================================== */}

                {success && (
                    <div style={styles.success}>
                        {success}
                    </div>
                )}


                {/* ==================================
                    LOGIN FORM
                ================================== */}

                <form onSubmit={handleSubmit}>

                    {/* EMAIL */}

                    <div style={styles.formGroup}>

                        <label style={styles.label}>
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                            style={styles.input}
                        />

                    </div>


                    {/* PASSWORD */}

                    <div style={styles.formGroup}>

                        <label style={styles.label}>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            style={styles.input}
                        />

                    </div>


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.button,
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading
                            ? "Logging in..."
                            : "Log In"}
                    </button>

                </form>


                {/* ==================================
                    REGISTER LINK
                ================================== */}

                <div style={styles.registerText}>

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        style={styles.registerLink}
                    >
                        Create an account
                    </Link>

                </div>


                {/* ==================================
                    BACK TO WEBSITE
                ================================== */}

                <div style={styles.backLinkContainer}>

                    <Link
                        to="/"
                        style={styles.backLink}
                    >
                        ← Back to Empress Beauty
                    </Link>

                </div>

            </div>

        </div>
    );
}


// ==================================================
// STYLES
// ==================================================

const styles = {

    page: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        background:
            "linear-gradient(135deg, #fff8f9 0%, #f8eef2 100%)",
        boxSizing: "border-box"
    },

    card: {
        width: "100%",
        maxWidth: "520px",
        background: "#ffffff",
        padding: "45px",
        borderRadius: "18px",
        boxShadow:
            "0 15px 45px rgba(0, 0, 0, 0.10)",
        boxSizing: "border-box"
    },

    header: {
        textAlign: "center",
        marginBottom: "30px"
    },

    logo: {
        fontSize: "26px",
        fontWeight: "700",
        letterSpacing: "5px",
        color: "#222"
    },

    logoSub: {
        fontSize: "12px",
        letterSpacing: "6px",
        marginTop: "4px",
        color: "#b07a88"
    },

    title: {
        marginTop: "28px",
        marginBottom: "10px",
        fontSize: "30px",
        fontWeight: "600",
        color: "#222"
    },

    subtitle: {
        margin: "0",
        lineHeight: "1.6",
        color: "#777",
        fontSize: "14px"
    },

    formGroup: {
        marginBottom: "20px"
    },

    label: {
        display: "block",
        marginBottom: "8px",
        fontSize: "14px",
        fontWeight: "600",
        color: "#333"
    },

    input: {
        width: "100%",
        padding: "14px 15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontSize: "15px",
        outline: "none",
        boxSizing: "border-box"
    },

    button: {
        width: "100%",
        border: "none",
        borderRadius: "8px",
        padding: "15px",
        marginTop: "5px",
        background: "#222",
        color: "#fff",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer"
    },

    error: {
        background: "#fff0f0",
        color: "#b42318",
        border: "1px solid #f3c2c2",
        padding: "12px 14px",
        borderRadius: "8px",
        marginBottom: "20px",
        fontSize: "14px"
    },

    success: {
        background: "#effaf1",
        color: "#217a35",
        border: "1px solid #b9dfc0",
        padding: "12px 14px",
        borderRadius: "8px",
        marginBottom: "20px",
        fontSize: "14px"
    },

    registerText: {
        textAlign: "center",
        marginTop: "25px",
        fontSize: "14px",
        color: "#666"
    },

    registerLink: {
        color: "#a35c70",
        fontWeight: "600",
        textDecoration: "none"
    },

    backLinkContainer: {
        textAlign: "center",
        marginTop: "22px",
        paddingTop: "20px",
        borderTop: "1px solid #eee"
    },

    backLink: {
        color: "#777",
        textDecoration: "none",
        fontSize: "13px"
    }
};