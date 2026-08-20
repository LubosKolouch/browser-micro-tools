# Browser Micro-Tools

A collection of lightweight, single-purpose Chrome extensions (Manifest V3) built in ~30 lines of clean JavaScript each.

No bloated frameworks, no analytics, no external network requests, and zero supply-chain risk.

---

## Why Micro-Tools Instead of 3rd-Party Extensions?

- **Zero Supply-Chain Risk:** Many Chrome Store extensions get sold to third parties, start tracking users, or inject malicious scripts into internal tools.
- **Audit in 30 Seconds:** Each tool contains about 30 lines of readable JavaScript that anyone can review and understand instantly.
- **Tailored to Your Workflow:** Exactly the functionality you need without unnecessary permissions or background telemetry.

---

## Included Extensions

### 1. URL Sanitizer (`1-url-sanitizer`)
Automatically strips tracking query parameters (`utm_*`, `fbclid`, `gclid`, `ref`, `si`, `igshid`, `mc_eid`, `twclid`, etc.) whenever you:
- Right-click and choose **"Copy link address"** on any link.
- Copy text containing URLs (`Cmd+C` / `Ctrl+C`).
- Hover over or click on any link.

### 2. Domain Flag / Highlighter (`2-domain-highlighter`)
Appends a small badge next to every link showing the actual destination domain it leads to (e.g. `[-> login-microsoft.security-check.com]`).
- **Trigger:** Automatic inspection of DOM and mutation observer on page updates.
- **Benefit:** Instantly exposes deceptive link text, hidden redirects, phishing, and typosquatting before you click.

### 3. Table-to-Clean-JSON (`3-table-to-clean-json`)
Extracts any HTML data table into structured JSON directly into your clipboard.
- **Trigger:** `Alt + Click` (on Windows/Linux) or `Option + Click` (on macOS) on any HTML table or table cell.
- **Benefit:** Instant conversion of web tables to API-ready JSON data without manual copy-pasting or spreadsheet export.

---

## How to Install (Load Unpacked in 30 Seconds)

1. Open Chrome, Brave, or Edge and navigate to `chrome://extensions`.
2. Toggle on **Developer mode** in the top-right corner.
3. Click **Load unpacked**.
4. Select any of the subfolders:
   - `1-url-sanitizer`
   - `2-domain-highlighter`
   - `3-table-to-clean-json`
5. That is it! The extension is active immediately.

---

## License

MIT License. Free to use, modify, and distribute.
