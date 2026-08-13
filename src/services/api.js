import { getIssues, saveIssues } from "../data/mockIssues";

export const api = {
  getIssues: async () => getIssues(),

  createIssue: async (issue) => {
    const issues = getIssues();
    const newIssue = {
      ...issue,
      id: `CIV-${Date.now().toString().slice(-6)}`,
      status: "Submitted",
      createdAt: new Date().toISOString(),
    };
    saveIssues([newIssue, ...issues]);
    return newIssue;
  },

  updateIssue: async (id, updates) => {
    const issues = getIssues().map((issue) =>
      issue.id === id ? { ...issue, ...updates } : issue
    );
    saveIssues(issues);
    return issues.find((issue) => issue.id === id);
  },
};
