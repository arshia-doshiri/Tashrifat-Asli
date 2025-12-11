/* =========================================
   1. Preloader Logic
   ========================================= */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    // Initially set opacity to zero
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";

    // After half a second, completely remove it to avoid blocking clicks
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }
});

/* =========================================
   2. Header
   ========================================= */
const header = document.getElementById("header");
const scrollTopBtn = document.getElementById("scroll-top");

window.addEventListener("scroll", () => {
  // Header Blur Effect
  if (window.scrollY >= 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Scroll to Top Button
  if (window.scrollY >= 400) {
    scrollTopBtn.classList.add("show-scroll");
  } else {
    scrollTopBtn.classList.remove("show-scroll");
  }
});

/* =========================================
   3. Mobile Menu Toggle
   ========================================= */
const navContainer = document.getElementById("nav-menu"); // Parent element (nav)
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navBackdrop = document.querySelector(".nav__backdrop");
const navLinks = document.querySelectorAll(".nav__link");

// Open menu
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navContainer.classList.add("show-menu");
  });
}

// Close menu (with close button)
if (navClose) {
  navClose.addEventListener("click", () => {
    navContainer.classList.remove("show-menu");
  });
}

// Close menu (by clicking on empty space/backdrop)
if (navBackdrop) {
  navBackdrop.addEventListener("click", () => {
    navContainer.classList.remove("show-menu");
  });
}

// Close menu by clicking on any link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navContainer.classList.remove("show-menu");
  });
});
/* =========================================
   4. Smooth Scroll for Anchor Links
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

/* =========================================
   5. Form Handling (Support Page)
   ========================================= */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(".submit-btn");
    const originalContent = submitBtn.innerHTML;

    // Loading State
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<i class="fas fa-circle-notch fa-spin"></i> در حال ارسال...';

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Success State
    submitBtn.style.backgroundColor = "#27ae60";
    submitBtn.innerHTML = '<i class="fas fa-check"></i> با موفقیت ارسال شد';

    setTimeout(() => {
      contactForm.reset();
      submitBtn.style.backgroundColor = "";
      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;
      // Remove floating labels styling hack
      document
        .querySelectorAll(".input-group input, .input-group textarea")
        .forEach((el) => el.blur());
    }, 3000);
  });
}

/* =========================================
   6. Reveal Animations on Scroll
   ========================================= */
const revealElements = document.querySelectorAll(
  ".service__card, .gallery__item, .about__img-box, .section__title , .deti ,.map , .client-say"
);

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const elementVisible = 100;

  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("active-reveal");
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
};

// Initial setup for reveal
revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s ease-out";
});

window.addEventListener("scroll", revealOnScroll);
// Trigger once on load
revealOnScroll();

/* =========================================
   7. client-say
   ========================================= */
const slider = document.querySelectorAll(".main-client-say");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
let curslider = 0;
const maxslider = slider.length;

slider.forEach((cur, i) => {
  cur.style.transform = `translateX(${200 * i}%)`;
});
// Left button
left.addEventListener("click", function () {
  if (curslider === maxslider - 1) {
    curslider = 0;
  } else {
    ++curslider;
  }
  slider.forEach((cur, i) => {
    cur.style.transform = `translateX(${200 * (i - curslider)}%)`;
  });
  console.log("ok");
});
// Right button
right.addEventListener("click", function () {
  if (curslider === 0) {
    curslider = 0;
  } else {
    --curslider;
  }
  slider.forEach((cur, i) => {
    cur.style.transform = `translateX(${200 * (i - curslider)}%)`;
  });
  console.log("ok");
});
/* =========================================
   8. header-active-click-underline
   ========================================= */
const a_tag = document.querySelectorAll("a");
const nav__item = document.querySelector(".nav__item");
a_tag.forEach((mov) => {
  if (mov.parentElement.closest(".nav__item")) {
    mov.addEventListener("click", function (e) {
      a_tag.forEach((mov) => mov.classList.remove("active-link"));
      this.classList.add("active-link");
    });
  }
});
