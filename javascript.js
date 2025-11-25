"use strick";
/////////////value////////////////////////////
const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");
const header_p = document.querySelector(".header-p");
const flexcard = document.querySelectorAll(".flexcard");
const more_op_text = document.querySelector(".more-op-text");
const more_option = document.querySelector(".more-option");
const close = document.querySelector(".close");
const box_img = document.querySelectorAll(".box-img");
const box = document.querySelectorAll(".box");
const figur = document.querySelectorAll(".snip1390");
const up = document.querySelector(".up");
const down = document.querySelector(".down");

///////////////Menu/////////////////////////////////
const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());
//End///////////////Menu/////////////////////////////////
//////////////////p-metod-slice-header///////////////
const test = header_p.textContent.slice(0, 150).padEnd(157, "...");
header_p.textContent = test;
//END//////////////////p-metod-slice-header///////////////
//start//////////////////card-Our-services//////////////
//...Img
flexcard.forEach(
  (mov, url) => (mov.style.backgroundImage = `url(image/img-${url + 0}.jpg)`)
);
//...number
const flexcardnumber = document.querySelectorAll(".flexcardNumber");

flexcardnumber.forEach((mov, i) => (mov.textContent = `${i + 1}`));
//end//////////////////card-Our-services//////////////
//start//////////////////main-galery//////////////
//...main

box_img.forEach((mov, i) => (mov.src = `image/img-${i}.jpg`));
//end//////////////////main-galery//////////////
//start//////////////////client-say//////////////
//...start base
let cursilder = 0;
const maxupsilder = figur.length;

//...active up
up.addEventListener("click", function () {
  if (cursilder === maxupsilder + 2) {
    cursilder = 0;
  } else {
    cursilder++;
  }
  figur.forEach((cur, i) => {
    cur.style.transform = `translateY(${100 * (i - cursilder)}%)`;
  });
});

//...active down
down.addEventListener("click", function () {
  if (cursilder === 0) {
    cursilder = 0;
  } else {
    cursilder--;
  }
  figur.forEach((cur, i) => {
    cur.style.transform = `translateY(${100 * (i - cursilder)}%)`;
  });
});
//end//////////////////client-say//////////////
//start//////////////////navbar-more//////////////
//...active more menu
more_op_text.addEventListener("click", function () {
  more_option.classList.remove("off");
  more_op_text.classList.add("off");
});
//...close
close.addEventListener("click", function () {
  more_option.classList.add("off");
  more_op_text.classList.remove("off");
});
//end//////////////////navbar-more//////////////
