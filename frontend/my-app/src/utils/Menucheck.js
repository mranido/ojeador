const Menucheck = () => {
  const menu = document.getElementById("menu");
  if (!menu.classList.contains("hidden")) {
    menu.classList.toggle("hidden");
  }
};

export default Menucheck;
