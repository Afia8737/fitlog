"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Check, X, ChevronDown } from "lucide-react";
import Spinner from "@/components/Spinner";
import Stats from "@/components/Stats";
import { getWorkouts } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";

export default function MyPlan() {
  const { plan, saved, done, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("plan"); // "plan" or "saved"
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    getWorkouts().then(setAll).catch(() => setAll([])).finally(() => setLoading(false));
  }, []);

  const ids = tab === "plan" ? plan : saved;
  const list = all
    .filter((w) => ids.includes(w.id))
    .sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
      return b.rating - a.rating;
    });

  // Metrics always describe Today's Plan
  const planItems = all.filter((w) => plan.includes(w.id));
  const minutes = planItems.reduce((s, w) => s + w.duration, 0);
  const calories = planItems.reduce((s, w) => s + w.caloriesBurned, 0);

  const handleDone = (id) => {
    if (markDone(id)) toast.success("Marked as done. Nice work!");
    else toast("Already done", { icon: "✅" });
  };
  const handleRemove = (id) => {
    if (tab === "plan") removeFromPlan(id);
    else removeFromSaved(id);
    toast.success("Workout removed");
  };

  const metrics = [
    ["Exercises", planItems.length],
    ["Minutes", minutes],
    ["Calories", calories],
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-5xl font-bold uppercase">MY PLAN</h1>
      <p className="mt-1 text-gray-400">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="my-8 grid grid-cols-3 gap-3 sm:gap-6">
        {metrics.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-line bg-panel p-4 text-center">
            <p className="font-display text-3xl font-bold text-accent sm:text-4xl">{value}</p>
            <p className="text-xs text-gray-400 sm:text-sm">{label}</p>
          </div>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {[["plan", "Today's Plan"], ["saved", "Saved"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`rounded-lg px-4 py-2 text-sm font-bold ${tab === key ? "bg-accent text-black" : "border border-line text-gray-300"}`}>
              {label}
            </button>
          ))}
        </div>
        <label className="relative flex items-center gap-2 text-sm text-gray-300">
          Sort By
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none rounded-lg border border-line bg-panel py-2 pl-3 pr-8 text-white">
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-2" />
        </label>
      </div>

      {loading ? (
        <Spinner text="Loading workouts…" />
      ) : list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line py-16 text-center">
          <h2 className="font-display text-3xl font-bold">NOTHING HERE YET</h2>
          <p className="mb-6 mt-2 text-gray-400">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="inline-block rounded-lg bg-accent px-6 py-3 font-bold text-black">Go to workouts</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((w) => {
            const isDone = tab === "plan" && done.includes(w.id);
            return (
              <article key={w.id} className={`flex flex-col gap-4 rounded-xl border border-line bg-panel p-4 sm:flex-row sm:items-center ${isDone ? "opacity-60" : ""}`}>
                <img src={w.image} alt={w.name} className="h-32 w-full rounded-lg object-cover sm:h-24 sm:w-32" />
                <div className="flex-1 space-y-1">
                  <h3 className={`font-display text-xl font-bold uppercase ${isDone ? "line-through" : ""}`}>{w.name}</h3>
                  <p className="text-sm text-gray-400">{w.equipment}</p>
                  <Stats workout={w} />
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/fitlog/${w.id}`} className="rounded-lg border border-gray-500 px-3 py-2 text-sm font-semibold hover:border-accent">View Details</Link>
                  {tab === "plan" && (
                    <button onClick={() => handleDone(w.id)} className="flex items-center gap-1 rounded-lg bg-accent px-3 py-2 text-sm font-bold text-black">
                      <Check size={16} /> Mark as Done
                    </button>
                  )}
                  <button onClick={() => handleRemove(w.id)} aria-label="Remove" className="rounded-lg border border-line p-2 hover:border-red-400 hover:text-red-400">
                    <X size={18} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
