# راهنمای تنظیم EmailJS برای فرم تماس

## 🚀 مراحل تنظیم EmailJS

### 1. ثبت‌نام در EmailJS
- به [EmailJS.com](https://www.emailjs.com/) بروید
- ثبت‌نام کنید (رایگان)

### 2. ایجاد Email Service
1. در داشبورد EmailJS، روی "Email Services" کلیک کنید
2. "Add New Service" را انتخاب کنید
3. Gmail را انتخاب کنید
4. ایمیل Gmail خود را وارد کنید
5. کد تأیید را وارد کنید
6. نام سرویس را "gmail" بگذارید

### 3. ایجاد Email Template
1. در داشبورد، روی "Email Templates" کلیک کنید
2. "Create New Template" را انتخاب کنید
3. کد زیر را در template قرار دهید:

```html
Subject: پیام جدید از {{from_name}} - {{subject}}

نام: {{from_name}}
ایمیل: {{from_email}}
موضوع: {{subject}}

پیام:
{{message}}

---
این پیام از وب‌سایت آراد آذرپناه ارسال شده است.
```

### 4. دریافت کلیدهای مورد نیاز
1. **Public Key**: در داشبورد، روی "Account" → "API Keys" بروید
2. **Service ID**: در "Email Services" پیدا کنید (مثل: service_xxxxxxx)
3. **Template ID**: در "Email Templates" پیدا کنید (مثل: template_xxxxxxx)

### 5. به‌روزرسانی کد
در فایل `script.js`، این مقادیر را جایگزین کنید:

```javascript
// خط 1393
emailjs.init("YOUR_PUBLIC_KEY"); // کلید عمومی خود را اینجا قرار دهید

// خط 1415
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

## 🔧 راه‌حل‌های جایگزین

### 1. Formspree (ساده‌تر)
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### 2. Netlify Forms
```html
<form name="contact" netlify>
```

### 3. Google Forms
- فرم Google ایجاد کنید
- کد embed را در سایت قرار دهید

## 📧 تست فرم
1. سایت را در مرورگر باز کنید
2. به بخش تماس بروید
3. فرم را پر کنید و ارسال کنید
4. ایمیل خود را چک کنید

## 🛠️ عیب‌یابی
- Console مرورگر را چک کنید
- Network tab را بررسی کنید
- EmailJS dashboard را چک کنید

## 💰 هزینه‌ها
- **رایگان**: 200 ایمیل در ماه
- **پولی**: از $15 در ماه برای ایمیل‌های بیشتر 