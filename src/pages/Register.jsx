import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api";

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/customers/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fullName: formData.fullName,
                        phone: formData.phone,
                        email: formData.email,
                        password: formData.password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Registration failed."
                );
            }

            setSuccess(
                "Your Empress Beauty account has been created successfully!"
            );

            setFormData({
                fullName: "",
                phone: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            setTimeout(() => {
                navigate("/login");
            }, 1500);

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

            <div style={styles.card}>

                {/* HEADER */}

                <div style={styles.header}>

                    <div style={styles.logo}>
                        EMPRESS
                    </div>

                    <div style={styles.logoSub}>
                        BEAUTY
                    </div>

                    <h1 style={styles.title}>
                        Create Your Account
                    </h1>

                    <p style={styles.subtitle}>
                        Join Empress Beauty and make your beauty
                        experience even more personal.
                    </p>

                </div>


                {/* ERROR */}

                {error && (
                    <div style={styles.error}>
                        {error}
                    </div>
                )}


                {/* SUCCESS */}

                {success && (
                    <div style={styles.success}>
                        {success}
                    </div>
                )}


                {/* FORM */}

                <form onSubmit={handleSubmit}>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                            style={styles.input}
                        />
                    </div>


                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+255 7XXXXXXXX"
                            required
                            style={styles.input}
                        />
                    </div>


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


                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="At least 8 characters"
                            required
                            style={styles.input}
                        />
                    </div>


                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Enter your password again"
                            required
                            style={styles.input}
                        />
                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.button,
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>


                {/* LOGIN LINK */}

                <div style={styles.loginText}>

                    Already have an account?

                    {" "}

                    <Link
                        to="/login"
                        style={styles.loginLink}
                    >
                        Log in
                    </Link>

                </div>


                {/* BACK TO WEBSITE */}

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


/* ==========================================
   STYLES
========================================== */

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

    loginText: {
        textAlign: "center",
        marginTop: "25px",
        fontSize: "14px",
        color: "#666"
    },

    loginLink: {
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