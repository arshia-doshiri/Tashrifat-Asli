// 1) گرفتن id از URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// 2) خوندن دیتابیس halls.json
fetch("/data/halls.json")
  .then((res) => res.json())
  .then((data) => {
    // 3) پیدا کردن تالار موردنظر
    const hall = data.find((item) => item.id == id);

    // 4) پر کردن صفحه
    if (hall) {
      ////////////اسم مجموعه///////////////////////
      document.getElementById("title").textContent = hall.title;
      ////////////اسم مجموعه///////////////////////
      document.getElementById("title_img").textContent = hall.title;
      ////////////بازدید///////////////////////
      document.getElementById("visit").textContent = hall.visit;
      ////////////ضرفیت///////////////////////
      document.getElementById(
        "capacity"
      ).textContent = `نفر : ${hall.capacity}`;
      ////////////دیجی///////////////////////
      document.getElementById("dj").textContent = hall.dj;
      ////////////فیلم بردار///////////////////////
      document.getElementById("videographer").textContent = hall.videographer;
      ////////////سفره فضای باز///////////////////////
      document.getElementById("outdoorTable").textContent = hall.outdoorTable;
      ////////////سفره فضای داخل///////////////////////
      document.getElementById("indoorTable").textContent = hall.indoorTable;
      ////////////لوکیشن///////////////////////
      document.getElementById("location").textContent = hall.location;

      ///////make number persin style///////////
      //...1
      // const price_number = document.querySelectorAll(".price-number");
      // price_number.forEach((mov) => {
      //   const number = mov.textContent;

      //   const iran_number = new Intl.NumberFormat("fa-IR").format(number);

      //   mov.textContent = iran_number;
      // });

      // price_number.forEach((mov) => {
      //   if (mov.textContent === "ناعدد") {
      //     console.log(` ${mov.textContent}:بی مقدار قیمت نداره  `);
      //   } else {
      //     console.log(` ${mov.textContent}:مقدار عددی`);
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
    } ////end

    ////////////////////photo
    const idphoto = hall.photo;
    document.querySelector(".photo").style.backgroundImage = hall.photo;
    console.log(idphoto);
  });
