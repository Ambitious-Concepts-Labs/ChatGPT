"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-full place-itmes-center px-6 py-24 sm: lg:px-8 bg-gray-900">
      <div className="text-center">
        <p className="text-base font-semibold text-emerald-700 dark:text-emerald-500">
          There was a problem
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {error.message || " Something went wrong!"}
        </h2>
        <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-50">
          Please try again later or contact support if the problem persists!
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            className="text-white"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </button>
          <Link className="text-white" href="/">
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
