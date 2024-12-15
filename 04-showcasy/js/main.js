document.addEventListener("DOMContentLoaded", () => {
    
    // Menu Buttons
    const menuOpen = document.getElementById("menu-open");
    const menuClose = document.getElementById("menu-close");
    // Navigation Element
    const navigation = document.getElementById("navigation");

    menuOpen.addEventListener("click", () => {
        navigation.style.display = "block";
    });

    menuClose.addEventListener("click", () => {
       navigation.style.display = "none"; 
    })

});