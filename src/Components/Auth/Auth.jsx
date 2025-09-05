import React, { lazy, useState } from 'react'
import { useFormValidation } from '../../Validations/useFormValidations'
import ResetPassword from './ResetPassword'
const Login = lazy(() => import("./Login"))
const ForgetPassword = lazy(() => import("./ForgotPassword"))
const Auth = () => {
    const [pageType, setPageType] = useState("Login")
    const ChangePageType = (type) => setPageType(type)
    return (
        <div className='h-100 w-100'>
            {pageType == "Login" && <Login ChangePageType={ChangePageType} />}
            {pageType == "ForgetPassword" && <ForgetPassword ChangePageType={ChangePageType} />}
            {pageType == "ResetPassword" && <ResetPassword ChangePageType={ChangePageType} />}
        </div>
    )
}

export default Auth


