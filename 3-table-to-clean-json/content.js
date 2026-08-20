// Table-to-Clean-JSON: extracts HTML table data to structured JSON
function tableToJson(tableEl) {
  const rows = Array.from(tableEl.querySelectorAll("tr"));
  if (!rows.length) return [];

  // Extract headers or fallback to col0, col1...
  const headerCells = Array.from(rows[0].querySelectorAll("th, td"));
  const headers = headerCells.map((th, i) => th.innerText.trim() || `col_${i}`);
  const dataRows = rows[0].querySelector("th") ? rows.slice(1) : rows;

  return dataRows.map((row) => {
    const cells = Array.from(row.querySelectorAll("td, th"));
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = cells[i] ? cells[i].innerText.trim() : "";
    });
    return obj;
  }).filter(row => Object.values(row).some(v => v !== ""));
}

document.addEventListener("click", (event) => {
  // Alt + Click on any table or inside a table to copy JSON
  if (!event.altKey) return;
  const table = event.target.closest("table");
  if (!table) return;

  event.preventDefault();
  const data = tableToJson(table);
  const jsonStr = JSON.stringify(data, null, 2);
  
  navigator.clipboard.writeText(jsonStr).then(() => {
    const toast = document.createElement("div");
    toast.textContent = `Copied ${data.length} rows as clean JSON!`;
    toast.style.cssText = "position:fixed;bottom:20px;right:20px;background:#2ecc71;color:#fff;padding:10px 16px;border-radius:6px;font-family:sans-serif;font-weight:bold;z-index:999999;box-shadow:0 4px 12px rgba(0,0,0,0.15);";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  });
});
