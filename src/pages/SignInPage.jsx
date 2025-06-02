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
    <div className="max-w-md mx-auto p-6 text-darkPurple">
      <h2 className="text-2xl font-semibold mb-6">Staff Login</h2>

      {error && (
        <p className="mb-4 text-red-600 font-medium text-center">{error}</p>
      )}

      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
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
          />
          {formErrors.email && (
            <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
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
    </div>
  );
}
