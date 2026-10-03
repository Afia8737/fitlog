import Link from "next/link";
import Stats from "./Stats";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/fitlog/${workout.id}`}
      className="group overflow-hidden rounded-xl border border-line bg-panel transition hover:-translate-y-1 hover:border-accent"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img src={workout.image} alt={workout.name} className="h-full w-full object-cover transition group-hover:scale-105" />
      </div>
      <div className="space-y-2 p-4">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((g) => (
            <span key={g} className="rounded bg-accent/15 px-2 py-0.5 text-[11px] font-bold uppercase text-accent">{g}</span>
          ))}
        </div>
        <h3 className="font-display text-xl font-bold uppercase">{workout.name}</h3>
        <p className="text-sm text-gray-400">{workout.equipment}</p>
        <div className="border-t border-line pt-3"><Stats workout={workout} /></div>
      </div>
    </Link>
  );
}
