import React, { useContext, useState } from "react";
import { useFormValidation } from "../../Validations/useFormValidations";
import leftContent from "../../Images/backgroundimg.png";
import sheld from "../../Images/tdesign_secured-filled.png";

import { useNavigate } from "react-router-dom";
import { enc, login, navigationFn, notify, returningValue, save, urls } from "../../Utils/Config";

const Login = ({ ChangePageType }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState(true);

  const changingPasswordtype = () => {
    setPassword(!password);
  };

  const submit = async () => {
    navigate("/v/dashboard");
    // let res = await save(urls?.Student?.Login, data);
    // if (res?.data?.status === true) {
    //   navigate("/v/dashboard");
    // }
  };
  const { data, handleSubmit, formChange, errors } = useFormValidation({
    initialValues: {},
    validationSchema: login,
    submit: submit,
  });

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        width: "100%",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundImage: `url(${leftContent})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="row w-100 justify-content-center align-items-center g-4 ">
        {/* Welcome Section */}
        <div className="col-md-5 col-12 text-white text-center text-md-start">
          <div className="fw-bold" style={{ fontSize: "40px" }}>
            WELCOME!
          </div>
          <div className="fw-bold fs-2">Blue Cloud Softech Solutions Limited</div>
          <div className="fs-5">Access comprehensive data insights and analytics.</div>
        </div>

        {/* Login Section */}
        <div className="d-flex justify-content-center align-items-center rounded  col-md-4 col-10 h-100 py-md-4" style={{ backgroundColor: "#F5F5F5" }}>
          <div className="  d-flex flex-column  col-9 my-md-4">
            <div className="my-4 text-center">
              <div>
                <img src={sheld} height={45} alt="shield" />
              </div>
              <div className="fw-bold mt-2">Secure data dashboard login</div>
            </div>

            <div className="w-100 mb-3">
              <label className="" style={{ fontWeight: "500" }}>
                User ID
              </label>
              <input className="form-control" name="userId" placeholder="Enter User ID" onChange={formChange} />
            </div>

            <div className="w-100">
              <label className="" style={{ fontWeight: "500" }}>
                Password
              </label>
              <input type="password" className="form-control" name="password" placeholder="Enter Password" onChange={formChange} />
            </div>
            <div className="text-end text-secondary mt-1" style={{ fontSize: "12px" }}>
              Forgot Password?
            </div>
            <div className="text-white rounded my-4 py-2 text-center pointer" onClick={() => submit()} style={{ background: "#146CAC" }}>
              Sign In
            </div>
          </div>
        </div>
      </div>
    </div>

    // </div>
  );
};

export default Login;
