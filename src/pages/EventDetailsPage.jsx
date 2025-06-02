import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

export function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError("Event not found.");
      } else {
        setEvent(data);
      }

      setLoading(false);
    };

    fetchEvent();
  }, [id]);

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
      event_id: id,
    });

    if (error) {
      setSubmitMessage("Something went wrong. Please try again.");
    } else {
      setSubmitMessage("You've successfully signed up for this event!");
      setName("");
      setEmail("");
      setFormErrors({ name: "", email: "" });
    }

    setSubmitting(false);
  };

  if (loading) return <p className="text-center py-12">Loading...</p>;
  if (error) return <p className="text-center py-12 text-red-500">{error}</p>;

  return (
    <main className="max-w-screen-lg mx-auto px-6 py-12 sm:px-8 md:py-16 space-y-12 text-darkPurple">
      <section className="space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-frenchViolet">
          {event.title}
        </h1>
        <p className="text-lg text-darkPurple/90">{event.description}</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm text-darkPurple/80">
          <div className="flex items-start gap-2">
            <FaLocationDot className="mt-1 text-frenchViolet" />
            <p>
              <span className="font-semibold">Location:</span> {event.location}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <FaCalendarAlt className="mt-1 text-frenchViolet" />
            <p>
              <span className="font-semibold">Date:</span> {event.date}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <FaClock className="mt-1 text-frenchViolet" />
            <p>
              <span className="font-semibold">Time:</span> {event.starting_time}{" "}
              – {event.closing_time}
            </p>
          </div>
        </div>
      </section>

      <section className="flex justify-center">
        <div className="bg-antiFlashWhite border border-frenchViolet/20 p-6 sm:p-8 rounded-xl shadow-sm w-full max-w-xl space-y-6">
          <h2 className="text-2xl font-semibold text-frenchViolet">
            Sign up for the event
          </h2>
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
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
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
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
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
              className={`bg-frenchViolet text-white px-6 py-2 rounded-full hover:bg-darkPurple transition ${
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
        </div>
      </section>
    </main>
  );
}
