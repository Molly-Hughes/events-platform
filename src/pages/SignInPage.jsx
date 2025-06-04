import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

export function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    const errors = { email: "", password: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!password.trim()) {
      errors.password = "Password cannot be empty.";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setSubmitting(false);

    if (error) {
      setError("Login failed. Please check your credentials.");
    } else {
      setError(null);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-antiFlashWhite px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 text-darkPurple">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-frenchViolet mb-2 text-center">
          Staff Login
        </h1>
        <p className="text-sm sm:text-base text-gray-700 mb-6 text-center">
          Staff access portal for managing community events and updates. Please
          sign in with your credentials to continue.
        </p>

        {error && (
          <p className="mb-4 text-red-600 font-medium text-center">{error}</p>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-darkPurple mb-1"
            >
              Email Address:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFormErrors((prev) => ({ ...prev, email: "" }));
                setError(null);
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                formErrors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-frenchViolet"
              }`}
              disabled={submitting}
              required
            />
            {formErrors.email && (
              <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-darkPurple mb-1"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFormErrors((prev) => ({ ...prev, password: "" }));
                setError(null);
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                formErrors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-frenchViolet"
              }`}
              disabled={submitting}
              required
            />
            {formErrors.password && (
              <p className="text-red-600 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full bg-frenchViolet text-white font-medium py-2 px-4 rounded-lg hover:bg-darkPurple transition ${
              submitting ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Having trouble signing in?{" "}
          <a
            href="mailto:hello@togetherhood.org"
            className="text-frenchViolet underline hover:text-darkPurple"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
