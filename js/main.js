// Shared navigation and theme behavior used by every page.

document.addEventListener("DOMContentLoaded", () => {
    // Highlight the current page in the navigation bar.
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav]").forEach(link => {
        if (link.getAttribute("data-nav") === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    // Restore the saved theme, then allow the visitor to switch themes.
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("eventoraTheme");
    if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
    }

    if (themeToggle) {
        themeToggle.textContent = document.documentElement.getAttribute("data-theme") === "light" ? "☾" : "☼";
        themeToggle.addEventListener("click", () => {
            const isLight = document.documentElement.getAttribute("data-theme") === "light";
            if (isLight) {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("eventoraTheme", "dark");
                themeToggle.textContent = "☼";
            } else {
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("eventoraTheme", "light");
                themeToggle.textContent = "☾";
            }
        });
    }
});
