// Domain Highlighter: reveals actual destination domain next to every link
function revealDestinationDomains() {
  const currentHost = window.location.hostname;
  const links = document.querySelectorAll("a[href^='http']:not([data-domain-revealed])");

  links.forEach((a) => {
    a.setAttribute("data-domain-revealed", "true");
    try {
      const targetUrl = new URL(a.href);
      if (!targetUrl.hostname) return;

      // Highlight only if target domain is different from current host
      const isExternal = targetUrl.hostname !== currentHost &&
        !targetUrl.hostname.endsWith("." + currentHost) &&
        !currentHost.endsWith("." + targetUrl.hostname);

      if (isExternal) {
        a.classList.add("micro-external-link");
        const badge = document.createElement("span");
        badge.className = "micro-domain-badge";
        badge.textContent = ` [-> ${targetUrl.hostname}]`;
        a.appendChild(badge);
      }
    } catch {
      // Skip invalid URLs
    }
  });
}

// Initial run and dynamic mutation observer for single-page apps
revealDestinationDomains();
const observer = new MutationObserver(() => revealDestinationDomains());
observer.observe(document.body, { childList: true, subtree: true });
