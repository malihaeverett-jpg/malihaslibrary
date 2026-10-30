/* PORTAL TRANSITIONS — intercepts links to other local pages only */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const body = document.body;
  const world = body.dataset.world || "library";
  const labels = {
    library: "RETURNING TO THE LIBRARY",
    alchemised: "ENTERING ALCHEMISED",
    "cruel-prince": "ENTERING ELFHAME",
    scythe: "ACCESSING THE SCYTHE ARCHIVE"
  };

  const overlay = document.createElement("div");
  overlay.id = "portal-transition";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = '<span class="portal-label"></span>';
  overlay.querySelector(".portal-label").textContent = labels[world] || "CROSSING WORLDS";
  document.body.appendChild(overlay);

  // On arrival, the portal closes away to reveal the new page.
  if (!reduceMotion && !sessionStorage.getItem("skipPortalReveal")) {
    requestAnimationFrame(() => overlay.classList.add("portal-reveal"));
    window.setTimeout(() => overlay.classList.remove("portal-reveal"), 1000);
  } else {
    sessionStorage.removeItem("skipPortalReveal");
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
        link.target === "_blank" || link.hasAttribute("download")) return;

    const rawHref = link.getAttribute("href");
    if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:") || rawHref.startsWith("javascript:")) return;

    let destination;
    try { destination = new URL(rawHref, window.location.href); }
    catch { return; }

    // Only animate navigation within this same website.
    if (destination.origin !== window.location.origin) return;

    // Same page, different hash = an in-page section; let normal scrolling work.
    if (destination.pathname === window.location.pathname &&
        destination.search === window.location.search) return;

    event.preventDefault();
    if (reduceMotion) {
      window.location.href = destination.href;
      return;
    }

    overlay.querySelector(".portal-label").textContent =
      destination.pathname.endsWith("index.html") || destination.pathname === "/"
        ? "RETURNING TO THE LIBRARY"
        : (labels[destination.pathname.split("/").pop().replace(".html", "")] || "CROSSING WORLDS");
    overlay.classList.remove("portal-reveal");
    overlay.classList.add("portal-opening");

    // Preserve normal browser navigation and make the destination reveal its page.
    try { sessionStorage.setItem("skipPortalReveal", "1"); } catch {}
    window.setTimeout(() => { window.location.href = destination.href; }, 850);
  });
})();
