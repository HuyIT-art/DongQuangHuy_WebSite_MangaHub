const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    alert("Vui lòng đăng nhập");
    window.location.href = "login.html";
}

const historyKey = `history_${currentUser.email}`;
const history = JSON.parse(localStorage.getItem(historyKey)) || [];

const grid = document.getElementById("historyGrid");

if (history.length === 0) {
    grid.innerHTML = `<p>Bạn chưa đọc truyện nào</p>`;
} else {
    history
        .sort((a, b) => b.lastReadAt - a.lastReadAt)
        .forEach(m => {
            grid.innerHTML += `
                <div class="col-6 col-md-3 mb-4">
                    <div class="card h-100">
                        <a href="read.html?chapter=${m.lastReadChapter || 1}">
                            <img src="${m.image}" class="card-img-top">
                        </a>
                        <div class="card-body text-center">
                            <h6>${m.title}</h6>
                            <small class="text-muted">
                                Đọc chương ${m.lastReadChapter || 1}<br>
                                ${new Date(m.lastReadAt).toLocaleString()}
                            </small>
                        </div>
                    </div>
                </div>
            `;
        });
}
