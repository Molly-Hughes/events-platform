import { ContactUs } from "../components/ContactUs";

export function ContactPage() {
  return (
    <main className="bg-antiFlashWhite text-darkPurple">
      <section className="py-20 px-6 sm:px-12 md:px-24 lg:px-32">
        <h1 className="text-4xl font-bold text-frenchViolet mb-4">
          Get in Touch
        </h1>
        <p className="text-base">
          Whether you have a question, want to get involved, or just want to say
          hello — we’re here to help. Our team loves hearing from members of the
          community. Use the form below or reach out directly.
        </p>
      </section>
      <ContactUs />
    </main>
  );
}
