/** @format */

import * as Yup from "yup";
export const SignUpSchema = Yup.object({
    FirstName: Yup.string().min(2).max(25).required("Please enter First name"),
    LastName: Yup.string().min(2).max(25).required("Please enter Last name"),
    Email: Yup.string().email().required("Please enter your email"),
    Phone: Yup.string()
        .required("Please enter phone no")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10)
        .max(10),
    UserName: Yup.string().min(2).max(25).required("Please enter user Name"),
    Password: Yup.string().min(8).max(15).required("Please enter your Password"),
});
