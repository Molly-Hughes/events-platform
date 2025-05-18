import { EventCards } from "../components/EventCards";

export function EventsPage() {
  return (
    <div className="bg-antiFlashWhite text-darkPurple">
      <section className="max-w-screen-xl mx-auto space-y-6 px-6 py-12 sm:px-8 md:py-16 lg:px-16 xl:px-20 2xl:px-24">
        <h1>
          Explore <span className="text-frenchViolet">events near you.</span>
        </h1>
        <p>
          Find local events that bring our community together. From workshops
          and meetups to volunteer days and fun gatherings — there's something
          for everyone.
        </p>
      </section>

      <EventCards />
    </div>
  );
}
