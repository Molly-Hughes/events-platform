import { supabase } from "../utils/supabaseClient";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
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

  const filteredEvents = events
    ?.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        !selectedLocation || event.location === selectedLocation;

      const matchesDate = !selectedDate || event.date === selectedDate;

      return matchesSearch && matchesLocation && matchesDate;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });

  return (
    <div className="max-w-screen-xl mx-auto px-6 pb-12 sm:px-8 md:pb-16 lg:px-16 xl:px-20 2xl:px-24">
      {fetchError && <p className="text-red-600">{fetchError}</p>}

      {events && (
        <>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
            <input
              type="text"
              placeholder="Search by title or description"
              className="w-full md:w-1/3 px-4 py-2 rounded border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full md:w-1/4 px-4 py-2 rounded border"
            >
              <option value="">All Locations</option>
              {[...new Set(events.map((e) => e.location))].map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="w-full md:w-1/5 px-4 py-2 rounded border"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full md:w-1/6 px-4 py-2 rounded border"
            >
              <option value="asc">Date ascending</option>
              <option value="desc">Date descending</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedLocation("");
                setSelectedDate("");
                setSortOrder("asc");
              }}
              className="text-sm text-frenchViolet underline hover:text-darkPurple"
            >
              Clear Filters
            </button>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-darkPurple border border-gray-200 rounded-xl p-6 flex flex-col justify-between space-y-4 transition-all"
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
                      className="text-antiFlashWhite hover:text-gray-400 transform hover:scale-110 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-500 hover:text-red-700 transform hover:scale-110 transition"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                )}

                {editingEventId === event.id ? (
                  <form
                    onSubmit={(e) => handleEditSubmit(e, event.id)}
                    className="space-y-2"
                  >
                    <input
                      type="text"
                      className="w-full border p-2 rounded text-antiFlashWhite"
                      value={editFormData.title}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          title: e.target.value,
                        })
                      }
                    />
                    <textarea
                      className="w-full border p-2 rounded text-antiFlashWhite"
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
                      className="w-full border p-2 rounded text-antiFlashWhite"
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
                      className="w-full border p-2 rounded text-antiFlashWhite"
                      value={editFormData.date}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          date: e.target.value,
                        })
                      }
                    />
                    <div className="flex justify-between mt-4">
                      <button
                        type="submit"
                        className="bg-frenchViolet text-antiFlashWhite px-4 py-2 rounded hover:bg-antiFlashWhite hover:text-frenchViolet transition"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingEventId(null)}
                        className="text-antiFlashWhite hover:text-frenchViolet transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-antiFlashWhite">
                      {event.title}
                    </h3>
                    <p className="text-sm text-antiFlashWhite">{event.date}</p>
                    <p className="text-antiFlashWhite">{event.description}</p>

                    <Link
                      to={`/events/${event.id}`}
                      className="mt-4 inline-block w-full text-center bg-frenchViolet text-antiFlashWhite font-medium py-2 px-4 rounded hover:bg-white hover:text-darkPurple transition"
                    >
                      Go to event
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {!events && !fetchError && <p>Loading events...</p>}
    </div>
  );
}
