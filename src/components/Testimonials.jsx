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
    <section className="bg-frenchViolet text-antiFlashWhite px-6 py-12 sm:px-8 md:py-16 lg:px-16 xl:px-20 2xl:px-24">
      <div className="max-w-screen-xl mx-auto space-y-10">
        <h2 className="text-center text-3xl font-semibold">
          What our community says
        </h2>

        <div className="relative max-w-2xl mx-auto">
          <div className="p-6 sm:p-8 bg-antiFlashWhite text-darkPurple rounded-xl space-y-4 shadow-sm border border-blueGray transition-all duration-500 ease-in-out">
            <BiSolidQuoteLeft className="h-8 w-8 text-frenchViolet" />
            <p className="text-lg">{testimonial}</p>
            <p className="font-semibold">{name}</p>
          </div>

          <div className="flex justify-between items-center mt-6 text-base font-medium">
            <button
              onClick={handlePrev}
              className="hover:underline hover:text-blueGray transition"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="hover:underline hover:text-blueGray transition"
            >
              Next
            </button>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {testimonialData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentIndex
                    ? "bg-blueGray scale-110"
                    : "bg-antiFlashWhite hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
