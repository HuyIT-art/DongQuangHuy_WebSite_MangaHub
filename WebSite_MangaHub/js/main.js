document.addEventListener("DOMContentLoaded", function () {

    // ===== USER HIỆN TẠI =====
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // ===== MENU MOBILE =====
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('d-none');
            mainNav.classList.toggle('d-block');
        });
    }

    // ===== HIỂN THỊ USER + ADMIN =====
    const userActions = document.getElementById("userActions");
    if (userActions && currentUser) {
        userActions.innerHTML = `
            <span class="me-3 text-white">
                Xin chào, ${currentUser.email}
            </span>
            ${currentUser.role === "admin"
                ? `<a href="admin.html" class="me-2 text-warning fw-bold">Quản trị</a>`
                : ``}
            <a href="#" onclick="logout()">Đăng xuất</a>
        `;
    }

    // ===== BẢO VỆ ADMIN =====
    if (window.location.pathname.includes("admin.html")) {
        if (!currentUser || currentUser.role !== "admin") {
            alert("Bạn không có quyền truy cập");
            window.location.href = "login.html";
        }
    }

    // ===== RENDER MANGA (TRANG CHỦ) =====
    const grid = document.getElementById("mangaGrid");
    const mangas = JSON.parse(localStorage.getItem("mangas")) || [];

    if (grid) {
        grid.innerHTML = "";
        mangas.forEach(m => {
            grid.innerHTML += `
                <div class="manga-card">
                    <a href="detail.html?id=${m.id}">
                        <img src="${m.image}" class="manga-cover">
                    </a>
                    <div class="card-body">
                        <h3 class="manga-title">${m.title}</h3>
                        <div>Chương ${m.chapter}</div>
                    </div>
                </div>
            `;
        });
    }

    // =========================
    // ===== SEARCH TRUYỆN =====
    // =========================
    const searchInput = document.getElementById("searchInput");
    const searchHistoryBox = document.getElementById("searchHistory");

    if (!searchInput || !searchHistoryBox) return;

    // DATA TRUYỆN (có thể lấy từ localStorage sau)
    const mangaList = [
        {
            id: "solo-leveling",
            title: "Solo Leveling",
            image: "images/solo-leveling.jpg",
            link: "detail.html"
        },
        {
            id: "solo-leveling",
            title: "Naruto",
            image: "images/naruto.jpg",
            link: "detail.html"
        },
        {
            id: "solo-leveling",
            title: "One Piece",
            image: "images/one-piece.jpg",
            link: "detail.html"
        },
        {
            id: "solo-leveling",
            title: "Dragon Ball",
            image: "images/nguyen-ton.webp",
            link: "detail.html"
        },
        {
            id: "solo-leveling",
            title: "Bleach",
            image: "images/shark-ca-map.jpg",
            link: "detail.html"
        },
        {
            id: "solo-leveling",
            title: "Attack on Titan",
            image: "images/quyen-vuong-phuc-sinh.jpg",
            link: "detail.html"
        },
        {
            id: "solo-leveling",
            title: "Jujutsu Kaisen",
            image: "images/Jujutsu-kaisen.jpg",
            link: "detail.html"
        },
        
    ];


    // ===== LỊCH SỬ TÌM KIẾM =====
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    function renderSearchHistory() {
        if (searchHistory.length === 0) {
            searchHistoryBox.classList.add("d-none");
            return;
        }

        searchHistoryBox.innerHTML = "";

        searchHistory.forEach(keyword => {
            const div = document.createElement("div");
            div.className = "search-item";
            div.textContent = keyword;
            div.onclick = () => {
                searchInput.value = keyword;
                searchHistoryBox.classList.add("d-none");
            };
            searchHistoryBox.appendChild(div);
        });

        const clearBtn = document.createElement("div");
        clearBtn.textContent = "❌ Xóa lịch sử tìm kiếm";
        clearBtn.className = "clear";
        clearBtn.onclick = () => {
            localStorage.removeItem("searchHistory");
            searchHistory = [];
            renderSearchHistory();
        };

        searchHistoryBox.appendChild(clearBtn);
        searchHistoryBox.classList.remove("d-none");
    }

    // Focus → hiện lịch sử
    searchInput.addEventListener("focus", renderSearchHistory);

    // ===== TÌM KIẾM + KẾT QUẢ =====
    searchInput.addEventListener("input", function () {
        const keyword = this.value.trim().toLowerCase();
        searchHistoryBox.innerHTML = "";

        if (!keyword) {
            renderSearchHistory();
            return;
        }

        const results = mangaList.filter(m =>
            m.title.toLowerCase().includes(keyword)
        );

        if (results.length === 0) {
            searchHistoryBox.innerHTML = `<div class="search-item">Không tìm thấy truyện</div>`;
        } else {
            results.forEach(m => {
                searchHistoryBox.innerHTML += `
                    <a href="${m.link}" class="search-item">
                        <img src="${m.image}">
                        <span>${m.title}</span>
                    </a>
                `;
            });
        }

        searchHistoryBox.classList.remove("d-none");
    });

    // Enter → lưu lịch sử
    searchInput.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            const keyword = searchInput.value.trim();
            if (!keyword) return;

            searchHistory = searchHistory.filter(k => k !== keyword);
            searchHistory.unshift(keyword);
            if (searchHistory.length > 8) searchHistory.pop();

            localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
            searchHistoryBox.classList.add("d-none");
        }
    });

    // Click ngoài → ẩn
    document.addEventListener("click", e => {
        if (!e.target.closest(".search-box")) {
            searchHistoryBox.classList.add("d-none");
        }
    });
});

// ===== LOGOUT =====
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// ===== READ =====
function readManga() {
    window.location.href = "read.html?manga=solo-leveling&chapter=1";
}
