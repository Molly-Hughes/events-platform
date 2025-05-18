import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

export function EventCards() {
  const [fetchError, setFetchError] = useState(null);
  const [events, setEvents] = useState(null);
  const [user, setUser] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select();

      if (error) {
        setFetchError("Error. Could not load events.");
        setEvents(null);
      } else {
        setEvents(data);
        setFetchError(null);
      }
    };

    fetchEvents();
  }, []);

  // Handle event deletion
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) {
        alert("Failed to delete event.");
      } else {
        setEvents(events.filter((event) => event.id !== id));
      }
    }
  };

  // Handle event update
  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    const { error } = await supabase
      .from("events")
      .update(editFormData)
      .eq("id", id);

    if (error) {
      alert("Failed to update event.");
    } else {
      const updatedEvents = events.map((event) =>
        event.id === id ? { ...event, ...editFormData } : event
      );
      setEvents(updatedEvents);
      setEditingEventId(null);
    }
  };

  return (
    <div className="space-y-6 p-6 sm:px-8 sm:py-8 md:p-12 lg:p-16 2xl:px-18 2xl:py-16">
      {fetchError && <p>{fetchError}</p>}

      {events ? (
        <div>
          {events.map((event) => (
            <div key={event.id}>
              {/* Show edit/delete only if on the /dashboard page and user is logged in */}
              {user && location.pathname === "/dashboard" && (
                <div>
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
                  >
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(event.id)}>
                    <AiFillDelete />
                  </button>
                </div>
              )}

              {editingEventId === event.id ? (
                <form onSubmit={(e) => handleEditSubmit(e, event.id)}>
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        title: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={editFormData.description}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        description: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={editFormData.location}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        location: e.target.value,
                      })
                    }
                  />
                  <input
                    type="date"
                    value={editFormData.date}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        date: e.target.value,
                      })
                    }
                  />
                  <div>
                    <button type="submit">Save</button>
                    <button
                      type="button"
                      onClick={() => setEditingEventId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h4>{event.title}</h4>
                  <p>{event.date}</p>
                  <p>{event.description}</p>

                  <Link to={`/events/${event.id}`}>Go to event</Link>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        !fetchError && <p>Loading events...</p>
      )}
    </div>
  );
}
