"use client";
import { createContext, useContext, useEffect, useState } from "react";

const PlanContext = createContext(null);
export const PLAN_LIMIT = 5;

// We only store workout IDs. The full data is fetched from the API.
export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [ready, setReady] = useState(false);

  // Load from localStorage once (so data survives a reload)
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("fitlog") || "{}");
      setPlan(data.plan || []);
      setSaved(data.saved || []);
      setDone(data.done || []);
    } catch (e) {}
    setReady(true);
  }, []);

  // Save whenever something changes
  useEffect(() => {
    if (ready) localStorage.setItem("fitlog", JSON.stringify({ plan, saved, done }));
  }, [plan, saved, done, ready]);

  const addToPlan = (id) => {
    if (plan.includes(id)) return "duplicate";
    if (plan.length >= PLAN_LIMIT) return "full";
    setPlan([...plan, id]);
    return "added";
  };
  const saveForLater = (id) => {
    if (saved.includes(id)) return "duplicate";
    setSaved([...saved, id]);
    return "saved";
  };
  const removeFromPlan = (id) => {
    setPlan(plan.filter((x) => x !== id));
    setDone(done.filter((x) => x !== id));
  };
  const removeFromSaved = (id) => setSaved(saved.filter((x) => x !== id));
  const markDone = (id) => {
    if (done.includes(id)) return false;
    setDone([...done, id]);
    return true;
  };

  return (
    <PlanContext.Provider
      value={{ plan, saved, done, addToPlan, saveForLater, removeFromPlan, removeFromSaved, markDone }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);
