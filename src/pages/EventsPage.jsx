import { EventCards } from "../components/EventCards";

export function EventsPage() {
  return (
    <div className="bg-antiFlashWhite text-darkPurple">
      <section className="max-w-screen-xl mx-auto px-6 py-12 sm:px-8 md:py-16 lg:px-16 xl:px-20 2xl:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
            <h1 className="text-4xl font-bold">
              Explore{" "}
              <span className="text-frenchViolet">events near you.</span>
            </h1>
            <p className="text-lg">
              Find local events that bring our community together. From
              workshops and meetups to volunteer days and fun gatherings —
              there's something for everyone.
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <img
              src="src/assets/hillary-ungson-TdpSX7XAcKo-unsplash (1).jpg"
              alt="Community event"
              className="w-full h-64 sm:h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <EventCards />
    </div>
  );
}
