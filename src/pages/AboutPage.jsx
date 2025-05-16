import { ContactUs } from "../components/ContactUs";
import { Testimonials } from "../components/Testimonials";

export function AboutPage() {
  return (
    <>
      <main>
        <header>
          <h1>About us</h1>
          <p>
            At Togetherhood, we believe that strong communities are the heart of
            a thriving society. Our platform connects people in local
            neighbourhoods through events, fostering a sense of belonging,
            togetherness, and shared experiences.
          </p>
        </header>

        <section>
          <h2>Our values</h2>

          <div>
            <h3>Community first</h3>
            <p>
              We're built on the belief that communities grow stronger when
              people come together. Our platform prioritises fostering
              connections that enrich local life.
            </p>
          </div>

          <div>
            <h3>Inclusivity</h3>
            <p>
              We welcome everyone to join and share events - no matter who you
              are or where you're from. Diversity is at the core of what we do.
            </p>
          </div>

          <div>
            <h3>Simplicity</h3>
            <p>
              We believe in providing a simple, user-friendly platform that
              makes it easy for everyone to discover and join events.
            </p>
          </div>

          <div>
            <h3>Impact</h3>
            <p>
              We're passionate about making a positive impact in local
              communities, and we aim to help you do the same.
            </p>
          </div>
        </section>
      </main>

      <Testimonials />
      <ContactUs />
    </>
  );
}
