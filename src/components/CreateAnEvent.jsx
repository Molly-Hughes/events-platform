import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export function CreateAnEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    starting_time: "",
    closing_time: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      } else {
        setUserId(null);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setMessage("");
  };

  const validate = () => {
    const newErrors = {};
    const { title, description, location, date, starting_time, closing_time } = formData;

    if (!title || title.length < 5)
      newErrors.title = "Title must be at least 5 characters.";
    if (title.length > 50)
      newErrors.title = "Title cannot exceed 50 characters.";

    if (!description || description.length < 20)
      newErrors.description = "Description must be at least 20 characters.";
    if (description.length > 1000)
      newErrors.description = "Description cannot exceed 1000 characters.";

    if (!location || location.length < 5)
      newErrors.location = "Location must be at least 5 characters.";
    if (location.length > 200)
      newErrors.location = "Location cannot exceed 200 characters.";

    if (!date) newErrors.date = "Date is required.";
    if (!starting_time) newErrors.starting_time = "Starting time is required.";
    if (!closing_time) newErrors.closing_time = "Closing time is required.";

    if (starting_time && closing_time && starting_time >= closing_time) {
      newErrors.closing_time = "Closing time must be after starting time.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!userId) {
      setMessage("You must be logged in to create an event.");
      return;
    }

    if (!validate()) return;

    setSubmitting(true);

    const { error } = await supabase.from("events").insert([
      {
        ...formData,
        created_by: userId,
      },
    ]);

    setSubmitting(false);

    if (error) {
      console.error(error);
      setMessage("Failed to create event. Please try again.");
    } else {
      setMessage("Event created successfully!");
      setFormData({
        title: "",
        description: "",
        location: "",
        date: "",
        starting_time: "",
        closing_time: "",
      });
      setErrors({});
    }
  };

  return (
    <section className="bg-white shadow-md rounded-2xl p-6 flex flex-col lg:flex-row justify-between items-center gap-6">
      <header className="lg:w-1/3 space-y-2 text-center lg:text-left">
        <h2 className="text-2xl font-semibold text-frenchViolet">Create an event</h2>
        <p className="text-base text-gray-700">To create an event, please use the form below.</p>
      </header>

      <form onSubmit={handleSubmit} className="lg:w-2/3 w-full space-y-4">
        {[
          { name: "title", type: "text", placeholder: "Event title" },
          { name: "description", type: "text", placeholder: "Description" },
          { name: "location", type: "text", placeholder: "Location" },
          { name: "date", type: "date" },
          { name: "starting_time", type: "time" },
          { name: "closing_time", type: "time" },
        ].map(({ name, type, placeholder }) => (
          <div key={name}>
            <label htmlFor={name} className="sr-only capitalize">
              {name}
            </label>
            <input
              id={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              required
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
              className={`text-base w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition ${
                errors[name]
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-frenchViolet"
              }`}
            />
            {errors[name] && (
              <p id={`${name}-error`} className="text-red-600 text-sm mt-1" role="alert">
                {errors[name]}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={submitting}
          aria-disabled={submitting}
          aria-busy={submitting}
          className={`w-full bg-frenchViolet text-white font-medium py-2 px-4 rounded-xl hover:bg-darkPurple transition motion-safe:transition ${
            submitting ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {submitting ? "Creating event..." : "Create event"}
        </button>

        {message && (
          <p className="mt-4 text-center font-medium text-frenchViolet" role="status" aria-live="polite">
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
