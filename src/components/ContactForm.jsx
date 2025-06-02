import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    const { error } = await supabase.from("contacts").insert([formData]);

    if (error) {
      setStatus("Something went wrong. Please try again.");
    } else {
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }
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
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-frenchViolet transition"
        />
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
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-frenchViolet transition"
        />
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
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-frenchViolet transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-frenchViolet text-white font-medium py-2 px-4 rounded-xl hover:bg-darkPurple transition"
      >
        Send Message
      </button>

      {status && (
        <p className="mt-2 text-sm text-center text-frenchViolet">{status}</p>
      )}
    </form>
  );
}
