const form = document.getElementById("mangaForm");
const table = document.getElementById("mangaTable");

let mangas = JSON.parse(localStorage.getItem("mangas")) || [];
let editId = null;

// ===== RENDER BẢNG =====
function renderTable() {
    table.innerHTML = "";
    mangas.forEach(m => {
        table.innerHTML += `
            <tr>
                <td><img src="${m.image}" width="60"></td>
                <td>${m.title}</td>
                <td>${m.category}</td>
                <td>${m.chapterCount}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editManga(${m.id})">Sửa</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteManga(${m.id})">Xóa</button>
                </td>
            </tr>
        `;
    });
}

renderTable();

// ===== THÊM / SỬA =====
form.addEventListener("submit", e => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const chapterCount = document.getElementById("chapterCount").value;

    if (editId) {
        const manga = mangas.find(m => m.id === editId);
        manga.title = title;
        manga.image = image;
        manga.description = description;
        manga.category = category;
        manga.chapterCount = chapterCount;
    } else {
        mangas.push({
            id: Date.now(),
            title,
            image,
            description,
            category,
            chapterCount
        });
    }

    localStorage.setItem("mangas", JSON.stringify(mangas));
    form.reset();
    editId = null;
    renderTable();
});

// ===== SỬA =====
function editManga(id) {
    const m = mangas.find(x => x.id === id);
    editId = id;

    title.value = m.title;
    image.value = m.image;
    description.value = m.description;
    category.value = m.category;
    chapterCount.value = m.chapterCount;
}

// ===== XÓA =====
function deleteManga(id) {
    if (confirm("Xóa truyện này?")) {
        mangas = mangas.filter(m => m.id !== id);
        localStorage.setItem("mangas", JSON.stringify(mangas));
        renderTable();
    }
}
