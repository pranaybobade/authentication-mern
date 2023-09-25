/** @format */

import { useNavigate, useParams } from "react-router-dom";
import {
    useGetUserByIdQuery,
    useUpdateUserMutation,
} from "../../features/UserSlice";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "../../features/AuthSlice/AuthSlice";
import { toast } from "react-toastify";

const EditProfile = () => {
    const userId = useParams();
    const { data } = useGetUserQuery();
    const { data: editData } = useGetUserByIdQuery(`${data?.user?._id}`);
    const [updateUser, response] = useUpdateUserMutation();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        FirstName: editData?.user?.FirstName,
        LastName: editData?.user?.LastName,
        Email: editData?.user?.Email,
        Phone: editData?.user?.Phone,
        UserName: editData?.user?.UserName,
    });

    const { id } = userId;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser({ id, formData });
    };

    useEffect(() => {
        const { data, isSuccess, isError, error } = response;

        if (isSuccess) {
            toast.success(data?.message);
            navigate("/");
        }

        if (isError) {
            toast.error(error?.data?.message);
        }
    }, [navigate, response]);

    return (
        <div className='min-h-screen sm:flex sm:flex-row mx-0 justify-center'>
            <div className='flex justify-center self-center  z-10 px-2'>
                <div className='p-10 bg-white mx-auto rounded-2xl w-100  border-2  mt-6 sm:mt-0 shadow-lg'>
                    <div className='mb-4'>
                        <h3 className='font-semibold text-2xl text-gray-800'>
                            Edit Profile{" "}
                        </h3>
                    </div>
                    <form className='space-y-3 ' onSubmit={handleSubmit} method='PUT'>
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
                                    value={formData.FirstName}
                                    onChange={handleChange}
                                    required
                                />
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
                                    value={formData.LastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className='space-y-2 '>
                            <label className='text-sm font-medium text-gray-700 tracking-wide'>
                                Email
                            </label>
                            <input
                                className='input-type-style email bg-gray-100'
                                type='email'
                                name='Email'
                                placeholder='mail@gmail.com'
                                value={formData.Email}
                                onChange={handleChange}
                                required
                                disabled
                            />
                        </div>

                        <div className='space-y-2 '>
                            <label className='text-sm font-medium text-gray-700 tracking-wide'>
                                Phone
                            </label>
                            <input
                                className='input-type-style email '
                                type='text'
                                name='Phone'
                                placeholder='900-900-9000'
                                value={formData.Phone}
                                onChange={handleChange}
                                pattern="[789][0-9]{9}"
                                required
                            />
                        </div>
                        <div className='space-y-2 '>
                            <label className='text-sm font-medium text-gray-700 tracking-wide'>
                                UserName
                            </label>
                            <input
                                className='input-type-style email '
                                type='text'
                                name='UserName'
                                placeholder='JhonDoe'
                                value={formData.UserName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <button
                                type='submit'
                                className='w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500'>
                                {response?.isLoading ? "Loading..." : "Update Profile"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
