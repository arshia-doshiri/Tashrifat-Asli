<?php
// تنظیم هدر برای پاسخ JSON به جاوااسکریپت
header('Content-Type: application/json; charset=utf-8');

// بررسی اینکه درخواست حتما از نوع POST باشد
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // دریافت و ایمن‌سازی داده‌های ورودی
    $name         = isset($_POST['from_name']) ? htmlspecialchars(trim($_POST['from_name'])) : 'نامشخص';
    $phone        = isset($_POST['phone_number']) ? htmlspecialchars(trim($_POST['phone_number'])) : 'نامشخص';
    $wedding_date = !empty($_POST['wedding_date']) ? htmlspecialchars(trim($_POST['wedding_date'])) : 'تعیین نشده';
    $guest_count  = !empty($_POST['guest_count']) ? htmlspecialchars(trim($_POST['guest_count'])) : 'تعیین نشده';
    $message      = !empty($_POST['message']) ? nl2br(htmlspecialchars(trim($_POST['message']))) : 'توضیحاتی وارد نشده است.';

    // اعتبار سنجی فیلدهای ضروری
    if (empty($name) || empty($phone)) {
        echo json_encode(["status" => "error", "message" => "لطفاً نام و شماره تماس خود را وارد کنید."]);
        exit;
    }

    // تنظیمات ایمیل مقصد (ایمیل شما در cPanel)
    $to = "info@tashrifatasli.ir";
    $subject = "💍 درخواست مشاوره و رزرو جدید: " . $name;

    // ساخت قالب HTML برای ایمیلی که توی Roundcube می‌بینید
    $email_body = '
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Tahoma, Arial, sans-serif; background-color: #f4f4f7; color: #333; margin: 0; padding: 20px; direction: rtl; text-align: right; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #e0e0e0; }
            .header { background: #0b1220; color: #d7a34a; padding: 25px; text-align: center; border-bottom: 3px solid #d7a34a; }
            .header h2 { margin: 0; font-size: 20px; }
            .header p { margin: 5px 0 0 0; color: #98a0b3; font-size: 13px; }
            .content { padding: 25px; }
            .info-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .info-table th, .info-table td { padding: 12px 15px; border-bottom: 1px solid #eeeeee; text-align: right; }
            .info-table th { background-color: #f8f9fa; color: #555; font-size: 13px; width: 35%; }
            .info-table td { color: #111; font-weight: bold; font-size: 14px; }
            .message-box { background: #fdfbf7; border-right: 4px solid #d7a34a; padding: 15px; margin-top: 20px; border-radius: 4px; font-weight: normal; color: #444; line-height: 1.6; }
            .footer { background: #0b1220; color: #7e889b; text-align: center; padding: 15px; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>👑 تشریفات اصلی</h2>
                <p>درخواست مشاوره و استعلام رزرو جدید</p>
            </div>
            <div class="content">
                <p style="font-size: 14px; color: #555;">سلام، یک درخواست رزرو جدید از سمت سایت ثبت شده است:</p>
                <table class="info-table">
                    <tr>
                        <th>نام و نام خانوادگی:</th>
                        <td>' . $name . '</td>
                    </tr>
                    <tr>
                        <th>شماره تماس:</th>
                        <td><a href="tel:' . $phone . '" style="color: #d7a34a; text-decoration: none;" dir="ltr">' . $phone . '</a></td>
                    </tr>
                    <tr>
                        <th>تاریخ تقریبی مراسم:</th>
                        <td>' . $wedding_date . '</td>
                    </tr>
                    <tr>
                        <th>تعداد مهمانان:</th>
                        <td>' . $guest_count . '</td>
                    </tr>
                </table>

                <div class="message-box">
                    <strong style="color: #0b1220; display: block; margin-bottom: 5px;">توضیحات و درخواست کاربر:</strong>
                    ' . $message . '
                </div>
            </div>
            <div class="footer">
                این ایمیل به صورت خودکار از فرم پشتیبانی وب‌سایت تشریفات اصلی ارسال شده است.
            </div>
        </div>
    </body>
    </html>
    ';

    // تنظیم هدرهای ایمیل برای پشتیبانی از HTML و کاراکترهای فارسی
    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: تشریفات اصلی <info@tashrifatasli.ir>" . "\r\n";
    $headers .= "Reply-To: " . $to . "\r\n";

    // ارسال ایمیل
    if (mail($to, $subject, $email_body, $headers)) {
        echo json_encode(["status" => "success", "message" => "درخواست شما با موفقیت ثبت شد. به‌زودی با شما تماس می‌گیریم."]);
    } else {
        echo json_encode(["status" => "error", "message" => "خطا در ارسال ایمیل از سمت سرور. لطفا با شماره پشتیبانی تماس بگیرید."]);
    }

} else {
    echo json_encode(["status" => "error", "message" => "دسترسی غیرمجاز."]);
}
?>