// ===============================
// KHỞI TẠO ADMIN MẶC ĐỊNH
// ===============================
if (!localStorage.getItem("users")) {
    const users = [
        {
            email: "admin@yourdomain.com",
            password: "123456",
            role: "admin",
            adminCode: "99999"
        }
    ];
    localStorage.setItem("users", JSON.stringify(users));
}

// ===============================
// ĐĂNG KÝ
// ===============================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value;
        const confirm = document.getElementById("regConfirm").value;

        if (!email || !password || !confirm) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (password.length < 6) {
            alert("Mật khẩu phải ít nhất 6 ký tự");
            return;
        }

        if (password !== confirm) {
            alert("Mật khẩu không khớp");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const exists = users.find(u => u.email === email);

        if (exists) {
            alert("Email đã tồn tại");
            return;
        }

        users.push({
            email,
            password,
            role: "user"
        });

        localStorage.setItem("users", JSON.stringify(users));

        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        window.location.href = "login.html";
    });
}

// ===============================
// ĐĂNG NHẬP
// ===============================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const adminCodeInput = document.getElementById("adminCode");
        const adminCode = adminCodeInput ? adminCodeInput.value.trim() : "";

        if (!email || !password) {
            alert("Vui lòng nhập email và mật khẩu");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (!user) {
            alert("Sai email hoặc mật khẩu");
            return;
        }

        // ===== ADMIN =====
        if (user.role === "admin") {
            if (adminCode !== user.adminCode) {
                alert("Sai mã truy cập quản trị");
                return;
            }

            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "admin.html";
            return;
        }

        // ===== USER THƯỜNG =====
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "index.html";
    });
}
