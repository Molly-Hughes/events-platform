import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="h-screen flex flex-col justify-center items-center text-center bg-gray-100 text-gray-800 px-6">
      <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold mb-4 max-w-full break-words">
        404 Page Not Found
      </h1>
      <p className="text-sm sm:text-base md:text-lg mb-6 max-w-md mx-auto">
        We searched high and low but couldn't find what you're looking for.
        Let's find a better place for you to go.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-frenchViolet text-white rounded-full hover:bg-darkPurple transition"
      >
        Go back home
      </Link>
    </main>
  );
}
