import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api";

function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(null);

  // ==========================================
  // LOAD CUSTOMER
  // ==========================================

  useEffect(() => {
    const loadCustomer = () => {
      const authenticated =
        sessionStorage.getItem("customerAuth") === "true";

      const savedCustomer =
        sessionStorage.getItem("customer");

      if (!authenticated || !savedCustomer) {
        setCustomer(null);
        setNotifications([]);
        return;
      }

      try {
        const parsedCustomer =
          JSON.parse(savedCustomer);

        setCustomer(parsedCustomer);
      } catch (error) {
        console.error(
          "Unable to load customer:",
          error
        );

        setCustomer(null);
        setNotifications([]);
      }
    };

    loadCustomer();

    window.addEventListener(
      "customerAuthChanged",
      loadCustomer
    );

    return () => {
      window.removeEventListener(
        "customerAuthChanged",
        loadCustomer
      );
    };
  }, []);

  // ==========================================
  // FETCH NOTIFICATIONS
  // ==========================================

  const fetchNotifications = async () => {
    if (!customer?.email) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/notifications/customer?email=${encodeURIComponent(
          customer.email
        )}`
      );

      if (!response.ok) {
        throw new Error(
          "Unable to load notifications"
        );
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setNotifications(data);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error(
        "Notification request failed:",
        error
      );
    }
  };

  // ==========================================
  // INITIAL LOAD + AUTO REFRESH
  // ==========================================

  useEffect(() => {
    if (!customer?.email) {
      return;
    }

    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [customer]);

  // ==========================================
  // UNREAD COUNT
  // ==========================================

  const unreadCount = notifications.filter(
    (notification) =>
      notification.read === false
  ).length;

  // ==========================================
  // MARK ONE AS READ
  // ==========================================

  const markAsRead = async (id) => {
    try {
      await fetch(
        `${API_URL}/notifications/${id}/read`,
        {
          method: "PUT",
        }
      );

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                read: true,
              }
            : notification
        )
      );
    } catch (error) {
      console.error(
        "Unable to mark notification as read:",
        error
      );
    }
  };

  // ==========================================
  // MARK ALL AS READ
  // ==========================================

  const markAllAsRead = async () => {
    if (!customer?.email) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/notifications/customer/read-all?email=${encodeURIComponent(
          customer.email
        )}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to mark notifications as read"
        );
      }

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch (error) {
      console.error(
        "Unable to mark all notifications as read:",
        error
      );
    }
  };

  // ==========================================
  // NOTIFICATION CLICK
  // ==========================================

  const handleNotificationClick = async (
    notification
  ) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }

    if (notification.bookingId) {
      setOpen(false);
      navigate("/account");
    }
  };

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    const formatted =
      new Date(date);

    if (Number.isNaN(formatted.getTime())) {
      return "";
    }

    return formatted.toLocaleString();
  };

  // ==========================================
  // DO NOT SHOW FOR GUESTS
  // ==========================================

  if (!customer) {
    return null;
  }

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
      }}
    >

      {/* ======================================
          BELL
      ====================================== */}

      <button
        type="button"
        onClick={() => {
          setOpen((current) => !current);

          // Refresh immediately when opening
          if (!open) {
            fetchNotifications();
          }
        }}
        aria-label="Notifications"
        style={{
          position: "relative",
          width: "44px",
          height: "44px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        🔔

        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "1px",
              right: "0px",
              minWidth: "18px",
              height: "18px",
              padding: "0 4px",
              borderRadius: "20px",
              background: "#c62828",
              color: "white",
              fontSize: "10px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid white",
            }}
          >
            {unreadCount > 99
              ? "99+"
              : unreadCount}
          </span>
        )}
      </button>

      {/* ======================================
          NOTIFICATION PANEL
      ====================================== */}

      {open && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "0",
            width: "360px",
            maxWidth:
              "calc(100vw - 30px)",
            background: "white",
            borderRadius: "14px",
            boxShadow:
              "0 12px 40px rgba(0,0,0,0.18)",
            border:
              "1px solid #eeeeee",
            overflow: "hidden",
            zIndex: 10000,
          }}
        >

          {/* HEADER */}

          <div
            style={{
              padding: "16px",
              borderBottom:
                "1px solid #eeeeee",
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
            }}
          >
            <div>

              <h3
                style={{
                  margin: 0,
                  fontSize: "17px",
                  color: "#222",
                }}
              >
                Notifications
              </h3>

              <p
                style={{
                  margin:
                    "4px 0 0",
                  fontSize: "12px",
                  color: "#777",
                }}
              >
                {unreadCount > 0
                  ? `${unreadCount} unread`
                  : "You're all caught up"}
              </p>

            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                style={{
                  border: "none",
                  background:
                    "transparent",
                  color: "#9c6b30",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                Mark all read
              </button>
            )}

          </div>

          {/* NOTIFICATIONS */}

          <div
            style={{
              maxHeight: "420px",
              overflowY: "auto",
            }}
          >

            {notifications.length === 0 && (
              <div
                style={{
                  padding:
                    "40px 20px",
                  textAlign:
                    "center",
                  color: "#777",
                }}
              >

                <div
                  style={{
                    fontSize: "32px",
                    marginBottom:
                      "10px",
                  }}
                >
                  🔔
                </div>

                <strong
                  style={{
                    display: "block",
                    color: "#444",
                    marginBottom:
                      "6px",
                  }}
                >
                  No notifications yet
                </strong>

                <span
                  style={{
                    fontSize: "12px",
                  }}
                >
                  We'll let you know when
                  something important happens.
                </span>

              </div>
            )}

            {notifications.map(
              (notification) => (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() =>
                    handleNotificationClick(
                      notification
                    )
                  }
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom:
                      "1px solid #f0f0f0",
                    background:
                      notification.read
                        ? "white"
                        : "#fffaf3",
                    padding: "15px",
                    textAlign: "left",
                    cursor:
                      notification.bookingId
                        ? "pointer"
                        : "default",
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >

                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        flexShrink: 0,
                        borderRadius:
                          "50%",
                        background:
                          notification.read
                            ? "#f3f3f3"
                            : "#f7ead7",
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        fontSize: "16px",
                      }}
                    >
                      {notification.type ===
                      "BOOKING"
                        ? "📅"
                        : "🔔"}
                    </div>

                    <div
                      style={{
                        flex: 1,
                      }}
                    >

                      <div
                        style={{
                          display: "flex",
                          alignItems:
                            "center",
                          gap: "7px",
                        }}
                      >

                        <strong
                          style={{
                            fontSize:
                              "13px",
                            color:
                              "#222",
                          }}
                        >
                          {notification.title}
                        </strong>

                        {!notification.read && (
                          <span
                            style={{
                              width: "7px",
                              height: "7px",
                              borderRadius:
                                "50%",
                              background:
                                "#c62828",
                            }}
                          />
                        )}

                      </div>

                      <p
                        style={{
                          margin:
                            "5px 0",
                          fontSize:
                            "12px",
                          lineHeight:
                            "1.5",
                          color:
                            "#666",
                        }}
                      >
                        {notification.message}
                      </p>

                      <span
                        style={{
                          fontSize:
                            "10px",
                          color:
                            "#999",
                        }}
                      >
                        {formatDate(
                          notification.createdAt
                        )}
                      </span>

                    </div>

                  </div>

                </button>
              )
            )}

          </div>

        </div>
      )}
    </div>
  );
}

export default Notifications;