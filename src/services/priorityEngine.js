export function calculatePriority(description = "", category = "") {
  const text = `${description} ${category}`.toLowerCase();

  const highWords = [
    "dangerous", "accident", "urgent", "overflowing", "severe",
    "broken", "major", "emergency", "blocked", "leakage"
  ];

  const mediumWords = [
    "damaged", "not working", "problem", "leaking", "crack"
  ];

  if (highWords.some((word) => text.includes(word))) return "HIGH";
  if (mediumWords.some((word) => text.includes(word))) return "MEDIUM";
  return "LOW";
}
