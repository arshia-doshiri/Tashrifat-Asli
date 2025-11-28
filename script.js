document.addEventListener("DOMContentLoaded", () => {
  /* ================= MENU SHOW/HIDE ================= */
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }

  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }

  // بستن منو با کلیک روی لینک‌ها
  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  });

  /* ================= NUMBER COUNTER ANIMATION ================= */
  // فقط اگر در صفحه اصلی و بخش آمار وجود داشت اجرا شود
  const statsSection = document.querySelector(".about__stats");
  if (statsSection) {
    const counters = document.querySelectorAll(".stat__number");
    const speed = 200;

    const animateCounters = () => {
      counters.forEach((counter) => {
        const updateCount = () => {
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText;
          const inc = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = target + "+";
          }
        };
        updateCount();
      });
    };

    let animated = false;
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          animateCounters();
          animated = true;
        }
      },
      { threshold: 0.5 }
    );

    sectionObserver.observe(document.querySelector(".about"));
  }

  /* ================= CONTACT FORM SUBMIT ================= */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector("button");
      const originalContent = btn.innerHTML;

      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
      btn.disabled = true;

      setTimeout(() => {
        alert("پیام شما با موفقیت دریافت شد. به زودی با شما تماس می‌گیریم.");
        contactForm.reset();
        btn.innerHTML = originalContent;
        btn.disabled = false;
      }, 2000);
    });
  }
});
