import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-line bg-black p-6 sm:p-10 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm font-bold tracking-[0.3em] text-accent">WORKOUT LIBRARY</p>
          <h1 className="font-display text-5xl font-bold uppercase leading-tight sm:text-6xl">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="max-w-lg text-gray-300">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          {/* Anchor link: scrolls to #library on the same page */}
          <a href="#library" className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-bold text-black hover:opacity-90">
            BROWSE WORKOUTS <ArrowDown size={18} />
          </a>
        </div>
        {/* Banner image from the Figma design (black background blends into the panel) */}
        <img src="/banner.png" alt="Muscle anatomy figure on a preacher curl machine" className="mx-auto h-72 w-full object-contain sm:h-96" />
      </div>
    </section>
  );
}
