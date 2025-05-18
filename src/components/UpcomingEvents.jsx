import { EventCards } from "./EventCards";
import { Link } from "react-router-dom";

export function UpcomingEvents() {
  return (
    <div>
      <section className="space-y-6 p-6 sm:px-8 sm:py-8 md:p-12 lg:p-16 2xl:px-18 2xl:py-16">
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
