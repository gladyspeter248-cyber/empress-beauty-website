import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminServices() {
    const API_URL = "http://localhost:8080/api";

    const navigate = useNavigate();

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        durationMinutes: "",
        category: "",
        available: true,
    });

    // =========================================================
    // ADMIN AUTHENTICATION
    // =========================================================

    const getAdminAuth = () => {
        const adminAuth = sessionStorage.getItem("adminAuth");

        if (!adminAuth) {
            navigate("/admin/login");
            return null;
        }

        return adminAuth;
    };

    // =========================================================
    // FETCH SERVICES
    // GET /services is public
    // =========================================================

    const fetchServices = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API_URL}/services`);

            if (!response.ok) {
                throw new Error("Unable to load services");
            }

            const data = await response.json();

            setServices(data);
        } catch (err) {
            setError(err.message || "Unable to load services");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const adminAuth = sessionStorage.getItem("adminAuth");

        if (!adminAuth) {
            navigate("/admin/login");
            return;
        }

        fetchServices();
    }, [navigate]);

    // =========================================================
    // FORM HANDLING
    // =========================================================

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            price: "",
            durationMinutes: "",
            category: "",
            available: true,
        });

        setEditingId(null);
    };

    // =========================================================
    // ADD / UPDATE SERVICE
    // POST and PUT require ADMIN authentication
    // =========================================================

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        const adminAuth = getAdminAuth();

        if (!adminAuth) {
            return;
        }

        if (!formData.name.trim()) {
            setError("Service name is required.");
            return;
        }

        if (!formData.description.trim()) {
            setError("Service description is required.");
            return;
        }

        if (!formData.price || Number(formData.price) < 0) {
            setError("Please enter a valid service price.");
            return;
        }

        if (
            !formData.durationMinutes ||
            Number(formData.durationMinutes) <= 0
        ) {
            setError("Please enter a valid service duration.");
            return;
        }

        if (!formData.category.trim()) {
            setError("Service category is required.");
            return;
        }

        const serviceData = {
            name: formData.name.trim(),
            description: formData.description.trim(),
            price: Number(formData.price),
            durationMinutes: Number(formData.durationMinutes),
            category: formData.category.trim(),
            available: formData.available,
        };

        try {
            setSaving(true);

            const isEditing = editingId !== null;

            const response = await fetch(
                isEditing
                    ? `${API_URL}/services/${editingId}`
                    : `${API_URL}/services`,
                {
                    method: isEditing ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${adminAuth}`,
                    },
                    body: JSON.stringify(serviceData),
                }
            );

            if (response.status === 401 || response.status === 403) {
                sessionStorage.removeItem("adminAuth");
                sessionStorage.removeItem("adminEmail");

                navigate("/admin/login");
                return;
            }

            if (!response.ok) {
                let message = isEditing
                    ? "Unable to update service."
                    : "Unable to add service.";

                try {
                    const errorData = await response.json();

                    if (errorData.message) {
                        message = errorData.message;
                    }
                } catch {
                    // Keep default error message
                }

                throw new Error(message);
            }

            if (isEditing) {
                setSuccess("Service updated successfully.");
            } else {
                setSuccess("Service added successfully.");
            }

            resetForm();

            await fetchServices();
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setSaving(false);
        }
    };

    // =========================================================
    // EDIT SERVICE
    // =========================================================

    const handleEdit = (service) => {
        setError("");
        setSuccess("");

        setEditingId(service.id);

        setFormData({
            name: service.name || "",
            description: service.description || "",
            price: service.price ?? "",
            durationMinutes: service.durationMinutes ?? "",
            category: service.category || "",
            available:
                service.available === undefined
                    ? true
                    : service.available,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // =========================================================
    // DELETE SERVICE
    // DELETE requires ADMIN authentication
    // =========================================================

    const handleDelete = async (serviceId) => {
        const service = services.find(
            (item) => item.id === serviceId
        );

        const serviceName = service?.name || "this service";

        const confirmed = window.confirm(
            `Are you sure you want to delete "${serviceName}"?`
        );

        if (!confirmed) {
            return;
        }

        setError("");
        setSuccess("");

        const adminAuth = getAdminAuth();

        if (!adminAuth) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/services/${serviceId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Basic ${adminAuth}`,
                    },
                }
            );

            if (response.status === 401 || response.status === 403) {
                sessionStorage.removeItem("adminAuth");
                sessionStorage.removeItem("adminEmail");

                navigate("/admin/login");
                return;
            }

            if (!response.ok) {
                throw new Error("Unable to delete service.");
            }

            setSuccess("Service deleted successfully.");

            await fetchServices();
        } catch (err) {
            setError(err.message || "Unable to delete service.");
        }
    };

    // =========================================================
    // ENABLE / DISABLE SERVICE
    // PUT requires ADMIN authentication
    // =========================================================

    const toggleAvailability = async (service) => {
        setError("");
        setSuccess("");

        const adminAuth = getAdminAuth();

        if (!adminAuth) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/services/${service.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${adminAuth}`,
                    },
                    body: JSON.stringify({
                        name: service.name,
                        description: service.description,
                        price: Number(service.price),
                        durationMinutes: Number(
                            service.durationMinutes
                        ),
                        category: service.category,
                        available: !service.available,
                    }),
                }
            );

            if (response.status === 401 || response.status === 403) {
                sessionStorage.removeItem("adminAuth");
                sessionStorage.removeItem("adminEmail");

                navigate("/admin/login");
                return;
            }

            if (!response.ok) {
                throw new Error(
                    service.available
                        ? "Unable to disable service."
                        : "Unable to enable service."
                );
            }

            setSuccess(
                service.available
                    ? "Service disabled successfully."
                    : "Service enabled successfully."
            );

            await fetchServices();
        } catch (err) {
            setError(
                err.message || "Unable to update service availability."
            );
        }
    };

    // =========================================================
    // STYLES
    // =========================================================

    const styles = {
        page: {
            minHeight: "100vh",
            background: "#faf7f8",
            padding: "40px 24px 80px",
        },

        container: {
            maxWidth: "1200px",
            margin: "0 auto",
        },

        header: {
            marginBottom: "30px",
        },

        title: {
            margin: 0,
            fontSize: "32px",
            fontWeight: "700",
            color: "#2f2529",
        },

        subtitle: {
            marginTop: "8px",
            color: "#766a6f",
            fontSize: "15px",
        },

        card: {
            background: "#ffffff",
            borderRadius: "18px",
            padding: "28px",
            marginBottom: "30px",
            boxShadow: "0 8px 30px rgba(60, 40, 50, 0.08)",
        },

        formTitle: {
            margin: "0 0 22px",
            fontSize: "21px",
            color: "#34282d",
        },

        formGrid: {
            display: "grid",
            gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
        },

        field: {
            display: "flex",
            flexDirection: "column",
            gap: "7px",
        },

        label: {
            fontSize: "13px",
            fontWeight: "600",
            color: "#4c3e44",
        },

        input: {
            width: "100%",
            boxSizing: "border-box",
            padding: "12px 14px",
            border: "1px solid #ddd2d7",
            borderRadius: "10px",
            fontSize: "14px",
            outline: "none",
            background: "#fff",
        },

        textarea: {
            width: "100%",
            boxSizing: "border-box",
            minHeight: "105px",
            padding: "12px 14px",
            border: "1px solid #ddd2d7",
            borderRadius: "10px",
            fontSize: "14px",
            outline: "none",
            resize: "vertical",
            fontFamily: "inherit",
        },

        checkboxRow: {
            display: "flex",
            alignItems: "center",
            gap: "9px",
            marginTop: "8px",
        },

        actions: {
            display: "flex",
            gap: "12px",
            marginTop: "22px",
            flexWrap: "wrap",
        },

        primaryButton: {
            border: "none",
            borderRadius: "10px",
            padding: "12px 22px",
            background: "#8f5f70",
            color: "#ffffff",
            fontWeight: "600",
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.7 : 1,
        },

        secondaryButton: {
            border: "1px solid #d7c8ce",
            borderRadius: "10px",
            padding: "12px 22px",
            background: "#ffffff",
            color: "#594950",
            fontWeight: "600",
            cursor: "pointer",
        },

        message: {
            padding: "13px 16px",
            borderRadius: "10px",
            marginBottom: "20px",
            fontSize: "14px",
        },

        error: {
            background: "#fff0f0",
            color: "#a33b3b",
            border: "1px solid #f0cccc",
        },

        success: {
            background: "#eef9f1",
            color: "#347346",
            border: "1px solid #cde7d3",
        },

        sectionTitle: {
            margin: "0 0 20px",
            fontSize: "22px",
            color: "#34282d",
        },

        grid: {
            display: "grid",
            gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
        },

        serviceCard: {
            background: "#ffffff",
            border: "1px solid #eadfe3",
            borderRadius: "16px",
            padding: "22px",
            boxShadow: "0 5px 18px rgba(60, 40, 50, 0.05)",
        },

        serviceTop: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "12px",
        },

        serviceName: {
            margin: 0,
            fontSize: "19px",
            color: "#34282d",
        },

        category: {
            marginTop: "6px",
            fontSize: "12px",
            fontWeight: "600",
            color: "#8f5f70",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
        },

        description: {
            color: "#6e6267",
            lineHeight: "1.6",
            fontSize: "14px",
            margin: "15px 0",
        },

        price: {
            fontSize: "20px",
            fontWeight: "700",
            color: "#34282d",
        },

        duration: {
            color: "#756970",
            fontSize: "13px",
            marginTop: "5px",
        },

        badge: {
            display: "inline-block",
            padding: "5px 10px",
            borderRadius: "999px",
            fontSize: "11px",
            fontWeight: "700",
            whiteSpace: "nowrap",
        },

        availableBadge: {
            background: "#e9f7ed",
            color: "#337144",
        },

        unavailableBadge: {
            background: "#f9eaea",
            color: "#a34444",
        },

        serviceActions: {
            display: "flex",
            gap: "8px",
            marginTop: "18px",
            flexWrap: "wrap",
        },

        smallButton: {
            border: "1px solid #d8cbd0",
            background: "#ffffff",
            color: "#55474d",
            borderRadius: "8px",
            padding: "9px 12px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "600",
        },

        deleteButton: {
            border: "1px solid #edcccc",
            background: "#fff7f7",
            color: "#a33f3f",
            borderRadius: "8px",
            padding: "9px 12px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "600",
        },

        loading: {
            textAlign: "center",
            padding: "40px",
            color: "#756970",
        },

        empty: {
            textAlign: "center",
            padding: "40px",
            color: "#756970",
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #eadfe3",
        },
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>

                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div style={styles.header}>
                    <h1 style={styles.title}>
                        Manage Services
                    </h1>

                    <p style={styles.subtitle}>
                        Add, edit, enable, disable, and manage
                        Empress Beauty services.
                    </p>
                </div>

                {/* =================================================
                    MESSAGES
                ================================================= */}

                {error && (
                    <div
                        style={{
                            ...styles.message,
                            ...styles.error,
                        }}
                    >
                        {error}
                    </div>
                )}

                {success && (
                    <div
                        style={{
                            ...styles.message,
                            ...styles.success,
                        }}
                    >
                        {success}
                    </div>
                )}

                {/* =================================================
                    ADD / EDIT FORM
                ================================================= */}

                <div style={styles.card}>
                    <h2 style={styles.formTitle}>
                        {editingId !== null
                            ? "Edit Service"
                            : "Add New Service"}
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div style={styles.formGrid}>

                            {/* SERVICE NAME */}

                            <div style={styles.field}>
                                <label style={styles.label}>
                                    Service Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Hair Styling"
                                    style={styles.input}
                                />
                            </div>

                            {/* CATEGORY */}

                            <div style={styles.field}>
                                <label style={styles.label}>
                                    Category
                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="e.g. Hair"
                                    style={styles.input}
                                />
                            </div>

                            {/* PRICE */}

                            <div style={styles.field}>
                                <label style={styles.label}>
                                    Price (TZS)
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="25000"
                                    min="0"
                                    step="0.01"
                                    style={styles.input}
                                />
                            </div>

                            {/* DURATION */}

                            <div style={styles.field}>
                                <label style={styles.label}>
                                    Duration (minutes)
                                </label>

                                <input
                                    type="number"
                                    name="durationMinutes"
                                    value={
                                        formData.durationMinutes
                                    }
                                    onChange={handleChange}
                                    placeholder="60"
                                    min="1"
                                    style={styles.input}
                                />
                            </div>

                        </div>

                        {/* DESCRIPTION */}

                        <div
                            style={{
                                ...styles.field,
                                marginTop: "18px",
                            }}
                        >
                            <label style={styles.label}>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe this beauty service..."
                                style={styles.textarea}
                            />
                        </div>

                        {/* AVAILABILITY */}

                        <div style={styles.checkboxRow}>
                            <input
                                type="checkbox"
                                name="available"
                                checked={formData.available}
                                onChange={handleChange}
                                id="available"
                            />

                            <label
                                htmlFor="available"
                                style={styles.label}
                            >
                                Service is available for booking
                            </label>
                        </div>

                        {/* FORM BUTTONS */}

                        <div style={styles.actions}>

                            <button
                                type="submit"
                                style={styles.primaryButton}
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : editingId !== null
                                    ? "Update Service"
                                    : "Add Service"}
                            </button>

                            {editingId !== null && (
                                <button
                                    type="button"
                                    style={styles.secondaryButton}
                                    onClick={resetForm}
                                >
                                    Cancel Edit
                                </button>
                            )}

                        </div>
                    </form>
                </div>

                {/* =================================================
                    SERVICES
                ================================================= */}

                <section>
                    <h2 style={styles.sectionTitle}>
                        Existing Services
                    </h2>

                    {loading ? (
                        <div style={styles.loading}>
                            Loading services...
                        </div>
                    ) : services.length === 0 ? (
                        <div style={styles.empty}>
                            No services have been added yet.
                        </div>
                    ) : (
                        <div style={styles.grid}>

                            {services.map((service) => (

                                <div
                                    key={service.id}
                                    style={styles.serviceCard}
                                >

                                    {/* TOP */}

                                    <div
                                        style={styles.serviceTop}
                                    >

                                        <div>
                                            <h3
                                                style={
                                                    styles.serviceName
                                                }
                                            >
                                                {service.name}
                                            </h3>

                                            <div
                                                style={
                                                    styles.category
                                                }
                                            >
                                                {service.category}
                                            </div>
                                        </div>

                                        <span
                                            style={{
                                                ...styles.badge,
                                                ...(service.available
                                                    ? styles.availableBadge
                                                    : styles.unavailableBadge),
                                            }}
                                        >
                                            {service.available
                                                ? "AVAILABLE"
                                                : "DISABLED"}
                                        </span>

                                    </div>

                                    {/* DESCRIPTION */}

                                    <p
                                        style={
                                            styles.description
                                        }
                                    >
                                        {service.description}
                                    </p>

                                    {/* PRICE */}

                                    <div style={styles.price}>
                                        TZS{" "}
                                        {Number(
                                            service.price
                                        ).toLocaleString()}
                                    </div>

                                    {/* DURATION */}

                                    <div
                                        style={styles.duration}
                                    >
                                        Duration:{" "}
                                        {
                                            service.durationMinutes
                                        }{" "}
                                        minutes
                                    </div>

                                    {/* ACTIONS */}

                                    <div
                                        style={
                                            styles.serviceActions
                                        }
                                    >

                                        <button
                                            type="button"
                                            style={
                                                styles.smallButton
                                            }
                                            onClick={() =>
                                                handleEdit(
                                                    service
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            style={
                                                styles.smallButton
                                            }
                                            onClick={() =>
                                                toggleAvailability(
                                                    service
                                                )
                                            }
                                        >
                                            {service.available
                                                ? "Disable"
                                                : "Enable"}
                                        </button>

                                        <button
                                            type="button"
                                            style={
                                                styles.deleteButton
                                            }
                                            onClick={() =>
                                                handleDelete(
                                                    service.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>
                    )}
                </section>

            </div>
        </div>
    );
}

export default AdminServices;