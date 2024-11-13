import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <img
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="App Logo"
        className="mb-4 h-24 w-24"
      />
      <h1 className="mb-2 text-3xl font-semibold">Page Not Found</h1>
      <p className="mb-6 text-lg text-gray-600">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="flex items-center gap-x-4 rounded-md bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
