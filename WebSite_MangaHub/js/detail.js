document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const mangaId = parseInt(params.get("id"));

    const mangas = JSON.parse(localStorage.getItem("mangas")) || [];
    const manga = mangas.find(m => m.id === mangaId);

    if (!manga) {
        alert("Không tìm thấy truyện");
        window.location.href = "index.html";
        return;
    }

    // ===== HIỂN THỊ THÔNG TIN =====
    document.querySelector(".manga-title").innerText = manga.title;
    document.querySelector(".manga-cover").src = manga.image;
    document.querySelector(".description p").innerText = manga.description || "Đang cập nhật...";

    // ===== NÚT ĐỌC TỪ ĐẦU =====
    const readBtn = document.querySelector(".btn.btn-primary");
    readBtn.onclick = () => {
        window.location.href = `read.html?mangaId=${manga.id}&chapter=1`;
    };

    // ===== DANH SÁCH CHƯƠNG =====
    const chapterList = document.querySelector(".chapter-list");
    chapterList.innerHTML = `<h3 class="mb-3"><i class="fas fa-list text-primary"></i> Danh Sách Chương</h3>`;

    manga.chapters.forEach(ch => {
        const div = document.createElement("div");
        div.className = "chapter-item";
        div.innerHTML = `
            <span class="chapter-name">Chương ${ch.number}: ${ch.title}</span>
            <span class="chapter-details">Nhấn để đọc</span>
        `;
        div.onclick = () => {
            window.location.href = `read.html?mangaId=${manga.id}&chapter=${ch.number}`;
        };
        chapterList.appendChild(div);
    });
    
});
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const mangas = JSON.parse(localStorage.getItem("mangas")) || [];
const manga = mangas.find(m => m.id === id);

if (!manga) {
    alert("Không tìm thấy truyện");
    window.location.href = "index.html";
}

// Gán dữ liệu
document.querySelector(".manga-title").innerText = manga.title;
document.querySelector(".manga-cover").src = manga.image;
document.querySelector(".description p").innerText = manga.description;

// Render chương
const chapterList = document.querySelector(".chapter-list");
chapterList.innerHTML = "";

manga.chapters.forEach(ch => {
    chapterList.innerHTML += `
        <div class="chapter-item">
            <a href="read.html?id=${manga.id}&chapter=${ch.number}">
                Chương ${ch.number}: ${ch.title}
            </a>
        </div>
    `;
});
function readManga() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        alert("Vui lòng đăng nhập để đọc truyện");
        window.location.href = "login.html";
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const mangaId = urlParams.get("id");

    const mangas = JSON.parse(localStorage.getItem("mangas")) || [];
    const manga = mangas.find(m => m.id == mangaId);

    if (!manga) {
        alert("Không tìm thấy truyện");
        return;
    }

    const historyKey = `history_${currentUser.email}`;
    let history = JSON.parse(localStorage.getItem(historyKey)) || [];

    // ❌ Không cho trùng
    history = history.filter(h => h.id !== manga.id);

    history.unshift({
        id: manga.id,
        title: manga.title,
        image: manga.image,
        lastReadAt: new Date().toISOString()
    });

    localStorage.setItem(historyKey, JSON.stringify(history));

    // 👉 sau này có trang đọc chương thì redirect sang đó
    alert("Đã lưu vào lịch sử đọc");
}


