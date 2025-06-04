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
        <div className="bg-antiFlashWhite border border-frenchViolet/20 p-6 sm:p-8 rounded-xl shadow-sm w-full space-y-6">
          <h2 className="text-2xl font-semibold text-frenchViolet">
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
