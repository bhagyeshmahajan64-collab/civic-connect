const STORAGE_KEY = "civicIssues";

export function getIssues() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Unable to load civic issues:", error);
    return [];
  }
}

export function saveIssues(issues) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
}