// URL Sanitizer: cleans links on copy and on right-click "Copy link address"
const TRACKING_PARAMS = new Set([
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "fbclid", "gclid", "dclid", "msclkid", "mc_eid", "_ga", "_gl",
  "si", "igshid", "ref", "ref_src", "trk", "twclid", "li_fat_id"
]);

function cleanUrl(urlObj) {
  const toDelete = [];
  urlObj.searchParams.forEach((_, key) => {
    if (TRACKING_PARAMS.has(key.toLowerCase()) || key.toLowerCase().startsWith("utm_")) {
      toDelete.push(key);
    }
  });
  toDelete.forEach(k => urlObj.searchParams.delete(k));
  return urlObj.toString();
}

// 1. Sanitize links before right-click menu or hover (for native "Copy link address")
function cleanAnchor(anchor) {
  if (!anchor || !anchor.href || !anchor.href.startsWith("http")) return;
  try {
    const url = new URL(anchor.href);
    const cleaned = cleanUrl(url);
    if (cleaned !== anchor.href) {
      anchor.href = cleaned;
    }
  } catch {}
}

document.addEventListener("contextmenu", (e) => cleanAnchor(e.target.closest("a")), true);
document.addEventListener("mouseover", (e) => cleanAnchor(e.target.closest("a")), true);

// 2. Sanitize clipboard on text selection copy (Cmd+C / Ctrl+C)
document.addEventListener("copy", (event) => {
  const selection = window.getSelection()?.toString();
  if (!selection || !selection.includes("http")) return;

  const cleaned = selection.replace(/https?:\/\/[^\s"'<>]+/g, (match) => {
    try { return cleanUrl(new URL(match)); } catch { return match; }
  });

  if (cleaned !== selection) {
    event.clipboardData?.setData("text/plain", cleaned);
    event.preventDefault();
  }
});
