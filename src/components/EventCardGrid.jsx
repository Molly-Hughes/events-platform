import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export function EventCardGrid({ events, user, onEventUpdate }) {
  const location = useLocation();
  const [editingEventId, setEditingEventId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (!error) onEventUpdate(id, null);
    }
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    const { error } = await supabase
      .from("events")
      .update(editFormData)
      .eq("id", id);

    if (!error) {
      onEventUpdate(id, editFormData);
      setEditingEventId(null);
    }
  };

  return (
    <section
      aria-label="Event Cards"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {events.map((event) => (
        <article
          key={event.id}
          className="bg-darkPurple border border-gray-200 rounded-xl p-6 flex flex-col justify-between shadow-md"
        >
          {user && location.pathname === "/dashboard" && (
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setEditingEventId(event.id);
                  setEditFormData({
                    title: event.title,
                    description: event.description,
                    location: event.location,
                    date: event.date,
                  });
                }}
                aria-label={`Edit event "${event.title}"`}
                className="text-antiFlashWhite hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-frenchViolet rounded transition"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                aria-label={`Delete event "${event.title}"`}
                className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 rounded transition"
              >
                <AiFillDelete />
              </button>
            </div>
          )}

          {editingEventId === event.id ? (
            <form
              onSubmit={(e) => handleEditSubmit(e, event.id)}
              className="space-y-3 mt-4"
              aria-label={`Edit form for event "${event.title}"`}
            >
              <input
                type="text"
                name="title"
                aria-label="Edit event title"
                className="w-full border rounded p-2 bg-white text-darkPurple"
                value={editFormData.title}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, title: e.target.value })
                }
                required
              />
              <textarea
                name="description"
                aria-label="Edit event description"
                className="w-full border rounded p-2 bg-white text-darkPurple"
                value={editFormData.description}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    description: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                name="location"
                aria-label="Edit event location"
                className="w-full border rounded p-2 bg-white text-darkPurple"
                value={editFormData.location}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, location: e.target.value })
                }
                required
              />
              <input
                type="date"
                name="date"
                aria-label="Edit event date"
                className="w-full border rounded p-2 bg-white text-darkPurple"
                value={editFormData.date}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, date: e.target.value })
                }
                required
              />

              <div className="flex justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="bg-frenchViolet text-white px-4 py-2 rounded hover:bg-antiFlashWhite hover:text-frenchViolet transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingEventId(null)}
                  className="text-white hover:text-frenchViolet transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <header className="space-y-1 mt-2">
                <h3 className="text-xl font-semibold text-antiFlashWhite">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-300">{event.date}</p>
              </header>
              <p className="text-antiFlashWhite mt-2">{event.description}</p>
              <Link
                to={`/events/${event.id}`}
                className="mt-4 inline-block w-full text-center bg-frenchViolet text-antiFlashWhite font-medium py-2 px-4 rounded hover:bg-white hover:text-darkPurple transition"
              >
                Go to event
              </Link>
            </>
          )}
        </article>
      ))}
    </section>
  );
}
