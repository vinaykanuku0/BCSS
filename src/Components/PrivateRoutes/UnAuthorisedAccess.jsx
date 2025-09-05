import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
 import Authorization from "../../Images/Logo.png"
const UnAuthorisedAccess = () => {
    const navigate = useNavigate()
    useEffect(() => { sessionStorage.clear() }, [])

    return (
        <div className='d-flex flex-column gap-2 justify-content-center align-items-center' style={{ height: "100vh" }}>
            <img src={Authorization} className='w-25' />
            <div className='Unauthorised'>Login again</div>
            {/* <div className='' style={{ color: "#8E8E8E" }}>
                Please Contact<span className='pointer' style={{ color: "#46A6DD" }}> support@domain.com</span> for assistance
            </div> */}
            <div className='px-3 py-2 text-white pointer' style={{ backgroundColor: "#000", borderRadius: "20px" }} onClick={() => navigate("/")} >Back To Login</div>
        </div>
    )
}
export default UnAuthorisedAccess