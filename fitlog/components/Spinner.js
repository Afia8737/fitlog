export default function Spinner({ text = "Loading workouts…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-gray-300">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" />
      <p>{text}</p>
    </div>
  );
}
