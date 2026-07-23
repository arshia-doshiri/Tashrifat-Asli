<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name         = isset($_POST['from_name']) ? htmlspecialchars(trim($_POST['from_name'])) : 'نامشخص';
    $phone        = isset($_POST['phone_number']) ? htmlspecialchars(trim($_POST['phone_number'])) : 'نامشخص';
    $wedding_date = !empty($_POST['wedding_date']) ? htmlspecialchars(trim($_POST['wedding_date'])) : 'تعیین نشده';
    $guest_count  = !empty($_POST['guest_count']) ? htmlspecialchars(trim($_POST['guest_count'])) : 'تعیین نشده';
    $message      = !empty($_POST['message']) ? nl2br(htmlspecialchars(trim($_POST['message']))) : 'توضیحاتی وارد نشده است.';

    if (empty($name) || empty($phone)) {
        echo json_encode(["status" => "error", "message" => "لطفاً نام و شماره تماس خود را وارد کنید."]);
        exit;
    }

    $to = "info@tashrifatasli.ir";

    // انکود موضوع ایمیل برای جلوگیری از بهم ریختگی فونت/ایموجی
    $subject_text = "💍 درخواست مشاوره و رزرو جدید: " . $name;
    $subject = '=?UTF-8?B?' . base64_encode($subject_text) . '?=';

    // قالب HTML ایمیل کاملاً سازگار با Gmail و تمامی کلاینت‌های موبایل
    $email_body = '
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="fa" dir="rtl">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>درخواست مشاوره</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: Tahoma, Arial, sans-serif; direction: rtl; text-align: right;">
        
        <!-- Outer Table Container -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f7; padding: 20px 0;">
            <tr>
                <td align="center">
                    
                    <!-- Main Card Container -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e0e0e0; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                        
                        <!-- Header -->
                        <tr>
                            <td align="center" style="background-color: #0b1220; padding: 25px; border-bottom: 3px solid #d7a34a;">
                                <h2 style="margin: 0; color: #d7a34a; font-size: 20px; font-family: Tahoma, Arial, sans-serif;">👑 تشریفات اصلی</h2>
                                <p style="margin: 5px 0 0 0; color: #98a0b3; font-size: 13px; font-family: Tahoma, Arial, sans-serif;">درخواست مشاوره و استعلام رزرو جدید</p>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 25px; direction: rtl; text-align: right;">
                                <p style="font-size: 14px; color: #555555; margin-top: 0; font-family: Tahoma, Arial, sans-serif;">سلام، یک درخواست رزرو جدید از سمت سایت ثبت شده است:</p>
                                
                                <!-- Info Table -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 15px; border-collapse: collapse;">
                                    <tr>
                                        <td width="35%" style="padding: 12px 15px; background-color: #f8f9fa; color: #555555; font-size: 13px; font-weight: bold; border-bottom: 1px solid #eeeeee; text-align: right; font-family: Tahoma, Arial, sans-serif;">نام و نام خانوادگی:</td>
                                        <td style="padding: 12px 15px; color: #111111; font-size: 14px; font-weight: bold; border-bottom: 1px solid #eeeeee; text-align: right; font-family: Tahoma, Arial, sans-serif;">' . $name . '</td>
                                    </tr>
                                    <tr>
                                        <td width="35%" style="padding: 12px 15px; background-color: #f8f9fa; color: #555555; font-size: 13px; font-weight: bold; border-bottom: 1px solid #eeeeee; text-align: right; font-family: Tahoma, Arial, sans-serif;">شماره تماس:</td>
                                        <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee; text-align: right; font-family: Tahoma, Arial, sans-serif;">
                                            <a href="tel:' . $phone . '" style="color: #d7a34a; text-decoration: none; font-weight: bold; font-size: 14px;" dir="ltr">' . $phone . '</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="35%" style="padding: 12px 15px; background-color: #f8f9fa; color: #555555; font-size: 13px; font-weight: bold; border-bottom: 1px solid #eeeeee; text-align: right; font-family: Tahoma, Arial, sans-serif;">تاریخ تقریبی مراسم:</td>
                                        <td style="padding: 12px 15px; color: #111111; font-size: 14px; font-weight: bold; border-bottom: 1px solid #eeeeee; text-align: right; font-family: Tahoma, Arial, sans-serif;">' . $wedding_date . '</td>
                                    </tr>
                                    <tr>
                                        <td width="35%" style="padding: 12px 15px; background-color: #f8f9fa; color: #555555; font-size: 13px; font-weight: bold; border-bottom: 1px solid #eeeeee; text-align: right; font-family: Tahoma, Arial, sans-serif;">تعداد مهمانان:</td>
                                        <td style="padding: 12px 15px; color: #111111; font-size: 14px; font-weight: bold; border-bottom: 1px solid #eeeeee; text-align: right; font-family: Tahoma, Arial, sans-serif;">' . $guest_count . '</td>
                                    </tr>
                                </table>

                                <!-- Message Box -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 20px;">
                                    <tr>
                                        <td style="background-color: #fdfbf7; border-right: 4px solid #d7a34a; padding: 15px; border-radius: 4px; color: #444444; font-size: 13px; line-height: 1.6; text-align: right; font-family: Tahoma, Arial, sans-serif;">
                                            <strong style="color: #0b1220; display: block; margin-bottom: 5px;">توضیحات و درخواست کاربر:</strong>
                                            ' . $message . '
                                        </td>
                                    </tr>
                                </table>

                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td align="center" style="background-color: #0b1220; color: #7e889b; padding: 15px; font-size: 12px; font-family: Tahoma, Arial, sans-serif;">
                                این ایمیل به صورت خودکار از فرم پشتیبانی وب‌سایت تشریفات اصلی ارسال شده است.
                            </td>
                        </tr>
                        
                    </table>
                    
                </td>
            </tr>
        </table>
        
    </body>
    </html>
    ';

    // تنظیمات هدر برای عدم به هم ریختگی عنوان و فرستنده
    $from_name = '=?UTF-8?B?' . base64_encode("تشریفات اصلی 👑") . '?=';

    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: " . $from_name . " <info@tashrifatasli.ir>" . "\r\n";
    $headers .= "Reply-To: info@tashrifatasli.ir\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $email_body, $headers)) {
        echo json_encode(["status" => "success", "message" => "درخواست شما با موفقیت ثبت شد. به‌زودی با شما تماس می‌گیریم."]);
    } else {
        echo json_encode(["status" => "error", "message" => "خطا در ارسال ایمیل از سمت سرور."]);
    }

} else {
    echo json_encode(["status" => "error", "message" => "دسترسی غیرمجاز."]);
}
?>