import { Route } from 'react-router-dom'
import { useGetUserQuery } from '../../features/AuthSlice/AuthSlice'
import Login from '../Login/Login'

const ProtectedRoute = () => {
    const { data } = useGetUserQuery()

    if (!data) {
        return (
            <Route path='/login' element={<Login />} />
        )
    }
}

export default ProtectedRoute