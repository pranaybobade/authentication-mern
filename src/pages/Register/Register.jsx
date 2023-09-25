/** @format */

import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { SignUpSchema } from "../../Schemas/RegistrationSchema/SignUpSchema";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../../features/AuthSlice/AuthSlice";
import { useEffect } from "react";

const initialValues = {
	FirstName: "",
	LastName: "",
	Email: "",
	Phone: "",
	UserName: "",
	Password: "",
};

const Register = () => {
	const [register, { isError, isLoading, isSuccess, data, error }] =
		useRegisterUserMutation();

	const navigate = useNavigate();

	const { handleChange, handleBlur, handleSubmit, touched, values, errors } =
		useFormik({
			initialValues,
			validationSchema: SignUpSchema,
			onSubmit: async (values, action) => {
				await register(values);
				if (isSuccess) {
					action.resetForm();
				}
			},
		});

	useEffect(() => {
		if (isSuccess) {
			toast.success(data?.message);
			navigate("/login");
		}

		if (isError) {
			return toast.error(error?.data?.message);
		}
	}, [isSuccess, isError, data, error])

	return (
		<div className='min-h-screen sm:flex sm:flex-row mx-0 justify-center'>
			<div className='flex justify-center self-center  z-10'>
				<div className='p-10 bg-white mx-auto rounded-2xl w-100  border-2  mt-6 sm:mt-0 shadow-lg'>
					<div className='mb-4'>
						<h3 className='font-semibold text-2xl text-gray-800'>Sign Up </h3>
						<p className='text-gray-500 mt-1'>
							Please sign up to create account.
						</p>
					</div>
					<form onSubmit={handleSubmit} className='space-y-3 '>
						<div className='sm:flex gap-x-3 capitalize'>
							<div className='space-y-2'>
								<label className='text-sm font-medium text-gray-700 tracking-wide'>
									First Name
								</label>
								<input
									className='input-type-style'
									type='text'
									placeholder='Enter Your First Name'
									name='FirstName'
									value={values.FirstName}
									onChange={handleChange}
									onBlur={handleBlur}
								/>

								{/* Error */}
								{errors.FirstName && touched.FirstName ? (
									<p
										style={{ marginTop: "3px" }}
										className='text-sm text-red-600 ml-1 mt-0 mb-1.5'>
										{errors.FirstName}
									</p>
								) : null}
							</div>
							<div className='space-y-2'>
								<label className='text-sm font-medium text-gray-700 tracking-wide'>
									Last Name
								</label>
								<input
									className='input-type-style'
									type='text'
									placeholder='Enter Your Last Name'
									name='LastName'
									value={values.LastName}
									onChange={handleChange}
									onBlur={handleBlur}
								/>

								{/* Error */}
								{errors.LastName && touched.LastName ? (
									<p
										style={{ marginTop: "3px" }}
										className='text-sm text-red-600 ml-1 mt-0 mb-1.5'>
										{errors.LastName}
									</p>
								) : null}
							</div>
						</div>
						<div className='space-y-2 '>
							<label className='text-sm font-medium text-gray-700 tracking-wide'>
								Email
							</label>
							<input
								className='input-type-style email'
								type='email'
								name='Email'
								placeholder='mail@gmail.com'
								value={values.Email}
								onChange={handleChange}
								onBlur={handleBlur}
							/>

							{/* Error */}
							{errors.Email && touched.Email ? (
								<p
									style={{ marginTop: "3px" }}
									className='text-sm text-red-600 ml-1 mt-0 mb-1.5'>
									{errors.Email}
								</p>
							) : null}
						</div>
						<div className='space-y-2 '>
							<label className='text-sm font-medium text-gray-700 tracking-wide'>
								Phone
							</label>
							<input
								className='input-type-style email'
								type='tel'
								name='Phone'
								placeholder='000-000-0000'
								value={values.Phone}
								onChange={handleChange}
								onBlur={handleBlur}
							/>

							{/* Error */}
							{errors.Phone && touched.Phone ? (
								<p
									style={{ marginTop: "3px" }}
									className='text-sm text-red-600 ml-1 mt-0 mb-1.5'>
									{errors.Phone}
								</p>
							) : null}
						</div>
						<div className='space-y-2 '>
							<label className='text-sm font-medium text-gray-700 tracking-wide'>
								UserName
							</label>
							<input
								className='input-type-style email'
								type='text'
								name='UserName'
								placeholder='jhonDoe'
								value={values.UserName}
								onChange={handleChange}
								onBlur={handleBlur}
							/>

							{/* Error */}
							{errors.UserName && touched.UserName ? (
								<p
									style={{ marginTop: "3px" }}
									className='text-sm text-red-600 ml-1 mt-0 mb-1.5'>
									{errors.UserName}
								</p>
							) : null}
						</div>
						<div className='space-y-2'>
							<label className='mb-5 text-sm font-medium text-gray-700 tracking-wide'>
								Password
							</label>
							<input
								className='input-type-style'
								type='text'
								placeholder='Enter your password'
								name='Password'
								value={values.Password}
								onChange={handleChange}
								onBlur={handleBlur}
							/>

							{/* Error */}
							{errors.Password && touched.Password ? (
								<p
									style={{ marginTop: "3px" }}
									className='text-sm text-red-600 ml-1 mt-0 mb-1.5'>
									{errors.Password}
								</p>
							) : null}
						</div>

						<div>
							<button
								type='submit'
								className='w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500'>
								{isLoading ? "Loading..." : "Sign Up"}
							</button>
						</div>
					</form>
					<div className='pt-3 text-center tracking-wider font-semibold '>
						<Link
							className='text-gray-600 hover:text-black transition-colors duration-300'
							to='/login'>
							Allready have an account Sign In ?
						</Link>
					</div>
					<div className='pt-5 text-center text-gray-400 text-xs'>
						Copyright © 2022-2023{" "}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
