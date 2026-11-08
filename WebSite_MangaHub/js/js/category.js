document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    document.getElementById("category-title").innerText = category;
    document.getElementById("category-subtitle").innerText = category;
    document.getElementById("breadcrumb-category").innerText = category;

    const mangas = JSON.parse(localStorage.getItem("mangas")) || [];
    const filtered = mangas.filter(m => m.category === category);

    const grid = document.querySelector(".manga-grid");
    grid.innerHTML = "";

    if (filtered.length === 0) {
        grid.innerHTML = `<p>Chưa có truyện thuộc thể loại này.</p>`;
        return;
    }

    filtered.forEach(m => {
        grid.innerHTML += `
            <div class="manga-card">
                <a href="detail.html?id=${m.id}">
                    <img src="${m.image}" class="manga-cover">
                </a>
                <div class="card-body">
                    <h3 class="manga-title">
                        <a href="detail.html?id=${m.id}">${m.title}</a>
                    </h3>
                </div>
            </div>
        `;
    });
});
