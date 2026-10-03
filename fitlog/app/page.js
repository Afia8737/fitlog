"use client";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Spinner from "@/components/Spinner";
import WorkoutCard from "@/components/WorkoutCard";
import { getWorkouts } from "@/lib/api";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getWorkouts()
      .then(setWorkouts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Hero />
      <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6">
        <h2 className="font-display text-4xl font-bold uppercase">THE LIBRARY</h2>
        <p className="mb-8 mt-1 text-gray-400">Twelve lifts covering every major muscle group.</p>

        {loading && <Spinner />}
        {error && <p className="py-10 text-center text-red-400">Something went wrong. Please refresh.</p>}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((w) => <WorkoutCard key={w.id} workout={w} />)}
        </div>
      </section>
    </>
  );
}
