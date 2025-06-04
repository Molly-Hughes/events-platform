import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-100 text-gray-800 px-6 py-12 sm:py-16">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-extrabold mb-6 max-w-full break-words leading-tight">
        404 Page Not Found
      </h1>
      <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl mb-8 max-w-md sm:max-w-lg mx-auto px-2 sm:px-0">
        We searched high and low but couldn't find what you're looking for.
        Let's find a better place for you to go.
      </p>
      <Link
        to="/"
        className="px-5 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-4 xl:px-12 xl:py-5 2xl:px-14 2xl:py-6 bg-frenchViolet text-white rounded-full hover:bg-darkPurple transition text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
      >
        Go back home
      </Link>
    </main>
  );
}
