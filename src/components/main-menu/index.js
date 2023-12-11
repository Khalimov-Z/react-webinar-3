import { memo } from "react";
import "./style.css";
import { NavLink } from "react-router-dom";

function MainMenu() {
  return (
    <div className="MainMenu">
      <NavLink to="/" className="MainMenu-link">
        Главная
      </NavLink>
    </div>
  );
}


export default memo(MainMenu);