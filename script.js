/* =====================
   TYPEWRITER EFFECT
   ===================== */
const roles = [
    "GoHighLevel Specialist",
    "Automation Engineer",
    "CRM Architect",
    "Web Systems Developer"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleEl = document.getElementById("role-text");

function typeWriter() {
    const current = roles[roleIndex];
    if (isDeleting) {
        roleEl.textContent = current.substring(0, charIndex--);
    } else {
        roleEl.textContent = current.substring(0, charIndex++);
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === current.length + 1) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
    }

    setTimeout(typeWriter, delay);
}
typeWriter();

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

    // Skill bars (only once)
    animateSkillBars();
});

/* =====================
   SCROLL REVEAL
   ===================== */
function revealOnScroll() {
    document.querySelectorAll(".reveal:not(.visible)").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
            el.classList.add("visible");
        }
    });
}
revealOnScroll();

/* =====================
   SKILL BARS
   ===================== */
let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;
    const skillsSection = document.getElementById("skills");
    if (!skillsSection) return;
    if (skillsSection.getBoundingClientRect().top < window.innerHeight - 100) {
        document.querySelectorAll(".skill-fill").forEach(bar => {
            bar.style.width = bar.dataset.width;
        });
        skillsAnimated = true;
    }
}
animateSkillBars();

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
   CONTACT FORM
   ===================== */
function handleForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector("button[type='submit']");
    const msg = document.getElementById("form-msg");

    btn.disabled = true;
    btn.textContent = "Sending...";

    setTimeout(() => {
        msg.textContent = "Message sent! I'll get back to you soon.";
        msg.style.color = "#16A34A";
        e.target.reset();
        btn.disabled = false;
        btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        setTimeout(() => msg.textContent = "", 5000);
    }, 1000);
}
