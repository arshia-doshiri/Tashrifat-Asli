/* =========================================
   8. more-information ((support.indext))
   ========================================= */
const text_more_information = document.querySelector(".more-information");

const info_panel = document.querySelector(".info-panel");

const social_connect_mobile = document.querySelector(".social-connect-mobile");

text_more_information.addEventListener("click", function () {
  info_panel.style.height = "100%";
  social_connect_mobile.style.visibility = "visible";
  text_more_information.style.display = "none";
});
