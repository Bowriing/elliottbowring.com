const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const themeToggle = document.querySelector("[data-theme-toggle]");

const applyTheme = (theme) => {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
};

applyTheme(document.documentElement.dataset.theme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
});

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle?.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!open));
  siteNav?.classList.toggle("is-open", !open);
});

siteNav?.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  navToggle?.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
});

document.addEventListener("click", (event) => {
  if (!siteNav?.classList.contains("is-open")) return;
  if (siteNav.contains(event.target) || navToggle?.contains(event.target)) return;
  navToggle?.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const mainImage = gallery.querySelector("[data-gallery-main]");
  const thumbnails = [...gallery.querySelectorAll("[data-gallery-thumbnail]")];
  const previous = gallery.querySelector("[data-gallery-previous]");
  const next = gallery.querySelector("[data-gallery-next]");
  const count = gallery.querySelector("[data-gallery-count]");

  if (!mainImage || thumbnails.length === 0) return;

  let activeIndex = Math.max(0, thumbnails.findIndex((button) => button.getAttribute("aria-pressed") === "true"));

  const showImage = (index, moveFocus = false) => {
    activeIndex = (index + thumbnails.length) % thumbnails.length;
    const activeButton = thumbnails[activeIndex];
    mainImage.src = activeButton.dataset.src;
    mainImage.alt = activeButton.dataset.alt;
    thumbnails.forEach((button, buttonIndex) => button.setAttribute("aria-pressed", String(buttonIndex === activeIndex)));
    if (count) count.textContent = `${activeIndex + 1} / ${thumbnails.length}`;
    if (moveFocus) activeButton.focus();
  };

  thumbnails.forEach((button, index) => {
    button.addEventListener("click", () => showImage(index));
    button.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      showImage(index + (event.key === "ArrowRight" ? 1 : -1), true);
    });
  });

  previous?.addEventListener("click", () => showImage(activeIndex - 1));
  next?.addEventListener("click", () => showImage(activeIndex + 1));
});

const copyEmailButton = document.querySelector("[data-copy-email]");
const emailAddress = document.querySelector("[data-email-address]");

copyEmailButton?.addEventListener("click", async () => {
  if (!emailAddress) return;
  const originalLabel = copyEmailButton.textContent;

  try {
    await navigator.clipboard.writeText(emailAddress.textContent.trim());
    copyEmailButton.textContent = "Copied";
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(emailAddress);
    selection.removeAllRanges();
    selection.addRange(range);
    copyEmailButton.textContent = "Select & copy";
  }

  window.setTimeout(() => {
    copyEmailButton.textContent = originalLabel;
  }, 1800);
});
