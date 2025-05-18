import { useState } from "react";
import { testimonialData } from "../data/testimonialData";
import { BiSolidQuoteLeft } from "react-icons/bi";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = testimonialData.length;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? total - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === total - 1 ? 0 : prevIndex + 1
    );
  };

  const { testimonial, name } = testimonialData[currentIndex];

  return (
    <section className="space-y-6 p-6 sm:px-8 sm:py-8 md:p-12 lg:p-16 2xl:px-18 2xl:py-16">
      <h2>What our community says</h2>

      <div>
        <div>
          <BiSolidQuoteLeft />
          <p>{testimonial}</p>
          <p>{name}</p>
        </div>

        <div>
          <button onClick={handlePrev}>← Previous</button>
          <button onClick={handleNext}>Next →</button>
        </div>

        <div>
          {testimonialData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex
                  ? "bg-blueGray"
                  : "bg-white hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
