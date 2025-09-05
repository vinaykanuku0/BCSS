import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Icons from '../Library/Icons';
import { Colors } from '../Library/Colors';
import { logOutFunction } from '../Utils/Config';
const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate()
    //Author by Vinay
    const sidebar = [
        {
            name: "Masters",
            icon: <Icons name={"Masters"} />,
            path: "/v/masters/main-masters"
        },
        {
            name: "Consultations",
            icon: <Icons name={"consultation"} />,
            path: "/v/servicemanagement/opconsultation"
        }]
    return (
        <div>
            <div
                className={` text-white d-flex flex-column py-2 ${expanded ? "px-2" : "align-items-center"}`}
                style={{
                    width: expanded ? "230px" : "70px",
                    transition: "width 0.3s ease",
                    background: Colors?.themeColor,
                    height: "92vh"
                }}
            >
                <div className='d-flex flex-column justify-content-between' style={{ height: "92vh" }}>
                    <div>
                        <div className={` ${expanded ? "d-flex gap-3 px-1 " : "d-flex flex-column align-items-center"} `}
                        // onClick={() => setExpanded(!expanded)}
                        >
                            <div className='pointer'>
                                < Icons name={"Menu"} />
                            </div>
                            <div className='pointer' style={{ fontSize: `${expanded ? "" : "12px"}` }}>Menu</div>
                        </div>
                        <ul className="list-unstyled px-1 py-1"

                        >
                            {sidebar?.map((e, index) => (
                                <li key={index} style={{ wordBreak: "break-word" }} className={` ${expanded ? "d-flex gap-3 py-2" : ""} `} onClick={() => navigate(e?.path)}>
                                    <div className="text-center pointer">{e.icon}</div>
                                    <div className="text-center pointer" style={{ fontSize: `${expanded ? "" : "12px"}` }}>{e.name}</div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='pointer text-center' onClick={() => logOutFunction()}>Log out</div></div>
            </div>
        </div>
    )
}

export default Sidebar
