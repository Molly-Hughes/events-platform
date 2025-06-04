import { ContactUs } from "../components/ContactUs";
import { Testimonials } from "../components/Testimonials";

export function AboutPage() {
  return (
    <>
      <main className="max-w-screen-xl mx-auto px-6 py-12 sm:px-8 md:py-16 lg:px-16 xl:px-20 2xl:px-24 space-y-16 text-darkPurple">
        <header className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-frenchViolet">
            About Us
          </h1>
          <p className="text-base sm:text-lg max-w-3xl">
            At Togetherhood, we believe that strong communities are the heart of
            a thriving society. Our platform connects people in local
            neighbourhoods through events, fostering a sense of belonging,
            togetherness, and shared experiences.
          </p>
        </header>

        <section className="space-y-10">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            <div className="bg-darkPurple p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 ease-in-out">
              <h2 className="text-xl font-semibold text-white">
                Community First
              </h2>
              <p className="mt-2 text-base text-antiFlashWhite leading-relaxed">
                We're built on the belief that communities grow stronger when
                people come together. Our platform prioritises fostering
                connections that enrich local life.
              </p>
            </div>
            <div className="bg-darkPurple p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 ease-in-out">
              <h2 className="text-xl font-semibold text-white">Inclusivity</h2>
              <p className="mt-2 text-base text-antiFlashWhite leading-relaxed">
                We welcome everyone to join and share events—no matter who you
                are or where you're from. Diversity is at the core of what we
                do.
              </p>
            </div>
            <div className="bg-darkPurple p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 ease-in-out">
              <h2 className="text-xl font-semibold text-white">Simplicity</h2>
              <p className="mt-2 text-base text-antiFlashWhite leading-relaxed">
                We believe in providing a simple, user-friendly platform that
                makes it easy for everyone to discover and join events.
              </p>
            </div>
            <div className="bg-darkPurple p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 ease-in-out">
              <h2 className="text-xl font-semibold text-white">Impact</h2>
              <p className="mt-2 text-base text-antiFlashWhite leading-relaxed">
                We're passionate about making a positive impact in local
                communities, and we aim to help you do the same.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Testimonials />
      <ContactUs />
    </>
  );
}
