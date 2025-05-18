import { Link } from "react-router-dom";
import { Testimonials } from "../components/Testimonials";
import { ContactUs } from "../components/ContactUs";
import { UpcomingEvents } from "../components/UpcomingEvents";

export function Homepage() {
  return (
    <div className="bg-antiFlashWhite text-darkPurple">
      <section className="flex flex-col justify-center min-h-screen w-full bg-antiFlashWhite text-darkPurple">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-6 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 text-left md:text-center">
          <h1>
            Find events <br />
            <span className="text-frenchViolet">in your community.</span>
          </h1>
          <p>
            Togetherhood is a community platform designed to bring people
            together through local events. Whether you're looking to meet new
            people or discover exciting activities, Togetherhood helps you
            connect with your community in meaningful ways.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-start sm:items-center md:justify-center sm:gap-6">
            <Link
              to="/events"
              className="bg-frenchViolet text-antiFlashWhite hover:bg-white hover:text-frenchViolet hover:border-2 hover:border-frenchViolet transition-all duration-300 ease-in-out font-medium text-center rounded-xl px-6 py-2 sm:px-8 sm:py-3"
            >
              Find events
            </Link>
            <Link
              to="/about"
              className="bg-frenchViolet text-antiFlashWhite hover:bg-white hover:text-frenchViolet hover:border-2 transition-all duration-300 ease-in-out font-medium text-center rounded-xl px-6 py-2 sm:px-8 sm:py-3"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-darkPurple text-antiFlashWhite max-w-screen mx-auto space-y-6 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 2xl:p-24">
        <h2>How it works</h2>
        <p>
          Joining our local community has never been easier. With Togetherhood,
          you can discover and join local events in just a few clicks.
        </p>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16">
          <div className="bg-antiFlashWhite text-darkPurple rounded-xl p-4 sm:flex-1 flex flex-col min-h-[200px]">
            <h3 className="text-frenchViolet mb-2">Find local events</h3>
            <p className="flex-grow">
              Browse events in your area. From community meetups to volunteer
              opportunities, you can find activities that match your interests.
            </p>
          </div>

          <div className="bg-antiFlashWhite text-darkPurple rounded-xl p-4 sm:flex-1 flex flex-col min-h-[200px]">
            <h3 className="text-frenchViolet mb-2">Sign up and join</h3>
            <p className="flex-grow">
              Sign up for an event and become part of something bigger. Meet
              like-minded people and take part in your community's social life.
            </p>
          </div>
        </div>
      </section>

      <UpcomingEvents />

      <Testimonials />

      <ContactUs />
    </div>
  );
}
