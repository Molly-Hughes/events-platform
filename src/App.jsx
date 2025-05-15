import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { AboutPage } from "./pages/AboutPage";
import { EventsPage } from "./pages/EventsPage";
import { EventDetailsPage } from "./pages/EventDetailsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ContactPage } from "./pages/ContactPage";
import { SignInPage } from "./pages/SignInPage";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id/" element={<EventDetailsPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
