import { useState } from "react";
import { testimonialData } from "../data/testimonialData";
import { BiSolidQuoteLeft } from "react-icons/bi";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = testimonialData.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const { testimonial, name } = testimonialData[currentIndex];

  return (
    <section className="bg-frenchViolet text-antiFlashWhite py-16 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <div className="max-w-screen-xl mx-auto space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          What our community says
        </h2>

        <div className="relative max-w-3xl mx-auto">
          <div className="bg-antiFlashWhite text-darkPurple rounded-2xl shadow-md p-6 sm:p-8 space-y-5 border border-blueGray transition-all duration-500">
            <BiSolidQuoteLeft className="h-8 w-8 text-frenchViolet" />
            <p className="text-lg leading-relaxed">"{testimonial}"</p>
            <p className="font-semibold text-right text-frenchViolet">
              — {name}
            </p>
          </div>

          <div className="flex justify-between mt-8 text-sm sm:text-base font-medium">
            <button
              onClick={handlePrev}
              className="hover:underline hover:text-blueGray transition"
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              className="hover:underline hover:text-blueGray transition"
            >
              Next →
            </button>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {testimonialData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentIndex
                    ? "bg-blueGray scale-110"
                    : "bg-white hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
