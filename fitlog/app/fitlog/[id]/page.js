"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Plus, Bookmark } from "lucide-react";
import Spinner from "@/components/Spinner";
import { getWorkout } from "@/lib/api";
import { usePlan, PLAN_LIMIT } from "@/context/PlanContext";

export default function Details() {
  const { id } = useParams();
  const [w, setW] = useState(null);
  const [loading, setLoading] = useState(true);
  const { plan, addToPlan, saveForLater } = usePlan();

  useEffect(() => {
    getWorkout(id)
      .then((data) => setW(data && data.id ? data : null))
      .catch(() => setW(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner text="Loading workout…" />;
  if (!w)
    return (
      <div className="py-24 text-center">
        <p className="mb-4 text-gray-300">Workout not found.</p>
        <Link href="/" className="text-accent underline">Back to workouts</Link>
      </div>
    );

  const planFull = plan.length >= PLAN_LIMIT && !plan.includes(w.id);

  const handleAdd = () => {
    const result = addToPlan(w.id);
    if (result === "added") toast.success("Added to today's plan");
    else if (result === "duplicate") toast("Already in today's plan", { icon: "ℹ️" });
    else toast.error("Plan is full (5 lifts max)");
  };
  const handleSave = () => {
    const result = saveForLater(w.id);
    if (result === "saved") toast.success("Saved for later");
    else toast("Already saved", { icon: "ℹ️" });
  };

  const specs = [
    ["EQUIPMENT", w.equipment],
    ["DIFFICULTY", w.difficulty],
    ["SETS", w.sets],
    ["REPS", w.reps],
    ["DURATION", `${w.duration} min`],
    ["CALORIES", `${w.caloriesBurned} kcal`],
    ["RATING", w.rating],
  ];

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2">
      <img src={w.image} alt={w.name} className="w-full rounded-2xl border border-line object-cover lg:sticky lg:top-24 lg:h-[600px]" />

      <div className="space-y-6">
        <div>
          <h1 className="font-display text-4xl font-bold uppercase sm:text-5xl">{w.name}</h1>
          <p className="mt-2 text-gray-300">{w.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {w.muscleGroups.map((g) => (
            <span key={g} className="rounded-full bg-accent/15 px-3 py-1 text-sm font-semibold text-accent">{g}</span>
          ))}
        </div>

        <div className="divide-y divide-line rounded-xl border border-line bg-panel">
          {specs.map(([label, value]) => (
            <div key={label} className="flex justify-between px-4 py-3 text-sm">
              <span className="font-semibold tracking-wider text-gray-400">{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>

        <div>
          <h2 className="mb-3 font-display text-2xl font-bold">INSTRUCTIONS</h2>
          <ol className="space-y-3">
            {w.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-gray-300">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-black">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button onClick={handleAdd} disabled={planFull}
            className="flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-bold text-black hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
            <Plus size={18} /> Add to today's plan
          </button>
          <button onClick={handleSave}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-500 px-6 py-3 font-bold hover:border-accent hover:text-accent">
            <Bookmark size={18} /> Save for later
          </button>
        </div>
      </div>
    </div>
  );
}
