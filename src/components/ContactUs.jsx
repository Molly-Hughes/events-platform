import { ContactForm } from "./ContactForm";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export function ContactUs() {
  return (
    <section className="bg-antiFlashWhite text-darkPurple py-16 px-6 sm:px-8 md:px-16 lg:px-24 2xl:px-32">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-frenchViolet">Contact us</h2>
          <p className="text-base">
            If you have any questions, suggestions, or would like to get in
            touch with us, feel free to reach out!
          </p>

          <address className="not-italic space-y-6 text-sm">
            <div className="flex items-start gap-3">
              <FaLocationDot className="text-frenchViolet mt-1" />
              <p>
                <strong>Togetherhood HQ</strong> <br />
                45 Community Lane <br />
                Bristol, BS1 4QD <br />
                United Kingdom
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-frenchViolet" />
              <p>+44 117 123 4576</p>
            </div>

            <div className="flex items-center gap-3">
              <MdEmail className="text-frenchViolet" />
              <a
                href="mailto:hello@togetherhood.org"
                className="text-frenchViolet underline hover:text-darkPurple"
              >
                hello@togetherhood.org
              </a>
            </div>
          </address>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 lg:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
