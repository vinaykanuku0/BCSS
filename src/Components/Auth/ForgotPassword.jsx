import React from "react";
import { useFormValidation } from "../../Validations/useFormValidations";
import Logo from "../../Images/Logo.png"
import leftContent from "../../Images/LeftContent.png"
import { useNavigate } from "react-router-dom";
import { ReturnInput } from "../../Library/InputFields";

const ForgotPassword = ({ ChangePageType }) => {
  const navigate = useNavigate()
  const submit = async () => {

    navigate("/v")
    
  };
  const { data, handleSubmit, formChange, errors, addObject } = useFormValidation({
    initialValues: {},
    submit: submit,
  })

const fields=[
  { type: "Input",divClass:"col-md-12", dataType: "Email", label: "Email", name: "email", onChange: formChange("Email") },
  { type: "Input",divClass:"col-md-12", dataType: "", label: "Password", name: "password", onChange: formChange("NoSpace") },
]
  return (
    <div className="">
      <div className="d-flex vh-100">
        <div className="col-md-7 position-relative">
          <img
            src={leftContent}
            className="h-100 w-100"
            style={{ objectFit: "cover" }}
            alt="Hospital"
          />
          <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
            <h1>Go Pinnacle</h1>
            <p>The most trusted Hospital in Vizag</p>
            <button className="btn btn-light">Read More</button>
          </div>
        </div>
        <div className="col-md-5 d-flex align-items-center justify-content-center">
          <div className="w-75">
            <div className="text-center mb-4">
              <img src={Logo} alt="Pinnacle Logo" width={200} />
            </div>
            <div>
              <div className="mb-3">
                <p className="mt-3" style={{ fontSize: "20px", fontWeight: '600' }}>Nice to see you again</p>
                 {fields?.map((e, i) => (
                          <ReturnInput data={data} errors={errors} key={i} {...e} />
                        ))}
              </div>
              <div className="d-flex justify-content-between mb-3">
                <div>

                </div>
                <a href="#">Forgot password?</a>
              </div>
              <div className="btn text-white w-100 mb-2" style={{ background: "#1D4097" }} onClick={handleSubmit}>Sign in</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ForgotPassword;
