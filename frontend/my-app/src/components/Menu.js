import { useEffect, useContext } from "react";
// import { AuthContext } from "../components/providers/AuthProvider";
import { Link } from "react-router-dom";
import Logo from "../imagesMenu/ojeador.svg";
// import checkMenu from "../utils/checkMenu";
// import decodeTokenData from "../utils/decodeTokenData";

const Menu = () => {
  //   const [token] = useContext(AuthContext);
  //   const decodedToken = decodeTokenData(token) || {};
  //   const userRole = decodedToken.userRole;
  //   const currentPage = window.location.pathname;

  useEffect(() => {
    // checkMenu();
  }, []);

  const toggleMenu = (e) => {
    e.preventDefault();
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
  };

  return (
    <aside id="menu" className="hidden">
      <button onClick={toggleMenu}></button>
      <img src={Logo} alt="Ojeador App" />
    </aside>
  );
};

export default Menu;
