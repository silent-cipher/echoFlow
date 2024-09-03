import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center text-white pt-12">
        <h1 className="text-4xl text-black">404 - Page Not Found</h1>
        <p className="mt-4 text-center text-black">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link href="/">
          <div className="bg-primary text-white py-2 px-4 rounded mt-4 cursor-pointer">
            Go to Home Page
          </div>
        </Link>
      </div>
    </div>
  );
}
