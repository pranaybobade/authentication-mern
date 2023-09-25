/** @format */

import { useEffect, useState } from "react";
import { useChangePasswordMutation } from "../../features/UserSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const ChangePassword = () => {
	const [password, setPassword] = useState({
		Password: "",
	});
	const { id } = useParams();
	const navigate = useNavigate();
	const [newPassword, response] = useChangePasswordMutation();
	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setPassword((prev) => {
			return { ...prev, [name]: value };
		});
	};
	console.log("passwodd", password, id);
	const handleSubmit = async (e) => {
		e.preventDefault();
		await newPassword({ id, password });
	};

	useEffect(() => {
		const { isSuccess, isError, error, data } = response;

		if (isSuccess) {
			toast.success(data?.message);
			navigate("/");
		}

		if (isError) {
			toast.error(error?.data?.message);
		}
	}, [response, navigate]);
    
	return (
		<div className='w-full h-screen flex justify-center flex-col  max-w-sm bg-white m-auto px-4'>
			<div className='flex flex-col items-center py-10  border border-gray-200 rounded-lg shadow '>
				<form onSubmit={handleSubmit} method='POST'>
					<h3 className='text-lg font-semibold'>Enter New Password</h3>
					<input
						className='border-2 border-black rounded-md px-3 py-2 font-bold block my-3'
						type='text'
						name='Password'
						required
						onChange={handleChange}
						value={password.Password}
						maxLength={15}
						minLength={8}
					/>

					<button
						type='submit '
						className='link-button-style px-4 tracking-wider'>
						{response?.isLoading ? "Loading..." : "Submit"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ChangePassword;
