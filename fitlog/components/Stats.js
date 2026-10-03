

export default function Stats({ workout }) {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-300">
      <span className="flex items-center gap-1"><Clock size={15} className="text-accent" />{workout.duration} min</span>
      <span className="flex items-center gap-1"><Flame size={15} className="text-accent" />{workout.caloriesBurned} kcal</span>
      <span className="flex items-center gap-1"><Star size={15} className="text-accent" />{workout.rating}</span>
    </div>
  );
}
