/////////////value////////////////////////////
const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");
const header_p = document.querySelector(".header-p");
const flexcard = document.querySelectorAll(".flexcard");

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
const box_img = document.querySelectorAll(".box-img");
const box = document.querySelectorAll(".box");

box_img.forEach((mov, i) => (mov.src = `image/img-${i}.jpg`));
//end//////////////////main-galery//////////////
const figur = document.querySelectorAll(".snip1390");
const up = document.querySelector(".up");
const down = document.querySelector(".down");

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
