import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import EmpressAI from "./components/EmpressAI";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminServices from "./pages/AdminServices";
import AdminTestimonials from "./pages/AdminTestimonials";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* ==============================
                    CUSTOMER PAGES
                ============================== */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/services"
                    element={<Services />}
                />

                <Route
                    path="/gallery"
                    element={<Gallery />}
                />

                <Route
                    path="/booking"
                    element={<Booking />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/team"
                    element={<Team />}
                />

                <Route
                    path="/blog"
                    element={<Blog />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/account"
                    element={<Account />}
                />


                {/* ==============================
                    ADMIN PAGES
                ============================== */}

                <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                />

                <Route
                    path="/admin/dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/services"
                    element={<AdminServices />}
                />

                <Route
                    path="/admin/testimonials"
                    element={<AdminTestimonials />}
                />

            </Routes>


            {/* ==============================
                FLOATING CUSTOMER FEATURES
            ============================== */}

            <WhatsAppButton />

            <EmpressAI />

        </BrowserRouter>
    );
}

export default App;