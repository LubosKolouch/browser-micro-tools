// Domain Highlighter: reveals actual destination domain next to every link
function revealDestinationDomains() {
  const currentHost = window.location.hostname;
  const links = document.querySelectorAll("a[href^='http']:not([data-domain-revealed])");

  links.forEach((a) => {
    a.setAttribute("data-domain-revealed", "true");
    try {
      const targetUrl = new URL(a.href);
      if (!targetUrl.hostname) return;

      // Create domain badge showing where the link actually points
      const badge = document.createElement("span");
      badge.className = "micro-domain-badge";
      badge.textContent = ` [-> ${targetUrl.hostname}]`;

      // Highlight if target domain is different from current host
      if (targetUrl.hostname !== currentHost && !targetUrl.hostname.endsWith("." + currentHost)) {
        a.classList.add("micro-external-link");
      }

      a.appendChild(badge);
    } catch {
      // Skip invalid URLs
    }
  });
}

// Initial run and dynamic mutation observer for single-page apps
revealDestinationDomains();
const observer = new MutationObserver(() => revealDestinationDomains());
observer.observe(document.body, { childList: true, subtree: true });
