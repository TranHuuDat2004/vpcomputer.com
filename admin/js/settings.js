// admin/js/settings.js
document.addEventListener('DOMContentLoaded', () => {
    
    const navItems = document.querySelectorAll('.settings-nav .nav-item');
    const tabPanes = document.querySelectorAll('.settings-content .tab-pane');

    if (navItems.length === 0) return;

    navItems.forEach(navItem => {
        navItem.addEventListener('click', (e) => {
            e.preventDefault();

            // Xóa class 'active' khỏi tất cả
            navItems.forEach(item => item.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Thêm class 'active' cho mục được chọn
            navItem.classList.add('active');
            const targetTab = document.getElementById(navItem.dataset.tab);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

});