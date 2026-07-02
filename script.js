/* =====================
   PAGE LOADER — letters scramble into "Rodee", then the dot
   rolls in Pixar-lamp style and lands as the period
   ===================== */
document.body.classList.add("loading");
const pageLoader = document.getElementById("page-loader");
const scrambleEl = document.getElementById("loader-scramble");
const loaderLogoEl = document.querySelector(".loader-logo");
const loaderDotEl = document.querySelector(".loader-dot");
const loaderFlashEl = document.querySelector(".loader-boom-flash");
const SCRAMBLE_TARGET = "Rodee";
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SCRAMBLE_FRAMES = 24;
const SCRAMBLE_INTERVAL_MS = 45;
const DOT_ROLL_MS = 900;

function scrambleTick(frame) {
    const framesPerLetter = SCRAMBLE_FRAMES / SCRAMBLE_TARGET.length;
    let display = "";
    for (let i = 0; i < SCRAMBLE_TARGET.length; i++) {
        const lockFrame = (i + 1) * framesPerLetter;
        display += frame >= lockFrame
            ? SCRAMBLE_TARGET[i]
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }
    scrambleEl.textContent = display;

    if (frame < SCRAMBLE_FRAMES) {
        setTimeout(() => scrambleTick(frame + 1), SCRAMBLE_INTERVAL_MS);
    } else {
        scrambleEl.textContent = SCRAMBLE_TARGET;
        loaderDotEl.classList.add("rolling");
        setTimeout(() => {
            loaderLogoEl.classList.add("impact");
            loaderFlashEl.classList.add("boom");
        }, DOT_ROLL_MS);
    }
}
scrambleTick(0);

window.addEventListener("load", () => {
    setTimeout(() => {
        pageLoader.classList.add("loader-exit");
        document.body.classList.remove("loading");
    }, SCRAMBLE_FRAMES * SCRAMBLE_INTERVAL_MS + DOT_ROLL_MS + 600);
});

/* =====================
   TYPEWRITER EFFECT — types the name once, then stops
   ===================== */
const fullName = "John Rodeemer Velasquez";
let nameCharIndex = 0;
const nameEl = document.getElementById("name-text");
const nameCursorEl = document.getElementById("name-cursor");

function typeName() {
    nameEl.textContent = fullName.substring(0, nameCharIndex++);
    if (nameCharIndex <= fullName.length) {
        setTimeout(typeName, 130);
    } else {
        setTimeout(() => nameCursorEl.classList.add("cursor-done"), 600);
    }
}
typeName();

/* =====================
   HAMBURGER NAV
   ===================== */
function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    const hamburger = document.getElementById("hamburger");
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
}

// Close menu on nav link click
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("nav-links").classList.remove("open");
        document.getElementById("hamburger").classList.remove("active");
    });
});

/* =====================
   SCROLL EVENTS
   ===================== */
window.addEventListener("scroll", () => {
    // Sticky nav
    document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 60);

    // Back to top
    document.getElementById("back-to-top").classList.toggle("visible", window.scrollY > 400);

    // Reveal
    revealOnScroll();
});

/* =====================
   SCROLL REVEAL
   ===================== */
function revealOnScroll() {
    document.querySelectorAll(".reveal").forEach(el => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight - 80 && rect.bottom > 100;
        const isVisible = el.classList.contains("visible");

        if (inView && !isVisible) {
            const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains("reveal"));
            const indexAmongSiblings = siblings.indexOf(el);
            el.style.transitionDelay = `${Math.min(indexAmongSiblings, 6) * 0.08}s`;
            el.classList.add("visible");
        } else if (!inView && isVisible) {
            el.style.transitionDelay = "0s";
            el.classList.remove("visible");
        }
    });
}
revealOnScroll();

/* =====================
   ACTIVE NAV LINK
   ===================== */
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
            link.classList.toggle("active", scrollY >= top && scrollY < top + height);
        }
    });
});

/* =====================
   CONTACT FORM — opens the visitor's email client with the message pre-filled
   ===================== */
const CONTACT_EMAIL = "rodeeraker@gmail.com";

function handleForm(e) {
    e.preventDefault();
    const msg = document.getElementById("form-msg");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value || "Project Inquiry";
    const message = document.getElementById("message").value;

    const body = `${message}\n\n— ${name} (${email})`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    msg.textContent = "Opening your email app — just hit send to reach me.";
    msg.style.color = "#16A34A";
    setTimeout(() => msg.textContent = "", 6000);
}
