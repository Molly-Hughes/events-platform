import { ContactUs } from "../components/ContactUs";

export function ContactPage() {
  return (
    <main className="bg-antiFlashWhite text-darkPurple min-h-screen">
      <section className="py-16 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 2xl:px-48 max-w-screen-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-frenchViolet mb-4 max-w-3xl">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed">
          Whether you have a question, want to get involved, or just want to say
          hello — we’re here to help. Our team loves hearing from members of the
          community. Use the form below or reach out directly.
        </p>
      </section>
      <ContactUs />
    </main>
  );
}
