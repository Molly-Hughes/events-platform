import { Link } from "react-router-dom";
import { Testimonials } from "../components/Testimonials";
import { ContactUs } from "../components/ContactUs";
import { UpcomingEvents } from "../components/UpcomingEvents";

export function Homepage() {
  return (
    <>
      <section>
        <h1>Enjoy events in your community</h1>
        <p>
          Togetherhood is a community platform designed to bring people together
          through local events. Whether you're looking to meet new people or
          discover exciting activities, Togetherhood helps you connect with your
          community in meaningful ways.
        </p>
        <Link to="/events">Find events</Link>
        <Link to="/about">Learn more</Link>
      </section>

      <section>
        <h2>How it works</h2>
        <p>
          Joining our local community has never been easier. With Togetherhood,
          you can discover and join local events in just a few clicks.
        </p>

        <h3>Discover local events</h3>
        <p>
          Browse a wide range of events in your area. From community meetups to
          volunteer opportunities, you can find activities that match your
          interests.
        </p>

        <h3>Sign up and join</h3>
        <p>
          Sign up for an event and become part of something bigger. Meet
          like-minded people and take part in your community's vibrant social
          life.
        </p>
      </section>

      <UpcomingEvents />

      <Testimonials />

      <ContactUs />
    </>
  );
}
