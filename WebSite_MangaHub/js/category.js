document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    let categoryName = urlParams.get('category');

    if (!categoryName) {
        categoryName = "Tất Cả";
    }

    const titleElement = document.getElementById('category-title');
    const subtitleElement = document.getElementById('category-subtitle');
    const breadcrumbElement = document.getElementById('breadcrumb-category');

    if (titleElement) titleElement.innerText = categoryName;
    if (subtitleElement) subtitleElement.innerText = categoryName;
    if (breadcrumbElement) breadcrumbElement.innerText = categoryName;
    
    document.title = "Truyện " + categoryName + " - MangaHub";

    const menuLinks = document.querySelectorAll('.mega-menu a');
    menuLinks.forEach(link => {
        if (link.innerText === categoryName) {
            link.style.color = '#ee3e54';
            link.style.fontWeight = 'bold';
        }
    });
});
