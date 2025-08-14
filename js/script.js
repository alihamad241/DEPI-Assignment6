document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu-btn");
    const closeMenuBtn = document.querySelector(".close-mobile-menu");
    const overlay = document.querySelector(".offcanvas-overlay");

    const toggleMenu = () => {
        document.body.classList.toggle("mobile-nav-open");
    };

    if (menuBtn) menuBtn.addEventListener("click", toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener("click", toggleMenu);
    if (overlay) overlay.addEventListener("click", toggleMenu);

    const customizerBtn = document.querySelector(".btn-customize");
    const customizerCloseBtn = document.querySelector(
        ".customizer-panel .btn-close"
    );
    const customizerOverlay = document.querySelector(".customizer-overlay");

    const toggleCustomizer = () => {
        document.body.classList.toggle("customizer-open");
    };

    if (customizerBtn) {
        customizerBtn.addEventListener("click", (e) => {
            e.preventDefault();
            toggleCustomizer();
        });
    }
    if (customizerCloseBtn) {
        customizerCloseBtn.addEventListener("click", toggleCustomizer);
    }
    if (customizerOverlay) {
        customizerOverlay.addEventListener("click", toggleCustomizer);
    }
    const themeSwitcher = document.querySelector(".theme_switcher");

    if (themeSwitcher) {
        const themeBtn = themeSwitcher.querySelector(".theme-btn");
        const themeDropdown = themeSwitcher.querySelector(".theme-dropdown");

        themeBtn.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent link from navigating
            themeDropdown.classList.toggle("show");
        });

        // Close the dropdown if the user clicks outside of it
        window.addEventListener("click", (event) => {
            if (!themeSwitcher.contains(event.target)) {
                themeDropdown.classList.remove("show");
            }
        });
    }
    const themeOptions = document.querySelectorAll(".theme-option");
    const checkmarkIconHTML = `<svg class="icon-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>`;

    /**
     * Applies the selected theme to the document.
     * @param {string} theme - The theme to apply ('light', 'dark', or 'auto').
     */
    const applyTheme = (theme) => {
        const isSystemDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        if (theme === "dark" || (theme === "auto" && isSystemDark)) {
            document.documentElement.classList.add("dark-theme");
        } else {
            document.documentElement.classList.remove("dark-theme");
        }
    };

    /**
     * Updates the UI of the dropdown to reflect the active theme.
     * @param {string} activeTheme - The currently active theme.
     */
    const updateUI = (activeTheme) => {
        themeOptions.forEach((option) => {
            const theme = option.getAttribute("data-theme");
            const checkmark = option.querySelector(".icon-checkmark");

            option.classList.remove("active");
            if (checkmark) {
                checkmark.remove();
            }

            if (theme === activeTheme) {
                option.classList.add("active");
                option.insertAdjacentHTML("beforeend", checkmarkIconHTML);
            }
        });
    };

    const initializeTheme = () => {
        const savedTheme = localStorage.getItem("theme") || "auto";
        applyTheme(savedTheme);
        updateUI(savedTheme);
    };

    themeOptions.forEach((option) => {
        option.addEventListener("click", (event) => {
            event.preventDefault();
            const selectedTheme = option.getAttribute("data-theme");

            localStorage.setItem("theme", selectedTheme);

            applyTheme(selectedTheme);
            updateUI(selectedTheme);
        });
    });

    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "auto") {
                applyTheme("auto");
            }
        });

    initializeTheme();
});
