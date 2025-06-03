import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-darkPurple text-antiFlashWhite px-6 py-10 sm:px-10 md:px-16">
      <div className="max-w-screen-xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Togetherhood</h2>
          <p className="mt-2 text-sm text-antiFlashWhite/80 max-w-xs">
            Building stronger communities through local events and shared
            experiences.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className=" font-semibold text-white">Important Links</h3>
          <Link to="/" className="text-sm hover:text-frenchViolet transition">
            Home
          </Link>
          <Link
            to="/about"
            className="text-sm hover:text-frenchViolet transition"
          >
            About
          </Link>
          <Link
            to="/events"
            className="text-sm hover:text-frenchViolet transition"
          >
            Events
          </Link>
          <Link
            to="/contact"
            className="text-sm hover:text-frenchViolet transition"
          >
            Contact
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className=" font-semibold text-white">Contact</h3>
          <p className="text-sm">hello@togetherhood.org</p>
          <p className="text-sm">+44 117 123 4576</p>
          <p className="text-sm">45 Community Lane, Bristol, BS1 4QD</p>
        </div>
      </div>

      <div className="mt-10 border-t border-antiFlashWhite/20 pt-4 text-center text-sm text-antiFlashWhite/60">
        © {new Date().getFullYear()} Togetherhood. All rights reserved.
      </div>
    </footer>
  );
}
