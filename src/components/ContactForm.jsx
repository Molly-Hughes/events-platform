import { useState } from "react";
import { supabase } from "../supabaseClient";

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
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        required
      />
      <button type="submit">Send</button>
      {status && <p>{status}</p>}
    </form>
  );
}
