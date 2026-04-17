// ─── Progress Helpers ───────────────────────────────────────────────
function getProgress() {
  return JSON.parse(localStorage.getItem("sqlProgress") || "{}");
}

function saveProgress(trackId, questionId) {
  const p = getProgress();
  if (!p[trackId]) p[trackId] = [];
  if (!p[trackId].includes(questionId)) p[trackId].push(questionId);
  localStorage.setItem("sqlProgress", JSON.stringify(p));
}

function isCompleted(trackId, questionId) {
  const p = getProgress();
  return p[trackId] && p[trackId].includes(questionId);
}

function getCompletedCount(trackId) {
  const p = getProgress();
  return (p[trackId] || []).length;
}

// ─── URL Param Helper ────────────────────────────────────────────────
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}
