/** @format */

import { Link, useNavigate } from "react-router-dom";
import EditProfile from "../EditProfile/Edit";
import { useState } from "react";
import {
    useGetUserQuery,
    useLogoutUserMutation,
} from "../../features/AuthSlice/AuthSlice";
import { toast } from "react-toastify";
import {
    useDeleteAccountMutation,
    useGetUserByIdQuery,
} from "../../features/UserSlice";

const Home = () => {
    const [deleteAccount] = useDeleteAccountMutation();
    const { data } = useGetUserQuery();
    const { data: userById, isLoading } = useGetUserByIdQuery(
        `${data?.user?._id}`
    );
    const [logoutUser, { isLoading: logOutLoading }] = useLogoutUserMutation();
    const [click, setClick] = useState(false);
    const [inputval, setInputval] = useState("");
    const navigate = useNavigate();


    // When user Click on the button
    const handleDeleteAccount = (userID) => {
        deleteAccount(userID);
        toast.success("Account Deleted Successfully");
        navigate("/register");
    };

    const handleLogout = async () => {
        await logoutUser();
        await localStorage.removeItem('token')
        toast.success("LoggedOut successfully");
        navigate("/login");
    };

    return (
        <div className='w-full h-screen flex justify-center flex-col  max-w-sm bg-white m-auto px-4'>
            <div className='flex flex-col items-center py-10  border border-gray-200 rounded-lg shadow '>
                {isLoading ? (
                    "Loadingg......"
                ) : (
                    <>
                        <h5 className='mb-1 text-xl font-medium text-gray-900 capitalize'>
                            {userById?.user?.FirstName} {userById?.user?.LastName}
                        </h5>
                        <span className='text-sm text-gray-500 '>{`Email : ${userById?.user?.Email}`}</span>
                        <span className='text-sm text-gray-500 '>{`Phone : ${userById?.user?.Phone}`}</span>
                        <span className='text-sm text-gray-500 '>{`User Name : ${userById?.user?.UserName}`}</span>
                        <div className='flex mt-4 space-x-3 md:mt-6 gap-3'>
                            <button
                                className='link-button-style'
                                onClick={() =>
                                    navigate(`/edit-profile/${userById?.user?._id}`)
                                }>
                                Edit Profile
                            </button>
                            <button
                                onClick={() => handleLogout()}
                                className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200'>
                                {logOutLoading ? "Loading.." : "Logout"}
                            </button>
                        </div>
                        <Link
                            className='underline hover:underline-offset-2 my-4 font-bold tracking-wider text-red-400'
                            to={`/change-password/${data?.user?._id}`}>
                            Change Password ?
                        </Link>
                        <div className='mt-3 mb-2 px-2'>
                            <p className='text-center font-semibold'>
                                Please Enter{" "}
                                <span className='font-bold text-red-400'>{`${userById?.user?.FirstName}${userById?.user?.LastName}`}</span>{" "}
                                to delete account.
                            </p>
                            <input
                                className='border-2 border-black mt-1.5 px-3 py-1 rounded-md block mx-auto'
                                type='text'
                                onChange={(e) => setInputval(e.target.value)}
                            />

                            {`${userById?.user?.FirstName}${userById?.user?.LastName}` ===
                                inputval ? (
                                <div className='w-full flex items-center justify-center'>
                                    <button
                                        className={`border-2 border-blue-400 w-40  py-1 mt-2 bg-blue-700 rounded-md text-white font-semibold tracking-wider `}
                                        onClick={() => handleDeleteAccount(userById?.user?._id)}>
                                        Delete Account
                                    </button>
                                </div>
                            ) : (
                                <p className='text-sm font-semibold text-center text-red-500 my-2'>
                                    {" "}
                                    Please Enter Correct Name
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>

            {click ? <EditProfile setClick={setClick} /> : null}
        </div>
    );
};

export default Home;
