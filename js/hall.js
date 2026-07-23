// 1) Get id from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// 2) Read halls.json database
fetch("data/halls.json")
  .then((res) => res.json())
  .then((data) => {
    // 3) Find the desired hall
    const hall = data.find((item) => item.id == id);

    // 4) Populate the page
    if (hall) {
      ////////////Collection Name///////////////////////
      document.getElementById("title").textContent = hall.title;
      ////////////Collection Name///////////////////////
      document.getElementById("title_img").textContent = hall.title;
      ////////////Visit///////////////////////
      document.getElementById("visit").textContent = hall.visit;
      ////////////Capacity///////////////////////
      document.getElementById("capacity").textContent =
        `نفر : ${hall.capacity}`;
      ////////////DJ///////////////////////
      document.getElementById("dj").textContent = hall.dj;
      ////////////Videographer///////////////////////
      document.getElementById("videographer").textContent = hall.videographer;
      ////////////Outdoor Table///////////////////////
      document.getElementById("outdoorTable").textContent = hall.outdoorTable;
      ////////////Indoor Table///////////////////////
      document.getElementById("indoorTable").textContent = hall.indoorTable;
      ////////////Location///////////////////////
      document.getElementById("location").textContent = hall.location;

      // Convert numbers to Persian style
      //...1
      // const price_number = document.querySelectorAll(".price-number");
      // price_number.forEach((mov) => {
      //   const number = mov.textContent;

      //   const iran_number = new Intl.NumberFormat("fa-IR").format(number);

      //   mov.textContent = iran_number;
      // });

      // price_number.forEach((mov) => {
      //   if (mov.textContent === "ناعدد") {
      //     console.log(` ${mov.textContent}: No value, no price `);
      //   } else {
      //     console.log(` ${mov.textContent}: Numeric value`);
      //   }
      // });

      //...2
      const badge = document.querySelectorAll(".badge");

      const price_number = document.querySelectorAll(".price-number");

      price_number.forEach((mov) => {
        //..first part

        const number = mov.textContent;
        const iran_number = new Intl.NumberFormat("fa-IR").format(number);
        mov.textContent = iran_number;

        if (mov.textContent === "ناعدد") {
          const parent = mov.parentElement.parentElement;
          parent.classList.add("disable");
          const ids = mov.attributes.id.textContent;
          mov.textContent = hall[ids];
        }
      });
    } // End

    // Photo
    const idphoto = hall.photo;
    document.querySelector(".photo").style.backgroundImage = hall.photo;

    // gallery
    // document
    //   .querySelectorAll(".gallery__item > .gallery-id")
    //   .forEach((mov, i) => {
    //     const gallery_id = hall[`gallery${i + 1}`];
    //     mov.src = `http://127.0.0.1:5500/${gallery_id}`;
    //   });

    // document
    //   .querySelectorAll(".gallery__item > .gallery-id")
    //   .forEach((mov, i) => {
    //     const gallery_id = hall[`gallery${i + 1}`];
    //     // mov.src = `http://127.0.0.1:5500/${gallery_id}`;
    //     mov.src = gallery_id;
    //   });

    document
      .querySelectorAll(".gallery__item > .gallery-id")
      .forEach((mov, i) => {
        const gallery_id = hall[`gallery${i + 1}`];
        mov.src = `./${gallery_id}`;
      });

    ///adress bar
    const adreesbar = document.querySelector("title");
    adreesbar.textContent = `معرفی | ${hall.adress_bar}`;

    //menu order

    const menu_subject = document.querySelectorAll("#menu-subject");
    menu_subject.forEach((mov, i) => {
      const test = hall[`dataImg_${i + 1}`];

      mov.setAttribute("data-img", test);
      // console.log(i + 1);
    });

    // console.log(document.querySelector("#menu-subject"));

    const a_menu = document.querySelectorAll(".menu-subject");
    const img_menu = document.querySelector(".img-menu");
    const back_info_main = document.querySelector(".back-info-main");
    const menu_info = document.querySelector(".menu-info");
    const book = document.querySelectorAll(".book");
    const info_main = document.querySelector(".info-main");
    const menu_show_mobile = document.querySelector(".menu-show-mobile");

    a_menu.forEach((mov) => {
      mov.addEventListener("click", function (e) {
        e.preventDefault();

        // حذف کلاس active از تمام دکمه‌های منو
        a_menu.forEach((btn) => btn.classList.remove("active-menu"));
        // اضافه کردن کلاس active به دکمه کلیک شده
        this.classList.add("active-menu");

        const menuImageUrl = mov.getAttribute("data-img");
        if (!menuImageUrl) return;

        const isLaptop = window.innerWidth >= 1024;

        if (isLaptop) {
          const photoContainer = document.querySelector(".photo");
          photoContainer.style.backgroundImage = menuImageUrl;
          photoContainer.style.backgroundSize = "contain";
          photoContainer.style.backgroundPosition = "center";
          photoContainer.style.backgroundRepeat = "no-repeat";

          photoContainer.style.backgroundColor = "rgba(11, 18, 32, 0.85)";
          photoContainer.style.backdropFilter = "blur(12px)";
          photoContainer.style.border = "1px solid rgba(215, 163, 74, 0.3)";
          photoContainer.style.borderRadius = "var(--radius)";
          photoContainer.style.boxShadow =
            "inset 0 0 30px rgba(0, 0, 0, 0.7), 0 12px 32px rgba(0, 0, 0, 0.5)";

          if (photoContainer.firstElementChild) {
            photoContainer.firstElementChild.style.opacity = "0";
            photoContainer.firstElementChild.style.pointerEvents = "none";
          }

          img_menu.style.opacity = "0";
          img_menu.style.display = "none";
        } else {
          img_menu.style.display = "block";
          img_menu.style.backgroundImage = menuImageUrl;
          img_menu.style.opacity = "1";
        }
      });
    });
    // وقتی کاربر دکمه "بازگشت" از منوها را می‌زند، عکس عمارت باید به حالت اولش برگردد
    back_info_main.addEventListener("click", function (e) {
      e.preventDefault();

      // برگرداندن عکس اصلی عمارت که در ابتدای لود صفحه ست شده بود
      const photoContainer = document.querySelector(".photo");
      photoContainer.style.backgroundImage = hall.photo;
      photoContainer.style.backgroundSize = "cover";
      photoContainer.style.backgroundPosition = "center";

      // 🔄 پاک کردن استایل‌های منو و برگشت به حالت اولیه عکس عمارت
      photoContainer.style.backgroundColor = "";
      photoContainer.style.backdropFilter = "";
      photoContainer.style.border = "";
      photoContainer.style.boxShadow = "";
      // ظاهر کردن دوباره متن‌های روی عکس عمارت
      if (photoContainer.firstElementChild) {
        photoContainer.firstElementChild.style.opacity = "1";
        photoContainer.firstElementChild.style.pointerEvents = "auto";
      }
    });
    //..scale img menu

    img_menu.addEventListener("click", function () {
      img_menu.classList.toggle("img-menu-scale");
    });

    ///....
    back_info_main.addEventListener("click", function (e) {
      e.preventDefault();
      menu_info.classList.toggle("hidden");
      info_main.classList.toggle("hidden");
    });

    book.forEach((mov) => {
      mov.addEventListener("click", function (e) {
        e.preventDefault();
        info_main.classList.add("hidden");
        menu_info.classList.remove("hidden");

        // ۱. پیدا کردن منوی اول
        const firstMenuBtn = document.querySelector(".menu-subject");

        // ۲. تحریک کلیک روی منوی اول برای لود شدن عکس منوی شماره ۱
        if (firstMenuBtn) {
          firstMenuBtn.click();
        }

        // ۳. اسکرول نرم روی بخش منو در حالت موبایل
        if (window.innerWidth < 1024) {
          menu_info.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }); //// info-cell
    //// info-cell با پشتیبانی از SweetAlert2
    const info_cell = document.querySelectorAll(".info-cell");

    info_cell.forEach((mov) => {
      mov.addEventListener("click", function () {
        // خواندن متن داخل تگ p درون آیكون
        const content_cell = mov.querySelector("p")
          ? mov.querySelector("p").innerText
          : "";

        if (content_cell.trim() !== "") {
          Swal.fire({
            title: "اطلاعات مکمل",
            html: `<div style="font-family: Vazirmatn, sans-serif; line-height: 1.8; color: #333;">${content_cell.replace(/\n/g, "<br>")}</div>`,
            icon: "info",
            confirmButtonText: "متوجه شدم",
            confirmButtonColor: "#d7a34a", // رنگ طلایی هماهنگ با تم سایت
            background: "#fff",
            customClass: {
              popup: "swal-rtl-popup",
            },
          });
        }
      });
    });
    //adress-map
    document.querySelector(".adress-map").textContent = hall.location;

    //map
    const map_loc = document.querySelector("iframe");
    map_loc.src = hall.map_location;

    // ==========================================
    // 1. مدیریت باز و بسته شدن منوی موبایل
    // ==========================================
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navBackdrop = document.querySelector(".nav__backdrop");

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show-menu");
        navToggle.classList.toggle("animate-toggle");
      });
    }

    if (navBackdrop && navMenu) {
      navBackdrop.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
        if (navToggle) navToggle.classList.remove("animate-toggle");
      });
    }

    // ==========================================
    // 2. تغییر حالت پس‌زمینه هدر موقع اسکرول (مات/سفید شدن)
    // ==========================================
    const header = document.getElementById("header");

    function scrollHeader() {
      if (window.scrollY >= 50) {
        header.classList.add("scroll-header");
      } else {
        header.classList.remove("scroll-header");
      }
    }

    window.addEventListener("scroll", scrollHeader);
    // اجرای اولیه در صورت لود صفحه در حالت اسکرول‌شده
    scrollHeader();

    //...end
  });
