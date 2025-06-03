import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export function NavBar() {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="bg-darkPurple text-antiFlashWhite px-4 py-4 sm:px-6 sm:py-6">
      <div className="flex justify-between items-center md:hidden">
        <Link to="/" className="text-lg font-semibold">
          Togetherhood
        </Link>
        <button onClick={toggleMobileMenu}>
          <GiHamburgerMenu size={24} />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden">
          <Link to="/" onClick={toggleMobileMenu}>
            Home
          </Link>
          <Link to="/about" onClick={toggleMobileMenu}>
            About
          </Link>
          <Link to="/events" onClick={toggleMobileMenu}>
            Events
          </Link>
          {user ? (
            <Link to="/dashboard" onClick={toggleMobileMenu}>
              Dashboard
            </Link>
          ) : (
            <Link to="/contact" onClick={toggleMobileMenu}>
              Contact
            </Link>
          )}
          {user ? (
            <>
              <span>{user.email}</span>
              <button
                onClick={() => {
                  handleSignOut();
                  toggleMobileMenu();
                }}
                className="bg-frenchViolet px-3 py-1 rounded-full"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              to="/sign-in"
              onClick={toggleMobileMenu}
              className="bg-frenchViolet px-3 py-1 rounded-full"
            >
              Sign In
            </Link>
          )}
        </div>
      )}

      <div className="hidden md:flex md:justify-between md:items-center">
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-frenchViolet">
            Home
          </Link>
          <Link to="/about" className="hover:text-frenchViolet">
            About
          </Link>
          <Link to="/events" className="hover:text-frenchViolet">
            Events
          </Link>
          {user ? (
            <Link to="/dashboard" className="hover:text-frenchViolet">
              Dashboard
            </Link>
          ) : (
            <Link to="/contact" className="hover:text-frenchViolet">
              Contact
            </Link>
          )}
        </div>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span>{user.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-frenchViolet px-3 py-1 rounded-full hover:bg-antiFlashWhite hover:text-frenchViolet"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="bg-frenchViolet px-3 py-1 rounded-full hover:bg-antiFlashWhite hover:text-frenchViolet"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
