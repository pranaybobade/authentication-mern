/** @format */

import ChangePassword from "./pages/ChangePassword";
import EditProfile from "./pages/EditProfile/Edit";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./ProtectedRoutes";

const App = () => {
	return (
		<>
			<ToastContainer
				position='top-center'
				closeOnClick={true}
				draggable={true}
				limit={1}
				transition={Slide}
				autoClose={3000}
				pauseOnHover={true}
				hideProgressBar={false}
			/>
			<Router>
				<Routes>
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route
						path='/'
						element={
							<ProtectedRoutes>
								<Home />
							</ProtectedRoutes>
						}
					/>
					<Route
						path='/edit-profile/:id'
						element={
							<ProtectedRoutes>
								<EditProfile />
							</ProtectedRoutes>
						}
					/>
					<Route
						path='/change-password/:id'
						element={
							<ProtectedRoutes>
								<ChangePassword />
							</ProtectedRoutes>
						}
					/>
				</Routes>
			</Router>
		</>
	);
};

export default App;
