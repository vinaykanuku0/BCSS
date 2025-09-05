import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import Icons from "../Library/Icons";
import Logo from "../Images/Logo.png";
import { Colors } from "../Library/Colors";
import { basefileURL, enc, getList, getUserfromSS, logOutFunction, notify, urls } from "../Utils/Config";
import { LuMenu } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
function PinnacleHeader({ toggle, showNavbar }) {
  const [broken, setBroken] = useState(window.matchMedia("(max-width: 800px)").matches);
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
 const HospitalsList = getUserfromSS()?.hospital || [];
  const [selectedHospital, setSelectedHospital] = useState("");

  const [showProfile, setShowProfile] = useState(false);
  const loginDetails=getUserfromSS()?.employee?.[0]
  const navigate=useNavigate()
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const changeHandler = (id) => (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const fileType = file["type"];
    const validImageTypes = ["image/gif", "image/jpeg", "image/jpg", "image/png"];
    if (!validImageTypes.includes(fileType)) {
      notify(false, "Please select image only!!!");
      document.getElementById(id).value = null;
    } else {
      setSelectedFile({ file: file });
    }
  };
  const switchHospital = async (newHospital) => {
    const currentHospital = sessionStorage.getItem("hospital");

    if (currentHospital !== newHospital) {
      sessionStorage.setItem("hospital", newHospital);
      setSelectedHospital(newHospital); // Update dropdown selection
      notify(true, "Hospital Switched successfully");
      window.location.reload();
    } else {
      notify(false, "Already selected this hospital");
    }
  };
  const uploadPic = async () => {
    const formData = new FormData();
    formData.append("Id", getUserfromSS()?.empId);
    formData.append("Image", selectedFile?.file);
    let res = await save(urls.Employee.AddProfilePhoto, formData);
    if (res?.data?.status == true) {
      let user = getUserfromSS();
      user["image"] = res?.data?.data;
      sessionStorage.setItem("user", JSON.stringify(user));
      window.location.reload();
    }
  };

  const changeModel = (name, q) => {
    setModel({ [name]: model[name] == true ? false : true });
    setUpdatingData(q || {});
  };

  const changeModelandUpdate = (name, q) => {
    setModel({ [name]: model[name] == true ? false : true });
    setUpdatingData(q || {});
    setUpdate(Date.now());
  };

  const goTo = () => {
    navigate("/v1/employee/detailProfile");
  };
  
  useEffect(() => {
    if (selectedFile?.file) {
      uploadPic();
    }
  }, [selectedFile]);
  const closeProfilePopup = () => {
    setShowProfile(!showProfile);
  };
  
 
useEffect(() => {
    if (HospitalsList.length > 0) {
      const currentHospital = sessionStorage.getItem("hospital");
      const firstValue = HospitalsList[0].value;

      // Set current selection in state
      if (currentHospital) {
        setSelectedHospital(currentHospital);
      } else {
        setSelectedHospital(firstValue);
        switchHospital(firstValue);
      }
    }
  }, [HospitalsList]);

   return (
    <header
      className=" d-flex align-items-center justify-content-between px-3"
      style={{ height: "8vh", background: Colors?.themeColor }}
    >
      <div className="   d-flex   ">
        {!broken && (
          <div className=" ">
            <LuMenu
              color="white"/* changed color from black to white */
              className="pointer"
              onClick={toggle}
              title={`${!showNavbar ? "Open Navbar" : "Close Navbar"}`}
            />
          </div>
        )}
        {/* <img
          src={getUserfromSS()?.logo ? `${basefileURL}/HospitalProfile/${getUserfromSS()?.logo}` : Logo}
          style={{
            objectFit: "contain",
            height: "30px",
            width: "150px",
            maxWidth: "100%",
            maxHeight: "30px",
          }}
          height="30"
          width="150"
        /> */}
      </div>
      <div className="d-flex gap-3">
        
          <div>
           <select
        className="form-select"
        value={selectedHospital}
        onChange={(e) => switchHospital(e.target.value)}
      >
        {HospitalsList.map((e, i) => (
          <option value={e?.value} key={i}>
            {e?.label}
          </option>
        ))}
      </select>
          </div>
       
        <div className="d-flex gap-2 align-items-center">
          <Icons name={"Notification"} size={25} color="white" />{" "}
          <span className="text-white">{getUserfromSS()?.profileName=="DOCTORS"&&"Dr."}{getUserfromSS()?.userFullName}<br/>
            <small style={{fontSize:"10px"}}>{loginDetails?.designationName}</small> 
            {/* <small>{loginDetails?.qualification}</small> */}
          </span>
          <div className="dropdown">
            <div
              className="dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {loginDetails?.profile ? (
                <img
                  src={`${basefileURL}/DoctorProfile/${loginDetails?.profile}`}
                  style={{
                    objectFit: "fill",
                    height: "50px",
                    width: "50px",
                    borderRadius: "100px",
                    border: "1px solid #efefef",
                  }}
                  className="pointer"
                  alt="Employee"
                />
              ) : (
                <Icons size={35} color="#fff" name={"Profile"} />
              )}
            </div>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#">
                  <Icons name={"Mobile"} size="22" /> <span>{getUserfromSS()?.contactNo}</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <Icons name={"View"} size="21" />
                  View Profile
                </a>
              </li>
              <li onClick={() => logOutFunction()}>
                <a className="dropdown-item" href="#">
                  <Icons name={"LogOut"} size="20" />
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default PinnacleHeader;
