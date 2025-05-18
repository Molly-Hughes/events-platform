import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError("Event not found.");
        setEvent(null);
      } else {
        setEvent(data);
        console.log(data);
      }

      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  // Handle signup form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage("");

    if (!name || !email) {
      setSubmitMessage("Please enter your name and email.");
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
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <strong>Date:</strong> {event.date}
      </p>
      <p>
        <strong>Starting Time:</strong> {event.starting_time}
      </p>
      <p>
        <strong>Closing Time:</strong> {event.closing_time}
      </p>

      <hr />

      <h2>Sign Up for This Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button>Sign Up</button>
        {submitMessage && <p>{submitMessage}</p>}
      </form>
    </div>
  );
}
