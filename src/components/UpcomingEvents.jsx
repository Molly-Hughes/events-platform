import { EventCards } from "./EventCards";
import { Link } from "react-router-dom";

export function UpcomingEvents() {
  return (
    <div>
      <section>
        <div>
          <h2>Upcoming events</h2>
          <p>
            Check out some of the exciting events happening in your community.
            Whether you want to join a workshop, attend a neighbourhood picnic,
            or meet new people, there's always something for everyone.
          </p>
        </div>
      </section>
      <EventCards />
      <Link to="/events">View all events</Link>
    </div>
  );
}
