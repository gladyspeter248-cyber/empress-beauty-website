import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "./Notifications";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [customer, setCustomer] = useState(null);

  const navigate = useNavigate();

  // ==========================================
  // LOAD CUSTOMER LOGIN STATUS
  // ==========================================

  useEffect(() => {
    const loadCustomer = () => {
      const isAuthenticated =
        sessionStorage.getItem("customerAuth");

      const savedCustomer =
        sessionStorage.getItem("customer");

      if (isAuthenticated === "true" && savedCustomer) {
        try {
          setCustomer(JSON.parse(savedCustomer));
        } catch {
          sessionStorage.removeItem("customerAuth");
          sessionStorage.removeItem("customer");
          setCustomer(null);
        }
      } else {
        setCustomer(null);
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
  // CLOSE MOBILE MENU
  // ==========================================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    sessionStorage.removeItem("customerAuth");
    sessionStorage.removeItem("customer");

    setCustomer(null);

    closeMenu();

    window.dispatchEvent(
      new Event("customerAuthChanged")
    );

    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* ==================================
            LOGO
        ================================== */}

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <span className="logo-main">EMPRESS</span>
          <span className="logo-sub">BEAUTY</span>
        </Link>


        {/* ==================================
            DESKTOP NAVIGATION
        ================================== */}

        <nav className="desktop-nav">

          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/services" onClick={closeMenu}>
            Services
          </Link>

          <Link to="/gallery" onClick={closeMenu}>
            Gallery
          </Link>

          <Link to="/team" onClick={closeMenu}>
            Team
          </Link>

          <Link to="/about" onClick={closeMenu}>
            About
          </Link>

          <Link to="/blog" onClick={closeMenu}>
            Blog
          </Link>

          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>

        </nav>


        {/* ==================================
            DESKTOP ACCOUNT AREA
        ================================== */}

        <div className="navbar-account">

          {customer ? (

            <div className="account-area">

              {/* NOTIFICATION BELL */}

              <Notifications />

              {/* CUSTOMER ACCOUNT */}

              <Link
                to="/account"
                className="navbar-account-link"
                onClick={closeMenu}
              >
                <span className="account-icon">
                  👤
                </span>

                <span>
                  {customer.fullName}
                </span>
              </Link>

              {/* LOGOUT */}

              <button
                type="button"
                className="navbar-logout"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          ) : (

            <div className="guest-account">

              <Link
                to="/login"
                className="navbar-login"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="navbar-register"
                onClick={closeMenu}
              >
                Register
              </Link>

            </div>

          )}

        </div>


        {/* ==================================
            BOOK NOW
        ================================== */}

        <Link
          to="/booking"
          className="navbar-book"
          onClick={closeMenu}
        >
          Book Now
        </Link>


        {/* ==================================
            MOBILE MENU BUTTON
        ================================== */}

        <button
          className={`menu-toggle ${
            menuOpen ? "active" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>


      {/* ==================================
          MOBILE NAVIGATION
      ================================== */}

      <nav
        className={`mobile-nav ${
          menuOpen ? "open" : ""
        }`}
      >

        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/services" onClick={closeMenu}>
          Services
        </Link>

        <Link to="/gallery" onClick={closeMenu}>
          Gallery
        </Link>

        <Link to="/team" onClick={closeMenu}>
          Team
        </Link>

        <Link to="/about" onClick={closeMenu}>
          About
        </Link>

        <Link to="/blog" onClick={closeMenu}>
          Blog
        </Link>

        <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link>


        {/* ==================================
            MOBILE ACCOUNT
        ================================== */}

        {customer ? (

          <>
            <Link
              to="/account"
              onClick={closeMenu}
            >
              👤 {customer.fullName}
            </Link>

            {/* MOBILE NOTIFICATIONS */}

            <div
              style={{
                padding: "8px 0",
              }}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <Notifications />
            </div>

            <button
              type="button"
              className="mobile-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>

        ) : (

          <>
            <Link
              to="/login"
              onClick={closeMenu}
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
            >
              Create Account
            </Link>
          </>

        )}


        {/* ==================================
            MOBILE BOOKING
        ================================== */}

        <Link
          to="/booking"
          className="mobile-book"
          onClick={closeMenu}
        >
          Book an Appointment
        </Link>

      </nav>
    </header>
  );
}

export default Navbar;