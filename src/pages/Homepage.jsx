import { Link } from "react-router-dom";
import { Testimonials } from "../components/Testimonials";
import { ContactUs } from "../components/ContactUs";
import { UpcomingEvents } from "../components/UpcomingEvents";

export function Homepage() {
  return (
    <div className="bg-antiFlashWhite text-darkPurple">
      <section className="flex flex-col justify-center min-h-screen w-full bg-antiFlashWhite text-darkPurple">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-6 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 text-left md:text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Find events <br />
            <span className="text-frenchViolet">in your community.</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl">
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
      <section className="bg-darkPurple text-antiFlashWhite w-full px-6 py-16 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="max-w-screen-xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-center">How it works</h2>

          <p className="text-base sm:text-lg max-w-2xl mx-auto text-center">
            Joining your local community has never been easier. With
            Togetherhood, you can discover and join local events in just a few
            clicks.
          </p>

          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <div className="bg-antiFlashWhite text-darkPurple rounded-xl p-6 flex-1 shadow-md space-y-3">
              <h3 className="text-xl font-semibold text-frenchViolet">
                Find local events
              </h3>
              <p className="text-sm sm:text-base">
                Browse events in your area — from community meetups to volunteer
                opportunities, find activities that match your interests.
              </p>
            </div>

            <div className="bg-antiFlashWhite text-darkPurple rounded-xl p-6 flex-1 shadow-md space-y-3">
              <h3 className="text-xl font-semibold text-frenchViolet">
                Sign up and join
              </h3>
              <p className="text-sm sm:text-base">
                Sign up for an event and be part of something bigger. Meet
                like-minded people and take part in your community's social
                life.
              </p>
            </div>
          </div>
        </div>
      </section>
      <UpcomingEvents />
      <Testimonials />
      <ContactUs />
    </div>
  );
}
