import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-28 text-center">
      <h1 className="font-display text-8xl font-bold text-accent">404</h1>
      <p className="mb-6 mt-2 text-gray-300">This page skipped leg day. We can't find it.</p>
      <Link href="/" className="rounded-lg bg-accent px-6 py-3 font-bold text-black">Go to workouts</Link>
    </div>
  );
}
