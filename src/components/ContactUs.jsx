import { ContactForm } from "./ContactForm";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export function ContactUs() {
  return (
    <section>
      <div>
        <h2>Contact us</h2>
        <p>
          If you have any questions, suggestions, or would like to get in touch
          with us, feel free to reach out!
        </p>
        <address>
          <p>
            <FaLocationDot /> Togetherhood HQ <br /> 45 Community Lane <br />{" "}
            Bristol, BS1 4QD <br /> United Kingdom
          </p>
          <p>
            <FaPhoneAlt /> +44 117 123 4576
          </p>
          <p>
            <MdEmail />{" "}
            <a href="mailto:hello@togetherhood.com">hello@togetherhood.org</a>
          </p>
        </address>
      </div>

      <div>
        <ContactForm />
      </div>
    </section>
  );
}
