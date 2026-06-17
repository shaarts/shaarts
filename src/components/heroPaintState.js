// Shared paint progress (0–1) for the hero, written by the pinned scroll track
// in Home and read by the 3D scene each frame. Kept outside React state so it
// never triggers re-renders.
export const heroPaint = { progress: 0 };
