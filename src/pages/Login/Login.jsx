import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema } from "../../Schemas/LoginSchema";
import { useLoginUserMutation } from "../../features/AuthSlice/AuthSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";


const initialValues = {
    Email: '',
    Password: ''
}
const Login = () => {

    const [loginUser, { isLoading, isError, error, data, isSuccess }] = useLoginUserMutation()

    const navigate = useNavigate()
    const { handleChange, handleBlur, handleSubmit, touched, values, errors } = useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: async (values, action) => {
            await loginUser(values)
            if (isSuccess) {
                action.resetForm()
            }
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
            localStorage.setItem('token', data?.token)
            navigate('/')
        }
        if (isError) {
            toast.error(error?.data?.message)
        }
    }, [isSuccess, isError, data, error])

    return (
        <div className='bg-no-repeat bg-cover bg-center relative'>
            <div className='min-h-screen sm:flex sm:flex-row mx-0 justify-center'>
                <div className='flex justify-center self-center  z-10'>
                    <div className='p-10 bg-white mx-auto rounded-2xl w-100  border-2  mt-6 sm:mt-0 shadow-lg'>
                        <div className='mb-4'>
                            <h3 className='font-semibold text-2xl text-gray-800'>Sign In </h3>
                            <p className='text-gray-500'>Please sign in to your account.</p>
                        </div>
                        <form onSubmit={handleSubmit} className='space-y-3'>
                            <div className='space-y-2'>
                                <label className='text-sm font-medium text-gray-700 tracking-wide'>
                                    Email
                                </label>
                                <input
                                    className='input-type-style email'
                                    type='email'
                                    placeholder='mail@gmail.com'
                                    name="Email"
                                    value={values.Email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                {/* Error */}
                                {
                                    errors.Email && touched.Email ? <p style={{ marginTop: '3px' }} className="text-sm text-red-600 ml-1 mt-0">{errors.Email}</p> : null
                                }
                            </div>
                            <div className='space-y-2'>
                                <label className='mb-5 text-sm font-medium text-gray-700 tracking-wide'>
                                    Password
                                </label>
                                <input
                                    className='input-type-style'
                                    type='text'
                                    placeholder='Enter your password'
                                    name="Password"
                                    value={values.Password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                {/* Error */}
                                {
                                    errors.Password && touched.Password ? <p style={{ marginTop: '3px' }} className="text-sm text-red-600 ml-1 mt-0 ">{errors.Password}</p> : null
                                }
                            </div>

                            <div>
                                <button
                                    type='submit'
                                    className='w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500'>
                                    {
                                        isLoading ? 'Loading...' : 'SignIn'
                                    }
                                </button>
                            </div>
                        </form>
                        <div className='pt-3 text-center tracking-wider font-semibold'>
                            <Link className="text-gray-600 hover:text-black transition-colors duration-300" to='/register'>Do not have account Sign Up ?</Link>

                        </div>
                        <div className='pt-5 text-center text-gray-400 text-xs'>
                            Copyright © 2022-2023{" "}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
