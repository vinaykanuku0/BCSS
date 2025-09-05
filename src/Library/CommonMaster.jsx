import React from 'react'
import Icons from './Icons'
import Button from './Buttons'

const CommonMaster = ({ label, submit, renderFields, close, disabled, bottonText }) => {
    return (
        <div className='p-2'>
            <div className='d-flex justify-content-between align-items-center text-white p-2 rounded ' style={{ backgroundColor: "#27489b", height: "50px" }}>
                <div className='fw-bold'>{label}</div>
                <div><Icons name={"Close"} onClick={close} /></div>
            </div>
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
                <div className='d-flex flex-wrap'  >
                    {renderFields}
                </div>
                <div className="d-flex justify-content-end align-items-end mt-2" ><Button label={bottonText ? bottonText : 'Submit'} disabled={disabled} onClick={submit} /></div>
            </div>
        </div>
    )
}

export default CommonMaster
