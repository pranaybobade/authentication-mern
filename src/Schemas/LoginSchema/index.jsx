import * as Yup from 'yup';
export const LoginSchema = Yup.object({
    Email: Yup.string().email().required('Please enter your email'),
    Password: Yup.string()
        .min(8)
        .max(15)
        .required('Please enter your Password'),
});
