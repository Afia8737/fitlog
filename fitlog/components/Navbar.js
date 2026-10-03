"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const onPlanPage = pathname === "/my-plan";

  const linkClass = (active) =>
    `px-3 py-1.5 rounded-md text-sm font-semibold transition ${
      active ? "bg-accent/10 text-accent" : "text-gray-300 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <Link href="/"><Logo /></Link>

        <nav className="flex items-center gap-1 sm:gap-3">
          <Link href="/" className={linkClass(!onPlanPage)}>Workouts</Link>
          <Link href="/my-plan" className={linkClass(onPlanPage)}>My Plan</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/my-plan" className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-black">
            Plan {plan.length}
          </Link>
          <Link href="/my-plan" className="rounded-full border border-gray-500 px-3 py-1 text-xs font-bold text-gray-200">
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </header>
  );
}
