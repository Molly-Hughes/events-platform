import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { SignupForm } from "../components/SignUpForm";

export function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCalendarButton, setShowCalendarButton] = useState(false);

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

  const getGoogleCalendarUrl = () => {
    if (!event) return "#";

    const formatDateTime = (date, time) => {
      const [hour, minute] = time.split(":");
      const dateObj = new Date(date);
      dateObj.setHours(hour, minute);
      return dateObj.toISOString().replace(/[-:]|\.\d{3}/g, "");
    };

    const start = formatDateTime(event.date, event.starting_time);
    const end = formatDateTime(event.date, event.closing_time);

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      dates: `${start}/${end}`,
      details: event.description || "",
      location: event.location || "",
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  if (loading)
    return <p className="text-center py-12" role="status" aria-live="polite">Loading...</p>;
  if (error)
    return (
      <p
        className="text-center py-12 text-red-500"
        role="alert"
        aria-live="assertive"
      >
        {error}
      </p>
    );

  return (
    <main
      className="min-h-screen flex flex-col justify-start max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16 text-darkPurple space-y-12 bg-white"
      aria-labelledby="event-title"
    >
      <article className="space-y-6" aria-label="Event details">
        <header>
          <h1
            id="event-title"
            className="text-4xl sm:text-5xl font-bold text-frenchViolet"
          >
            {event.title}
          </h1>
        </header>

        <p className="text-lg text-darkPurple/90">{event.description}</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm text-darkPurple/80">
          <address className="not-italic flex items-start gap-2">
            <FaLocationDot
              className="mt-1 text-frenchViolet"
              aria-hidden="true"
            />
            <p>
              <span className="font-semibold">Location:</span> {event.location}
            </p>
          </address>

          <div className="flex items-start gap-2">
            <FaCalendarAlt
              className="mt-1 text-frenchViolet"
              aria-hidden="true"
            />
            <p>
              <span className="font-semibold">Date:</span>{" "}
              <time dateTime={event.date}>{event.date}</time>
            </p>
          </div>

          <div className="flex items-start gap-2">
            <FaClock className="mt-1 text-frenchViolet" aria-hidden="true" />
            <p>
              <span className="font-semibold">Time:</span> {event.starting_time}{" "}
              – {event.closing_time}
            </p>
          </div>
        </div>
      </article>

      <section
        className="flex justify-center"
        aria-labelledby="signup-heading"
      >
        <div className="bg-antiFlashWhite border border-frenchViolet/20 p-6 sm:p-8 rounded-xl shadow-sm w-full max-w-2xl space-y-6">
          <h2
            id="signup-heading"
            className="text-2xl font-semibold text-frenchViolet"
          >
            Sign up for the event
          </h2>

          <SignupForm
            eventId={id}
            onSuccess={() => setShowCalendarButton(true)}
          />

          {showCalendarButton && (
            <div className="pt-6 text-center">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition"
                role="button"
                aria-label="Add this event to Google Calendar"
              >
                Add to Google Calendar
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
