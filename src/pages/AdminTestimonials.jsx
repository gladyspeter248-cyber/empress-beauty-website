
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api";

function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [actionLoading, setActionLoading] =
    useState(null);

  const [filter, setFilter] =
    useState("ALL");

  // ==========================================
  // ADMIN AUTH
  // ==========================================

  const getAuthHeaders = () => {
    const adminEmail =
      sessionStorage.getItem("adminEmail");

    const adminPassword =
      sessionStorage.getItem("adminPassword");

    if (
      adminEmail &&
      adminPassword
    ) {
      return {
        Authorization:
          "Basic " +
          btoa(
            `${adminEmail}:${adminPassword}`
          ),
      };
    }

    return {};
  };

  // ==========================================
  // FETCH TESTIMONIALS
  // ==========================================

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await fetch(
          `${API_URL}/testimonials`
        );

      if (!response.ok) {
        throw new Error(
          "Failed to load testimonials."
        );
      }

      const data =
        await response.json();

      if (Array.isArray(data)) {
        setTestimonials(data);
      } else {
        setTestimonials([]);
      }

    } catch (err) {

      console.error(
        "Error loading testimonials:",
        err
      );

      setError(
        "Unable to load testimonials. Please try again."
      );

    } finally {

      setLoading(false);
    }
  };

  // ==========================================
  // LOAD PAGE
  // ==========================================

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ==========================================
  // APPROVE TESTIMONIAL
  // ==========================================

  const approveTestimonial =
    async (id) => {

      try {

        setActionLoading(id);

        const response =
          await fetch(
            `${API_URL}/testimonials/${id}/approve`,
            {
              method: "PUT",
              headers: {
                ...getAuthHeaders(),
              },
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to approve testimonial."
          );
        }

        const updated =
          await response.json();

        setTestimonials(
          (current) =>
            current.map(
              (item) =>
                item.id === id
                  ? updated
                  : item
            )
        );

      } catch (err) {

        console.error(
          "Approve error:",
          err
        );

        alert(
          "Could not approve this review."
        );

      } finally {

        setActionLoading(null);
      }
    };

  // ==========================================
  // REJECT TESTIMONIAL
  // ==========================================

  const rejectTestimonial =
    async (id) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to reject this review?"
        );

      if (!confirmed) {
        return;
      }

      try {

        setActionLoading(id);

        const response =
          await fetch(
            `${API_URL}/testimonials/${id}/reject`,
            {
              method: "PUT",
              headers: {
                ...getAuthHeaders(),
              },
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to reject testimonial."
          );
        }

        const updated =
          await response.json();

        setTestimonials(
          (current) =>
            current.map(
              (item) =>
                item.id === id
                  ? updated
                  : item
            )
        );

      } catch (err) {

        console.error(
          "Reject error:",
          err
        );

        alert(
          "Could not reject this review."
        );

      } finally {

        setActionLoading(null);
      }
    };

  // ==========================================
  // DELETE TESTIMONIAL
  // ==========================================

  const deleteTestimonial =
    async (id) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to permanently delete this review?"
        );

      if (!confirmed) {
        return;
      }

      try {

        setActionLoading(id);

        const response =
          await fetch(
            `${API_URL}/testimonials/${id}`,
            {
              method: "DELETE",
              headers: {
                ...getAuthHeaders(),
              },
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to delete testimonial."
          );
        }

        setTestimonials(
          (current) =>
            current.filter(
              (item) =>
                item.id !== id
            )
        );

      } catch (err) {

        console.error(
          "Delete error:",
          err
        );

        alert(
          "Could not delete this review."
        );

      } finally {

        setActionLoading(null);
      }
    };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (
    date
  ) => {

    if (!date) {
      return "—";
    }

    try {

      return new Date(
        date
      ).toLocaleDateString(
        "en-TZ",
        {
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
  // FILTER
  // ==========================================

  const filteredTestimonials =
    testimonials.filter(
      (testimonial) => {

        if (filter === "ALL") {
          return true;
        }

        return (
          testimonial.status?.toUpperCase() ===
          filter
        );
      }
    );

  // ==========================================
  // COUNTS
  // ==========================================

  const pendingCount =
    testimonials.filter(
      (item) =>
        item.status?.toUpperCase() ===
        "PENDING"
    ).length;

  const approvedCount =
    testimonials.filter(
      (item) =>
        item.status?.toUpperCase() ===
        "APPROVED"
    ).length;

  const rejectedCount =
    testimonials.filter(
      (item) =>
        item.status?.toUpperCase() ===
        "REJECTED"
    ).length;

  // ==========================================
  // STATUS STYLE
  // ==========================================

  const getStatusStyle = (
    status
  ) => {

    const normalized =
      status?.toUpperCase();

    if (
      normalized ===
      "APPROVED"
    ) {

      return {
        background:
          "#e8f7ed",
        color:
          "#218739",
      };
    }

    if (
      normalized ===
      "REJECTED"
    ) {

      return {
        background:
          "#fdecec",
        color:
          "#c62828",
      };
    }

    return {
      background:
        "#fff5df",
      color:
        "#a66a00",
    };
  };

  // ==========================================
  // RENDER STARS
  // ==========================================

  const renderStars = (
    rating
  ) => {

    return (
      <span
        style={{
          letterSpacing:
            "2px",
          fontSize:
            "18px",
        }}
      >
        {[1, 2, 3, 4, 5].map(
          (star) => (
            <span
              key={star}
            >
              {star <= rating
                ? "★"
                : "☆"}
            </span>
          )
        )}
      </span>
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div
        style={styles.page}
      >
        <div
          style={styles.loading}
        >
          Loading testimonials...
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div
      style={styles.page}
    >

      <div
        style={styles.container}
      >

        {/* =====================================
            HEADER
        ===================================== */}

        <div
          style={styles.header}
        >

          <div>

            <p
              style={
                styles.eyebrow
              }
            >
              CUSTOMER FEEDBACK
            </p>

            <h1
              style={
                styles.title
              }
            >
              Testimonials
            </h1>

            <p
              style={
                styles.subtitle
              }
            >
              Manage customer reviews
              before they appear on
              the Empress Beauty
              website.
            </p>

          </div>

          <button
            onClick={
              fetchTestimonials
            }
            style={
              styles.refreshButton
            }
          >
            ↻ Refresh
          </button>

        </div>

        {/* =====================================
            ERROR
        ===================================== */}

        {error && (

          <div
            style={
              styles.error
            }
          >

            <span>
              {error}
            </span>

            <button
              onClick={
                fetchTestimonials
              }
              style={
                styles.retryButton
              }
            >
              Try Again
            </button>

          </div>

        )}

        {/* =====================================
            STATISTICS
        ===================================== */}

        <div
          style={
            styles.statsGrid
          }
        >

          {/* TOTAL */}

          <div
            style={
              styles.statCard
            }
          >

            <div
              style={
                styles.statIcon
              }
            >
              💬
            </div>

            <div>

              <p
                style={
                  styles.statLabel
                }
              >
                Total Reviews
              </p>

              <h2
                style={
                  styles.statNumber
                }
              >
                {testimonials.length}
              </h2>

            </div>

          </div>

          {/* PENDING */}

          <div
            style={
              styles.statCard
            }
          >

            <div
              style={
                styles.statIcon
              }
            >
              🟡
            </div>

            <div>

              <p
                style={
                  styles.statLabel
                }
              >
                Pending
              </p>

              <h2
                style={
                  styles.statNumber
                }
              >
                {pendingCount}
              </h2>

            </div>

          </div>

          {/* APPROVED */}

          <div
            style={
              styles.statCard
            }
          >

            <div
              style={
                styles.statIcon
              }
            >
              ✅
            </div>

            <div>

              <p
                style={
                  styles.statLabel
                }
              >
                Approved
              </p>

              <h2
                style={
                  styles.statNumber
                }
              >
                {approvedCount}
              </h2>

            </div>

          </div>

          {/* REJECTED */}

          <div
            style={
              styles.statCard
            }
          >

            <div
              style={
                styles.statIcon
              }
            >
              ❌
            </div>

            <div>

              <p
                style={
                  styles.statLabel
                }
              >
                Rejected
              </p>

              <h2
                style={
                  styles.statNumber
                }
              >
                {rejectedCount}
              </h2>

            </div>

          </div>

        </div>

        {/* =====================================
            FILTER BAR
        ===================================== */}

        <div
          style={
            styles.filterBar
          }
        >

          <div>

            <h2
              style={
                styles.sectionTitle
              }
            >
              Customer Reviews
            </h2>

            <p
              style={
                styles.sectionSubtitle
              }
            >
              Review and manage
              customer feedback.
            </p>

          </div>

          <div
            style={
              styles.filterButtons
            }
          >

            {[
              "ALL",
              "PENDING",
              "APPROVED",
              "REJECTED",
            ].map(
              (option) => (

                <button
                  key={
                    option
                  }
                  onClick={() =>
                    setFilter(
                      option
                    )
                  }
                  style={{
                    ...styles.filterButton,

                    ...(filter ===
                    option
                      ? styles.filterButtonActive
                      : {}),
                  }}
                >
                  {option ===
                  "ALL"
                    ? "All"
                    : option
                        .charAt(
                          0
                        )
                        .toUpperCase() +
                      option
                        .slice(
                          1
                        )
                        .toLowerCase()}
                </button>

              )
            )}

          </div>

        </div>

        {/* =====================================
            EMPTY STATE
        ===================================== */}

        {filteredTestimonials.length ===
          0 && (

          <div
            style={
              styles.empty
            }
          >

            <div
              style={
                styles.emptyIcon
              }
            >
              💬
            </div>

            <h3
              style={
                styles.emptyTitle
              }
            >
              No reviews found
            </h3>

            <p
              style={
                styles.emptyText
              }
            >
              There are no testimonials
              matching this filter.
            </p>

          </div>

        )}

        {/* =====================================
            REVIEW GRID
        ===================================== */}

        <div
          style={
            styles.reviewGrid
          }
        >

          {filteredTestimonials.map(
            (testimonial) => {

              const status =
                testimonial.status?.toUpperCase() ||
                "PENDING";

              const busy =
                actionLoading ===
                testimonial.id;

              return (

                <div
                  key={
                    testimonial.id
                  }
                  style={
                    styles.reviewCard
                  }
                >

                  {/* CARD HEADER */}

                  <div
                    style={
                      styles.cardHeader
                    }
                  >

                    <div
                      style={
                        styles.customerAvatar
                      }
                    >
                      {(
                        testimonial.customerName ||
                        "C"
                      )
                        .charAt(
                          0
                        )
                        .toUpperCase()}
                    </div>

                    <div
                      style={
                        styles.customerInfo
                      }
                    >

                      <h3
                        style={
                          styles.customerName
                        }
                      >
                        {
                          testimonial.customerName
                        }
                      </h3>

                      <p
                        style={
                          styles.reviewDate
                        }
                      >
                        {formatDate(
                          testimonial.createdAt
                        )}
                      </p>

                    </div>

                    <span
                      style={{
                        ...styles.status,

                        ...getStatusStyle(
                          status
                        ),
                      }}
                    >
                      {status}
                    </span>

                  </div>

                  {/* RATING */}

                  <div
                    style={
                      styles.rating
                    }
                  >
                    {renderStars(
                      testimonial.rating
                    )}
                  </div>

                  {/* SERVICE */}

                  {testimonial.serviceName && (

                    <div
                      style={
                        styles.service
                      }
                    >
                      Service:{" "}
                      <strong>
                        {
                          testimonial.serviceName
                        }
                      </strong>
                    </div>

                  )}

                  {/* COMMENT */}

                  <div
                    style={
                      styles.commentBox
                    }
                  >

                    <span
                      style={
                        styles.quote
                      }
                    >
                      "
                    </span>

                    <p
                      style={
                        styles.comment
                      }
                    >
                      {
                        testimonial.comment
                      }
                    </p>

                  </div>

                  {/* ACTIONS */}

                  <div
                    style={
                      styles.actions
                    }
                  >

                    {status !==
                      "APPROVED" && (

                      <button
                        onClick={() =>
                          approveTestimonial(
                            testimonial.id
                          )
                        }
                        disabled={
                          busy
                        }
                        style={{
                          ...styles.approveButton,

                          ...(busy
                            ? styles.disabledButton
                            : {}),
                        }}
                      >
                        {busy
                          ? "Please wait..."
                          : "✓ Approve"}
                      </button>

                    )}

                    {status !==
                      "REJECTED" && (

                      <button
                        onClick={() =>
                          rejectTestimonial(
                            testimonial.id
                          )
                        }
                        disabled={
                          busy
                        }
                        style={{
                          ...styles.rejectButton,

                          ...(busy
                            ? styles.disabledButton
                            : {}),
                        }}
                      >
                        ✕ Reject
                      </button>

                    )}

                    <button
                      onClick={() =>
                        deleteTestimonial(
                          testimonial.id
                        )
                      }
                      disabled={
                        busy
                      }
                      style={{
                        ...styles.deleteButton,

                        ...(busy
                          ? styles.disabledButton
                          : {}),
                      }}
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              );
            }
          )}

        </div>

      </div>

    </div>
  );
}

// ==========================================
// STYLES
// ==========================================

const styles = {

  page: {
    minHeight:
      "100vh",

    background:
      "#f8f5f2",

    padding:
      "40px 25px 80px",

    fontFamily:
      "Arial, sans-serif",
  },

  container: {
    maxWidth:
      "1250px",

    margin:
      "0 auto",
  },

  header: {
    display:
      "flex",

    justifyContent:
      "space-between",

    alignItems:
      "center",

    gap:
      "20px",

    flexWrap:
      "wrap",

    marginBottom:
      "35px",
  },

  eyebrow: {
    margin:
      "0 0 8px",

    color:
      "#b88972",

    fontSize:
      "12px",

    fontWeight:
      "700",

    letterSpacing:
      "2px",
  },

  title: {
    margin: 0,

    color:
      "#302824",

    fontSize:
      "38px",
  },

  subtitle: {
    margin:
      "10px 0 0",

    color:
      "#777",

    fontSize:
      "15px",
  },

  refreshButton: {
    border:
      "none",

    background:
      "#b88972",

    color:
      "#fff",

    padding:
      "12px 20px",

    borderRadius:
      "9px",

    cursor:
      "pointer",

    fontWeight:
      "600",

    fontSize:
      "14px",
  },

  error: {
    background:
      "#fdecec",

    color:
      "#c62828",

    padding:
      "15px 18px",

    borderRadius:
      "10px",

    marginBottom:
      "25px",

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
  },

  retryButton: {
    border:
      "1px solid #c62828",

    background:
      "#fff",

    color:
      "#c62828",

    padding:
      "8px 15px",

    borderRadius:
      "7px",

    cursor:
      "pointer",
  },

  statsGrid: {
    display:
      "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(210px, 1fr))",

    gap:
      "18px",

    marginBottom:
      "35px",
  },

  statCard: {
    background:
      "#fff",

    borderRadius:
      "15px",

    padding:
      "22px",

    display:
      "flex",

    alignItems:
      "center",

    gap:
      "15px",

    boxShadow:
      "0 5px 20px rgba(0,0,0,0.05)",

    border:
      "1px solid #eee5df",
  },

  statIcon: {
    width:
      "48px",

    height:
      "48px",

    borderRadius:
      "12px",

    background:
      "#f4e8e2",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    fontSize:
      "22px",
  },

  statLabel: {
    margin: 0,

    color:
      "#888",

    fontSize:
      "12px",

    textTransform:
      "uppercase",

    letterSpacing:
      "1px",
  },

  statNumber: {
    margin:
      "4px 0 0",

    color:
      "#302824",

    fontSize:
      "27px",
  },

  filterBar: {
    background:
      "#fff",

    borderRadius:
      "15px",

    padding:
      "20px 22px",

    marginBottom:
      "22px",

    display:
      "flex",

    justifyContent:
      "space-between",

    alignItems:
      "center",

    gap:
      "20px",

    flexWrap:
      "wrap",

    boxShadow:
      "0 4px 18px rgba(0,0,0,0.04)",

    border:
      "1px solid #eee5df",
  },

  sectionTitle: {
    margin: 0,

    color:
      "#302824",

    fontSize:
      "21px",
  },

  sectionSubtitle: {
    margin:
      "5px 0 0",

    color:
      "#888",

    fontSize:
      "13px",
  },

  filterButtons: {
    display:
      "flex",

    gap:
      "7px",

    flexWrap:
      "wrap",
  },

  filterButton: {
    border:
      "1px solid #ddd2cc",

    background:
      "#fff",

    color:
      "#665b56",

    padding:
      "9px 14px",

    borderRadius:
      "8px",

    cursor:
      "pointer",

    fontSize:
      "13px",

    fontWeight:
      "600",
  },

  filterButtonActive: {
    background:
      "#b88972",

    borderColor:
      "#b88972",

    color:
      "#fff",
  },

  reviewGrid: {
    display:
      "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(330px, 1fr))",

    gap:
      "20px",
  },

  reviewCard: {
    background:
      "#fff",

    borderRadius:
      "17px",

    padding:
      "23px",

    boxShadow:
      "0 5px 20px rgba(0,0,0,0.05)",

    border:
      "1px solid #eee5df",
  },

  cardHeader: {
    display:
      "flex",

    alignItems:
      "center",

    gap:
      "12px",
  },

  customerAvatar: {
    width:
      "48px",

    height:
      "48px",

    borderRadius:
      "50%",

    background:
      "#f1dfd7",

    color:
      "#795848",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    fontSize:
      "19px",

    fontWeight:
      "700",

    flexShrink:
      0,
  },

  customerInfo: {
    minWidth:
      0,

    flex:
      1,
  },

  customerName: {
    margin: 0,

    color:
      "#302824",

    fontSize:
      "16px",
  },

  reviewDate: {
    margin:
      "4px 0 0",

    color:
      "#999",

    fontSize:
      "12px",
  },

  status: {
    padding:
      "6px 9px",

    borderRadius:
      "15px",

    fontSize:
      "10px",

    fontWeight:
      "700",

    letterSpacing:
      "0.5px",

    flexShrink:
      0,
  },

  rating: {
    marginTop:
      "18px",

    color:
      "#c8944e",
  },

  service: {
    marginTop:
      "12px",

    color:
      "#777",

    fontSize:
      "13px",
  },

  commentBox: {
    marginTop:
      "17px",

    padding:
      "16px",

    background:
      "#faf7f5",

    borderRadius:
      "11px",

    position:
      "relative",
  },

  quote: {
    fontSize:
      "28px",

    color:
      "#b88972",

    lineHeight:
      1,

    fontWeight:
      "700",
  },

  comment: {
    margin:
      "3px 0 0",

    color:
      "#555",

    fontSize:
      "14px",

    lineHeight:
      "1.65",
  },

  actions: {
    marginTop:
      "18px",

    paddingTop:
      "17px",

    borderTop:
      "1px solid #eee6e1",

    display:
      "flex",

    gap:
      "8px",

    flexWrap:
      "wrap",
  },

  approveButton: {
    border:
      "none",

    background:
      "#e8f7ed",

    color:
      "#218739",

    padding:
      "9px 13px",

    borderRadius:
      "7px",

    cursor:
      "pointer",

    fontWeight:
      "600",

    fontSize:
      "12px",
  },

  rejectButton: {
    border:
      "none",

    background:
      "#fff5df",

    color:
      "#a66a00",

    padding:
      "9px 13px",

    borderRadius:
      "7px",

    cursor:
      "pointer",

    fontWeight:
      "600",

    fontSize:
      "12px",
  },

  deleteButton: {
    border:
      "none",

    background:
      "#fdecec",

    color:
      "#c62828",

    padding:
      "9px 13px",

    borderRadius:
      "7px",

    cursor:
      "pointer",

    fontWeight:
      "600",

    fontSize:
      "12px",
  },

  disabledButton: {
    opacity:
      0.5,

    cursor:
      "not-allowed",
  },

  empty: {
    background:
      "#fff",

    borderRadius:
      "17px",

    padding:
      "65px 25px",

    textAlign:
      "center",

    boxShadow:
      "0 5px 20px rgba(0,0,0,0.04)",
  },

  emptyIcon: {
    fontSize:
      "45px",

    marginBottom:
      "12px",
  },

  emptyTitle: {
    margin:
      "0 0 8px",

    color:
      "#302824",

    fontSize:
      "21px",
  },

  emptyText: {
    margin: 0,

    color:
      "#888",

    fontSize:
      "14px",
  },

  loading: {
    minHeight:
      "70vh",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    color:
      "#777",

    fontSize:
      "16px",
  },
};

export default AdminTestimonials;

