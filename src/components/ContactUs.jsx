import { ContactForm } from "./ContactForm";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export function ContactUs() {
  return (
    <section className="bg-antiFlashWhite text-darkPurple py-20 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-frenchViolet mb-4">
              Contact us
            </h2>
            <p className="text-base sm:text-lg leading-relaxed">
              If you have any questions, suggestions, or would like to get in
              touch with us, feel free to reach out!
            </p>
          </div>

          <address className="not-italic space-y-8 text-sm sm:text-base">
            <div className="flex items-start gap-4">
              <FaLocationDot className="text-frenchViolet mt-1 shrink-0" />
              <p>
                <strong>Togetherhood HQ</strong> <br />
                45 Community Lane <br />
                Bristol, BS1 4QD <br />
                United Kingdom
              </p>
            </div>

            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-frenchViolet shrink-0" />
              <p>+44 117 123 4576</p>
            </div>

            <div className="flex items-center gap-4">
              <MdEmail className="text-frenchViolet shrink-0" />
              <a
                href="mailto:hello@togetherhood.org"
                className="text-frenchViolet underline hover:text-darkPurple transition"
              >
                hello@togetherhood.org
              </a>
            </div>
          </address>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10 border border-blueGray">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
