import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./PinnacleSideBar.css";
import { sidenavbar } from "./SideMenuConst";
import Clinicien from "../Images/Logo.png";
import SmallImg from "../Images/LogoNew.png";
import { Colors } from "../Library/Colors";

function PinnacleSideBar({ showNavbar, theme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(window.matchMedia("(max-width: 800px)").matches);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 800px)");
    const handleResize = () => setBroken(media.matches);

    media.addEventListener("change", handleResize);
    return () => media.removeEventListener("change", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (!broken) setToggled(false);
  };

  const handleMouseLeave = () => {
    if (!broken) setToggled(true);
  };

  return (
    <>
      {/* Sidebar */}
      <Sidebar
        toggled={broken ? toggled : !toggled}
        breakPoint="800px"
        onBreakPoint={(isBroken) => setBroken(isBroken)}
        onBackdropClick={() => setToggled(false)}
        backgroundColor={Colors?.themeColor}
        className="sidenav"
        width={showNavbar ? "250px" : "85px"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo */}
        <div className={`${showNavbar ? "py-2 mb-2 text-center" : "ps-3 py-1"}`}>
          <Link to="/">
            <img
              src={showNavbar ? Clinicien : SmallImg}
              alt="Logo"
              width={showNavbar ? "200px" : ""}
              height={showNavbar ? "" : "50px"}
            />
          </Link>
        </div>

        {/* Menu */}
        <Menu
          style={{ height: "85vh", overflowY: "auto" }}
          menuItemStyles={{
            button: ({ level }) =>
              level === 0
                ? {
                    color: "white",
                    backgroundColor: Colors?.themeColor,
                  }
                : {},
          }}
        >
          {sidenavbar?.map((e, i) =>
            e.submenu ? (
              <SubMenu
                key={i}
                title={e?.name}
                icon={e.icon}
                label={e?.name}
                className={location.pathname === e.route ? "with-line" : ""}
                style={{ marginBottom: "10px" }}
              >
                {e.submenu.map((subItem, subIndex) => (
                  <MenuItem
                    key={subIndex}
                    icon={subItem?.icon}
                    onClick={() => {
                      navigate(subItem.route);
                      if (broken) setToggled(false); // Close on mobile
                    }}
                    className={location.pathname === subItem.route ? "with-line" : ""}
                    style={{ backgroundColor: Colors?.themeColor, color: "white" }}
                  >
                    {subItem.name}
                  </MenuItem>
                ))}
              </SubMenu>
            ) : (
              <MenuItem
                key={i}
                onClick={() => {
                  navigate(e.route);
                  if (broken) setToggled(false); // Close on mobile
                }}
                className={location.pathname === e.route ? "with-line" : ""}
                icon={e.icon}
                style={{
                  marginBottom: "10px",
                  color: theme,
                  backgroundColor: theme,
                }}
              >
                {e.name}
              </MenuItem>
            )
          )}
        </Menu>
      </Sidebar>

      {/* Hamburger Icon for Mobile */}
      {broken && (
        <div className="leftMenuToggle position-fixed top-0 start-0 p-2" style={{ zIndex: 1051 }}>
          <FontAwesomeIcon
            color="#000"
            icon={faBars}
            size="lg"
            onClick={() => setToggled(!toggled)}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}
    </>
  );
}

export default PinnacleSideBar;
