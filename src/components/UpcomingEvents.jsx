import { EventCards } from "./EventCards";

export function UpcomingEvents() {
  return (
    <section className="bg-white text-darkPurple py-16 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <div className="max-w-screen-xl mx-auto space-y-8">
        <div className="text-left md:text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-frenchViolet">
            Upcoming events
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Check out some of the exciting events happening in your community.
            Whether you want to join a workshop, attend a neighbourhood picnic,
            or meet new people, there's always something for everyone.
          </p>
        </div>
        <EventCards />
      </div>
    </section>
  );
}
