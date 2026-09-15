
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const credentials = btoa(`${email}:${password}`);

            const response = await fetch(
                "http://localhost:8080/api/admin/dashboard",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Basic ${credentials}`,
                    },
                }
            );

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error(
                        "Invalid email or password"
                    );
                }

                throw new Error(
                    "Unable to login"
                );
            }

            const data = await response.json();

            sessionStorage.setItem(
                "adminAuth",
                credentials
            );

            sessionStorage.setItem(
                "adminEmail",
                data.email
            );

            // =====================================
            // REDIRECT TO ADMIN DASHBOARD
            // =====================================

            navigate("/admin/dashboard");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>

            <div style={styles.card}>

                <div style={styles.logo}>
                    EB
                </div>

                <h1 style={styles.title}>
                    Empress Beauty
                </h1>

                <p style={styles.subtitle}>
                    Admin Login
                </p>

                {error && (
                    <div style={styles.error}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>

                    <div style={styles.formGroup}>

                        <label style={styles.label}>
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            placeholder="Enter admin email"
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
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Enter password"
                            required
                            style={styles.input}
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.button,
                            opacity: loading ? 0.7 : 1,
                            cursor: loading
                                ? "not-allowed"
                                : "pointer",
                        }}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign In"}
                    </button>

                </form>

            </div>

        </div>
    );
}

const styles = {

    page: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8f5f2",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },

    card: {
        width: "100%",
        maxWidth: "420px",
        background: "#ffffff",
        padding: "40px",
        borderRadius: "16px",
        boxShadow:
            "0 10px 35px rgba(0, 0, 0, 0.08)",
    },

    logo: {
        width: "70px",
        height: "70px",
        margin: "0 auto 20px",
        borderRadius: "50%",
        background: "#333",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        fontWeight: "bold",
    },

    title: {
        textAlign: "center",
        margin: "0",
        fontSize: "28px",
        color: "#333",
    },

    subtitle: {
        textAlign: "center",
        margin: "8px 0 30px",
        color: "#777",
    },

    error: {
        background: "#ffe5e5",
        color: "#b00020",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "20px",
        fontSize: "14px",
    },

    formGroup: {
        marginBottom: "20px",
    },

    label: {
        display: "block",
        marginBottom: "8px",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#444",
    },

    input: {
        width: "100%",
        boxSizing: "border-box",
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontSize: "15px",
        outline: "none",
    },

    button: {
        width: "100%",
        padding: "13px",
        border: "none",
        borderRadius: "8px",
        background: "#333",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "bold",
    },
};

export default AdminLogin;

