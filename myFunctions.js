// -------------------------
// 1. التنقل السلس بين الصفحات
// -------------------------
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        const targetPage = event.target.getAttribute("href");
        window.location.href = targetPage; // الانتقال للصفحة المطلوبة
    });
});

// -------------------------
// 2. التحكم في شريط البحث بصفحة الكتب
// -------------------------
function filterBooks() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const books = document.querySelectorAll("table tbody tr:not(.details)");

    books.forEach(book => {
        const title = book.querySelector("td:first-child").textContent.toLowerCase();
        if (title.includes(searchValue)) {
            book.style.display = "";
        } else {
            book.style.display = "none";
            const detailsRow = book.nextElementSibling;
            if (detailsRow && detailsRow.classList.contains("details")) {
                detailsRow.style.display = "none";
            }
        }
    });
}

// -------------------------
// 3. عرض وإخفاء التفاصيل
// -------------------------
function showDetails(button) {
    const detailsRow = button.closest("tr").nextElementSibling;
    if (detailsRow.style.display === "none" || detailsRow.style.display === "") {
        detailsRow.style.display = "table-row";
        button.textContent = "إخفاء التفاصيل";
    } else {
        detailsRow.style.display = "none";
        button.textContent = "عرض التفاصيل";
    }
}

// -------------------------
// 4. إضافة كتاب إلى السلة
// -------------------------
function addToCart(bookTitle, bookPrice) {
    const cartItems = document.getElementById("cartItems");
    const totalPriceElem = document.getElementById("totalPrice");

    // إضافة عنصر جديد للسلة
    const li = document.createElement("li");
    li.textContent = `${bookTitle} - ${bookPrice} ل.س`;
    cartItems.appendChild(li);

    // تحديث المجموع الكلي
    const currentTotal = parseInt(totalPriceElem.textContent.replace(/\D/g, "")) || 0;
    const newTotal = currentTotal + bookPrice;
    totalPriceElem.textContent = `المجموع الكلي: ${newTotal} ل.س`;

    alert(`تمت إضافة "${bookTitle}" إلى السلة!`);
}

// -------------------------
// 5. إتمام عملية الشراء
// -------------------------
function checkout() {
    const cartItems = document.getElementById("cartItems");
    if (cartItems.children.length === 0) {
        alert("السلة فارغة! أضف كتبًا أولاً.");
        return;
    }

    alert("شكراً لإتمام عملية الشراء!");
    cartItems.innerHTML = ""; // تفريغ السلة بعد الشراء
    document.getElementById("totalPrice").textContent = "المجموع الكلي: 0 ل.س";
}

// -------------------------
// 6. التحقق من صحة المدخلات (نموذج الطلب)
// -------------------------
function validateCartForm() {
    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("id").value.trim();
    const dob = document.getElementById("dob").value;
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    // التحقق من الحقول
    if (!/^[\u0621-\u064A\s]+$/.test(name)) {
        alert("الاسم يجب أن يحتوي على حروف عربية فقط.");
        return false;
    }
    if (!/^\d{11}$/.test(id)) {
        alert("الرقم الوطني يجب أن يكون مكونًا من 11 رقمًا.");
        return false;
    }
    if (!/^09\d{8}$/.test(phone)) {
        alert("رقم الهاتف يجب أن يبدأ بـ 09 ويكون مكونًا من 10 أرقام.");
        return false;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        alert("يرجى إدخال بريد إلكتروني صالح.");
        return false;
    }

    alert("تم إتمام الشراء بنجاح!");
    return true;
}

// -------------------------
// 7. تحسين تجربة المستخدم
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
    // تأثيرات على الأزرار
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        });
        button.addEventListener("mouseleave", () => {
            button.style.boxShadow = "none";
        });
    });
});

// -------------------------
// 8. التمرير إلى أعلى الصفحة عند تحميلها
// -------------------------
window.onload = function() {
    window.scrollTo(0, 0);
};