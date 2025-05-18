import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export function CreateAnEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    starting_time: "",
    closing_time: "",
  });

  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!userId) {
      setMessage("You must be logged in to create an event.");
      return;
    }

    const { title, description, location, date, starting_time, closing_time } =
      formData;

    const { error } = await supabase.from("events").insert([
      {
        title,
        description,
        location,
        date,
        starting_time,
        closing_time,
        created_by: userId,
      },
    ]);

    if (error) {
      setMessage("Failed to create event. Please try again.");
      console.error(error);
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
    }
  };

  return (
    <>
      <h2>Create an event</h2>
      <p>To create an event, please use the form below.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Event title"
          value={formData.title}
          onChange={handleChange}
          minLength="5"
          maxLength="50"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          minLength="20"
          maxLength="1000"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          minLength="5"
          maxLength="200"
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="starting_time"
          value={formData.starting_time}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="closing_time"
          value={formData.closing_time}
          onChange={handleChange}
          required
        />

        <button type="submit">Create event</button>

        {message && <p>{message}</p>}
      </form>
    </>
  );
}
