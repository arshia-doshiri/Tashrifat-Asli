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

  // ۲. مدیریت ارسال فرم با SweetAlert2
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
            // پاپ‌آپ موفقیت با SweetAlert2
            Swal.fire({
              title: "ثبت موفقیت‌آمیز!",
              text: data.message,
              icon: "success",
              confirmButtonText: "متوجه شدم",
              confirmButtonColor: "#d7a34a",
              background: "#ffffff",
              customClass: {
                popup: "swal-rtl",
              },
            });
            contactForm.reset(); // پاک کردن فرم پس از ارسال موفق
          } else {
            // پاپ‌آپ خطا با SweetAlert2
            Swal.fire({
              title: "خطا!",
              text: data.message,
              icon: "error",
              confirmButtonText: "تلاش مجدد",
              confirmButtonColor: "#e74c3c",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // پاپ‌آپ خطای سرور
          Swal.fire({
            title: "ارتباط برقرار نشد",
            text: "خطایی در ارتباط با سرور رخ داد. لطفاً مجدداً تلاش کنید.",
            icon: "warning",
            confirmButtonText: "متوجه شدم",
            confirmButtonColor: "#e74c3c",
          });
        })
        .finally(() => {
          // برگرداندن دکمه به حالت اولیه
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        });
    });
  }
});
