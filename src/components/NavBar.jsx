import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function NavBar() {
  const { user, signOut } = useAuth();

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/events">Events</Link>

        {user ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <Link to="/contact">Contact</Link>
        )}
      </div>

      <div>
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={signOut}>Log Out</button>
          </>
        ) : (
          <Link to="/sign-in">Sign In</Link>
        )}
      </div>
    </nav>
  );
}
