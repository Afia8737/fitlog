export default function Logo() {
  return (
    <span className="flex items-center gap-2">
      <img src="/logo.png" alt="FitLog logo" className="h-7 w-7 object-contain" />
      <span className="font-display text-2xl font-bold tracking-wide">FITLOG</span>
    </span>
  );
}
