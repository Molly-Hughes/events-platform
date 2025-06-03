import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { EventFilters } from "./EventFilters";
import { EventCardGrid } from "./EventCardGrid";

export function EventCards() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchUserAndEvents = async () => {
      const userRes = await supabase.auth.getUser();
      setUser(userRes.data.user);

      const { data, error } = await supabase.from("events").select();
      if (error) setFetchError("Error loading events");
      else setEvents(data);
    };

    fetchUserAndEvents();
  }, []);

  const handleEventUpdate = (id, updatedData) => {
    if (!updatedData) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } else {
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...updatedData } : e))
      );
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedDate("");
    setSortOrder("asc");
  };

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        !selectedLocation || event.location === selectedLocation;

      const matchesDate = !selectedDate || event.date === selectedDate;

      return matchesSearch && matchesLocation && matchesDate;
    })
    .sort((a, b) => {
      return sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });

  return (
    <div className="max-w-screen-xl mx-auto px-6 pb-12">
      {fetchError && <p className="text-red-600">{fetchError}</p>}

      {events.length > 0 && (
        <>
          <EventFilters
            events={events}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            clearFilters={clearFilters}
          />

          <EventCardGrid
            events={filteredEvents}
            user={user}
            onEventUpdate={handleEventUpdate}
          />
        </>
      )}

      {!events.length && !fetchError && <p>Loading events...</p>}
    </div>
  );
}
