document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("burger");
  const navigationMenu = document.getElementById("nav-dropdown");

  menuButton.addEventListener("click", () => {
    navigationMenu.classList.toggle("nav-items__container-open");
  });
});
