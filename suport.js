document.addEventListener("DOMContentLoaded", function () {
  jalaliDatepicker.startWatch({
    time: false,
    hideAfterChange: true,
  });

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalBtnText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>در حال ارسال...</span> <i class="fas fa-spinner fa-spin"></i>`;

      const formData = new FormData(contactForm);

      fetch("send-email.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
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
            contactForm.reset();
          } else {
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
          Swal.fire({
            title: "ارتباط برقرار نشد",
            text: "خطایی در ارتباط با سرور رخ داد. لطفاً مجدداً تلاش کنید.",
            icon: "warning",
            confirmButtonText: "متوجه شدم",
            confirmButtonColor: "#e74c3c",
          });
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        });
    });
  }
});
