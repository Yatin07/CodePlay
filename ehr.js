let isSidebarOpen = false;

function toggleNav() {
    const sidebar = document.getElementById("sidebar");

    if (isSidebarOpen) {
        sidebar.classList.remove("open"); 
        isSidebarOpen = false;
    } else {
        sidebar.classList.add("open"); 
        isSidebarOpen = true;
    }
}
