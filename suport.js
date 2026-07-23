$(document).ready(function () {
  // ۱. فعال‌سازی تقویم شمسی روی فیلد تاریخ
  $("#wedding_date").pDatepicker({
    format: "YYYY/MM/DD",
    autoClose: true,
    initialValue: false,
    calendar: {
      persian: {
        locale: "fa",
      },
    },
  });

  // ۲. مدیریت ارسال فرم با AJAX (بدون رفرش صفحه)
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalBtnText = submitBtn.innerHTML;

      // تغییر حالت دکمه به در حال ارسال
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>در حال ارسال...</span> <i class="fas fa-spinner fa-spin"></i>`;

      // جمع‌آوری اطلاعات فرم
      const formData = new FormData(contactForm);

      // ارسال به فایل PHP روی سرور
      fetch("send-email.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            alert("✅ " + data.message);
            contactForm.reset(); // پاک کردن فرم پس از ارسال موفق
          } else {
            alert("❌ " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("❌ خطایی در ارتباط با سرور رخ داد. لطفا مجدداً تلاش کنید.");
        })
        .finally(() => {
          // برگرداندن دکمه به حالت اولیه
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        });
    });
  }
});
