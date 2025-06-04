import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export function SignupForm({ eventId, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({ name: "", email: "" });

  const validateForm = () => {
    const errors = { name: "", email: "" };
    let valid = true;

    if (name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email address.";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage("");
    setSubmitting(true);

    if (!validateForm()) {
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.from("signups").insert({
      name,
      email,
      event_id: eventId,
    });

    if (error) {
      setSubmitMessage("Something went wrong. Please try again.");
    } else {
      setSubmitMessage("You've successfully signed up for this event!");
      setName("");
      setEmail("");
      setFormErrors({ name: "", email: "" });
      onSuccess();
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          placeholder="Enter your full name"
          onChange={(e) => setName(e.target.value)}
          className={`bg-white w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            formErrors.name
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-frenchViolet"
          }`}
          required
        />
        {formErrors.name && (
          <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          className={`bg-white w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            formErrors.email
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-frenchViolet"
          }`}
          required
        />
        {formErrors.email && (
          <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`bg-frenchViolet text-white px-6 py-2 rounded-full  w-full hover:bg-darkPurple transition ${
          submitting ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {submitting ? "Signing Up..." : "Sign Up"}
      </button>

      {submitMessage && (
        <p
          className={`text-sm mt-3 text-center ${
            submitMessage.toLowerCase().includes("success")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {submitMessage}
        </p>
      )}
    </form>
  );
}
