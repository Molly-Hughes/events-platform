import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errors = { name: "", email: "", message: "" };
    let valid = true;

    if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!validate()) return;

    setSubmitting(true);
    setStatus("Submitting...");

    const { error } = await supabase.from("contacts").insert([formData]);

    if (error) {
      setStatus("Something went wrong. Please try again.");
    } else {
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setFormErrors({ name: "", email: "", message: "" });
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-darkPurple">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition ${
            formErrors.name
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-frenchViolet"
          }`}
          disabled={submitting}
        />
        {formErrors.name && (
          <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition ${
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
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          placeholder="Type your message here..."
          className={`w-full px-4 py-2 border rounded-xl resize-none focus:outline-none focus:ring-2 transition ${
            formErrors.message
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-frenchViolet"
          }`}
          disabled={submitting}
        />
        {formErrors.message && (
          <p className="text-red-600 text-sm mt-1">{formErrors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`w-full bg-frenchViolet text-white font-medium py-2 px-4 rounded-xl hover:bg-darkPurple transition ${
          submitting ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>

      {status && (
        <p
          className={`mt-2 text-sm text-center ${
            status.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </p>
      )}
    </form>
  );
}
