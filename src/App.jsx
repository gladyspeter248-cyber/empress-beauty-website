import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import BlogArticle from "./pages/BlogArticle";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/services" element={<Services />} />

        <Route path="/gallery" element={<Gallery />} />

        <Route path="/team" element={<Team />} />

        <Route path="/about" element={<About />} />

        <Route path="/blog" element={<Blog />} />
        
        <Route path="/blog/:id" element={<BlogArticle />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/booking" element={<Booking />} />

      </Routes>
    <Footer /> 

    </BrowserRouter>
  );
}

export default App;