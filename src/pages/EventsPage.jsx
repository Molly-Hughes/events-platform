import { EventCards } from "../components/EventCards";

export function EventsPage() {
  return (
    <div>
      <section>
        <h1>Explore events near you</h1>
        <p>
          Find local events that bring our community together. From workshops
          and meetups to volunteer days and fun gatherings - there's something
          for everyone.
        </p>
      </section>
      <EventCards />
    </div>
  );
}
