// Main API (from the README) and the backup API.
const MAIN = "https://api.abcz.workers.dev/api/fitlog";
const BACKUP = "https://api.api-store.workers.dev/api/fitlog";

async function request(path = "") {
  for (const base of [MAIN, BACKUP]) {
    try {
      const res = await fetch(base + path);
      if (res.ok) return await res.json();
    } catch (e) {
      // try the next API
    }
  }
  throw new Error("Could not load data");
}

// All workouts:  GET /api/fitlog
export const getWorkouts = () => request();

// One workout:  GET /api/fitlog/:id
// If the single endpoint fails or answers in a different shape,
// we fall back to finding the workout in the full list.
export async function getWorkout(id) {
  try {
    const data = await request("/" + id);
    const item = data && data.data ? data.data : data; // handles { data: {...} } too
    if (item && !Array.isArray(item) && item.id) return item;
  } catch (e) {}
  const all = await request();
  return all.find((w) => String(w.id) === String(id)) || null;
}
