
"use strict";

// 1. Current year in footer
document.getElementById("year").textContent =
    new Date().getFullYear();


// 2. Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});


// 3. Scroll reveal animations
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


// 4. Animate skill bars when visible
const skillFills = document.querySelectorAll(".skill-fill");

if ("IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const level = Number(entry.target.dataset.level);
                    const safeLevel = Math.min(100, Math.max(0, level));

                    entry.target.style.width = `${safeLevel}%`;
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.4 }
    );

    skillFills.forEach((bar) => skillObserver.observe(bar));
} else {
    skillFills.forEach((bar) => {
        bar.style.width = `${bar.dataset.level}%`;
    });
}


// 5. Subtle mouse-based 3D tilt
const heroVisual = document.getElementById("heroVisual");
const cube = document.getElementById("cube");
const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

if (heroVisual && cube && !reduceMotion.matches) {
    heroVisual.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") return;

        const rect = heroVisual.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 18;
        const rotateX = (0.5 - y) * 18;

        heroVisual.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroVisual.addEventListener("pointerleave", () => {
        heroVisual.style.transform = "";
    });
}


// 6. Back-to-top button
const backToTop = document.getElementById("backToTop");

window.addEventListener(
    "scroll",
    () => {
        backToTop.classList.toggle("show", window.scrollY > 400);
    },
    { passive: true }
);

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: reduceMotion.matches ? "auto" : "smooth"
    });
});


// 7. Add a small interaction to project cards
document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch" || reduceMotion.matches) return;

        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        card.style.transform =
            `perspective(900px) rotateX(${(0.5 - y) * 3}deg) ` +
            `rotateY(${(x - 0.5) * 3}deg) translateY(-4px)`;
    });

    card.addEventListener("pointerleave", () => {
        card.style.transform = "";
    });
});

console.log("Neetesh's portfolio is ready!");
