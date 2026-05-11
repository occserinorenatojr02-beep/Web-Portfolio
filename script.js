document.addEventListener("DOMContentLoaded", () => {
    // SELECTORS //
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const navMenu = $(".menu");
    const menuToggle = $("#menu-toggle");

    const getNavHeight = () => {
        return navMenu ? navMenu.offsetHeight : 0;
    };


    // SMOOTH SCROLL (FIXED) //
    let isScrolling = false;

    const scrollToTarget = (target) => {
        if (!target || isScrolling) return;

        isScrolling = true;

        const offset = getNavHeight();

        // Accurate position on all devices //
        const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            offset;

        // Native smooth scrolling (better performance) //
        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

        // Unlock after animation //
        setTimeout(() => {
            isScrolling = false;
        }, 800);
    };

    // NAVIGATION LINKS //
    $$(".menu a").forEach(link => {

        link.addEventListener("click", (e) => {
            e.preventDefault();

            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) return;

            const target = $(href);

            scrollToTarget(target);

            // Auto close mobile menu //
            navMenu.classList.remove("active");
        });

    });

    // READ MORE BUTTON //
    const readMoreLink = $("#read-more-link");

    if (readMoreLink) {

        readMoreLink.addEventListener("click", (e) => {
            e.preventDefault();

            const target = $("#education");

            scrollToTarget(target);

            // Smooth reveal effect
            if (target) {

                target.style.opacity = "0";
                target.style.transform = "translateY(30px)";

                requestAnimationFrame(() => {

                    setTimeout(() => {

                        target.style.transition =
                            "opacity 0.6s ease, transform 0.6s ease";

                        target.style.opacity = "1";
                        target.style.transform = "translateY(0)";

                    }, 150);

                });

            }
        });

    }

    // BUTTON CLICK EFFECT //
    $$("button").forEach(btn => {

        btn.addEventListener("click", () => {

            btn.style.transform = "scale(0.95)";

            setTimeout(() => {
                btn.style.transform = "scale(1)";
            }, 120);

        });

    });


    // SCROLL REVEAL //
    const revealElements = $$(
        ".home-text, .home-img, .card, .about-text, .about-img, .education, .skills, .experience"
    );

    const observer = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const el = entry.target;

            el.style.opacity = "1";
            el.style.transform = "translateY(0)";

            obs.unobserve(el);

        });

    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {

        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(el);

    });

    // TYPING ANIMATION //
    const nameText = "Renato R. Seriño Jr.";
    const typedName = $("#typed-name");

    if (typedName) {

        let index = 0;
        let deleting = false;

        const typeLoop = () => {

            typedName.textContent =
                nameText.slice(0, index);

            if (!deleting && index === nameText.length) {

                deleting = true;

                return setTimeout(typeLoop, 1200);

            }

            if (deleting && index === 0) {

                deleting = false;

                return setTimeout(typeLoop, 500);

            }

            index += deleting ? -1 : 1;

            setTimeout(
                typeLoop,
                deleting ? 60 : 100
            );

        };

        typeLoop();

    }

    
    // MOBILE MENU TOGGLE //
    
    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

    }

});