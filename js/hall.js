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

    document
      .querySelectorAll(".gallery__item > .gallery-id")
      .forEach((mov, i) => {
        const gallery_id = hall[`gallery${i + 1}`];
        // mov.src = `http://127.0.0.1:5500/${gallery_id}`;
        mov.src = gallery_id;
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
        if (mov.getAttribute("data-img")) {
          img_menu.style.backgroundImage = mov.getAttribute("data-img");
          img_menu.style.opacity = "1";
        }
      });
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
        info_main.classList.toggle("hidden");
        menu_info.classList.toggle("hidden");
      });
    });

    //// info-cell
    const info_cell = document.querySelectorAll(".info-cell");
    const info_cell_text = document.querySelectorAll(".info-cell>p");

    //..start
    info_cell.forEach((mov, i) => {
      mov.addEventListener("click", function () {
        const content_cell = mov.firstElementChild.textContent;
        const test = content_cell.padStart(content_cell.length + 1, "-");

        // alert(content_cell);
        alert(test);
      });
    });

    //adress-map
    document.querySelector(".adress-map").textContent = hall.location;

    //...end
  });

///////// test kar
// const a_menu = document.querySelectorAll(".menu-subject");
// const img_menu = document.querySelector(".img-menu");
// const back_info_main = document.querySelector(".back-info-main");
// const menu_info = document.querySelector(".menu-info");
// const book = document.querySelectorAll(".book");
// const info_main = document.querySelector(".info-main");
// const menu_show_mobile = document.querySelector(".menu-show-mobile");

// a_menu.forEach((mov) => {
//   mov.addEventListener("click", function (e) {
//     e.preventDefault();
//     if (mov.getAttribute("data-img")) {
//       img_menu.style.backgroundImage = mov.getAttribute("data-img");
//       img_menu.style.opacity = "1";
//     }
//   });
// });
// /////
// back_info_main.addEventListener("click", function (e) {
//   e.preventDefault();
//   menu_info.classList.toggle("hidden");
//   info_main.classList.toggle("hidden");
// });

// book.forEach((mov) => {
//   mov.addEventListener("click", function (e) {
//     e.preventDefault();
//     info_main.classList.toggle("hidden");
//     menu_info.classList.toggle("hidden");
//   });
// });
